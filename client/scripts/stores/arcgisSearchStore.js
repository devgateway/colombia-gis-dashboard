'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var Util= require('../api/util.js');
var API=require('../api/esri.js');
var ObjectBuilder=require('../api/objectBuilder.js');
var _ = require('lodash');

var storedState;


function flagToTrue(obj,flag){
	obj[flag]=true;
	return obj
}
function flagToFalse(obj,flag){
	obj[flag]=false;
	return obj
}

function findById(source,id){
	return _.findWhere(source,{'id':id});
}

function writeLog(message){
	console.log('arcgisLayerStore:'+message);
}

module.exports = Reflux.createStore({

	listenables: ArcgisLayersActions,

	onSearchCompleted:function(data,options){
		if (data){
			if(options.append){
				_.assign(data,{'results':this.appendSearchResults(data.results)});
			};
			this.update({'search':data});
		}
	},

	appendSearchResults:function(items){
		return this.state.search.results.concat(items);	
	},

	onSearch:function(options){
		API.findLayers(options).then(function(data){
			ArcgisLayersActions.search.completed(data,options);
		}).fail(function(){
			writeLog('Error loading data ...');
			_.assign(this.state,{'error':'Can\'t load data please check your network connection'});
			this.trigger(this.state);

		}.bind(this));
	},

	onRestoreLayerButton:function(id){	
		flagToFalse(findById(this.state.search.results,id),'loaded');	
		this.trigger(this.state);
	},
	
	
	loadLayerFailed:function(error,code,options){
		
		this.state.error={'message':error,'code':code}
		flagToTrue(findById(this.state.search.results,options.id),'error');	
		this.trigger(this.state);
		writeLog('Error '+error);
	},

	loadLayerCompleted:function(layer,options){
		
		writeLog('Layer is loading  setting loading=true');
		flagToTrue(findById(this.state.search.results,options.id),'loaded');
		this.trigger(this.state);
		 
		ArcgisLayersActions.addLayerToMap(ObjectBuilder.buildLayerInfo(layer,options)); //tell to layer sotre to add it to his list 
	},	

	update: function(assignable, options) {
		options = options || {};
		//flagToFalse(assignable,'error');
		this.state = assign(this.state, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	},

	getInitialState: function() {
		if (!this.state){
			this.state= storedState || {search:{}};
		}	
		return this.state;
	}

});



