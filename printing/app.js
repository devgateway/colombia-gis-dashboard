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


/*Globals*/
var binPath = phantomjs.path
var tmpFolder = path.join(__dirname, '/tmp');
var URL_TO_MAP = 'http://localhost:9010/#/print/map'; //{{id}} URL to the printing version of the map (using https://github.com/baryon/node-tinytim notation) 
var URL_TO_SKELETON = 'http://localhost:9010/#/print/template'; // {{id}}URL to the print page skeleton (using https://github.com/baryon/node-tinytim notation) 


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.status(400).send('This service should be used for printing purpose, please see read the <a href="help.html"> documentation </a>');
});

app.get('/print', function(req, res) {
	res.status(400).send('Please use /print/{id}');

});


app.get('/print/:id', handlePrinting);
app.get('/download/:name', handleDownload);



function handleDownload(req, res) {
	var name = req.params.name;
	var path_to_file = path.join(tmpFolder, name);

	fs.exists(path_to_file, function(exists) {
		if (exists) {
			res.download(path_to_file);
		} else {
			res.status(404).send('File not found');
		}
	});
}


function handlePrinting(req, res) {
	var id = req.params.id;

	if (isNaN(id)) { //id is not numeric
		res.status(400).send('id should be numeric');
	} else {

		makeFile(id).then(function(fileName) {
			res.status(200);
			res.json({
				'name': fileName
			})
		})

	}
}



function makeFile(id) {

	var UUID = uuid.v1();

	return new Promise(function(resolve, reject) {
		var mapUrl = tim(URL_TO_MAP, {
			id: id
		});
		var templateUrl = tim(URL_TO_SKELETON, {
			id: id
		});

		var fileName = UUID + '.pdf';

		console.log(mapUrl + '' + templateUrl + ' ' + fileName + ' ' + tmpFolder);

		var childArgs = [path.join(__dirname, '/scripts/makepdf.js'), mapUrl, templateUrl, fileName, tmpFolder]

		childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
			console.log(stdout);
			resolve(fileName); //
		})


	});



}







var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});