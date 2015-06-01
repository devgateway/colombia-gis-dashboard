'use strict';

var Reflux = require('reflux');

var getLegends = Reflux.createAction({ asyncResult: true });
var getBaseMapLegends = Reflux.createAction();

module.exports = {
  getLegends: getLegends,
  getBaseMapLegends: getBaseMapLegends
};