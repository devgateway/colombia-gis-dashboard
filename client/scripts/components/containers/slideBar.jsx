'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var Link = require('react-router').Link;

var ReactTransitionGroup = React.addons.TransitionGroup;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
 

var BarContent = React.createClass({
  render: function() {
    return <div className="example" ref="drawer">{this.props.children}</div>;
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
          <div className="slider">
            <div className="slideToggler  icon-white" onClick={this.state.open?this.close:this.open}>
              <i className="glyphicon glyphicon-th-list"></i>
            </div>
            <div className="slideContent">
                <ReactCSSTransitionGroup  transitionName="example" component="div">
                  {this.state.open && <BarContent key="content">{this.props.children}</BarContent>}
                </ReactCSSTransitionGroup >
            </div>
            
          </div>
        );
      } 

});
