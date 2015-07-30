'use strict';

var Reflux = require('reflux');

var saveMap = Reflux.createAction();
var restoreMap = Reflux.createAction();
var saveMapToAPI = Reflux.createAction();
var restoreMapFromAPI = Reflux.createAction();

module.exports = { 
  saveMap: saveMap,
  restoreMap: restoreMap,
  saveMapToAPI: saveMapToAPI,
  showModal:  Reflux.createAction(),
  hideModal:  Reflux.createAction(),
  findMaps :  Reflux.createAction()
};