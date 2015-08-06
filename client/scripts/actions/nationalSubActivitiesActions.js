'use strict';

var Reflux = require('reflux');

var getPopupInfoFromAPI = Reflux.createAction({ asyncResult: true });

module.exports = {
  getPopupInfoFromAPI: getPopupInfoFromAPI
};