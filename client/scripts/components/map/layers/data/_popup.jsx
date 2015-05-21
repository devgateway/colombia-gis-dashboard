'use strict';

var React = require('react');
var Reflux = require('reflux');
var InfoWindowStore=require('../../../../stores/infoWindowStore.js');
var MyChart=require('./_charts.js');


var MyActivities = React.createClass({
  render: function() {
    var items = this.props.data;
    return (
        <ul>
        {
          items.map(function(node, index) {
            return <li><a href={node.link} target='_blank'>{node.name}</a></li>          
          })
        }
        </ul>
    );
  }
});

module.exports  = React.createClass({
  mixins: [Reflux.connect(InfoWindowStore)],


  componentDidUpdate: function(props,newState) {  
    this.props.onChange();
  },


  handleClick:function(tabId){
    console.log('popup>click');
    this.setState({'tabId':tabId});
    this.forceUpdate();
    
  },

  render: function() {
    console.log('popup>render id:' + this.props.id +" tab "+this.state.tabId);
    var self = this;
    var chartData = [];
    var titleArray = [];
    if(self.state.infoWindow){
      self.state.infoWindow.map(function(node, index) {
        titleArray.push(node.title)
        node.value.map(function(innerNode, index) {
          if(innerNode.id==self.props.id){
            chartData.push(innerNode.value);
          } else {
            chartData.push();
          }
        });
      });
    } 
    debugger;
    var content=(  <div className="popup-content"><h4>{titleArray[0]}</h4><MyChart data={chartData[0]}/></div>)
 
    if (this.state.tabId==0){
      content=(  <div className="popup-content"><h4>{titleArray[0]}</h4><MyChart data={chartData[0]} /></div>)
    }
    if (this.state.tabId==1){
      content=(  <div className="popup-content"><h4>{titleArray[1]}</h4><MyChart data={chartData[1]}/></div>)
    }
    if (this.state.tabId==2){
      content=(  <div className="popup-content"><h4>{titleArray[2]}</h4><MyChart data={chartData[2]}/></div>)
    }
    if (this.state.tabId==3){
      content=(  <div className="popup-content"><h4>{titleArray[3]}</h4><MyActivities data={chartData[3]} /></div>)
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
    );
}

});
