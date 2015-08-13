'use strict';

var Reflux = require('reflux');


module.exports = { 
	getActivitiesByProgram: Reflux.createAction(),
	updateQuery: Reflux.createAction(),
 	updateIndicator:Reflux.createAction(),
	load: Reflux.createAction(),
	find: Reflux.createAction(),
	updatePage: Reflux.createAction()
};