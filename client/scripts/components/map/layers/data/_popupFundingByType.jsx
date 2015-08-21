'use strict';

var React = require('react');
var Reflux = require('reflux');
var Store=require('../../../../stores/infoWindowShapesStore.js');
var If=require('../../../commons/if.jsx');
var Loading = require('../../../commons/loading.jsx');
var Mixins = require('./_popupMixins.js');


module.exports  = React.createClass({

  mixins: [Mixins, Reflux.connect(Store)],

  componentWillMount:function(){
    console.log('popup>componentWillMount');
    this.setState({tabId: 0});    
    this._getInfoData(this.props.id, this.props.level, this.props.filters, 'shapes'); 
  },

  componentDidMount: function() {
    console.log('_popupActivitiesPoint>componentDidMount');
    this.props.onChange();
    this._renderChart();
  },

  componentDidUpdate: function(props,newState) { 
    console.log('popup>componentDidUpdate'); 
    this.props.onChange();
    this._renderChart();
  },
  
  componentWillUpdate: function(props,newState) { 
    console.log('_popupActivitiesPoint>componentWillUpdate'); 
    var previousId = 0;
    if(newState.infoWindowFilter){
      newState.infoWindowFilter.map(function(node){node.values.map(function(innerNode){previousId = innerNode})});
    }
    if(previousId!=props.id || props.filters!=this.props.filters){
      this._getInfoData(props.id, props.level, props.filters, 'shapes'); 
    }
  },

  handleClick:function(tabId){
    console.log('popup>click');
    this.setState({'tabId':tabId});
    this.forceUpdate();
    
  },

  render: function() {
    console.log('popup>render id:' + this.props.id +" tab "+this.state.tabId);
    var showLoading=true;
    if(this.state.infoWindow){
      showLoading=false;
    }
    return (
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <div className="panel panel-default" >
            <div className="panel-heading popup-header" >
              <h3 className="panel-title" >{this.props.NAME_1} 
              <If condition={this.props.NAME_2} >
                - {this.props.NAME_2}
              </If>
              </h3>
            </div>
            <div className="chart-container" id="container"></div>
            <If condition={showLoading} >
              <Loading container="popup-loading-container"/>
            </If>
          </div>
        </div>
      </div>
    );
}

});
