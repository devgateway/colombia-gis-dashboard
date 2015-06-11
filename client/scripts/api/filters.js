'use strict';
var reqwest = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

  	getListFromAPI: function(filter) {
      /*var dfd = $.Deferred();
      $.ajax(filter.apiEndPoint, {})
        .done(function(data) { dfd.resolve({data: data, filter: filter}); })
        .fail(function(data) { dfd.error(data); });
      return dfd.promise(); 
      */
      return reqwest({
        url: filter.apiEndPoint, 
        type: 'json', 
        method: 'get', 
        crossOrigin: true
      }).fail(logFailure);
    },
};
