'use strict';
var reqwest = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

    getInfoFromAPI: function(infoWindowFilter, filters) {
      console.log("scripts->api->infoWindow: getInfoFromAPI");
      return reqwest({
        //url: 'http://test.monitor.net.co/GisService.svc/Filters/Clusters/Json', 
        url: 'mock-data/infoWindowData.json',
        type: 'json', 
        //method: 'post', 
        method: 'get', 
        contentType: "application/json",
        data: JSON.stringify({"filtersInfoWin": infoWindowFilter? infoWindowFilter : [], "filters": filters? filters : []}),
        crossOrigin: true
      }).fail(logFailure);
    },
};