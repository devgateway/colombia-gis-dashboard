
'use strict';


var Reflux = require('reflux');

var ArcgisLoginActions = require('../actions/arcgisLoginActions.js');

var API=require('../api/esri.js');
var Storage=require('../api/storage.js');

var _=require('lodash');

module.exports = Reflux.createStore({

	listenables: ArcgisLoginActions,
	
	onLoadUserProfile:function(profile,token){
		Storage.put('token',token);
		Storage.put('profile',profile);
		this.trigger(_.assign(this.state,{profile:profile,token:token}));
	},
	
	onLogin:function(token){
		API.self(token).then(function(profile){
			ArcgisLoginActions.loadUserProfile(profile,token);
		}.bind(this));
	},
	
	onLoginFailed:function(error){
		this.trigger(_.assign(this.state,{error:error}));
	},
	
	onLogOut:function(error){
		this.trigger(_.assign(this.state,{error:error}));
	},
	
	getInitialState: function() {

		var state=_.assign({},
				Storage.get('token')?{'token':Storage.get('token')}:{}, 
				Storage.get('profile')?{'profile':Storage.get('profile')}:{}
			)

		return (this.state = state);
	}

});