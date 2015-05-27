'use strict';

var Reflux = require('reflux');

var getLegends = Reflux.createAction({ asyncResult: true });

module.exports = {
  getLegends: getLegends
};