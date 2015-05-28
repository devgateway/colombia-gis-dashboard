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

  componentDidMount:function(){
    $(this.getDOMNode()).find('.panel-toggle').tooltip();
  },
  
  toggle: function() {
    $(this.getDOMNode()).find(".slider_content").toggle( "slide" );
    if(this.state.open){
      $(this.getDOMNode()).find('.panel-toggle').tooltip({content: "Menu"});
      this.setState({
        open: false
      });
    } else {
      $(this.getDOMNode()).find('.panel-toggle').tooltip({content: "Hide Menu"});
      this.setState({
        open: true
      });
    }

  },
  
  render: function() {
    var content = this.state.open? this.props.children : "";
    return (
      <div id="sidebar-wrapper">
        <div className="panel-toggle" title="Menu">
          <i className="fa fa-bars" onClick={this.toggle}></i>
        </div>
        
        <div className="slider_content">
          {this.props.children}
        </div>
      </div>
      );
  } 

});

