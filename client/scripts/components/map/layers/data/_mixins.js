
module.exports = {

	componentDidUpdate: function() {
		options = {};
		if (!this.layer) {
			this.layer = this._createLayer(this.state.geoData, options);
		} else {
			this.props.getMap().removeLayer(this.layer);
			this.layer = this._createLayer(this.state.geoData, options);
		}

		this.layer.setOpacity(this.state.opacity,1);


		if (this.state.visible == false) {
			if (this.props.getMap().hasLayer(this.layer)) {
				this.props.getMap().removeLayer(this.layer)
			}

		} else if (!this.props.getMap().hasLayer(this.layer)) {
			this.layer.addTo(this.props.getMap());
		}
		this.layer.bringToFront();
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