'use strict';
var reqwest = require('reqwest');
var tim = require('tinytim').tim;

function logFailure(err) {
  debugger;
  console.error(err);
}

module.exports = {


  saveMapToAPI: function(params) {
    //console.log('scripts->api->saveAndRestoreMap: saveMapToAPI');
    return reqwest({
      url: window.MAP_SAVE_URL,
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(params),
      crossOrigin: true
    }).fail(logFailure);
  },

  updateMapToAPI: function(id, params) {
    //console.log('scripts->api->saveAndRestoreMap: updateMapToAPI');
    var url = tim(window.MAP_UPDATE_DELETE_URL,{id:id});
    return reqwest({
      url: url,
      type: 'json',
      method: 'put',
      contentType: 'application/json',
      data: JSON.stringify(params),
      crossOrigin: true
    }).fail(logFailure);
  },

  deleteMapToAPI: function(id) {
    //console.log('scripts->api->saveAndRestoreMap: deleteMapToAPI');
    var url = tim(window.MAP_UPDATE_DELETE_URL,{id:id});
    return reqwest({
      url: url,
      type: 'json',
      method: 'delete',
      crossOrigin: true
    }).fail(logFailure);
  },

  findMaps: function() {
    //console.log('scripts->api->saveAndRestoreMap:findMaps' );

    return reqwest({
      url: window.MAP_LIST_URL,
      type: 'json',
      method: 'get',
      crossOrigin: true
    }).fail(logFailure);

  },

  getMapById: function(id) {
    //console.log('scripts->api->saveAndRestoreMap: restoreMapFromAPI id: ' + id);
    var url = tim(window.MAP_GET_URL,{id:id});
    return reqwest({
      url:url, 
      type: 'json',
      method: 'get',
      crossOrigin: true
    }).fail(logFailure);
  },

  pdf:function(id){
    //console.log('scripts->api->saveAndRestoreMap: pdf id: ' + id);
    var url = tim(window.MAP_PDF_URL,{id:id});
    return reqwest({
      url:url, 
      type: 'json',
      method: 'get',
      crossOrigin: true
    }).fail(logFailure); 
  },

  image:function(id){
    //console.log('scripts->api->saveAndRestoreMap: image id: ' + id);
    var url = tim(window.MAP_IMAGE_URL,{id:id});
    return reqwest({
      url:url, 
      type: 'json',
      method: 'get',
      crossOrigin: true
    }).fail(logFailure); 
  },

  exportActivities: function(filters) {
    return reqwest({
      url: 'http://test.monitor.net.co/gisservice/gisservice.svc/SubActivitiesListToExcel',
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify({'filters': filters}),
      crossOrigin: true
    }).fail(logFailure);
  },

  exportIndicators: function(filters) {
    return reqwest({
      url: 'http://test.monitor.net.co/gisservice/gisservice.svc/IndicatorDetails/Json',
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(filters),
      crossOrigin: true
    }).fail(logFailure);
  },
};