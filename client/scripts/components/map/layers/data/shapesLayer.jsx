 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/shapesLayerStore.js');
 var NumberedDivIcon = require('./_numberedDivIcon.js');

 var _ = require('lodash');

 var Mixins = require('./_mixins.js');


 module.exports = React.createClass({


   mixins: [Mixins, Reflux.connect(Store)],

   getStyle: function(feature) {
     var maxValue = _.max(_.collect(this.state.geoData.features, function(e) {
       return e.properties.fundingUS
     }));
     var currentValue = feature.properties.fundingUS
     var percentage = parseInt((100 / (maxValue / currentValue)));
     var breakData = _.find(_.values(this.state.breaks), function(t) {
       return ((t.min <= percentage) && (percentage <= t.max));
     });
     if (breakData) {
       console.log(parseInt(maxValue) + ' ::: ' + parseInt(currentValue) + ':::' + parseInt(percentage) + '%' + ':::' + parseInt(breakData.max) + ':::' + breakData.style.color);
       return breakData.style;
     } else {
       console.log('Errro ... ' + percentage);
       this.state.defaultStyle;
     }
   },

   /*
   _onEachFeature:function(feature,layer){

      layer.on('mouseover', function(evt) {
       var layer = evt.target;
       layer.setStyle(this.getStyle(feature).over);
     }.bind(this));

      layer.on('mouseout', function(evt) {
       var layer = evt.target;
       layer.setStyle(this.getStyle(feature));
     }.bind(this));
  },*/

   _onEachFeature: function(feature, layer) {
    
   },

   _filter: function(feature, layer) {
     return true;
   },

   _style: function(feature) {
     return this.getStyle(feature);
   },


   render: function() {
     return null;
   }

 });