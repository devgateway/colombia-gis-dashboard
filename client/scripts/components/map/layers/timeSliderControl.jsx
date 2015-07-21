'use strict';

var React = require('react');
var Reflux = require('reflux');
var _=require('lodash');
var Store=require('../../../stores/indicatorLayerStore.js');

module.exports  = React.createClass({

  mixins: [Reflux.connect(Store, 'layer')],


  getInitialState: function() {
    return {min: 2005, max:2016,range:4,label:'Q'};
  },

  componentWillMount:function(){

  },

  componentDidMount:function(){

    var maxRange=(this.state.max-this.state.min)*this.state.range;
    var subRange=this.state.range;
    var slider=this.getDOMNode()
    
    values=[0,maxRange];
    for (var i=0 ;i < maxRange;i++){
      if ((i) % subRange ==0){
        values.push(i);
      }
    }

    noUiSlider.create(slider, {
      connect: true,
      behaviour: 'tap',
      step:1,
      start: [ 0, maxRange ],
      range: {
        'min': [ 0 ],
        'max': [ maxRange ]
      },pips: {
        mode: 'values',
        values: values,        
        density: 2,
      }
    });


    var values=$(slider).find('.noUi-value-large,.noUi-value-sub');
    _.map(values,function(v){
      var year=parseInt(v.innerHTML/this.state.range) + this.state.min; //min year
      v.innerHTML=year;_
    }.bind(this))


    slider.noUiSlider.on('slide', function(){
      console.log('slide...');
    });

    slider.noUiSlider.on('set', function(){
     console.log('set ...');
   });

    var tipHandles = slider.getElementsByClassName('noUi-handle'),
    tooltips = [];

// Add divs to the slider handles.
for ( var i = 0; i < tipHandles.length; i++ ){
  tooltips[i] = document.createElement('div');
  tooltips[i].className+= 'sliderTooltip';
  tipHandles[i].appendChild(tooltips[i]);
}

// When the slider changes, write the value to the tooltips.
slider.noUiSlider.on('update', function( values, handle ){

  console.log( tooltips[handle])
  var value= values[handle];
  var year=parseInt(value/this.state.range) + this.state.min; //min year
  var index=year-this.state.min;

  var subRange=( parseInt(value)+1 ) -(index*this.state.range)//is base 0
  


  tooltips[handle].innerHTML = year+'-'+this.state.label+subRange;
}.bind(this));



},


render: function() {
  return (
    <div className="timeSliderContainer">
    </div>);
}

});
