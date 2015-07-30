'use strict';
var reqwest = require('reqwest');

function logFailure(err) {
  console.error(err);
}

module.exports = {

    saveMapToAPI: function(params) {
      console.log("scripts->api->saveAndRestoreMap: saveMapToAPI");
      return reqwest({
        url: 'http://test.monitor.net.co/GISService.svc/MapSave/Json', 
        type: 'json', 
        method: 'post', 
        contentType: "application/json",
        data: params,
        crossOrigin: true
      }).fail(logFailure);
    },

    restoreMapFromAPI: function (id) {
      console.log("scripts->api->saveAndRestoreMap: restoreMapFromAPI id: " + id);
        var url = 'http://test.monitor.net.co/GISService.svc/MapById?MapId=' + id;
        return reqwest({
            url: url,
            type: 'json',
            method: 'get',
            crossOrigin: true
        }).fail(logFailure);
    },
};