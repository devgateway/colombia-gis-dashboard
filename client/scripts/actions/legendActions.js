'use strict';

var Reflux = require('reflux');

var getLegends = Reflux.createAction({ asyncResult: true });
var getDataLayersLegends = Reflux.createAction();
var removeLegend = Reflux.createAction();

module.exports = {
  getLegends: getLegends,
  getDataLayersLegends: getDataLayersLegends,
  removeLegend: removeLegend
};