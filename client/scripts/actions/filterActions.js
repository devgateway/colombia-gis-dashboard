'use strict';

var Reflux = require('reflux');
var api = require('../utils/filterAPI.js');


var getListFromAPI = Reflux.createAction({ asyncResult: true });
getListFromAPI.listenAndPromise(api.getListFromAPI);

var getDepartamentsList = Reflux.createAction({ asyncResult: true });
getDepartamentsList.listenAndPromise(api.getDepartamentsList);

var getMunicipalitiesList = Reflux.createAction({ asyncResult: true });
getMunicipalitiesList.listenAndPromise(api.getMunicipalitiesList);

var changeFilterItemState = Reflux.createAction();

module.exports = {
	getListFromAPI: getListFromAPI,
  getDepartamentsList: getDepartamentsList,
  getMunicipalitiesList: getMunicipalitiesList,
  changeFilterItemState: changeFilterItemState
};

