'use strict';
var reqwest = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

    getInfoFromAPI: function(filters) {
      console.log("scripts->api->infoWindow: getInfoFromAPI");
      return reqwest({
        url: 'http://test.monitor.net.co/GisService.svc/Filters/Clusters/Json', 
        type: 'json', 
        method: 'post', 
        contentType: "application/json",
        data: JSON.stringify({"filters": filters? filters : []}),
        crossOrigin: true
      }).fail(logFailure);
    },
};