'use strict';

var React = require('react');
var Reflux = require('reflux');


  var clientID = 'Lcs7MzyMULXvbqEB';
  var accessToken;
  var callbacks = [];
  var callbackPage = document.location;

function oauth(callback) {
    if(accessToken){
      callback(accessToken);
    } else {
      callbacks.push(callback);
      window.open('https://www.arcgis.com/sharing/oauth2/authorize?client_id='+clientID+'&response_type=token&expiration=20160&redirect_uri=' + window.encodeURIComponent(callbackPage), 'oauth', 'height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes');
    }
  };

 window.oauthCallback = function(token) {
    L.esri.get('https://arcgis.com/sharing/rest/portals/self', {
      token: token
    }, function(error, response){
      authPane.innerHTML = '<label>Hi '+response.user.username+' your token is <input value="'+token+'"></label>';
    });
  };

module.exports  = React.createClass({
  componentWillMount:function(){
    
  },

  render: function() {
     
    return (
        <div className="arcgis-sig-in">
        <button onClick={oauth()}>AGOL LogIn</button>
      </div>
      );
  }

});
