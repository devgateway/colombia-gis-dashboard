'use strict';

var Reflux = require('reflux');
var api = require('../api/filters.js');


var getListFromAPI = Reflux.createAction({ asyncResult: true });
getListFromAPI.listenAndPromise(api.getListFromAPI);

var changeFilterItemState = Reflux.createAction();

var triggerFilterApply = Reflux.createAction();
var triggerFilterReset = Reflux.createAction();

module.exports = {
  getListFromAPI: getListFromAPI,
  changeFilterItemState: changeFilterItemState,
  triggerFilterApply: triggerFilterApply,
  triggerFilterReset: triggerFilterReset
};
