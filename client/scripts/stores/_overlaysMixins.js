'use strict';
var assign = require('object-assign');
var LoadingAction = require('../actions/loadingActions.js');
var FilterStore = require('./filters/filterStore.js');
var _ = require('lodash');

module.exports = {

	init: function() {		
		this.listenTo(FilterStore, '_applyFilters');
	},


	/*Listen  set property event comming from the layer control  */
	onChangeLayerValue: function(id, property, value, subProperty) {
		console.log(id);
	
		if (id === this._getLayerId()) {
			var assignable = {};
			assignable[property] = value;

			if (property === 'level') { //if level is changed or if layer is turned on we should load the data  				
				this.update(assignable, {
					'silent': true,
					'subProperty':subProperty
				}); //update level on current state
				this._load(value); //load the new level, do  not trigger the state since it will be triggered by the load method  

			} else if (property === 'visible') {
				this.update(assignable);
				if (value == true && !this.state.geoData) {
					if (id === 'indicators'){
						this._loadIndicatorsGeoData(this.state.level);
					} else {
						this._load(this.state.level);
					}								
				}

			} else if (property === 'color') {
				var breaks=_.clone(this.state.breaks);
				breaks.breaks[subProperty].style.color = value;
				this.update({'breaks':breaks,'subProperty':subProperty});

			} else if (property === 'break') {
				var breaks=_.clone(this.state.breaks);
				breaks.breaks[subProperty].min = value[0];
				breaks.breaks[subProperty].max = value[1];
				this.update({'breaks':breaks,'subProperty':subProperty});
			
			} else if (property === 'breakStyle') {
				this.update({'breakStyle':value,'subProperty':subProperty});
			
			} else if (property === 'radius') {
				var breaks=_.clone(this.state.breaks);
				breaks.breaks[subProperty].style.radius = value;
				this.update({'breaks':breaks,'subProperty':subProperty});
			
			} else {
				this.update(assignable); //other case trigger the new state
			}
		}
	},


	_getDefState: function() {
		var id=		this._getLayerId();
		var title=	this._getTitle();
		var subtitle=	this._getSubtitle();
		
		return {
			level: 'departament',
			visible: true,
			opacity: 1,
			zIndex: 1,
			isLoaded: false,
			geoData: null,
			id:id,
			title:title,
			subtitle:subtitle
		};
	},

	_load: function(newLevel) {
		LoadingAction.showLoading();
		if (newLevel === 'departament') {
			this._loadByDepartments(); //load data 
		} else if (newLevel === 'municipality') {
			this._loadByMuncipalities();
		}
	},

	_setGeoData: function(data, dataStats) {	
		this.update({
			geoData: data,
			geoStats: dataStats,
			isLoaded: true
		}); 
		LoadingAction.hideLoading();
		this._updateSavedData();			
	},

	_updateSavedData: function() {
		if(this.state && this.state.isRestorePending){
			var assignable = this.state.dataToRestore;
			assignable.isRestorePending = false;
			this.update(assignable);
		}
	},

	_applyFilters: function(data, specialTriggerFrom) {
		if (specialTriggerFrom && this._getLayerId()!==specialTriggerFrom) {
			return;
		} else {
			this.update({
				filters: data
			}, {
				silent: true
			}); ///silent is tru since the change will be triggered by the load method
			this._load(this.state.level); //force re-load;
		}
	},
};