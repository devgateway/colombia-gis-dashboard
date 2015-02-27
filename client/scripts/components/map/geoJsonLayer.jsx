/*
 * Leaflet raw map component used by ./map.jsx (use that if you want a map)
 */

 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var Popup=require('./popup.jsx')

 var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};


module.exports = React.createClass({

  componentDidMount: function() {
    if (this.props.features){
      this.addLayerToMap(this.props.features);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.features){
      this.addLayerToMap(nextProps.features);
    }
  },


  addLayerToMap: function(features) {
    debugger;
    console.log('Add Layer to Map');
    if (this.layer){
      this.props.getMap().removeLayer(this.layer)
    } 

    var layer=L.geoJson(features, {
         style: function (feature) {
          return {color: '#FF0000'};
         },
        onEachFeature: function (feature, layer) {
            layer.bindPopup('');
            layer.on('popupopen', function(e) {
              this.setState(feature);
              e.popup.setContent(this.getDOMNode().innerHTML) 
            }.bind(this));  
        }.bind(this),

      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, _.extend(geojsonMarkerOptions));
      }
    });

    layer.addTo(this.props.getMap());
    this.layer=layer;
    //this.props.getMap().fitBounds(layer.getBounds());
  },



  render: function() {
    return <Popup feature={this.state}/>
  }

});



