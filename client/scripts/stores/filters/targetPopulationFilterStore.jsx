'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var Util = require('../../api/util.js')
var FilterListStoreMixin = require('./filterListStoreMixins.js');

/*

  index: 2,
    type: 'list',
    label: 'filters.targetPopulation',
    modes: ['basic'],
    param: 'tp',
    apiEndPoint: window.DATA_PATH + '/targetPopulation.json'
 */


var store=Reflux.createStore({

	mixins: [FilterListStoreMixin],

});


module.exports 