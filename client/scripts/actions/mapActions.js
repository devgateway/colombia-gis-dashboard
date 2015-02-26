'use strict';
var Reflux = require('reflux');
var api = require('../api/activitiesAPI.js');


var loadActivitiesByDepartments = Reflux.createAction({ asyncResult: true });
	loadActivitiesByDepartments.listenAndPromise(api.getActivitiesByDepartment);

var changeBounds = Reflux.createAction({children: ['user']});
var changeBaseMap=Reflux.createAction();


module.exports = {
	changeBounds : changeBounds,
	changeBaseMap : changeBaseMap,
	loadActivitiesByDepartments: loadActivitiesByDepartments
};





