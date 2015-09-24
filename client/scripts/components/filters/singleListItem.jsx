
var React = require('react');
var CustomCheckbox = require('../commons/customCheckbox.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

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
    this.setState({'selected':nextProps.selected || false})
  },

  getInitialState: function() {
    return {selected: this.props.selected};
  },

  componentDidMount: function(){
    $('.item-label').tooltip();
  },

  render: function() {
    var itemClassNames=(this.state.selected)?'item-label label-selected':'item-label';
    var colClass = this.props.searchAndSelectMode? "filter-col single-col" : "filter-col";
    if (this.props.searchAndSelectMode || (!this.props.hide && (!this.props.showOnlySelected || (this.props.showOnlySelected && (this.props.selected))))){
      return(  
        <div className={colClass}>
          <CustomCheckbox selected={this.state.selected} value={this.props.id} onChange={this._handleClick}/>
          <span onClick={this._handleClick} className={itemClassNames} title={this.props.label.length>30? this.props.label : ""}> {this.props.label}</span>
        </div>)
    } else {
      return null;
    }      
  }
});
