var request = require('request'); // npm install request

// generate a token with your client id and client secret
function getToken(callback){
  request.post({
    url: 'https://www.arcgis.com/sharing/rest/oauth2/token/',
    json:true,
    form: {
      'f': 'json',
      'client_id': 'Lcs7MzyMULXvbqEB',
      'client_secret': 'c9aae480e2aa47dc8e9c4ebb4d20b0d5',
      'grant_type': 'client_credentials',
      'expiration': '1440'
    }
  }, function(error, response, body){
    console.log(body.access_token);

    callback(body.access_token);
  });
}

getToken(function(token){
  // sample post to GeoEnrichment REST API
  // returns demographic information for a one mile radius around a point
  request.post({
    url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
    json:true,
    form: {
      f: 'json',
      token: token,
    }
  }, function(error, response, body){
    debugger;
    console.log(body);
  });
});