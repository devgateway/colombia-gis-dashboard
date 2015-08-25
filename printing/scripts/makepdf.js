var page = require('webpage').create(),
system = require('system');
var fs = require("fs");
var args = system.args;

//phantomjs makepdf.js http://localhost:9010/#/print/map/AE3EWVrbsDRbBcze http://localhost:9010/#/print/skeleton/AE3EWVrbsDRbBcze AE3EWVrbsDRbBcze.pdf C:\JS_PROJECTS\colombia-gis-dashboard\printing\tmp
if (args.length < 4) {
	console.log('you should pass the following paramenters  TEMPLATE_URL, FILE_NAME, TMP_DIR');
	phantom.exit();

} else {


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



	page.viewportSize = {
		width: 1930,
		height: 768
	};

	page.paperSize = {
		format: 'portrait',
		orientation: 'A4',
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

	page.open(TEMPLATE_URL, function(status) {
		console.log('Print template has been loaded');

		if (status !== 'success') {
			console.log('Unable to load the address!');
		} else {
			window.setTimeout(function() {

				var clipRect = page.evaluate(function() {
					return document.querySelector('#map').getBoundingClientRect();
				});

				page.clipRect = {
					top: clipRect.top,
					left: clipRect.left,
					width: clipRect.width,
					height: clipRect.height
				};

				console.log('CLIP TOP---------' + page.clipRect.top)
				console.log('CLIP LEFT---------' + page.clipRect.left)
				console.log('width--------' + page.clipRect.width)
				console.log('height---------' + page.clipRect.height)

				//page.render(TMP_DIR + '/test' + Math.random() + '.png');
				base64 = page.renderBase64('PNG');

				page.clipRect = {
					left: 0,
					top: 0,
					width: 0,
					height: 0
				}



				var image = page.evaluate(function(base64) {
					$('#map').html('<img src="data:image/png;base64,' + base64 + '">');
					return $('#map').html();
				}, base64);

				window.setTimeout(function() {

					page.render(TMP_DIR + '/' + FILE_NAME);
					console.log('.... file has been  successfuly generated...')
					phantom.exit();
				}, 100)
			}, 200);
}
});
}