'use strict';

var Reflux = require('reflux');

var getShapesFromAPI = Reflux.createAction({ asyncResult: true });

module.exports = {
  getShapesFromAPI: getShapesFromAPI
};