
var React = require('react');
var CustomCheckbox = require('../commons/customCheckbox.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var _=require('lodash');
var If=require('../commons/if.jsx');

module.exports = React.createClass({

  mixins: [PureRenderMixin],
  
  _onItemChange:function(selected){
    if (this.props.onItemChange){
      this.props.onItemChange(this.props.id,selected); 
    }
    this.setState({'selected':selected})
  },

  _handleClick:function(){
    this._onItemChange(!this.state.selected);
  },

  _updateSelectionCount:function(items){
    this.setState({'childrenSelected': items.length});
  },

  _updateTotalCount:function(items){
    this.setState({'childrenTotal': items.length});
  },
  
  _toggle:function(){
    this.setState(_.assign(this.state,{expanded:!this.state.expanded}))
    this.forceUpdate();
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

  render: function() {
    var itemClassNames=(this.state.selected===true)?'item-label label-selected':'item-label';
    var children = React.Children.map(this.props.children, function(child) {
      return child ? 
      React.addons.cloneWithProps(child, { 
        onSelectionChange: this._updateSelectionCount,
        onItemsLoaded: this._updateTotalCount,
        selectAll: this.state.selected,
        collapsed: !this.state.expanded
      }) 
      : null;
    }, this);
    debugger;    
    return(  
      <li>
        <div className="filter-col">
          <CustomCheckbox selected={this.state.selected} value={this.props.id} onChange={this._handleClick}/>
          <span onClick={this._handleClick} className={itemClassNames}> {this.props.name}</span>
        </div>
        <If condition={children}>
          <div> ({this.state.childrenSelected} / {this.state.childrenTotal}) </div>
          <div onClick={this._toggle}>{(this.state.expanded)?<span>-</span>:<span>+</span>}</div>
          {children}  
        </If>
      </li>
    )
  }
});
