
var React = require('react');
var CustomCheckbox = require('../../commons/customCheckbox.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var _=require('lodash');
var If=require('../../commons/if.jsx');

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
          
        
      )
  }
}); 
