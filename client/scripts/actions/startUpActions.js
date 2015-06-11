var _=require('lodash');

var layerActions=require('./layersAction.js');

var filterActions=require('./filterActions.js')
var sharedActions=_.assign({},layerActions,filterActions);


module.exports =sharedActions;