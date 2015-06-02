var LegendActions = require('../../../../actions/legendActions.js');

module.exports = {

	componentDidUpdate: function(prev, prevState) {
		debugger;
		options = {};
		var newState=this.state;

		if (!this.layer && newState.geoData) {
			this.layer = this._createLayer(newState.geoData, options);
			LegendActions.getBaseMapLegends();
		}
			/*I can change values only if the layer was created in */
		if (this.layer) {
			if (newState.geoData != prevState.geoData) {
				this.props.getMap().removeLayer(this.layer);
				this.layer = this._createLayer(newState.geoData, options);
			}


			if (newState.breaks != prevState.breaks) {
				this.layer.eachLayer(function(l) {
					l.setStyle(this.getStyle(l.feature));
				}.bind(this));
			}

			this.layer.setOpacity(newState.opacity, 1);
			if (newState.visible == false) {
				if (this.props.getMap().hasLayer(this.layer)) {
					this.props.getMap().removeLayer(this.layer)
				}

			} else if (!this.props.getMap().hasLayer(this.layer)) {
				this.layer.addTo(this.props.getMap());
			}
		}
		//this.layer.bringToFront();
	},

	_createLayer: function(features) {
		console.log('map->layers>: Add Layer to Map');

		var layer = L.geoJson(features, {

			onEachFeature: this._onEachFeature,

			pointToLayer: this._pointToLayer,

			filter: this._filter,

			style: this._style
		});

		//layer.bringToFront();
		return layer;
	},


}