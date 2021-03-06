'use strict';
var React = require('react/addons');
var Reflux = require('reflux');
var _=require('lodash');

var If=require('../../commons/if.jsx');
var Checkbox=require('../../commons/customCheckbox.jsx');


module.exports=React.createClass({

  _handleOpacityChanged: function(value) {
    this.setState(_.assign(this.state,{'opacity':value}));
    this.props.onChangeOpacity(this.props.id, (value / 100),this.props.idx);
  },

  _handleChageVisibility: function() {
    var newValue=!this.state.checked;
    this.setState({'checked':newValue});
    this.props.onChangeVisibility(this.props.id,newValue,this.props.idx);
  },

  _up: function() {
    this.props.onMoveUp(this.props.id);
  },

  _down: function() {
    this.props.onMoveDown(this.props.id);
  },

  _delete: function() {
    this.props.onDelete(this.props.id);
  },

  getInitialState: function() {
    return {
      'opacity':this.props.opacity,
      'checked': this.props.visible
    };
  },

  componentDidUpdate :function(prevProps,prevState){
    if (prevProps.opacity!=this.props.opacity){
     var opacity=this.props.opacity*100;
     $(this.getDOMNode()).find('.slider').slider('value',opacity);
    }
  },

  componentDidMount:function(){
    var opacity=this.props.opacity;
    $(this.getDOMNode()).find('.slider')
    .slider({
      change:function(event,source){
        if (event.originalEvent) {
          this._handleOpacityChanged(source.value);
        }
      }.bind(this),
      max: 100,
      value:(opacity*100)
    })
    .slider('pips', {
      rest: false
    });
  },

  componentWillReceiveProps :function(nextProps){
    this.setState({checked:nextProps.visible});
  },

  render: function() {
    console.log('Layer Control > Layer : Rendering now .. checked ==' + this.state.checked );
    return (
      <div>
        <If condition={this.props.onChangeVisibility}>
          <Checkbox selected={this.state.checked} onChange={this._handleChageVisibility}/>
        </If>
        <div className='title'>
          <If condition={this.props.title}>
            <span className='control-title'>{this.props.title}</span>
          </If>
        </div>
        <div className='control-wrapper transparency'>
          <div className='slider-holder'>
            <h3><Message message='layers.layerTransparency'/></h3>
            <div className='slider'/>
          </div>
        </div>
      </div>
    );
  }
});
