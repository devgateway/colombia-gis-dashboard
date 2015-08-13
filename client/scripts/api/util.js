'use strict';
var reqwest = require('reqwest');

function createPoint(obj){
	return  {'type': 'Feature','properties': obj,'geometry': {'type': 'Point','coordinates': [obj.longitude,obj.latitude]}};
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
		return reqwest({ url: url+'?f=json', type: 'json', method: 'get',  crossOrigin: true} );

	},


	get: function(url) {
		return reqwest({url: url, type: 'json',  method: 'get',  crossOrigin: true });
	},

	

	_rgbToHex: function(r, g, b){
		return "#"+this._toHex(r)+this._toHex(g)+this._toHex(b);
	},

	_toHex: function (n) {
		n = parseInt(n,10);
		if (isNaN(n)) return "00";
		n = Math.max(0,Math.min(n,255));
		return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
	},
};

