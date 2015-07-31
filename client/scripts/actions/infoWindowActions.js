'use strict';

var Reflux = require('reflux');

var getInfoFromAPI = Reflux.createAction({ asyncResult: true });

module.exports = {
  getInfoFromAPI: getInfoFromAPI
};