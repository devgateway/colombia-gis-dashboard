module.exports = {

	componentWillUpdate: function(props, newState) {
		options = {};

		if (!this.layer) {
			this.layer = this._createLayer(newState.geoData, options);
		}

		if (this.state.geoData != newState.geoData) {
			this.props.getMap().removeLayer(this.layer);
			this.layer = this._createLayer(newState.geoData, options);
		}

		this.layer.setOpacity(newState.opacity);

		if (newState.visible == false) {
			if (this.props.getMap().hasLayer(this.layer)) {
				this.props.getMap().removeLayer(this.layer)
			}

		} else if (!this.props.getMap().hasLayer(this.layer)) {
			this.layer.addTo(this.props.getMap());
		}

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