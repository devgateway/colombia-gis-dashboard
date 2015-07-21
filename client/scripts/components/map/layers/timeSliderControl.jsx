'use strict';

var React = require('react');
var Reflux = require('reflux');

var Store=require('../../../stores/indicatorLayerStore.js');

module.exports  = React.createClass({

  mixins: [Reflux.connect(Store, 'layer')],


  componentWillMount:function(){
   
   },

 componentDidMount:function(){
  $(this.getDOMNode()).find('.slider').slider({
     animate: "fast",
      values: [ 10, 25 ]
    });
 },


render: function() {
  return (
      <div className="timeSliderContainer">
            <div className="slider"/>
      </div>);
}

});
