/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');

var LegendStore=require('../../stores/esriLayesLegendsStore.js');
var DataLegendStore=require('../../stores/dataLayersLegendsStore.js');

var LegendActions=require('../../actions/legendActions.js');
var If=require('../commons/if.jsx')
var Legend=require('./_legendPrint.jsx');

var _=require('lodash');

var LegendControl  = React.createClass({
  mixins: [Reflux.connect(LegendStore,'esri'),Reflux.connect(DataLegendStore,'data')],

  getInitialState: function() {
    this.state = this.state || {'shown': false};
    return this.state;
  },

  _toggleVisibility: function(){
    LegendActions.isShown(!this.state.shown);
  },

  render: function() {
    var esri=_.clone(this.state.esri.layersLegends) || [];
    var  data =this.state.data.layersLegends || [];
    var legends=data.concat(esri);  
    debugger;
    var legendContent = "";
    var buttonLabel = this.state.shown? <Message message="layers.hideLegend"/> : <Message message="layers.showLegend"/>

    
    return (
      <div>
      {
        legends.map(function(l){
          return (<Legend legendGroups={l.legendGroups} layerTitle={l.layerTitle} visible={l.visible}/>);
        })
      }
      </div>);

  }
});

module.exports = LegendControl;
