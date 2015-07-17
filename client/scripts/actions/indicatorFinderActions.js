'use strict';

var Reflux = require('reflux');


module.exports = { 
	
	updateQuery: Reflux.createAction(),

 	updateIndicator:Reflux.createAction(),

	load: Reflux.createAction(),

	find: Reflux.createAction(),

	updatePage: Reflux.createAction()
};