'use strict';
var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var _=require('lodash');

module.exports = React.createClass({

  mixins: [PureRenderMixin],
  
  getInitialState: function() {
    return {
      selected: this.props.selected, 
      expanded:true,      
    };
  },

  render: function() {
    return(  
      <div className={className}>
        <span> {this.props.label}</span>
      </div>                  
    );
  }
}); 
