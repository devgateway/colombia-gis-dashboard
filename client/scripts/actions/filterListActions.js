'use strict';

var Reflux = require('reflux');

var names=["add","remove","load","clean"];

module.exports = {
	TargetPopulation: Reflux.createActions(names),
	Departaments: Reflux.createActions(names),
	Municipalities: Reflux.createActions(names),
};