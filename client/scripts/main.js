'use strict';

window.ESRI_CLIENT_ID = 'Lcs7MzyMULXvbqEB';
window.ESRI_AUTH2_URL = 'https://www.arcgis.com/sharing/oauth2/authorize?client_id=';
window.ESRI_SEARCH_URL = 'http://www.arcgis.com/sharing/rest/search?f=json&';
window.ESRI_SELF_URL = 'https://www.arcgis.com/sharing/rest/portals/self';
window.ESRI_PROXY_URL = 'http://esri-proxy.adstg.org/';


window.MAP_SAVE_URL = 'http://map-print.adstg.org/save';
window.MAP_UPDATE_URL = 'http://map-print.adstg.org/save/{{id}}';
window.MAP_LIST_URL = 'http://map-print.adstg.org/maps';
window.MAP_GET_URL = 'http://map-print.adstg.org/map/{{id}}';

window.MAP_PRINT_URL = 'http://map-print.adstg.org/print/{{id}}';
window.MAP_DOWNLOAD_URL = 'http://map-print.adstg.org/download/{{name}}';



window.DATA_PATH = './json-data';
window.MOCK_PATH = './mock-data';

if ((window.location.host.indexOf('localhost') > -1) || (window.location.host.indexOf('127.0.0.1') > -1)) {
	window.ESRI_PROXY_URL = 'http://localhost:3553';
	window.DATA_PATH = '/json-data';
	window.MOCK_PATH = '/mock-data'

	window.MAP_SAVE_URL = 'http://localhost:3033/save';
	window.MAP_UPDATE_URL = 'http://localhost:3033/save/{{id}}';
	window.MAP_LIST_URL = 'http://localhost:3033/maps';
	window.MAP_GET_URL = 'http://localhost:3033/map/{{id}}';

	window.MAP_PRINT_URL = 'http://localhost:3033/print/{{id}}';
	window.MAP_DOWNLOAD_URL = 'http://localhost:3033/download/{{name}}';


}



window.ESIR_USE_PROXY = true;
window.Message = require('./components/commons/message.jsx');

var React = require('react');
var Router = require('react-router');
var router = require('./router.jsx');
var _ = require('lodash');

var options = {
	lng: 'es',
	resGetPath: './locales/__lng__/__ns__.json',
	setJqueryExt: false,
	preload: ['es', 'en']
};



L.Path.prototype.hide = function(value) {
	this._path.style.display = 'none';
}

L.Path.prototype.show = function(value) {
	this._path.style.display = 'block';
}


L.Marker.prototype.hide = function() {
	this._icon.style.display = 'none'
}

L.Marker.prototype.show = function() {
	this._icon.style.display = 'block'
}


L.FeatureGroup.prototype.setOpacity = function(fill, stroke) {
	_.map(this._layers, function(l) {
		l.setOpacity(fill, stroke); // (Set opacity to all elements layers);
	})
}

L.FeatureGroup.prototype.show = function(value) {
	_.map(this._layers, function(l) {
		l.show()
	})
}


L.FeatureGroup.prototype.hide = function(value) {
	_.map(this._layers, function(l) {
		l.hide()
	})
}
L.Path.prototype.setOpacity = function(fill, stroke) { //add setOpacity method to l.paths

	if (this.setStyle) { //paths
		this.setStyle({
			'fillOpacity': fill,
			'opacity': stroke,
		});
	} else if (this.setOpacity) {
		layer.setOpacity(fill)
	}

}


window.i18n.init(options, function(t) {
	router.run(function(Handler, state) {
		React.render(React.createElement(Handler, state), document.getElementById('app-wrapper'));

	});
});