'use strict';

var React = require('react');
var Reflux = require('reflux');
var accessToken;
var callbacks = [];
var callbackPage =window.location.protocol+'//'+ window.location.host+'/#/arcLogin?';

var ArcgisLoginActions=require('../../actions/arcgisLoginActions.js');
var ArcgisLoginStore = require('../../stores/arcgisLoginStore.js');

module.exports  = React.createClass({

  mixins: [Reflux.connect(ArcgisLoginStore, 'login')],

  getDefaultProps:function(){
    //expiration should be in mminutes
    return {'expiration':window.ESRI_TOKEN_EXPIRATION_TIME,'height':580,'width':420};
  },

  componentWillMount:function(){  
   window.oauthCallback = function(token) {this.loginSuccessful(token)}.bind(this);    
 },

 loginSuccessful:function(token){
   ArcgisLoginActions.login(token);
 },

 oauth:function(callback) {
  window.open(window.ESRI_AUTH2_URL+window.ESRI_CLIENT_ID+'&response_type=token&expiration='+this.props.expiration+'&redirect_uri='+ window.encodeURIComponent(callbackPage), 'oauth', 
    'height='+this.props.height+',width='+this.props.width+',menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes');
},

logOut:function(){
  ArcgisLoginActions.logOut();
},

render: function() {
  return (
    <div className="arcgis-sig-in">
    {(!this.state.login.token?<button onClick={this.oauth}>AGOL Login</button>:<button onClick={this.logOut}>AGOL LogOut</button>)}
    </div>
    );
}

});
