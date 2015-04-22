var http = require('http');
var https = require('https');
var url = require('url');
var _ = require('lodash');
var request = require('request');
var Q = require('q');


var CONTROL_ORIGIN_HEADER = 'Access-Control-Allow-Origin';
var CONTROL_ORIGIN_HEADER_VALUE = 'http://devgateway.github.io'//  //this must be changed to allow only known domains
var CONTROL_HEADERS_HEADER = 'Access-Control-Allow-Headers';
var CONTROL_HEADERS_HEADER_VALUE = 'X-Requested-With'
var ESRI_OAUTH2_URL = 'https://www.arcgis.com/sharing/rest/oauth2/token/';

var knownServers = [
{host: 'services.arcgisonline.com', isTokenBasedSecurity: false},
{host: 'server.arcgisonline.com', isTokenBasedSecurity: false},
{host: 'server.arcgisonline.com', isTokenBasedSecurity: false},
{host: 'arcgis.com', isTokenBasedSecurity: true}
];

module.exports = function (options) {

    options.port = options.port || 3553; //if port is not set default will be 3553
    /*Everything start here */
    this.init = function () {
        console.log('Allowed origins: ' +CONTROL_ORIGIN_HEADER_VALUE);
        this.getToken(options)  //generate an esri
            .then(this.listen.bind(this)) //start http server
            .fail(function (error) {
                this.log('Failed to initialize prox ' + error);
            });
        };

        this.getServerInfo = function (url) {
            var deferred = Q.defer();
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    deferred.resolve(JSON.parse(body));
                } else {
                    console.log('Got an error ' + error);
                    deferred.reject(error);
                }
            });
            return deferred.promise;
        }

        this.requireToken = function (target) {
            var deferred = Q.defer();
            var found = false;
            var server = _.findWhere(knownServers, { host: target.host.replace('www.', '')});

            if (server) {
                deferred.resolve(server.isTokenBasedSecurity);
            } else {
                console.log('I don\'t know about this server let check if it supports token');

            var uri = target.href.substring(0, target.href.indexOf('rest') + 5) + 'info?f=json';     //info end point it doesn't work for sharing server I have to

            this.getServerInfo(uri).then(function (serverInfo) {
                console.log('Adding new server to the known server list ')

                knownServers.push({'isTokenBasedSecurity': serverInfo.authInfo.isTokenBasedSecurity, 'host': target.host.replace('www.', '')});
                console.log('Known server list size is ' + knownServers.length);

                //resolve promise
                deferred.resolve(serverInfo.authInfo.isTokenBasedSecurity);

            }).fail(function (error) {
                console.log('Got an error ' + error);
                deferred.reject(error);
            })
        }

        return deferred.promise;
    }

    this.resetRefreshInterval = function () {
        var now = new Date();
        var time = now.getTime();
        var expirationDate = new Date();
        var refreshDate = new Date();
        var minutes = options.expiration_time;  //ensure we refresh ;
        var timeout = ((minutes - (minutes / 3)) * 60 * 1000); //update token when 2/3   expiration time was consumed

        expirationDate.setTime(time + (minutes * 60 * 1000)); //token expiration date
        refreshDate.setTime(time + timeout);
        setTimeout(this.refreshToken.bind(this), timeout);
        console.log('Token base date is  ' + now);
        console.log('Token expiration will expires on ' + expirationDate);
        console.log('Token  will refresh on ' + refreshDate);
    }

    this.refreshToken = function () {
        console.log('..Keep an eye here token will be updated ...')
        this.getToken().then(function () {
            console.log('...token was updated, new token is' + options.access_token);
        })
    }


    this.getToken = function () {
        var deferred = Q.defer();
        if (options.use_credentials) {
            var data = {'f': 'json', 'client_id': options.client_id, 'client_secret': options.client_secret, 'grant_type': 'client_credentials', 'expiration': options.expiration_time};

            this.resetRefreshInterval();// start over the refrest timer

            request.post({
                url: ESRI_OAUTH2_URL,
                json: true,
                form: data
            }, function (error, response, body) {
                if (error) {
                    deferred.reject(error);
                } else {
                    if (body.error) {
                        console.log('something didn\'t go well so now ??' + body.error);
                    }
                    console.log('Got a new token ...')
                    deferred.resolve(_.assign(options, {'access_token': body.access_token})); //add access token to options
                }
            });
        } else {
            deferred.resolve(); //use_credentials is false we dont't need a token

        }
        return deferred.promise;
    }

    this.isOriginAllowed=function(origin){

        return (CONTROL_ORIGIN_HEADER_VALUE.indexOf(origin) > -1);
    }

    /*Start Server */
    this.listen = function () {
        console.log('Starting proxy server at ' + options.port + ( (options.use_credentials === true) ? ' application token is  ' + options.access_token : ''));
        http.createServer(
            function (pReq, pResp) {
                var target = pReq.url.substring(pReq.url.indexOf('?')+1);
                var targetUrl = url.parse(target, true);


                if (!this.isOriginAllowed(pReq.headers.origin)){
                    console.log('Not allowed origin');
                    pResp.statusCode = 403,
                    pResp.statusMessage = 'You are not allowed';
                    pResp.end();
                }else if (targetUrl.host == null && ( targetUrl.pathname && targetUrl.pathname.indexOf('favicon')>-1 )) {
                    console.log('Wrong request');
                    pResp.statusCode = 500,
                    pResp.end();
                } else {
                    console.log(targetUrl.href);
                    this.requireToken(targetUrl).then(
                        function (useTokens) {
                            if (useTokens) {
                                /*If user is not logged in we will use the application token*/
                                if (!targetUrl.query.token && options.use_credentials === true) {
                                    console.log('..................Making new request using application token ...........................');
                                    target = target + '&token=' + options.access_token;
                                    targetUrl = url.parse(target, true);
                                } else {
                                    console.log('..................Making new request using user\'s token ...........................');
                                }
                            } else {
                                console.log('Token is not needed for this server ');
                                delete targetUrl.query.token;
                                delete targetUrl.query.search;
                                targetUrl = url.format({protocol: targetUrl.protocol, hostname: targetUrl.hostname, query: targetUrl.query, pathname: targetUrl.pathname })
                            }


                            /*Collect new request options*/
                            var reqOptions = {
                                url: targetUrl, //destination url
                                method: pReq.method, //use same method as source
                                followRedirect: true,  //followRedirect - follow HTTP 3xx responses as redirects
                                followAllRedirects: true,   // follow non-GET HTTP 3xx responses as redirects
                                jar: true,//, remember cookies for future use, when the token is present on the query string ESRI respond a redirect to the same url but adding the oauth cookies we need to preserve cookies and send it back to the redirected location
                                headers: [pReq.headers['accept'], pReq.headers['accept-encoding'], pReq.headers['accept-language'], pReq.headers['connection'], pReq.headers['content-type']] //send client headers

                            };
                            //Make rquest and pipe results
                            this.request(reqOptions, pResp);

                        }.bind(this)
                    ); //end then if requiere token
}
}.bind(this)
).listen(options.port);
}

/*Request url*/
this.request = function (options, pResp) {
    request(options).on('error', function (err) {
        pResp.statusCode     = 500;
        pResp.statusCode = 500;
        pResp.end()
        console.log('Ups got an error!');
        console.log(err);
    }).on('response', function (response) {
        /*response headers*/
        pResp.writeHead(200, this.normalizeHeaders(response));
    }.bind(this)).pipe(pResp);

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
