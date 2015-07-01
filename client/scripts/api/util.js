'use strict';
var reqwest = require('reqwest');

function createPoint(obj){
	return  {'type': 'Feature','properties': obj,'geometry': {'type': 'Point','coordinates': [obj.longitude,obj.latitude]}};
}


function logFailure(err, message) {
	console.error(message);
	console.error(err);
}

module.exports = {	
	/*
	Interate over a simple array of elements and convert them into a GeoJson format.
	*/
	toGeoJson: function(elements) {
		var features=[];

		elements.map(function(e){
			features.push(createPoint(e));
		});

		return features;
	},


	request: function(url){
		alert('Este metodo se usa ...');
		return reqwest({ url: url+'?f=json', type: 'json', method: 'get',  crossOrigin: true} );

	},


  	get: function(url) {
      	return reqwest({url: url, type: 'json',  method: 'get',  crossOrigin: true });
    },


};

