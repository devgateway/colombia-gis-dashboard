 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var LayerStore = require('../../../../stores/fundingByTypeLayerStore.js');
 var NumberedDivIcon = require('./_numberedDivIcon.js');

 var _ = require('lodash');



 module.exports = React.createClass({

   mixins: [Reflux.connect(LayerStore)],

   componentWillUpdate: function(props, newState) {
     if (!this.layer)
       this.layer = this.createLayer(newState.geoData);

     if (newState.opacity) {
       this.layer.setOpacity(newState.opacity);
     }

     if (newState.zIndex) {
       this.layer.setZIndex(newState.zIndex);
     }

     if (newState.visible == false && this.props.getMap().hasLayer(this.layer)) {
       this.props.getMap().removeLayer(this.layer)
     } else if (!this.props.getMap().hasLayer(this.layer)) {
       this.layer.addTo(this.props.getMap());
     }

   },

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

   createLayer: function(features) {
     console.log('map->layers>: Add Layer to Map');
     var layer = L.geoJson(features, 
              {
                onEachFeature:this._onEachFeature,
                pointToLayer: this._pointToLayer,
                style: function(feature) {
                    return this.getStyle(feature);
                 }.bind(this)
              }
          );
     return layer;
   },

   _onEachFeature:function(feature,layer){

      layer.on('mouseover', function(evt) {
       var layer = evt.target;
       layer.setStyle(this.getStyle(feature).over);
     }.bind(this));

      layer.on('mouseout', function(evt) {
       var layer = evt.target;
       layer.setStyle(this.getStyle(feature));
     }.bind(this));
  },


 render: function() {
   return null;
 }

});