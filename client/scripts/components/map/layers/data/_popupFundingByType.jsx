'use strict';

var React = require('react');
var Reflux = require('reflux');
var If=require('../../../commons/if.jsx');


module.exports  = React.createClass({
  componentWillMount:function(){
    console.log('popup>componentWillMount');
    this.setState({tabId: 0});
  },

  componentDidUpdate: function(props,newState) { 
    console.log('popup>componentDidUpdate'); 
    this.props.onChange();
  },


  handleClick:function(tabId){
    console.log('popup>click');
    this.setState({'tabId':tabId});
    this.forceUpdate();
    
  },

  render: function() {
    console.log('popup>render id:' + this.props.id +" tab "+this.state.tabId);
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
            <div className="panel-body" >
              <span className="fundingByType-title"><Message message="map.popup.funding"/>: {this.props.fundingUS?this.props.fundingUS.toFixed(2):0}</span>
            </div>
          </div>
        </div>
      </div>
    );
}

});
