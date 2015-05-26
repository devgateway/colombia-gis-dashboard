 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _=require('lodash');
 var NumberedDivIcon=require('./_numberedDivIcon.js');
 var LayerStore=require('../../../../stores/fundingByTypeLayerStore.js');
 var _=require('lodash');



 module.exports = React.createClass({

  mixins: [Reflux.connect(LayerStore, 'dataLayer')],

  componentWillUpdate: function(props,newState) {

    if (newState.dataLayer.features){
      this.addLayerToMap(newState.dataLayer.features);
    }
  },

  getStyle:function(feature){

    var maxValue=_.max(_.collect(this.state.dataLayer.features.features,function(e){return e.properties.fundingUS})); //TODO: do it only once after state is upated  
    var currentValue=feature.properties.fundingUS
    var percentage=(100/ (maxValue/ currentValue));
    var breakData=_.find(_.values(this.state.dataLayer.breaks),function(t){
      return ( (t.min <=  percentage) && (percentage  <= t.max))
    })

    if(breakData){
     console.log(parseInt(maxValue) +' ::: '+ parseInt(currentValue)+ ':::' +  parseInt(percentage)+'%' +':::'+ parseInt(breakData.max)
      +':::'+breakData.style.color);
     return breakData.style;
   }else{
    console.log('Errro ... '+percentage);       
    this.state.dataLayer.defaultStyle;
  }
},

addLayerToMap: function(features) {
  console.log('map->layers->dataLayer: Add Layer to Map');
  var _this=this;
  if (this.props.getMap().hasLayer(this.layer)) {
    this.props.getMap().removeLayer(this.layer);
  }
  this.layer=L.geoJson(features, {
    style: function(feature){
      return _this.getStyle(feature);
    },
    onEachFeature: function(feature){
    }
  });
  this.layer.addTo(this.props.getMap());

},

render: function() {
 return null;
}

});
