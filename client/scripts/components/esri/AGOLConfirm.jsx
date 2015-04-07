'use strict';

var React = require('react');
var Reflux = require('Reflux');
module.exports =React.createClass({
	componentWillMount:function(){
		var match;
		if(window.location.hash && (match=window.location.hash.match(/&access_token=([^&]+)/))) {
			if(window.opener && window.opener.parent) {
				window.opener.parent.oauthCallback(match[1]);
			} else {
				window.parent.oauthCallback(match[1]);
			}
			window.close();

		}	
	},
	render:function(){
		return null;
	}
});