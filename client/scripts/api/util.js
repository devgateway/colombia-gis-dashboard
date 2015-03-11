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



};

