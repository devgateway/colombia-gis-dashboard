var assign = require('object-assign');
var LayersAction = require('../actions/layersAction.js');
var LoadingAction = require('../actions/loadingActions.js');
var _ = require('lodash');
var LegendStore = require('./legendStore.js');

module.exports = {

	listenables: LayersAction,

	/*Listen  set property event comming from the layer control  */
	onChangeLayerValue: function(id, property, value, subProperty) {
		
		var prevLevel = this.state.level;
		var newLevel = this.state.level;

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
				LegendStore._setLegendVisibility(id, value);
			} else if (property == 'color') {
				console.log('change color');
					console.log(value);
				var breaks=_.clone(this.state.breaks);
				breaks.breaks[subProperty].style.color = value;
				this.update({'breaks':breaks});
			}
			 else if (property == 'radius') {
			 	
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
			LoadingAction.updateLoading();
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

	_setGeoData: function(data) {	
		this.update({
			geoData: data,
			isLoaded: true
		}); //trigger geodata changes;
		LoadingAction.updateLoading();			
	},

	update: function(assignable, options) {
		options = options || {};
		this.state = assign(this.state, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	},

	onTriggerFilterApply: function(data) {
		this.update({
			filters: data
		}, {
			silent: true
		}); ///silent is tru since the change will be triggered by the load method
		this._load(null, this.state.level, true); //force re-load;
	},

}