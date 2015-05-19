'use strict';
var React = require('react/addons');
var Reflux = require('reflux');
var _=require('lodash');
var NumberedDivIcon=require('./_numberedDivIcon.js');
var DataLayerStore=require('../../../../stores/dataLayerStore.js');
var Popup=require('./_popup.jsx');
var InfoWindowMap = require('../../../../conf/infoWindowMap.js');
var InfoWindowActions=require('../../../../actions/infoWindowActions.js');
var InfoWindowStore=require('../../../../stores/infoWindowStore.js');
var EventConstants = require('react/lib/EventConstants');

var reactEventNames = Object.keys(EventConstants.topLevelTypes)
  .filter(function(eventName) {
    var isTop = (eventName.slice(0, 3) === 'top');
    if (!isTop) { console.warn('React event name didn\'t start with "top"', eventName); }
    return isTop;
  })
  .map(function(topName) {  // convert eg. `topBlur` => `blur`
    return topName.slice(3).toLowerCase();
    // var lowerFirstLetter = topName.slice(3, 4).toLowerCase();  // first letter after top
    // return lowerFirstLetter + topName.slice(4);
  });
 
module.exports = React.createClass({

  mixins: [  Reflux.connect(DataLayerStore, 'dataLayers')],

  componentWillMount:function(){
    console.log('popup>componentWillMount');
    var data = this._getInfoWindowData(); 
    this.setState({data: data});
  },

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

  fixReactIdsFromDiv: function(popupHolder) {
    // replace all the `data-reactid`s so react doesn't get confused.
    var allEls = popupHolder.querySelectorAll('*');
    Array.prototype.forEach.call(allEls, function(el) {
      var reactId = el.dataset.reactid;
      var rnd = Math.random() * 1000000;
      if (reactId !== undefined) {  // leaflet's containers, etc.
        delete el.dataset.reactid;

        el.dataset.reactid = rnd;
      }
    });
  },

  fixReactIdsFromPopup: function(popup) {
    var el = popup._container;
    // replace all the `data-reactid`s so react doesn't get confused.
    var allEls = el.querySelectorAll('*');
    Array.prototype.forEach.call(allEls, function(el) {
      var reactId = el.dataset.reactid;
      var rnd = Math.random() * 1000000;
      if (reactId !== undefined) {  // leaflet's containers, etc.
        delete el.dataset.reactid;

        el.dataset.reactid = rnd;
      }
    });
  },



  _bindPopup:function(feature, layer){
    layer.bindPopup('');
    layer.on('popupopen', function(e) {
      var popupHolder= document.createElement('div');
      //document.body.appendChild(popupHolder);
      
      React.render(React.createElement(Popup, feature.properties, this.state.data), popupHolder);
      //this.fixReactIdsFromDiv(popupHolder);
      e.popup.setContent(popupHolder.innerHTML);
      //this.fixReactIdsFromDiv(popupHolder);
      //this.fixReactIdsFromPopup(e.popup);
      //document.body.removeChild(popupHolder);
   }.bind(this));  
  },

  _pointToLayer:function(feature, latlng){
    var marker = new L.Marker(latlng, {icon: NumberedDivIcon({number: feature.properties.activities})});
    return marker;
  },


  _getInfoWindowData: function () {
      var info = InfoWindowActions.getInfoFromAPI(InfoWindowMap.getCostShareBreakDown()) || [];
      return info;
  },


  render: function() {
   return null;
 }

});
