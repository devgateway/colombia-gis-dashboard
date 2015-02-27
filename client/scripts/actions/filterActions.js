'use strict';

var Reflux = require('reflux');
var api = require('../api/filters.js');


var getFilterListFromServer = Reflux.createAction({ asyncResult: true });
getFilterListFromServer.listenAndPromise(api.getFilterListFromServer);

module.exports = {
  getFilterListFromServer: getFilterListFromServer
};

