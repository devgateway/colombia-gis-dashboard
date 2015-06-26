var assign = require('object-assign');
var LayersAction = require('../actions/layersAction.js');
var LoadingAction = require('../actions/loadingActions.js');
var _ = require('lodash');

module.exports = {

	listenables: LayersAction,

	/*Listen  set property event comming from the layer control  */
	onChangeLayerValue: function(id, property, value, subProperty) {
		
		var prevLevel = this.state.level;
		var newLevel = this.state.level;
		var latestChange  = new Object();
		latestChange['latestChange'] = {'id':id, 'property':property, 'value':value, 'subProperty':subProperty};
		this.update(latestChange, {'silent': true});


		if (id === this._getLayerId()) {
			var assignable = new Object();
			assignable[property] = value;

			if (property == 'level') { //if level is changed or if layer is turned on we should load the data  
				newLevel = value;

				this.update(assignable, {
					'silent': true
				}); //update level on current state

				this._load(prevLevel, value, false); //load the new level, do  not trigger the state since it will be triggered by the load method  

			} else if (property == 'visible') {
				if (value == true && !this.state.geoData) {
					this.update(assignable, {
						'silent': true
					}); //update level on current state

					this._load(prevLevel, newLevel, true);
				} else {
					this.update(assignable);
				}
			} else if (property == 'color') {
				console.log('change color');
				console.log(value);
				var breaks=_.clone(this.state.breaks);
				breaks.breaks[subProperty].style.color = value;
				this.update({'breaks':breaks});
			} else if (property == 'break') {
				console.log('change breaks');
				console.log(value);
				var breaks=_.clone(this.state.breaks);
				breaks.breaks[subProperty].min = value[0];
				breaks.breaks[subProperty].max = value[1];
				this.update({'breaks':breaks}, {'silent': true});
			} else if (property == 'breakStyle') {
				console.log('change breakStyle');
				console.log(value);
				this.update({'breakStyle':value});
			} else if (property == 'radius') {
			 	console.log('change Radius!');
				var breaks=_.clone(this.state.breaks);
				breaks.breaks[subProperty].style.radius = value;
				this.update({'breaks':breaks});
			} else {
				this.update(assignable); //other case trigger the new state
			};
		}
	},


	_getDefState: function() {
		return {
			level: "departament",
			visible: true,
			opacity: 1,
			zIndex: 1,
			isLoaded: false,
			geoData: null,
		}

	},


	_load: function(prevLevel, newLevel, force) {
		if ((newLevel != prevLevel) || (force === true)) {
			LoadingAction.showLoading();
			this._loadGeoData(newLevel);
		} else {
			console.log('nothing to change here');
		}
	},

	/*Load GIS data by level*/
	_loadGeoData: function(newLevel) {
		if (newLevel == 'departament') {
			this._loadByDepartments(); //load data 
		} else if (newLevel == 'municipality') {
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
			assignable['isRestorePending'] = false;
			this.update(assignable);
		}
	},

	onTriggerFilterApply: function(data, shapesTrigger) {
		if (shapesTrigger && this._getLayerId()!="shapes") {
			return;
		} else {	
			this.update({
				filters: data
			}, {
				silent: true
			}); ///silent is tru since the change will be triggered by the load method
			this._load(null, this.state.level, true); //force re-load;
		}
	},

}