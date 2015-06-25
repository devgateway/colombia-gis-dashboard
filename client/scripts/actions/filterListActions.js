'use strict';

var Reflux = require('reflux');

var names=["add","remove","load","clean","updateItemSelection","updateAllSelection","filterByKeyword","selectFilteredByKeyword"];

module.exports = {
	Locations: Reflux.createActions(names),
	TargetPopulation: Reflux.createActions(names),
	Departaments: Reflux.createActions(names),
	Municipalities: Reflux.createActions(names),
	DevelopmentObjectives: Reflux.createActions(names),
	SubActivityStatus: Reflux.createActions(names),
	SubImplementersType: Reflux.createActions(names),
	SubImplementers: Reflux.createActions(names),
	ActivityClassificationType: Reflux.createActions(names),
	ActivityClassificationSubType1: Reflux.createActions(names),
	PublicPrivatePartnership: Reflux.createActions(names),
	Crops: Reflux.createActions(names),
	EnvironmentalManagementPlans: Reflux.createActions(names),
	ContractType: Reflux.createActions(names),
	AorCor: Reflux.createActions(names),
	RapidImpact: Reflux.createActions(names),
	applyFilters: Reflux.createAction()
};