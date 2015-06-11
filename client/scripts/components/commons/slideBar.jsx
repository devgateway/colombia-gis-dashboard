'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var LanStore=require('../../stores/lanStore.js');
var Link = require('react-router').Link;

var ReactTransitionGroup = React.addons.TransitionGroup;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var BarContent = React.createClass({
  render: function() {
    return <div className="slider_content">{this.props.children}</div>;
  }
});


module.exports  = React.createClass({
  mixins: [Reflux.connect(LanStore, 'lan')],
  
  getInitialState: function() {
    return {
      open: false
    };
  },

  componentDidMount:function(){
    $(this.getDOMNode()).find('.panel-toggle').tooltip();
  },

  componentDidUpdate:function(){
    if(this.state.open){
      $(this.getDOMNode()).find('.panel-toggle').tooltip({content: i18n.t("app.hideMenu")});
    } else {
      $(this.getDOMNode()).find('.panel-toggle').tooltip({content: i18n.t("app.menu")});
    }
  },
  
  toggle: function() {
    $(this.getDOMNode()).find(".slider_content").toggle( "slide" );
    if(this.state.open){
      $(this.getDOMNode()).find('.panel-toggle').tooltip({
        delay:10,
        content: i18n.t("app.menu")});
      this.setState({
        open: false
      });
    } else {
      $(this.getDOMNode()).find('.panel-toggle').tooltip({content: i18n.t("app.hideMenu")});
      this.setState({
        open: true
      });
    }

  },
  
  render: function() {
    var content = this.state.open? this.props.children : "";
    return (
      <div id="sidebar-wrapper">
        <div className="panel-toggle" title={i18n.t("app.menu")}>
          <i className="fa fa-bars" onClick={this.toggle}></i>
        </div>
        
        <div className="slider_content">
          {this.props.children}
        </div>
      </div>
      );
  } 

});

