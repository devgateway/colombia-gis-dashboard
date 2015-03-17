'use strict';

var React = require('react');
var Reflux = require('reflux');
var EsriService=require('./esriService.jsx');

module.exports  = React.createClass({

  onChange:function(){
   console.log("-------------------------------------------- A CHANGED WAS PRODUCED --------------------------------------------");
  },

 render: function() {
  var services=this.props.services|| [];
  
  return (
    <div className="layerList">
    <h3>Map Layers</h3>
        {
          services.map(function(s){
          return (<EsriService onChange={this.onChange} service={s}/>)
        }.bind(this))
    }
    </div>
    );

}

});