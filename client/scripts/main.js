'use strict';

window.ESRI_CLIENT_ID = 'Lcs7MzyMULXvbqEB';
window.ESRI_AUTH2_URL = 'https://www.arcgis.com/sharing/oauth2/authorize?client_id=';
window.ESRI_SEARCH_URL = 'http://www.arcgis.com/sharing/rest/search?f=json&';
window.ESRI_SELF_URL='https://www.arcgis.com/sharing/rest/portals/self';

window.ESRI_PROXY_URL = 'http://localhost:3553'
window.ESIR_USE_PROXY = true;
//var Message=require('./components/commons/message.jsx');	
window.Message=require('./components/commons/message.jsx');
var React = require('react');
var Router = require('react-router');
var router = require('./router.jsx');

var options = {
	lng: 'en',
	resGetPath: './locales/__lng__/__ns__.json',
	setJqueryExt: false,
	preload: ['es', 'en']
};

window.i18n.init(options, function (t) {
	router.run(function (Handler, state) {
		React.render(React.createElement(Handler, state), document.getElementById('app-wrapper'));
	});
});