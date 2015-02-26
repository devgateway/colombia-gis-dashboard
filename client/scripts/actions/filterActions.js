'use strict';

var Reflux = require('reflux');
var api = require('../utils/filterAPI.js');


var getDepartamentsList = Reflux.createAction({ asyncResult: true });
getDepartamentsList.listenAndPromise(api.getDepartamentsList);

var getMunicipalitiesList = Reflux.createAction({ asyncResult: true });
getMunicipalitiesList.listenAndPromise(api.getMunicipalitiesList);

var changeFilterItemState = Reflux.createAction();

module.exports = {
  getDepartamentsList: getDepartamentsList,
  getMunicipalitiesList: getMunicipalitiesList,
  changeFilterItemState: changeFilterItemState
};

