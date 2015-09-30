'use strict';
var React = require('react/addons');

var TogglerContent=React.createClass({
  _getVisible:function(when){
    return this.props.visibleWhen==when;
  },
  render:function(){
    var children = React.Children.map(this.props.children, function(child) {
      return child.props.toggler ? React.addons.cloneWithProps(child,{'onClick':this.props.onClick}) :  React.addons.cloneWithProps(child,{}); //if toggler add click event
    }, this);

    return ((this.props.stage==this.props.visibleWhen) || (this.props.visibleWhen=='always'))?<div>{children}</div>:null
  }
});


var Toggler=React.createClass({
  componentWillReceiveProps :function(nextProps){
    this.setState({'expanded': nextProps.expanded || this.state.expanded});
  },

  getInitialState:function(){
    return {'expanded':false};
  },

  _toggle:function(){
   this.setState({'expanded':(!this.state.expanded)});
   this.forceUpdate();
 },

 render:function(){
   var children = React.Children.map(this.props.children, function(child) {
    return child ? React.addons.cloneWithProps(child, {'stage':(this.state.expanded?'expanded':'collapsed'), 'onClick':this._toggle}) : null;
  }, this);

   return (<div className='toggler' >{children}</div>)
 }

});

module.exports ={
  Toggler:Toggler,
  TogglerContent:TogglerContent
};