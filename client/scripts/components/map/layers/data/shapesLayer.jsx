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
      var featureValue;
      var isFilteredByMunicipality = false;
      var isMunicipalitySelected = false;
      if(this.state.breakStyle && this.state.breakStyle == 'breakValues') {
        featureValue = feature.properties.fundingUS?feature.properties.fundingUS:0;

      } else {
        var maxValue = _.max(_.collect(this.state.geoData.features, function(e) {
          return e.properties.fundingUS + 0.01; //Adding some decimal to fix the max value
        }));

        var currentValue = feature.properties.fundingUS || 0;
        featureValue = (100 / (maxValue / currentValue));
      }
      
      if(this.state.filters && featureValue==0){
        this.state.filters.map(function(l){
          if(l.param === 'mu'){
            isFilteredByMunicipality = true;
            l.values.map(function(muId){
              if(muId == feature.properties.ID_2){
                isMunicipalitySelected = true;
              } 
            })
          }
        })
      }

      var style = this._getStyle(featureValue, !isFilteredByMunicipality || isMunicipalitySelected);
      var rgbColor = style.color.r + ',' + style.color.g + ',' + style.color.b + ',' + style.color.a;

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
     var _closed = true;
     var _isClosed = function() {
       return _closed;
     }.bind(this);
     layer.on('popupopen', function(e) {
       layer._popup.options.autoPanPaddingTopLeft = new L.Point(0, 50);
       var popupHolder = this.getDOMNode();
       _closed = false;
       var _onChange = function() {
         popupHolder.firstChild.style.display = '';
         e.popup.setContent(popupHolder.innerHTML);
       }.bind(this)
       React.render(React.createElement(Popup, _.assign(feature.properties, {
         isClosed: _isClosed,
         onChange: _onChange,
         level: this.state.level,
         filters: this.state.filters,
         isShapePopup: true
       }), this.state.data), popupHolder);
       e.popup.setContent(popupHolder.innerHTML);
     }.bind(this));
     layer.on('popupclose', function(e) {
        e.popup.setContent('');
        _closed = true;
     });
   },


   render: function() {
     return (<div></div>);
   }

 });