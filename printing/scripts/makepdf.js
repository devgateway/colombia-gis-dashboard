var page2 = require('webpage').create(),
	system = require('system');
var fs = require("fs");
var args = system.args;

//phantomjs makepdf.js http://localhost:9010/#/print/map/AE3EWVrbsDRbBcze http://localhost:9010/#/print/skeleton/AE3EWVrbsDRbBcze AE3EWVrbsDRbBcze.pdf C:\JS_PROJECTS\colombia-gis-dashboard\printing\tmp
if (args.length < 4) {
	console.log('you should pass the following paramenters  TEMPLATE_URL, FILE_NAME, TMP_DIR');
	phantom.exit();

}


var SCRIPT_NAME = args[0]
TEMPLATE_URL = args[1],
	FILE_NAME = args[2],
	TMP_DIR = args[3]


console.log('............... using the following options ...............')
console.log('SCRIPT_NAME=' + SCRIPT_NAME);
console.log('TEMPLATE_URL=' + TEMPLATE_URL);
console.log('FILE_NAME=' + FILE_NAME);
console.log('TMP_DIR=' + TMP_DIR);

function someCallback(pageNum, numPages) {
	return "<h1> someCallback: " + pageNum + " / " + numPages + "</h1>";
}



page2.viewportSize = {
	width: 1930,
	height: 768
};

page2.paperSize = {
	format: 'Legal',
	orientation: 'landscape',
	margin: {
		top: '50px',
		left: '20px'
	},

	header: {
		height: "1cm",
		contents: phantom.callback(function(pageNum, numPages) {
			return "<p><span style='float:right'>Page " + pageNum + " / " + numPages + "</span></p>";
		})
	},
	footer: {
		height: "1cm",
		contents: phantom.callback(function(pageNum, numPages) {
			return "<span style='float:right'>" + pageNum + " / " + numPages + "</span>";
		})
	}
};

var base64;

page2.open(TEMPLATE_URL, function(status) {
	console.log('Print template has been loaded');

	if (status !== 'success') {
		console.log('Unable to load the address!');
	} else {
		window.setTimeout(function() {

			var clipRect = page2.evaluate(function() {
				return document.querySelector('#map').getBoundingClientRect();
			});

			page2.clipRect = {
				top: 87, //clipRect.top,
				left: clipRect.left,
				width: clipRect.width,
				height: clipRect.height
			};

			console.log('CLIP TOP---------' + page2.clipRect.top)
			console.log('CLIP LEFT---------' + page2.clipRect.left)
			console.log('width--------' + page2.clipRect.width)
			console.log('height---------' + page2.clipRect.height)

			page2.render(TMP_DIR + '/test' + Math.random() + '.png');
			base64 = page2.renderBase64('PNG');

			page2.clipRect = {
				left: 0,
				top: 0,
				width: 0,
				height: 0
			}



			var image = page2.evaluate(function(base64) {
				$('#map').html('<img src="data:image/png;base64,' + base64 + '">');
				return $('#map').html();
			}, base64);

			window.setTimeout(function() {

				page2.render(TMP_DIR + '/' + FILE_NAME);
				console.log('.... file has been generated...')
				phantom.exit();
			}, 100)
		}, 200);
	}
});