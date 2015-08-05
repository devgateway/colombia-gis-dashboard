/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var LegendStore=require('../../../../stores/esriLayesLegendsStore.js');
var DataLegendStore=require('../../../../stores/dataLayersLegendsStore.js');

var Legend=require('./_legendPrint.jsx');

var LegendControl  = React.createClass({
    mixins: [Reflux.connect(LegendStore)],

    getInitialState: function() {
      this.state = this.state || {'shown': false};
      return this.state;
    },


    render: function() {
      debugger;
        return (<div className="legends-container">
                
                  <div className="legends-content">
                    {
                      this.state.layersLegends.map(function(layerLegends){
                        return (<Legend legendGroups={layerLegends.legendGroups} layerTitle={layerLegends.layerTitle} visible={layerLegends.visible}/>);
                      })
                    }
                  </div>
                
              </div>
        );
      
    }
});

module.exports = LegendControl;
