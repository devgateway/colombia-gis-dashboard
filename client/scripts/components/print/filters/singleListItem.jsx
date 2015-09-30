'use strict';
var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

module.exports = React.createClass({

  mixins: [PureRenderMixin],

  getInitialState: function() {
    return {'selected': this.props.selected};
  },

  render: function() {
    return(  
      <div className='filter-col'>
        <span> {this.props.label}</span>
      </div>
    );          
  }
});
