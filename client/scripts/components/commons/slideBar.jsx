'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var Link = require('react-router').Link;

var ReactTransitionGroup = React.addons.TransitionGroup;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var BarContent = React.createClass({
  render: function() {
    return <div className="slider_content">{this.props.children}</div>;
  }
});


module.exports  = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },
  
  componentWillMount: function() {
    this.setState({
      open: this.props.open
    });
  },
  
  componentWillReceiveProps: function(props) {
    this.setState({
      open: props.open
    });
  },
  
  open: function() {
    this.setState({
      open: true
    });
  },

  close: function() {
    this.setState({
      open: false
    });
  },

  toggle: function() {
    this.setState({
      open: !this.state.open
    });
  },
  
  render: function() {
    return (
      <div id="sidebar-wrapper">
      <div className="panel-toggle">
      <i className="fa fa-bars" onClick={this.state.open?this.close:this.open}></i>
      </div>
      <ReactCSSTransitionGroup  transitionName="slider" component="div">
      {this.state.open && <BarContent key="content"> {this.props.children} </BarContent>}
      </ReactCSSTransitionGroup>
      </div>
      );
  } 

});
