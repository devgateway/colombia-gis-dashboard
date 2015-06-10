'use strict';

var Reflux = require('reflux');

var getLegends = Reflux.createAction({ asyncResult: true });
var removeLegend = Reflux.createAction();
var isShown = Reflux.createAction();

module.exports = {
  getLegends: getLegends,
  removeLegend: removeLegend,
  isShown: isShown
};