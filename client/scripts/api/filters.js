'use strict';
var reqwest = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

  	getListFromAPI: function(filter) {
      var dfd = $.Deferred();
      $.ajax(filter.apiEndPoint, {})
        .done(function(data) { dfd.resolve({data: data, filter: filter}); })
        .fail(function(data) { dfd.error(data); });
      return dfd.promise(); 
      //debugger;
      //return reqwest({ url: filter.endPoint, type: 'json', method: 'get', crossOrigin: true}).fail(logFailure);
    },
};
