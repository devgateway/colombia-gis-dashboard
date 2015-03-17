'use strict';

var React = require('react');
var Reflux = require('reflux');
var ArcgisLayerStore=require('../../../stores/arcgisLayerStore.jsx');

function createMapService(layer){
  return  L.esri.dynamicMapLayer(layer.url, { opacity : 0.25 });
};

function createFeatureService(layer){
  
  return   L.esri.featureLayer(layer.url+'/0', { opacity : 0.25 });
};


var Layer =React.createClass({

  componentWillMount:function(){
    this.layer=this.createLayer();
    this.onLayerCreated();
  },


  onLayerCreated:function(){
    
    if (this.props.onLayerCreated){
      this.props.onLayerCreated(this.layer);
    }
  },

  createLayer:function(){
    console.log("Creating new map lyer now..");
    if (this.props.layer.type==="Feature Service"){
      return createFeatureService(this.props.layer)
    }

    if (this.props.layer.type==="Map Service"){
      return  createMapService(this.props.layer);        
    }


  },

  render: function() {
    return null;
  }
});


module.exports  = React.createClass({

  mixins: [ Reflux.connect(ArcgisLayerStore, 'arcGisLayers')],
  componentWillMount:function(){
    
  },

  addToMap:function(layer){
    layer.addTo(this.props.getMap());
  },

  render: function() {
   var layers=this.state.arcGisLayers.current || [];
   
   console.log("LAYERS STATE CHANGED " + layers)
   return (<div>
   {

    layers.map(function(layer){
      return <Layer layer={layer} onLayerCreated={this.addToMap}/>
    }.bind(this))

  }

  </div>)
 }

});
