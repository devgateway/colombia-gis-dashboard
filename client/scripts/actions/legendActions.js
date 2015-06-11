'use strict';

var Reflux = require('reflux');

var getLegends = Reflux.createAction({ asyncResult: true });
var isShown = Reflux.createAction();

module.exports = {
  getLegends: getLegends,
  isShown: isShown
};