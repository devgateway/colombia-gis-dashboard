'use strict';

var React = require('react');
var Reflux = require('Reflux');

var ArcgisLoginStore = require('../../stores/arcgisLoginStore.js');

module.exports =React.createClass({

	mixins: [Reflux.connect(ArcgisLoginStore, 'login')],
	
	render:function(){		
		var html;
		if (this.state.login.profile &&  this.state.login.profile.user){
			html=(<a href="#">{this.state.login.profile.user.username} <span>|</span></a> );
		} else {
			html=(<p></p>)
		}
		return html;
	}
});