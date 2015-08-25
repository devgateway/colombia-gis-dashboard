/*Dependecies*/
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var tim = require('tinytim').tim;
var fs = require('fs');
var uuid = require('node-uuid');
var Promise = require("bluebird");

var Datastore = require('nedb'),
    db = new Datastore();

/*Globals*/
var binPath = phantomjs.path
var tmpFolder = path.join(__dirname, '/tmp');


var HOST = "http://devgateway.github.io/colombia-gis-dashboard";

if (process.env.NODE_ENV == 'production') {
    HOST = 'http://devgateway.github.io/colombia-gis-dashboard'
}

if (process.env.NODE_ENV == 'development') {
    HOST = 'http://localhost:9010'
}

console.log('TARGET HOST IS ...' + HOST);

var URL_TO_SKELETON = HOST + '/#/print/skeleton/{{id}}'; // {{id}}URL to the print page skeleton (using https://github.com/baryon/node-tinytim notation) 

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/**
 * Enabling cross cross domain request
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {               var oneof [description]
 * @return {[type]}       [description]
 */
app.use(function(req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', function(req, res) {
    res.status(400);
});

app.get('/pdf/:id', pdf);
app.get('/png/:id', png);
app.get('/download/:name', handleDownload);

app.post('/save', function(req, res) {
    var doc = req.body;
    doc.version = 1;
    db.insert(doc, function(err, newDoc) { // Callback is optional
        res.json(newDoc);
    });
});

app.put('/save/:id', function(req, res) {
    var id = req.params.id;
    var doc = req.body;
    var clientVersion = doc.version;
    db.find({
        '_id': id
    }, function(err, docs) {
        if (docs.length > 0) {
            console.log('Original map found')
            var orginial = docs[0];
            var currentVersion = orginial.version;

            console.log('clientVersion is ' + clientVersion + ' currentVersion is ' + currentVersion)
            if (clientVersion != currentVersion) {
                console.log('warning updating with wrong version ')
            }

            var newVerions = ++currentVersion;
            doc.version = newVerions;
            db.update({
                '_id': id
            }, doc, {}, function(err) {
                if (err) {
                    return res.sendStatus(403);

                } else {
                    res.json(doc);
                }
            });

        } else {
            console.log('Error someone tried to update a missing map');
            res.sendStatus(500);
        }
    });

});

app.delete('/save/:id', function(req, res) {
    var id = req.params.id;
    db.remove({
        '_id': id
    }, {}, function(err) {
        if (err) {
            console.log('delete fail:' + id);
            return res.sendStatus(403);
        } else {
            res.json({});
        }
    });
});

app.get('/maps', function(req, res) {
    // Finding all planets in the solar system
    db.find({}, function(err, docs) {
        res.json(docs);
    });
});

app.get('/map/:id', function(req, res) {
    // Finding all planets in the solar system
    db.find({
        '_id': req.params.id
    }, function(err, docs) {
        if (docs.length > 0) {
            res.json(docs[0]);
        } else {

            res.sendStatus(404);
        }
    });
});



/**
 *
 * @param req
 * @param res
 */
function handleDownload(req, res) {
    var name = req.params.name;
    var path_to_file = path.join(tmpFolder, name);
    fs.exists(path_to_file, function(exists) {
        if (exists) {
            res.download(path_to_file);
        } else {
            res.status(404);
        }
    });
}

/**
 *
 * fb
 * dgh
 * rh
 * @param req
 * @param res
 */
function pdf(req, res) {
    return delegate(req, res, 'pdf');
}

function png(req, res) {
    return delegate(req, res, 'png');
}

function delegate(req, res, format) {
    var makeResponse = function(fileName) {
        res.status(200);
        res.json({
            'name': fileName
        });
    };

    var id = req.params.id;
    if (!id) { //id is not numeric
        res.status(400);
    } else {
        getMapByid(id).then(function(map) {
            if (map) {
                checkFileExist(map._id, map.version, format).then(function(fileName) {

                    if (fileName) {
                        makeResponse(fileName);
                    } else {
                        makeFile(map._id, map.version, format).then(makeResponse);
                    }

                })

            } else {
                res.sendStatus(404)
            }
        })

    }


}


function joinName(id, version, extension) {
    return id + '.' + version + '.' + extension;
}

function checkFileExist(id, version, extension) {
    var name = joinName(id, version, extension);
    var path_to_file = path.join(tmpFolder, name);

    return new Promise(function(resolve, reject) {
        fs.exists(path_to_file, function(exists) {
            if (exists) {
                resolve(name);
            } else {
                resolve(null);
            }
        });

    })
}

function getMapByid(id, callback) {
    return new Promise(function(resolve, reject) {

        db.find({
            '_id': id
        }, function(err, docs) {
            if (docs.length > 0) {
                resolve(docs[0]);
            } else {
                resolve(null);
            }
        });
    })
}



/**
 * [makeFile description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function makeFile(id, version, format) {

    var fileName = joinName(id, version, format);
    var scriptName = ''
    if (format == 'png') {
        scriptName = 'makeimage.js';
    } else if (format == 'pdf') {
        scriptName = 'makepdf.js';
    }

    var templateUrl = tim(URL_TO_SKELETON, {
        id: id
    });

    return new Promise(function(resolve, reject) {

        console.log(templateUrl + ' ' + fileName + ' ' + tmpFolder);

        var childArgs = [path.join(__dirname, '/scripts/' + scriptName), templateUrl, fileName, tmpFolder]

        childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
            console.log(stdout);
            resolve(fileName); //
        })


    });


}



var server = app.listen(3033, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Print service listening at http://%s:%s', host, port);
});