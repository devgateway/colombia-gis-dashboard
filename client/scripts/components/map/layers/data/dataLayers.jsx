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
  fillOpacity: 0.8,
  title:'TEST'
};



function getRadius(value){

  if (!value){
    return 15;
  };

  if (value < 20 ){
    return 20
  };

  if (value < 30){
    return 25;
  };

  if (value < 40){
    return 30;
  };

  if (value < 60){
    return 35;
  };

  if (value < 140){
    return 40;
  };

  if (value < 170){
    return 45;
  };

  if (value < 200){
    return 50;
  };

  if (value < 250){
    return 55;
  };

  return 60;
}


L.NumberedDivIcon = L.Icon.extend({
  options: {
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76], // point from which the popup should open relative to the iconAnchor
    number: '',
    shadowUrl: null,
    className: 'marker'
  },

  createIcon: function () {
    var div = document.createElement('div');
    var numdiv = document.createElement('div');

    numdiv.setAttribute ( "class", "number" );
    numdiv.setAttribute ( "style", "line-height:"+this.options['iconSize'][0]+"px" );
    
    numdiv.innerHTML = "<span>"+this.options['number']+"</span>" || '';

    div.appendChild ( numdiv );
    this._setIconStyles(div, 'icon');
    return div;
  },

  //you could change this to add a shadow like in the normal marker if you really wanted
  createShadow: function () {
    return null;
  }
});


/*Layer component*/
var DataLayerStore=require('../../../../stores/dataLayerStore.js');

module.exports = React.createClass({
  mixins: [  Reflux.connect(DataLayerStore, 'dataLayers')],

  componentDidMount: function() {
    if (this.props.features){
      this.addLayerToMap(this.props.features);
    }
  },

  componentWillUpdate: function(props,newState) {
    debugger;
    if (newState.dataLayers.features){
      this.addLayerToMap(newState.dataLayers.features);
    }
  },

  addLayerToMap: function(features) {
    console.log('map->layers->dataLayer: Add Layer to Map');
    if (this.layer){
      this.props.getMap().removeLayer(this.layer)
    } 
    var layer=L.geoJson(features, 
    {
     style: function (feature) {
      return {color: '#FF0000'};
    },

    onEachFeature: function (props, layer) {
      layer.bindPopup('');
      layer.on('popupopen', function(e) {
        this.setState(feature);
        e.popup.setContent(this.getDOMNode().innerHTML) 
      }.bind(this));  
    }.bind(this),

    pointToLayer: function (feature, latlng) {
          //var marker= L.circleMarker(latlng, _.extend(geojsonMarkerOptions,{radius:getRadius(feature.properties.actividades)}));
          var marker = new L.Marker(latlng, {
            icon:   new L.NumberedDivIcon({number: feature.properties.activities, iconSize:[getRadius(feature.properties.activities),getRadius(feature.properties.activities)] })
          });
          return marker
        }
      });


    layer.addTo(this.props.getMap());
    this.layer=layer;
  },

  render: function() {
    return (this.state.dataLayers.features?null:null);
  }

});
