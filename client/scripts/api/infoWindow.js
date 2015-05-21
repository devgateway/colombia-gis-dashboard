'use strict';
var reqwest = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

    getInfoFromAPI: function(endPoint) {
      console.log("scripts->api->infoWindow: getInfoFromAPI");
      return reqwest({
        url: endPoint.apiEndPoint, 
        type: 'json', 
        method: 'get', 
        crossOrigin: true
      }).fail(logFailure);
    },
};