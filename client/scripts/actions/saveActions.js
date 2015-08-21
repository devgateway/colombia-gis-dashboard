'use strict';

var Reflux = require('reflux');


module.exports = { 
  saveMap: Reflux.createAction(),
  openMap: Reflux.createAction(),
  updateMap: Reflux.createAction(),
  deleteMap: Reflux.createAction(),
  showDeleteModal:  Reflux.createAction(),
  showModal:  Reflux.createAction(),
  hideModal:  Reflux.createAction(),
  findMaps:  Reflux.createAction(),
  filterByKeyword:  Reflux.createAction(),
  exportMap:  Reflux.createAction(),
};