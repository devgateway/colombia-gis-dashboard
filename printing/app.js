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


var HOST="http://devgateway.github.io/colombia-gis-dashboard";

if (process.env.NODE_ENV=='production'){
    HOST='http://devgateway.github.io/colombia-gis-dashboard'  
}

if (process.env.NODE_ENV=='development'){
    HOST='http://localhost:9010'  
}

console.log('TARGET HOST IS ...'+HOST);

var URL_TO_MAP = HOST+'/#/print/map/{{id}}'; // URL to the printing version of the map (using https://github.com/baryon/node-tinytim notation) 
var URL_TO_SKELETON = HOST+'/#/print/skeleton/{{id}}'; // {{id}}URL to the print page skeleton (using https://github.com/baryon/node-tinytim notation) 
//
//
console.log()

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
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

app.get('/', function (req, res) {
    res.status(400).send('This service should be used for printing purpose, please see read the <a href="help.html"> documentation </a>');
});

app.get('/print', function (req, res) {
    res.status(400).send('Please use /print/{id}');
});

app.get('/print/:id', handlePrinting);
app.get('/download/:name', handleDownload);

app.post('/save', function (req, res) {
    var doc =  req.body;
    db.insert(doc, function (err, newDoc) {   // Callback is optional
        res.json(newDoc);
    });
});

app.get('/maps', function (req, res) {
    // Finding all planets in the solar system
    db.find({  }, function (err, docs) {
        res.json(docs);
    });
});

app.get('/map/:id', function (req, res) {
    // Finding all planets in the solar system
    db.find({'_id':req.params.id  }, function (err, docs) {
        if(docs.length > 0){
             res.json(docs[0]);
        }else{
            res.sendStatus(404).send("Can't find this map");
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
    fs.exists(path_to_file, function (exists) {
        if (exists) {
            res.download(path_to_file);
        } else {
            res.status(404).send('File not found');
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
function handlePrinting(req, res) {
    var id = req.params.id;

    if (!id) { //id is not numeric
        res.status(400).send('you should provide and id');
    } else {

        makeFile(id).then(function (fileName) {
            res.status(200);
            res.json({
                'name': fileName
            })
        })

    }
}

/**
 * [makeFile description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function makeFile(id) {

    var UUID = uuid.v1();

    return new Promise(function (resolve, reject) {
        var mapUrl = tim(URL_TO_MAP, {
            id: id
        });
        var templateUrl = tim(URL_TO_SKELETON, {
            id: id
        });

        var fileName = UUID + '.pdf';

        console.log(mapUrl + '' + templateUrl + ' ' + fileName + ' ' + tmpFolder);

        var childArgs = [path.join(__dirname, '/scripts/makepdf.js'), mapUrl, templateUrl, fileName, tmpFolder]

        childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
            console.log(stdout);
            resolve(fileName); //
        })


    });


}


var server = app.listen(3033, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Print service listening at http://%s:%s', host, port);
});