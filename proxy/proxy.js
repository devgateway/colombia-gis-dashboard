var http = require('http');
var url = require('url');
var _ = require('lodash');
var request = require('request');
var Q = require('q');


var CONTROL_ORIGIN_HEADER = 'Access-Control-Allow-Origin';
var CONTROL_ORIGIN_HEADER_VALUE = '*'; //this must be changed to allow only known domains
var CONTROL_HEADERS_HEADER = 'Access-Control-Allow-Headers';
var CONTROL_HEADERS_HEADER_VALUE = 'X-Requested-With'
var ESRI_OAUTH2_URL = 'https://www.arcgis.com/sharing/rest/oauth2/token/';

module.exports = function (options) {

     options.port= options.port || 3553; //if port is not set default will be 3553

     /*Main Method*/
     this.init = function () {
        this.getToken(options)
            .then(this.listen.bind(this)) //start http server
            .fail(function (error) {
                this.log('Failed to initialize prox ' + error);
            });
        };

        this.refreshToken=function(){
            console.log('refresh application token'+ new Date());
        }

        this.resetRefresInterval=function(){
            var now=new Date();
            var time=now.getTime();

            var expirationDate = new Date();
            var refreshDate =  new Date();

            var minutes = options.expiration_time ;  //ensure we refresh ;
            var timeout=   ((minutes -(minutes / 3))  * 60 * 1000); //update token when 2/3   expiration time was consumed    

            expirationDate.setTime( time + (minutes * 60 * 1000)); //token expiration date 
            refreshDate.setTime( time + timeout); 
           
            setTimeout( this.refreshToken.bind(this),timeout); 

            console.log('Token base date is  '+ now);
            console.log('Token expiration will expires on '+ expirationDate);
            console.log('Token  will refresh on '+refreshDate);
         }

         /*Get oauth2 token*/
         this.getToken = function () {


            var deferred = Q.defer();
            var data = {'f': 'json', 'client_id': options.client_id, 'client_secret': options.client_secret, 'grant_type': 'client_credentials', 'expiration': options.expiration_time};
            this.resetRefresInterval();
            request.post({
                url: ESRI_OAUTH2_URL,
                json: true,
                form: data
            }, function (error, response, body) {
                if (error) {
                    deferred.reject(err);
                }else {

                 deferred.resolve(_.assign(options, {'access_token': body.access_token})); //add access token to options



             }
         });

            return deferred.promise;
        }

        /*Start Server */
        this.listen = function (options) {

            console.log('Starting proxy server at ' + options.port + (options.use_credentials) ? ' using app token ' + options.access_token : '');
            http.createServer(
                function (pReq, pResp) {
                    var target = pReq.url.substring(pReq.url.indexOf('?') + 1);
                    var targetUrl = url.parse(target, true);

                    /*If user is not logged in we will use the application token*/
                    if (!targetUrl.query.token && options.use_credentials) {
                        console.log('..................Making new request using application token ...........................');
                        target = target + '&token=' + options.access_token;
                        targetUrl = url.parse(target, true);
                    } else {
                        console.log('..................Making new request using user\'s token ...........................');
                    }
                    /*Collect new request options*/
                    var reqOptions = {
                    url: targetUrl, //destination url
                    method: pReq.method, //use same method as source
                    followRedirect: true,  //followRedirect - follow HTTP 3xx responses as redirects
                    followAllRedirects: true,   // follow non-GET HTTP 3xx responses as redirects
                    jar: true, // remember cookies for future use, when the token is present on the query string ESRI respond a redirect to the same url but adding the oauth cookies we need to preserve cookies and send it back to the redirected location
                    gzip: true //allow gzip encoding
                };

                //make request
                this.request(reqOptions).then(
                    function (response) {
                      //write response headers 
                      pResp.writeHead(200,this.normalizeHeaders(response));
                         //pipe rsults  and end response;
                         response.pipe(pResp);
                     }.bind(this)).fail(function (error) {
                        console.log(error);
                    });
                 }.bind(this)).listen(options.port);
}

/*Request url*/
this.request = function (options) {
    var deferred = Q.defer();
    request(options).on('error', function (err) {
        deferred.reject(err);
    }).on('response', function (response) {
                deferred.resolve(response); //add access token to options
            });

    return deferred.promise;
}

/*Get reponse headers */
this.normalizeHeaders = function (response) {
    var headers = response.headers;
    var normalizedHeaders = {};
    _.keysIn(headers).map(function (key) {
        var standarName = key.split('-').map(function (t) {
            return t.charAt(0).toLocaleUpperCase() + t.slice(1)
        }).join('-');
        normalizedHeaders[standarName] = headers[key];
    });
    normalizedHeaders[CONTROL_ORIGIN_HEADER] = CONTROL_ORIGIN_HEADER_VALUE;
    normalizedHeaders[CONTROL_HEADERS_HEADER] = CONTROL_HEADERS_HEADER_VALUE;
    return normalizedHeaders;
}

}
