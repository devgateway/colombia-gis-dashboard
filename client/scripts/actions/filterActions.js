'use strict';

var Reflux = require('reflux');

var names=[
	"add","remove","load","clean",
	"updateItemSelection","updateAllSelection",
	"filterByKeyword","selectFilteredByKeyword",
	"updateItemValue"];

module.exports = {
	ClassificationType: Reflux.createActions(names),
	Locations: Reflux.createActions(names),
	TargetPopulation: Reflux.createActions(names),
	DevelopmentObjectives: Reflux.createActions(names),
	SubActivityStatus: Reflux.createActions(names),
	SubImplementers: Reflux.createActions(names),
	PublicPrivatePartnership: Reflux.createActions(names),
	Crops: Reflux.createActions(names),
	EnvironmentalManagementPlans: Reflux.createActions(names),
	ContractType: Reflux.createActions(names),
	AorCor: Reflux.createActions(names),
	RapidImpact: Reflux.createActions(names),
	Dates: Reflux.createActions(names),
	ValueRange: Reflux.createActions(names),
	SubActivities: Reflux.createActions(names),
	applyFilters: Reflux.createAction()
};