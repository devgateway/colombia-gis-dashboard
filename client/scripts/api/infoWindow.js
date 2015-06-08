'use strict';
var reqwest = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

    getInfoFromAPI: function(endPoint, filters) {
      console.log("scripts->api->infoWindow: getInfoFromAPI");
      return reqwest({
        url: endPoint.apiEndPoint, 
        type: 'json', 
        method: 'post', 
        contentType: "application/json",
        data: JSON.stringify({"filters": filters? filters : []}),
        crossOrigin: true
      }).fail(logFailure);
    },
};