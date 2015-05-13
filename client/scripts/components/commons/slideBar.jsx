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
  
  toggle: function() {
    $(this.getDOMNode()).find(".slider_content").toggle( "slide" );
    this.setState({
      open: true
    });
  },
  
  render: function() {
    var content = this.state.open? this.props.children : "";
    return (
      <div id="sidebar-wrapper">
        <div className="panel-toggle">
          <i className="fa fa-bars" onClick={this.toggle}></i>
        </div>
        
        <div className="slider_content">
          {this.props.children}
        </div>
      </div>
      );
  } 

});

