'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util = require('../api/util.js');
var API = require('../api/layers.js');
var departmentsGeoJson=require('./_departmentsGeo.json');

var _ = require('lodash');
var replacer=require('../api/replace-diacritics.js')

var defaultStyle = {
  "color": "#B1C965",
  "weight": 1,
  "opacity": 0
};


var defaultBreaks={
  
  'Level0':{
    'min':0,
    'max':20,
    'style': defaultStyle
  },
  
  'Level1':{
    'min':21,   //min <= X , max
    'max':40,
    'style':_.assign({},defaultStyle,{'color':'#B1C965','opacity':0.75})
  },
  
  'Level2':{
    'min':41,
    'max':60,
    'style':_.assign({},defaultStyle,{'color':'#FF0000','opacity':0.75})
  },
  
  'Level3':{
    'min':61,  
    'max':80,  
    'style':_.assign({},defaultStyle,{'color':'#637B17','opacity':0.75})
  },

  'Level4':{
    'min':81,
    'max':100,
    'style':_.assign({},defaultStyle,'#3F5201',{'opacity':0.75})
  }
}

module.exports = Reflux.createStore({

  listenables: LayersAction,

  onLoadFundingByType: function() {
    var geoData=_.clone(departmentsGeoJson);
    API.getActivitiesByDepartment(this.state.filters).then(
      function(data) {
        _.map(data,function(d){
          var feature=_.find(geoData.features,function(e){
            if(replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name){
              console.log('Found!');
            }
            return replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name
          });

          if (feature){
            _.assign(feature.properties,_.omit(_.clone(d),"name")); //set feature values 
          }
        });
        this.update({'features':geoData});
      }.bind(this)).fail(function() {
        console.log('Error loading data ...');
      });
    },

    getInitialState: function() {
      this.state = this.state || {
        dataLevel: "departament",
        dataLayer: "funding",
        breaks:defaultBreaks,
        defaultStyle:defaultStyle
      };
      return this.state;
    },


    update: function(assignable, options) {
      options = options || {};
      this.state = assign(this.state, assignable);
      if (!options.silent) {
        this.trigger(this.state);
      }
    },




  });