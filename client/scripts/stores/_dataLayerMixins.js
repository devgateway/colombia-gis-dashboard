var LayersAction = require('../actions/layersAction.js');

module.exports = {

	listenables: LayersAction,

	/*Listen  set property event comming from the layer control  */
	onChangeLayerValue: function(property, value) {
		var assignable = new Object();
		assignable[property] = value;

		if (property == 'level') {
			this._load(value); //load the new level, do  not trigger the state since it will be triggered by the load method  
		} else {
			this.update(assignable); //other case trigger the new state
		};
	},

	
	_getDefState:function(){
		return {
			level: "departament",
			visible: true,
			opacity: 1,
			zIndex: 1,
			isLoaded:false,
			geoData: {},
		}

	},


	_load: function(newLevel, force) {
		debugger;
		if ((newLevel != this.state.level)||(force===true)) {
			this._loadGeoData();
		} else {
			console.log('nothing to change here');
		}
	},


	_setGeoData:function(data){
		this.update({geoData: data,isLoaded:true});//trigger geodata changes;
	},

	onTriggerFilterApply: function(data) {
		this.update({filters: data},{silent:true}); ///silent is tru since the change will be triggered by the load method
		_.load(null,true); //force re-load;
	},

}