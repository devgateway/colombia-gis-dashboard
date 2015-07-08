'use strict';

var Reflux = require('reflux');

var saveMap = Reflux.createAction();
var restoreMap = Reflux.createAction();

module.exports = { 
  saveMap: saveMap,
  restoreMap: restoreMap,
};