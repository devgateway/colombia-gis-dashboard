'use strict';

var React = require('react');
var Reflux = require('reflux');
var EsriService=require('./esriService.jsx');

module.exports  = React.createClass({


  componentWillMount:function(){
    console.log("layers->manager->list: componentWillMount");
  },

  componentWillUnmount:function(){
    console.log("layers->manager->list: componentWillUnmount");
  },

 render: function() {
  var services=this.props.services|| [];
  return (
    <div className="layerList">
     <h3>Map Layers</h3>
          {
            services.map(function(s){
               return (<EsriService onChange={this.props.onChange} service={s}/>)
          }.bind(this))
      }
    </div>
    );

}

});