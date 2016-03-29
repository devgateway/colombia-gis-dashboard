'use strict';

window.ESRI_CLIENT_ID = 'Lcs7MzyMULXvbqEB';
window.ESRI_AUTH2_URL = 'https://www.arcgis.com/sharing/oauth2/authorize?client_id=';
window.ESRI_SEARCH_URL = 'http://www.arcgis.com/sharing/rest/search?f=json&';
window.ESRI_SELF_URL = 'https://www.arcgis.com/sharing/rest/portals/self';
window.ESRI_PROXY_URL = 'http://localhost:3553/';//'http://esri-proxy.adstg.org/';

window.MAP_SAVE_URL = 'http://test.monitor.net.co/gisservice/GisService.svc/MapSave/Json';
window.MAP_DELETE_URL = 'http://test.monitor.net.co/gisservice/GISService.svc/MapDelete?MapId={{id}}';
window.MAP_UPDATE_URL = 'http://test.monitor.net.co/gisservice/GISService.svc/MapUpdate/Json';
window.MAP_LIST_URL = 'http://test.monitor.net.co/gisservice/GISService.svc/GetMaps/Json';
window.MAP_GET_URL = 'http://test.monitor.net.co/gisservice/GISService.svc/MapById?MapId={{id}}';

window.MAP_PDF_URL = 'http://map-print.adstg.org/pdf/{{id}}';
window.MAP_IMAGE_URL = 'http://map-print.adstg.org/png/{{id}}';
window.MAP_DOWNLOAD_URL = 'http://map-print.adstg.org/download/{{name}}';

window.DATA_API_URL = 'http://test.monitor.net.co';

window.DATA_PATH = './json-data';
window.MOCK_PATH = './mock-data';

window.LIST_SOURCE_SUBIMPLEMENTERSTYPE = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/SubImplementersType/Json';
window.LIST_SOURCE_SUBIMPLEMENTERS = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/SubImplementers/Json';
window.LIST_SOURCE_DEPARTAMENTS = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/DepartmentsList/Json';
window.LIST_SOURCE_MUNICIPALITIES = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/MunicipalitiesList/Json';
window.LIST_SOURCE_CLASSIFICATIONTYPE1 = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/ClasificationType/Json';
window.LIST_SOURCE_CLASSIFICATIONTYPE2 = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/ClasificationSubType/Json';
window.LIST_SOURCE_CLASSIFICATIONTYPE3 = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/ClasificationLevel3/Json';
window.LIST_SOURCE_CLASSIFICATIONTYPE4 = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/ClasificationLevel4/Json';
window.LIST_SOURCE_CLASSIFICATIONTYPE5 = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/ClasificationLevel5/Json';
window.LIST_SOURCE_AORCORNAMES = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/AORs/Json';
window.LIST_SOURCE_CONTRACTTYPES = './json-data/contractTypes.json';
window.LIST_SOURCE_CROPS = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/CropsList/Json';
window.LIST_SOURCE_DOS = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/DOList/Json';
window.LIST_SOURCE_TYPESENVIROMENTALPLANS = './json-data/typesEnviromentalPlans.json';
window.LIST_SOURCE_PPP = './json-data/publicPrivatePartnership.json';
window.LIST_SOURCE_RAPIDIMPACT = './json-data/rapidImpact.json';
window.LIST_SOURCE_SUBACTIVITYSTATUS = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/SubActivityStatus/Json';
window.LIST_SOURCE_SUBACTIVITYLIST = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/SubActivitiesList/Json';
window.LIST_SOURCE_TARGETPOPULATION = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/TargetPopulation/Json';
window.LIST_SOURCE_PROGRAMS = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/DOList/Json';
window.LIST_SOURCE_FUNDINGTYPE = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/fundingType/Json';
window.LIST_SOURCE_INDICATORTYPE = 'http://test.monitor.net.co/gisservice/GisService.svc/Filters/IndicatorTypes/Json';




if ((window.location.host.indexOf('localhost') > -1) || (window.location.host.indexOf('127.0.0.1') > -1)) {
	window.MAP_PDF_URL = 'http://localhost:3033/pdf/{{id}}';
	window.MAP_IMAGE_URL = 'http://localhost:3033/png/{{id}}';
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
};

L.Path.prototype.show = function(value) {
	this._path.style.display = 'block';
};


L.Marker.prototype.hide = function() {
	this._icon.style.display = 'none'
};

L.Marker.prototype.show = function() {
	this._icon.style.display = 'block'
};


L.FeatureGroup.prototype.setOpacity = function(fill, stroke) {
	_.map(this._layers, function(l) {
		l.setOpacity(fill, stroke); // (Set opacity to all elements layers);
	})
};

L.FeatureGroup.prototype.show = function(value) {
	_.map(this._layers, function(l) {
		l.show()
	})
};

L.FeatureGroup.prototype.hide = function(value) {
	_.map(this._layers, function(l) {
		l.hide()
	})
};

L.Path.prototype.setOpacity = function(fill, stroke) { //add setOpacity method to l.paths

	if (this.setStyle) { //paths
		this.setStyle({
			'fillOpacity': fill,
			'opacity': stroke,
		});
	} else if (this.setOpacity) {
		this.setOpacity(fill);
	}
};


$.ajaxSetup({
  beforeSend: function() {
        console.log('AJAX BEFORE SENT');
    },
});


window.i18n.init(options, function(t) {
	router.run(function(Handler, state) {
		React.render(React.createElement(Handler, state), document.getElementById('app-wrapper'));

	});
});