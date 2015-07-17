'use strict';
var request = require('reqwest');
var _=require('lodash');
var Storage=require('./storage.js');

function logFailure(err, message) {
    console.log(message);
    console.log(err);
}



var getCommonEsriParams=function(){
    var esri_params={'f':'json'};
    var token=Storage.get('token');
    if (token){
        _.assign(esri_params,{'token':token});
    }
    return esri_params;
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
            data:getCommonEsriParams(),
            crossOrigin: true
        }).fail(logFailure);
    },

    findLegends: function (url) {
        var legendUrl = this.getTargetURL(url);
        return request({
            url: legendUrl,
            type: 'json',
            method: 'get',
            crossOrigin: true
        }).fail(logFailure);
    },

    self:function(token){
        /*Token is mandatory for this end point */   
        var url = this.getTargetURL(window.ESRI_SELF_URL+'?');   
        return request({
            url:url ,
            type: 'json',
            data:_.assign(getCommonEsriParams(),{'token':token}), //in this case we should use the new token 
            method: 'get',
            crossOrigin: true
        }).fail(logFailure);    
    },


    getService:function(url){
        var url = this.getTargetURL(url+'?');
        return request({
            url: url,
            type: 'json',
            data:getCommonEsriParams(),
            method: 'get',
            crossOrigin: true
        }).fail(logFailure);    
    },

    
    buildArcGIsQuery: function (options) {
        var image = options.image ? 'type:"Image Service" OR ' : '';
        var map = options.map ? 'type:"Map Service" OR ' : '';
        var feature = options.feature ? 'type:"Feature Service" OR ' : '';
        var types = (image + map + feature).slice(0, -3); //remove last OR;
        var start = '&start=' + (options.start || '0');
        var num = '&num=' + (options.num || '10');
        var query = '(' + options.query + ')' + ' AND (' + types + ')   '; //AND (access:shared)

        return 'q='+ query+start+num
    },


    createLefleatLayer:function(lClass,options, url){
        var uri = url || this.getService().metadata.url;
        _.assign( options,{useCors: true,cacheLayers:false,url:uri})
        if(window.ESIR_USE_PROXY){
            _.assign(options,{proxy:window.ESRI_PROXY_URL})
        }
        var token=Storage.get('token');
        if (token){
            _.assign(options,{'token':token});
        }
        var layer = lClass(options);
        layer.on('map->layers->esriLayers: authenticationrequired', function (e) {
           // console.log('map->layers->esriLayers: authenticationrequired');
        });
        layer.on('requestsuccess', function () {
           // console.log('map->layers->esriLayers: requestsuccess');
        });
        layer.on('requestend', function () {
            //console.log('map->layers->esriLayers: requestend');
        });
        return layer;
    },


    parseLegendsFromDrawInfo: function(legends) {
      var legendArray = [];
      if (legends.drawingInfo.renderer.type == 'uniqueValue'){
        legends.drawingInfo.renderer.uniqueValueInfos.map(function(valueInfo){
          legendArray.push({"label": valueInfo.label, "symbol": valueInfo.symbol});          
        });
        return legendArray;            
      } else {
        var rdrr = legends.drawingInfo.renderer;
        legendArray.push({"label": rdrr.label, "symbol": rdrr.symbol});
        return legendArray;            
      }
    },

};