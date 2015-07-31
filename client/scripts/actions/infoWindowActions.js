'use strict';

var Reflux = require('reflux');

var getPointsFromAPI = Reflux.createAction({ asyncResult: true });

module.exports = {
  getPointsFromAPI: getPointsFromAPI
};