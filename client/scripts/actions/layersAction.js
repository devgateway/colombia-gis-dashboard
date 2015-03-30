'use strict';
var Reflux = require('reflux');
var api = require('../api/layers.js');

var loadActivitiesByDepartments = Reflux.createAction({ asyncResult: true });
	loadActivitiesByDepartments.listenAndPromise(api.getActivitiesByDepartment);

var loadActivitiesByMuncipalities= Reflux.createAction({ asyncResult: true });
	loadActivitiesByMuncipalities.listenAndPromise(api.getActivitiesByMuncipalities);

var triggerFilterApply = Reflux.createAction();

module.exports = {
	triggerFilterApply: triggerFilterApply,
	loadActivitiesByDepartments: loadActivitiesByDepartments,
	loadActivitiesByMuncipalities:loadActivitiesByMuncipalities,
};