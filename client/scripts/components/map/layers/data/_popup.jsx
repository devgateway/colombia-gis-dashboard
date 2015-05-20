'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var InfoWindowStore=require('../../../../stores/infoWindowStore.js');
var MyChart=require('./_charts.js');

module.exports  = React.createClass({
  mixins: [Reflux.connect(InfoWindowStore)],


  componentDidUpdate: function(props,newState) {  
    this.props.onChange();
  },


  handleClick:function(tabId){
    console.log('click');
    this.setState({'tabId':tabId});
    this.forceUpdate();
    
  },

  render: function() {
    debugger;
    console.log('popup>render id:' + this.props.id +" tab "+this.state.tabId);
    /*var self = this;

    var chartData = [];
    if(self.state.infoWindow){
      self.state.infoWindow.map(function(node, index) {
        node.value.map(function(innerNode, index) {
          if(innerNode.id==self.props.id){
            chartData.push(innerNode.value);
          } else {
            chartData.push();
          }
        });
      });
    } 

    var chartId = 0;
    if(self.state.infoWindowId){
      chartId = self.state.infoWindowId;
    }
    var values = chartData[chartId];
    <MyChart data={values} />
    */
    var content=(  <div className="popup-content"> Default</div>)
 
    if (this.state.tabId==1){
      content=(  <div className="popup-content"> TAB 0</div>)
    }
    if (this.state.tabId==2){
      content=(  <div className="popup-content"> TAB 1</div>)
    }


    if (this.state.tabId==3){
      content=(  <div className="popup-content"> TAB 3</div>)
    }


    if (this.state.tabId==3){
      content=(  <div className="popup-content"> TAB 4</div>)
    }
    return (

      <div className="leaflet-popup-content-wrapper">
      <div className="leaflet-popup-content">
      <div className="panel panel-default" >
      <div className="panel-heading popup-header" >
      <h3 className="panel-title" >{this.props.name}</h3>
      <span className="title-label"> - Total Activities</span>
      </div>
      <div className="popup-nav-wrapper">


      <nav className="tabs" role="tablist" >
      <ul className="tabs nav nav-tabs" role="tablist" >
      <li className="active" role="tab" >
      <a href="#" onClick={this.handleClick.bind(this, 0)}>
      <span className="popup-icon chart" ></span>
      </a>
      </li>
      <li className="" role="tab" >
      <a href="#" onClick={this.handleClick.bind(this, 1)}>
      <span className="popup-icon funding-dev-obj" ></span>
      </a>
      </li>
      <li className="" role="tab" >
      <a href="#" onClick={this.handleClick.bind(this, 2)}>
      <span className="popup-icon subactivities" ></span>
      </a>
      </li>
      <li className="" role="tab" >
      <a href="#" onClick={this.handleClick.bind(this, 3)}>
      <span className="popup-icon export" ></span>
      </a>
      </li>
      </ul>
      </nav>
      </div>
         <div className="panel-body" >{content}</div>
      </div>
      </div>
      </div>

      )
}

});
