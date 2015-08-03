'use strict';
var reqwest = require('reqwest');
var tim = require('tinytim').tim;

function logFailure(err) {
  console.error(err);
}

module.exports = {


  saveMapToAPI: function(params) {
    debugger;
    console.log("scripts->api->saveAndRestoreMap: saveMapToAPI");
    return reqwest({
      url: window.MAP_SAVE_URL,
      type: 'json',
      method: 'post',
      contentType: "application/json",
      data: JSON.stringify(params),
      crossOrigin: true
    }).fail(logFailure);
  },

  findMaps: function() {
    console.log("scripts->api->saveAndRestoreMap:findMaps" );

    return reqwest({
      url: window.MAP_LIST_URL,
      type: 'json',
      method: 'get',
      crossOrigin: true
    }).fail(logFailure);

  },

  getMapById: function(id) {
    console.log("scripts->api->saveAndRestoreMap: restoreMapFromAPI id: " + id);
    var url = tim(window.MAP_GET_URL,{id:id});
    return reqwest({
      url:url, 
      type: 'json',
      method: 'get',
      crossOrigin: true
    }).fail(logFailure);
  },

  print:function(id){
    console.log("scripts->api->saveAndRestoreMap: print id: " + id);
    var url = tim(window.MAP_PRINT_URL,{id:id});
    return reqwest({
      url:url, 
      type: 'json',
      method: 'get',
      crossOrigin: true
    }).fail(logFailure); 
  }

};