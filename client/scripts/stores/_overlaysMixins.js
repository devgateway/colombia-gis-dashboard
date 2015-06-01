var LayersAction = require('../actions/layersAction.js');

module.exports = {

	listenables: LayersAction,

	/*Listen  set property event comming from the layer control  */
	onChangeLayerValue: function(id, property, value) {
		debugger;
		if (id === this._getLayerId()) {
			var assignable = new Object();
			assignable[property] = value;

			if (property == 'level') { //if level is changed or if layer is turned on we should load the data  
				this.update(assignable, {
					'silent': true
				}); //update level on current state
				this._load(value); //load the new level, do  not trigger the state since it will be triggered by the load method  
			} else if (property == 'visible') {
				if (value == true && !this.state.geoData) {
					this.update(assignable, {
						'silent': true
					}); //update level on current state

					this._load(null, true);
				} else {
					this.update(assignable);
				}


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


	_load: function(newLevel, force) {
		newLevel = newLevel || this.state.level

		if ((newLevel != this.state.level) || (force === true)) {
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
	},

	onTriggerFilterApply: function(data) {
		this.update({
			filters: data
		}, {
			silent: true
		}); ///silent is tru since the change will be triggered by the load method
		_.load(null, true); //force re-load;
	},

}