'use strict';
var React = require('react');
var CustomCheckbox = require('../commons/customCheckbox.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var _=require('lodash');
var If=require('../commons/if.jsx');

module.exports = React.createClass({

  mixins: [PureRenderMixin],
  
  _onItemChange:function(selected){
    if (this.props.onItemChange){
      this.props.onItemChange(this.props, selected); 
    }
    this.setState({'selected':selected})
  },

  _handleClick:function(){
    this._onItemChange(!this.state.selected);
  },

  componentWillReceiveProps :function(nextProps){
    if(nextProps.selected!=undefined){
      this.setState({'selected':nextProps.selected})
    };
  },

  getInitialState: function() {
    return {
      selected: this.props.selected, 
      expanded:false, 
      childrenSelected:0
    };
  },

  componentDidMount: function(){
    $('.item-label').tooltip();
  },

  render: function() {
    var itemClassNames=(this.state.selected===true)?'item-label label-selected':'item-label';
    
    var className = '';
    var childrenCounter = '';
    var childrenToggler = '';
    var itemClassName = this.props.nested? 'filter-col-parent' : 'filter-col';
    if (this.props.nested){
      childrenCounter = <div className='children-count'> ({this.props.childrenSelected} / {this.props.childrenTotal}) </div>;
      childrenToggler =
              <div className='parent-toggle' onClick={this.props.onToggle}>
                  <span className={this.props.expanded? 'collapse-icon fa fa-minus' : 'collapse-icon fa fa-plus'}></span>
                  <span className='toggle-label'>{this.props.expanded? <Message message='filters.collapse'/> : <Message message='filters.expand'/>}</span>
              </div>;
    }
    if (!this.props.hide && 
       (!this.props.showOnlySelected || (this.props.showOnlySelected && (this.props.selected || this.props.childrenSelected > 0)))){
      return(  
        <div className={className}>
          <div className={this.props.nested? 'filter-parent' : ''}>
            <div className={itemClassName}>
              <CustomCheckbox selected={this.state.selected} value={this.props.cid} onChange={this._handleClick}/>
              <span onClick={this._handleClick} className={itemClassNames} title={this.props.label.length>30? this.props.label : ''}> {this.props.label}</span>
              {childrenCounter}
              {childrenToggler}
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}); 
