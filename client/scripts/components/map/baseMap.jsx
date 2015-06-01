'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var MapActions=require('../../actions/mapActions.js')
var MapStore=require('../../stores/mapStore.js');


var BaseMapItem= React.createClass({

  handleClick: function(event) {
    MapActions.changeBaseMap(this.state.value);
  },

  getInitialState: function() {
    return {value:this.props.value, label:this.props.label};
  },
  
  render: function() {
    var currentBaseMap = MapStore.getCurrentBaseMap();
    var cls = currentBaseMap==this.state.value? "basemap-option-selected" : "basemap-option";
    return(<span className={cls} onClick={this.handleClick}> {this.state.label} </span>);
  }

});


module.exports = React.createClass({

  mixins: [Reflux.connect(MapStore)],
  
  render: function() {
    return(
        <div className="map-panel-header">
          <div className="basemap-label">
            <i className="fa fa-globe" aria-hidden="true"></i>
            <Message message='map.baseMaps.views'/>
          </div>
          <ul className="basemap-list">
            <li><BaseMapItem label={<Message message='map.baseMaps.gray'/>} value="Gray"/></li>
            <li><BaseMapItem label={<Message message='map.baseMaps.topo'/>} value="Topographic"/></li>
            <li><BaseMapItem label={<Message message='map.baseMaps.natGeo'/>} value="NationalGeographic"/></li>
            <li><BaseMapItem label={<Message message='map.baseMaps.darkGray'/>} value="DarkGray"/></li>
            <li><BaseMapItem label={<Message message='map.baseMaps.image'/>} value="Imagery"/></li>
            <li><BaseMapItem label={<Message message='map.baseMaps.streets'/>} value="Streets"/></li>
          </ul>
        </div>
      );
  }
});
