 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/indicatorLayerStore.js');
 var Popup = require('./_popupIndicators.jsx')
 var Mixins = require('./_mixins.js');
 var EventConstants = require('react/lib/EventConstants');

 var reactEventNames = Object.keys(EventConstants.topLevelTypes)
   .filter(function(eventName) {
     var isTop = (eventName.slice(0, 3) === 'top');
     if (!isTop) {
       console.warn('React event name didn\'t start with "top"', eventName);
     }
     return isTop;
   })
   .map(function(topName) { // convert eg. `topBlur` => `blur`
     return topName.slice(3).toLowerCase();
     // var lowerFirstLetter = topName.slice(3, 4).toLowerCase();  // first letter after top
     // return lowerFirstLetter + topName.slice(4);
   });

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
      var featureValue;
      var isFilteredByMunicipality = false;
      var isMunicipalitySelected = false;
      if(this.state.breakStyle && this.state.breakStyle == "breakValues") {
        featureValue = feature.properties.value?feature.properties.value:0;

      } else {
        var maxValue = _.max(_.collect(this.state.geoData.features, function(e) {
          return e.properties.value + 0.01; //Adding some decimal to fix the max value
        }));

        var currentValue = feature.properties.value || 0;
        featureValue = (100 / (maxValue / currentValue));
      }
      
      var style = this._getStyle(featureValue, !isFilteredByMunicipality || isMunicipalitySelected);
      var rgbColor = style.color.r + "," + style.color.g + "," + style.color.b + "," + style.color.a;

      return {
        color: 'rgba(' + rgbColor + ')',
        weight: style.weight
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
         onChange: _onChange,
         level: this.state.level,
         filters: this.state.filters,
         isShapePopup: true
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