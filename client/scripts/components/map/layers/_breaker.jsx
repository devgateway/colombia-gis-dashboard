'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var _ = require('lodash');
var ColorPicker=require('./_colorPicker.jsx');



module.exports = React.createClass({

  _changeColor: function(color) {
    this.props.onChangeColor(color, this.props.level)

  },

  _changeRadius: function(event) {
    
    this.setState({
      radius: event.currentTarget.value
    });
    this.props.onChageRadius(event.currentTarget.value, this.props.level)

  },

  getInitialState: function() {
    return {
      radius: (this.props.radius || 0)
    }
  },
  
  render:function(){
      return ( <div className='breaksOptions'>
                        <div className='label label-info'>{this.props.label}</div>
                        <ColorPicker level={this.props.level} onChangeColor={this._changeColor} color={this.props.color}/>
                                 
                          {this.props.onChageRadius?<input type="text" name="radius" value={this.state.radius} onChange={this._changeRadius}/>:null}  
                         <div className="clearFix"/>
                        
                      </div>)
  }
});
