'use strict';

var Reflux = require('reflux');
var api = require('../api/infoWindow.js');


var getInfoFromAPI = Reflux.createAction({ asyncResult: true });


module.exports = {
  getInfoFromAPI: getInfoFromAPI
};