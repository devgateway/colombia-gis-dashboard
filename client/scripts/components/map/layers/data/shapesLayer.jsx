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

   getStyle: function(feature) {

     if (this.state.geoData) {
       var maxValue = _.max(_.collect(this.state.geoData.features, function(e) {
         return e.properties.fundingUS
       }));
       var currentValue = feature.properties.fundingUS || 0;
       var percentage = parseInt((100 / (maxValue / currentValue)));

       var breakData = _.find(_.values(this.state.breaks), function(t) {
         return (percentage <= t.value);
       });

       if (breakData) {
         console.log(parseInt(maxValue) + ' ::: ' + parseInt(currentValue) + ':::' + parseInt(percentage) + '%' + ':::' + parseInt(breakData.max) + ':::' + breakData.style.color);
         return breakData.style;
       } else {
            console.log('Errro ... ' + percentage);
         return this.state.defaultStyle;
       }
     }else{
      console.log('Error: Set style was called without geodata')
      return {};
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

   _filter: function(feature, layer) {
     return true;
   },

   _style: function(feature) {
     return this.getStyle(feature);
   },


   render: function() {
     return (<div></div>);
   }

 });