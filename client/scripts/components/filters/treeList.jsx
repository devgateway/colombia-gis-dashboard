/*Tree list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./treeListItem.jsx');
var _=require('lodash');
var If=require('../commons/if.jsx');
var CommonsMixins=require('./commonsMixins.jsx');
var KeywordSearch=require('./keywordSearch.jsx');
var SelectAllNone=require('./allNoneSelector.jsx');
var SelectionCounter = require('./selectionCounter.jsx');

var TreeView =  React.createClass({

  _onItemChange: function(item, selected) {
    this.props.onItemChange(item, selected);
  },

  _getNestedSelected: function(){
    return _.filter(this.props.nested, function(item){
        return item.selected? true : false;
      });
  },

  _onToggle:function(){
    this.setState(_.assign(this.state,{expanded:!this.state.expanded}));
    this.forceUpdate();
  },

  getInitialState: function() {
    return {
      expanded: this.props.expanded,
      items: [],
      selected: [],
      filter: '',
    };
  },
  
  render: function() {
    //console.log("render location -> "+this.props.name);
    return ( 
      <div>
        <Item {...this.props} 
          showOnlySelected={this.props.showOnlySelected}
          onItemChange={this._onItemChange} 
          expanded={this.state.expanded} 
          onToggle={this._onToggle}
          childrenTotal={this.props.nested? this.props.nested.length : 0}
          childrenSelected={this.props.nested? this._getNestedSelected().length : 0}/>
          {(this.props.nested && this.state.expanded)? 
            <ul>
            {
              this.props.nested.map(function(item) {   
                  return (<li><TreeView {...item} showOnlySelected={this.props.showOnlySelected} onItemChange={this.props.onItemChange} expanded={false}/></li>)            
              }.bind(this))
            }
            </ul>
          :null}
      </div>
    );    
  }
});

/*end tree view*/

module.exports = React.createClass({

  mixins: [CommonsMixins, PureRenderMixin],
  
  componentDidUpdate: function() {
    $(this.getDOMNode()).find('.filter-list-container').mCustomScrollbar({theme:"inset-dark"});
  },

  getInitialState: function() {
    return {
      itemsTree: []
    };
  },

  render: function() {
    console.log("render -> treeList")
    var items = this.state.itemsTree || [];
    var lowestLevel = this.state[this.state.lowestLevel];
    var lowerLevelCounterSelected =  0;
    var lowerLevelCounterTotal = 0;
    if (lowestLevel){
      lowerLevelCounterTotal = lowestLevel.length;
      lowerLevelCounterSelected =  _.filter(lowestLevel, function(it){return it.selected}).length;  
    }
    if (this.props.active){
      return ( 
        <div className="tab-content">
          <div className="tab-pane fade active in">
            <div className="filter-group-panel selected">
              
              <div className="filter-group-panel-header">
                <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
                <SelectionCounter selected={lowerLevelCounterSelected} total={lowerLevelCounterTotal} onCounterClicked={this._onCounterClicked}/>
                <SelectAllNone onSelectAll={this._onSelectAll} onSelectNone={this._onSelectNone}/>
              </div>
              <KeywordSearch onSearch={this._onSearch} onSearchEnterKey={this._onSearchEnterKey}/>
              <div className="filter-list-container">
              {
                items.map(function(item) {   
                  return (
                    <div className="">
                      <TreeView {...item} showOnlySelected={this.state.showOnlySelected} onItemChange={this._onItemChange} expanded={false}/>
                    </div>)            
                }.bind(this))
              }
              </div>
            </div>
          </div>
        </div>
      );    
    } else {
      return null;
    }
  }
});