'use strict';

var Reflux = require('reflux');
var api = require('../api/filters.js');


var getListFromAPI = Reflux.createAction({ asyncResult: true });

var getAllListsFromAPI = Reflux.createAction();
var changeFilterValue = Reflux.createAction();
var changeFilterItemState = Reflux.createAction();
var changeAllFilterItemState = Reflux.createAction();

var triggerFilterApply = Reflux.createAction();
var triggerFilterReset = Reflux.createAction();
var resetDates = Reflux.createAction();


module.exports = {
  getListFromAPI: getListFromAPI,
  getAllListsFromAPI: getAllListsFromAPI,
  changeFilterValue: changeFilterValue,
  changeFilterItemState: changeFilterItemState,
  changeAllFilterItemState: changeAllFilterItemState,
  triggerFilterApply: triggerFilterApply,
  triggerFilterReset: triggerFilterReset,
  resetDates:resetDates
};

