'use strict';
var Reflux = require('reflux');
var api = require('../api/layers.js');




var changeBounds  = Reflux.createAction({children: ['user']});
var changeBaseMap = Reflux.createAction();


module.exports = {
	changeBounds : changeBounds,
	changeBaseMap : changeBaseMap
};





