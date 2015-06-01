'use strict';
var Reflux = require('reflux');

var loadActivitiesByDepartments = Reflux.createAction({ asyncResult: true });
var loadActivitiesByMuncipalities= Reflux.createAction({ asyncResult: true });

var loadIndicatorsByDepartments = Reflux.createAction({ asyncResult: true });
var loadIndicatorsByMuncipalities= Reflux.createAction({ asyncResult: true });

var loadMuncipalitiesFromAPI = Reflux.createAction({ asyncResult: true });
var loadMuncipalities= Reflux.createAction({ asyncResult: true });

var triggerFilterApply = Reflux.createAction();

var get=function(actionName){
	var newAction=new Object();
	newAction[actionName]=Reflux.createAction()
	newAction['trigger']=function(){
		debugger;
		newAction[actionName].bind(arguments)();
	}
	return newAction;
}

module.exports = {

	loadMuncipalitiesFromAPI: loadMuncipalitiesFromAPI,
	loadMuncipalities: loadMuncipalities,

	changeLayerValue:Reflux.createAction(),
	loadFundingByType:Reflux.createAction(),
	triggerFilterApply: triggerFilterApply,
	loadActivitiesByDepartments: loadActivitiesByDepartments,
	loadActivitiesByMuncipalities:loadActivitiesByMuncipalities,
	loadIndicatorsByDepartments: loadIndicatorsByDepartments,
	loadIndicatorsByMuncipalities:loadIndicatorsByMuncipalities
};