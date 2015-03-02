'use strict';
var Reflux = require('reflux');
var api = require('../api/layers.js');

debugger;
var loadActivitiesByDepartments = Reflux.createAction({ asyncResult: true });
	loadActivitiesByDepartments.listenAndPromise(api.getActivitiesByDepartment);

var loadActivitiesByMuncipalities= Reflux.createAction({ asyncResult: true });
	loadActivitiesByMuncipalities.listenAndPromise(api.getActivitiesByMuncipalities);

var searchOnArgGis = Reflux.createAction({ asyncResult: true });
	searchOnArgGis.listenAndPromise(api.findLayers);


module.exports = {
	loadActivitiesByDepartments: loadActivitiesByDepartments,
	loadActivitiesByMuncipalities:loadActivitiesByMuncipalities,
	searchOnArgGis:searchOnArgGis
};