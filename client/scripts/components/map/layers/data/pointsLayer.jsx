 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/pointsLayerStore.js');
 var Popup = require('./_popup.jsx')
 var Mixins = require('./_mixins.js');

 module.exports = React.createClass({

   mixins: [Mixins, Reflux.connect(Store)],

   _bindPopup: function(feature, layer) {
     layer.bindPopup('');
     layer.on('popupopen', function(e) {
       var popupHolder = document.createElement('div');
       React.render(React.createElement(Popup, feature.properties), popupHolder)
       e.popup.setContent(popupHolder.innerHTML)
     }.bind(this));
   },

   _pointToLayer: function(feature, latlng) {
     var marker = new L.Marker(latlng, {
       icon: NumberedDivIcon({
         number: feature.properties.activities
       })
     });
     return marker;
   },


   _onEachFeature: function(feature, layer) {
     this._bindPopup(feature, layer);
   },

   _filter: function(feature, layer) {
     return true;
   },

   _style: function(feature) {
     console.log('style');
   },


   render: function() {
     return null;
   }

 });