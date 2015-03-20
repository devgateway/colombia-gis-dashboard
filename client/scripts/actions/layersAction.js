'use strict';
var Reflux = require('reflux');

var loadActivitiesByDepartments = Reflux.createAction({ asyncResult: true });

var loadActivitiesByMuncipalities= Reflux.createAction({ asyncResult: true });

module.exports = {
	loadActivitiesByDepartments: loadActivitiesByDepartments,
	loadActivitiesByMuncipalities:loadActivitiesByMuncipalities,
};