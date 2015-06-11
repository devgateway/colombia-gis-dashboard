'use strict';
var Reflux = require('reflux');

var hideLoading  = Reflux.createAction();
var showLoading = Reflux.createAction();

module.exports = {
	hideLoading : hideLoading,
	showLoading : showLoading
};


