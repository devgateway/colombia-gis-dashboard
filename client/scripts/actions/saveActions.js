'use strict';

var Reflux = require('reflux');

var saveMap = Reflux.createAction();
var restoreMap = Reflux.createAction();
var saveMapToAPI = Reflux.createAction({ asyncResult: true });
var restoreMapFromAPI = Reflux.createAction({ asyncResult: true });

module.exports = { 
  saveMap: saveMap,
  restoreMap: restoreMap,
  saveMapToAPI: saveMapToAPI,
  restoreMapFromAPI: restoreMapFromAPI
};