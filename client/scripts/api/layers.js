'use strict';
var request = require('reqwest');

var GIS_URL='http://www.arcgis.com/sharing/rest/search?f=json&q=';

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}


module.exports = {
  
  getActivitiesByDepartment:function(options){
    	return request({url: 'http://test.monitor.net.co/GisService.svc/Filters/getActivityDepartmentsFunding/Json',
    		type: 'json', method: 'get', crossOrigin: true}).fail(logFailure);
  },
  

  getActivitiesByMuncipalities:function(options){
  	debugger;
    	return request({url: 'http://test.monitor.net.co/GISService.svc/Filters/getActivityMunicipalitiesFunding/Json',
    			type: 'json', method: 'get', crossOrigin: true}).fail(logFailure);
  },
  

 findLayers: function(options) {
    	return request({url: GIS_URL + encodeURIComponent(options.query),type: 'json', method: 'get', crossOrigin: true}).fail(logFailure);
	}

};

