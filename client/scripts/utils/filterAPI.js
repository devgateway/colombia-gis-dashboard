'use strict';
var reqwest = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

  	getDepartamentsList: function() {
      /*var dfd = $.Deferred();
      $.ajax('http://test.monitor.net.co/GisService.svc/Filters/getDepartmentsList/Json', {})
        .done(function(data) { dfd.resolve(data); })
        .fail(function(data) { dfd.error(data); });
      return dfd.promise(); */       
      return reqwest({ url: 'http://test.monitor.net.co/GisService.svc/Filters/getDepartmentsList/Json', type: 'json', method: 'get', crossOrigin: true}).fail(logFailure);
    },
    
    getMunicipalitiesList: function() {
      /*var dfd = $.Deferred();
      $.ajax('http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json', {})
        .done(function(data) { dfd.resolve(data); })
        .fail(function(data) { dfd.error(data); });
      return dfd.promise();*/        
      return reqwest({ url: 'http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json', type: 'json', method: 'get', crossOrigin: true}).fail(logFailure);
    },
};

