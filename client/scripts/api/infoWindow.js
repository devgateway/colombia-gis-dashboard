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
        url: window.DATA_API_URL + '/gisservice/gisservice.svc/Filters/Clusters/Json', 
        type: 'json', 
        method: 'post', 
        contentType: 'application/json',
        data: JSON.stringify({'filters': filters? filters : []}) + JSON.stringify({'filtersInfoWin': infoWindowFilter? infoWindowFilter : []}),
        crossOrigin: true
      }).fail(logFailure);
    },

    getIndicatorInfoFromAPI: function(infoWindowFilter, filters) {
      return reqwest({
        url: window.DATA_API_URL + '/gisservice/gisservice.svc/Filters/ClusterIndicator/Json', 
        type: 'json', 
        method: 'post', 
        contentType: 'application/json',
        data: JSON.stringify(filters),
        crossOrigin: true
      }).fail(logFailure);
    }
};