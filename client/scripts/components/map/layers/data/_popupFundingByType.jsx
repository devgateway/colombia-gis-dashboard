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
              <h3 className="panel-title" >{this.props.NAME_1}</h3>
              <span className="title-label"> - <Message message="map.popup.totalActivities"/></span>
            </div>            
            <div className="panel-body" >
              <span className="fundingByType-title"><Message message="map.popup.funding"/>: {this.props.fundingUS.toFixed(2)}</span>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
}

});
