'use strict';

var React = require('react');
var Router = require('react-router');

var router = require('./router.jsx');



var options ={ 
	lng: "en" ,  
	resGetPath: './../locales/__lng__/__ns__.json',
	setJqueryExt: false,
	preload: ['es', 'en']
};

i18n.init(options, function (t) {

	router.run(function(Handler, state) {
		React.render(React.createElement(Handler, state), document.getElementById('app-wrapper'));
	});
});

