 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/shapesLayerStore.js');
 var Popup = require('./_popupFundingByType.jsx')

 var _ = require('lodash');

 var Mixins = require('./_mixins.js');


 module.exports = React.createClass({


   mixins: [Mixins, Reflux.connect(Store)],

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
         color: 'rgba(' + rgbColor + ')',
         weight:style.weight
       };
     }
   },


   _onEachFeature: function(feature, layer) {
      this._bindPopup(feature, layer);
   },

   _bindPopup: function(feature, layer) {
     layer.bindPopup('');
     layer.on('popupopen', function(e) {
       layer._popup.options.autoPanPaddingTopLeft = new L.Point(0, 50);
       var popupHolder = this.getDOMNode();
       var _onChange = function() {
         popupHolder.firstChild.style.display = "";
         e.popup.setContent(popupHolder.innerHTML);
         //popupHolder.firstChild.style.display="none";
         //this.fixReactIds(e.popup);
       }.bind(this)
       React.render(React.createElement(Popup, _.assign(feature.properties, {
         onChange: _onChange
       }), this.state.data), popupHolder);
       e.popup.setContent(popupHolder.innerHTML);
       popupHolder.firstChild.style.display = "none";
       //this.fixReactIds(e.popup);
       //this.fixReactEvents(e.popup);
     }.bind(this));
   },


   render: function() {
     return (<div></div>);
   }

 });