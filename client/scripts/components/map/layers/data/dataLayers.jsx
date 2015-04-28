 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _=require('lodash');
 var NumberedDivIcon=require('./_numberedDivIcon.js');
 var DataLayerStore=require('../../../../stores/dataLayerStore.js');
 var Popup=require('./_popup.jsx')
 
 module.exports = React.createClass({

   mixins: [  Reflux.connect(DataLayerStore, 'dataLayers')],

   componentDidMount: function() {
    if (this.props.features){
      this.addLayerToMap(this.props.features);
    }
  },

  componentWillUpdate: function(props,newState) {
    if (newState.dataLayers.features){
      this.addLayerToMap(newState.dataLayers.features);
    }
  },

  addLayerToMap: function(features) {

    console.log('map->layers->dataLayer: Add Layer to Map');
    if (this.props.getMap().hasLayer(this.layer)) {
      this.props.getMap().removeLayer(this.layer);
    }

    this.layer=L.geoJson(features, {
      onEachFeature:this._bindPopup,
      pointToLayer:this._pointToLayer
    });

    this.layer.addTo(this.props.getMap());
    
  },


  _bindPopup:function(feature, layer){
     layer.bindPopup('');
     layer.on('popupopen', function(e) {
       var popupHolder= document.createElement('div');
           React.render(React.createElement(Popup, feature.properties),popupHolder)
            e.popup.setContent(popupHolder.innerHTML) 
   }.bind(this));  
  },

  _pointToLayer:function(feature, latlng){
    var marker = new L.Marker(latlng, {icon: NumberedDivIcon({number: feature.properties.activities})});
    return marker;
  },


  render: function() {
   return null;
 }

});
