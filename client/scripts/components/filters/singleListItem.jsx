
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
    if(nextProps.selected!=undefined){
        this.setState({'selected':nextProps.selected})
    };
  },

  getInitialState: function() {
    return {selected: this.props.selected};
  },

  render: function() {
    var itemClassNames=(this.state.selected===true)?'item-label label-selected':'item-label';
    if (!this.props.hide && (!this.props.showOnlySelected || (this.props.showOnlySelected && (this.props.selected)))){
      return(  
        <div className="filter-col">
          <CustomCheckbox selected={this.state.selected} value={this.props.id} onChange={this._handleClick}/>
          <span onClick={this._handleClick} className={itemClassNames}> {this.props.label}</span>
        </div>)
    } else {
      return null;
    }      
  }
});
