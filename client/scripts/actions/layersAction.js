'use strict';
var Reflux = require('reflux');

var loadActivitiesByDepartments = Reflux.createAction({ asyncResult: true });

var loadActivitiesByMuncipalities= Reflux.createAction({ asyncResult: true });


var triggerFilterApply = Reflux.createAction();

module.exports = {
	triggerFilterApply: triggerFilterApply,
	loadActivitiesByDepartments: loadActivitiesByDepartments,
	loadActivitiesByMuncipalities:loadActivitiesByMuncipalities,
};