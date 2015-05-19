'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var InfoWindowStore=require('../../../../stores/infoWindowStore.js');
var MyChart=require('./_charts.js');

module.exports  = React.createClass({
  mixins: [Reflux.connect(InfoWindowStore)],


  componentWillUpdate: function(props,newState) {  
    console.log('popup>componentWillUpdate');
  },

  handleClick:function(){
    console.log('popup>handleClick');
    
  },

  render: function() {
    console.log('popup>render id:' + this.props.id);
    var self = this;
    
    var chartData = [];
    if(self.state.infoWindow){
      self.state.infoWindow.map(function(node, index) {
        node.value.map(function(innerNode, index) {
          if(innerNode.id==self.props.id){
            chartData.push(innerNode.value);
          }
        });
      });
    } 

    
    return (

    <div className="leaflet-popup-content-wrapper">
     <div className="leaflet-popup-content">
       <div className="panel panel-default" data-reactid="">
         <div className="panel-heading popup-header" data-reactid="">
           <h3 className="panel-title" data-reactid="">{this.props.name}</h3>
           <span className="title-label"> - Total Activities</span>
         </div>
         <div className="popup-nav-wrapper">
           <nav className="tabs" role="tablist" data-reactid="">
             <ul className="tabs nav nav-tabs" role="tablist" data-reactid="">
               <li className="active" role="tab" >
                 <a href="#" onClick={this.handleClick}>
                   <span className="popup-icon chart" data-reactid=""></span>
                 </a>
               </li>
               <li className="" role="tab" >
                 <a href="#" onClick={this.handleClick}>
                   <span className="popup-icon funding-dev-obj" data-reactid=""></span>
                 </a>
               </li>
               <li className="" role="tab" >
                 <a href="#" onClick={this.handleClick}>
                   <span className="popup-icon subactivities" data-reactid=""></span>
                 </a>
               </li>
               <li className="" role="tab" >
                 <a href="#" onClick={this.handleClick}>
                   <span className="popup-icon export" data-reactid=""></span>
                 </a>
               </li>
             </ul>
           </nav>
         </div>
         <div className="panel-body" data-reactid="">
           <div className="popup-content">

             <MyChart data={chartData[0]} />


           </div>

         </div>
       </div>
     </div>
   </div>

     )
}

});
