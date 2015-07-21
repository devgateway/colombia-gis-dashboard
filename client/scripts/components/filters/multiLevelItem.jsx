
var React = require('react');
var CustomCheckbox = require('../commons/customCheckbox.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var _=require('lodash');

module.exports = React.createClass({

  mixins: [PureRenderMixin],

  _onItemChange:function(selected){
    if (this.props.onItemChange){
      this.props.onItemChange(this.props,selected); //21,true|false
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
    return {selected: this.props.selected};
  },

  componentDidUpdate: function(){
    $('.item-label').tooltip();
  },

  componentWillMount: function(){
    //console.log("componentWillMount multilevel!!");
  },

  render: function() {
    //console.log("render multilevel!!");
    var label = "";
    if (this.props.parentsTrace){
      _.forEach(this.props.parentsTrace, function(lbl){label = label + lbl + " > "});
    }
    label = label + this.props.label;
    var itemClassNames=(this.state.selected===true)?'item-label label-selected':'item-label';
    if (!this.props.hide){
      return(  
        <div className="filter-col">
          <CustomCheckbox selected={this.state.selected} value={this.props.id} onChange={this._handleClick}/>
          <span onClick={this._handleClick} className={itemClassNames} title={label}> {label}</span>
        </div>)
    } else {
      return null;
    }      
  }
});
