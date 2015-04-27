'use strict';

var Reflux = require('reflux');
var api = require('../api/filters.js');


var getListFromAPI = Reflux.createAction({ asyncResult: true });

var getAllListsFromAPI = Reflux.createAction();
var changeFilterItemState = Reflux.createAction();
var changeAllFilterItemState = Reflux.createAction();

var triggerFilterApply = Reflux.createAction();
var triggerFilterReset = Reflux.createAction();

module.exports = {
  getListFromAPI: getListFromAPI,
  getAllListsFromAPI: getAllListsFromAPI,
  changeFilterItemState: changeFilterItemState,
  changeAllFilterItemState: changeAllFilterItemState,
  triggerFilterApply: triggerFilterApply,
  triggerFilterReset: triggerFilterReset
};

