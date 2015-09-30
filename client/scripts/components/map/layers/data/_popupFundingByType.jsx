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
  
  componentWillReceiveProps: function(nextProps) {
    this._getInfoData(nextProps.id, nextProps.level, nextProps.filters, 'shapes');
  },

  handleClick:function(tabId){
    console.log('popup>click');
    this.setState({'tabId':tabId});
    this.forceUpdate();
    
  },

  render: function() {
    console.log('popup>render id:' + this.props.id +' tab '+this.state.tabId);
    var showLoading=true;
    if(this.state.infoWindow){
      showLoading=false;
    }
    if (this.props.isClosed()){
      return null;
    }
    return (
      <div>
        <div className='leaflet-popup-content'>
          <div className='panel panel-default' >
            <div className='panel-heading popup-header' >
              <h3 className='panel-title' >{this.props.NAME_1} 
              <If condition={this.props.NAME_2} >
                - {this.props.NAME_2}
              </If>
              </h3>
            </div>
            <div className='chart-container' id='container'></div>
            <If condition={showLoading} >
              <Loading container='popup-loading-container'/>
            </If>
          </div>
        </div>
      </div>
    );
}

});
