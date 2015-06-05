'use strict';

var React = require('react');
var Reflux = require('reflux');



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
    var url = "./#/chart1?id="+this.props.id+"&tab="+this.state.tabId;
    var content=(  <div className="popup-content"><iframe className="iframe-content" src={url} ></iframe> </div>);
    return (
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <div className="panel panel-default" >
            <div className="panel-heading popup-header" >
              <h3 className="panel-title" >{this.props.name}</h3>
              <span className="title-label"> - <Message message="map.popup.totalActivities"/></span>
            </div>
            <div className="popup-nav-wrapper">
              <nav className="tabs" role="tablist" >
                <ul className="tabs nav nav-tabs" role="tablist" >
                <li className="active" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 0)}>
                    <span className="popup-icon chart" title="Cost Share Breakdown"></span>
                  </a>
                </li>
                <li className="" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 1)}>
                    <span className="popup-icon funding-dev-obj" title="Development Objectives"></span>
                  </a>
                </li>
                <li className="" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 2)}>
                    <span className="popup-icon subactivities" title="Activity Classication"></span>
                  </a>
                </li>
                <li className="" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 3)}>
                    <span className="popup-icon export" title="Public Private Partnership"></span>
                  </a>
                </li>
                <li className="" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 4)}>
                    <span className="popup-icon subactivitiesList" title="Sub Activities"></span>
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
