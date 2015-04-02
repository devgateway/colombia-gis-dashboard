'use strict';
var request = require('reqwest');
var _=require('lodash');
var Storage=require('./storage.js');

function logFailure(err, message) {
    console.error(message);
    console.error(err);
}

module.exports = {

    getTargetURL: function (url) {
        return ((window.ESIR_USE_PROXY === true) ? window.ESRI_PROXY_URL + '?' + url:url);
    },

    findLayers: function (options) {
        var url = this.getTargetURL(window.ESRI_SEARCH_URL + encodeURI(this.buildArcGIsQuery(options)));
        return request({
            url: url,
            type: 'json',
            method: 'get',
            crossOrigin: true
        }).fail(logFailure);
    },

    /*
        Get user profile information;
        */

        self:function(token){
        
            var url = this.getTargetURL(window.ESRI_SELF_URL+'?');
            return request({
                url: url,
                type: 'json',
                data:{f:'json','token':token},
                method: 'get',
                crossOrigin: true
            }).fail(logFailure);    
        },


        getService:function(url){
            var url = this.getTargetURL(url+'?');
            return request({
                token:'',
                url: url,
                type: 'json',
                data:{f:'json',token:''},
                method: 'get',
                crossOrigin: true
            }).fail(logFailure);    
        },

        buildArcGIsQuery: function (options) {
            var image = options.image ? 'type:"Image Service" OR ' : '';
            var map = options.map ? 'type:"Map Service" OR ' : '';
            var feature = options.feature ? 'type:"Feature Service" OR ' : '';
        //var access=options.access?'access:'+options.access:'access:"private"';
        var types = (image + map + feature).slice(0, -3); //remove last OR;
        var start = '&start=' + (options.start || '0');
        var num = '&num=' + (options.num || '100');
        //var sortField='&sortField='+(options.sortField|| 'title');
        var query = '(' + encodeURIComponent(options.query) + ')' + ' AND (' + types + ') '; //AND ('+access+')

        return 'q=' + query + start + num;
    }


};