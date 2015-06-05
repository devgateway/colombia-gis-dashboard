 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/shapesLayerStore.js');

 var _ = require('lodash');

 var Mixins = require('./_mixins.js');


 module.exports = React.createClass({


   mixins: [Mixins, Reflux.connect(Store)],
   _onEachFeature: function(feature, layer) {
   },

   _filter: function(feature, layer) {
     return true;
   },

   _setStyles: function() {
     this.layer.eachLayer(function(l) {
       l.setStyle(this._style(l.feature));
     }.bind(this));
   },


   _style: function(feature) {

     if (this.state.geoData) {
       var maxValue = _.max(_.collect(this.state.geoData.features, function(e) {
          console.log(e);
         return e.properties.fundingUS;
       }));

       var currentValue = feature.properties.fundingUS || 0;
       var percentage = parseInt((100 / (maxValue / currentValue)));
       var style = this._getStyle(percentage);
       var rgbColor = style.color.r + "," + style.color.g + "," + style.color.b + "," + style.color.a;

       return {
         color: 'rgba(' + rgbColor + ')'
       };
     }
   },

   render: function(feature) {
     return null;
   }

 });