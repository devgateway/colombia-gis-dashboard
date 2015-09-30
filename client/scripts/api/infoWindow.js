'use strict';
var reqwest = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

    getInfoFromAPI: function(infoWindowFilter, filters) {
      console.log('scripts->api->infoWindow: getInfoFromAPI');
      return reqwest({
        url: 'http://test.monitor.net.co/gisservice/gisservice.svc/Filters/Clusters/Json', 
        //url: 'mock-data/infoWindowData.json',
        type: 'json', 
        method: 'post', 
        //method: 'get', 
        contentType: 'application/json',
        data: JSON.stringify({'filters': filters? filters : []}) + JSON.stringify({'filtersInfoWin': infoWindowFilter? infoWindowFilter : []}),
        crossOrigin: true
      }).fail(logFailure);
    },

    getIndicatorInfoFromAPI: function(infoWindowFilter, filters) {
      return reqwest({
        url: 'http://test.monitor.net.co/gisservice/gisservice.svc/Filters/ClusterIndicator/Json', 
        type: 'json', 
        method: 'post', 
        contentType: 'application/json',
        data: JSON.stringify(filters),
        crossOrigin: true
      }).fail(logFailure);
    }
};