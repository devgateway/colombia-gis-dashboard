'use strict';

var Reflux = require('reflux');

var getLegends = Reflux.createAction({ asyncResult: true });
var removeLegend = Reflux.createAction();

module.exports = {
  getLegends: getLegends,
  removeLegend: removeLegend,
};