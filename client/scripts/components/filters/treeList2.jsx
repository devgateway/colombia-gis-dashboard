/*Tree list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./treeListItem2.jsx');
var _=require('lodash');
var If=require('../commons/if.jsx');
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

  mixins: [PureRenderMixin],
  
  onStatusChange: function(status) {
    this.setState(_.clone(status)); //make a copy of the state would make sense 
  },

  _onItemChange: function(item, selected) {
    this.actions.updateItemSelection(item, selected);
  },

  _onSearch: function(keyword) {
    this.actions.filterByKeyword(keyword);
  },

  _onSearchEnterKey: function() {
    this.actions.selectFilteredByKeyword(keyword)
  },

  _onCounterClicked: function(selected) {
    this.setState(_.assign(this.state, {'showOnlySelected': selected}));
    this.forceUpdate();
  },
  
  /*Select all None*/
  _onSelectAll: function() {
    this.actions.updateAllSelection(true);
  },

  _onSelectNone: function() {
    this.actions.updateAllSelection(false);
  },
  
  componentDidMount: function() {
    if (this.props.store){
      this.unsubscribe = this.props.store.listen(this.onStatusChange);
      this.actions = this.props.actions;
      this.actions.load();
    }
  },

  componentWillUnmount: function() {
    if (this.props.store){
      this.unsubscribe();
    }
  },

  getInitialState: function() {
    return {
      selectAll: {value: false, timestamp: Date.now()}
    };
  },

  render: function() {
    console.log("render -> treeList")
    var items = this.state.itemsTree || [];
    var lowerLevelCounterTotal = this.state.municipalities? this.state.municipalities.length : 0;
    var lowerLevelCounterSelected =  this.state.municipalities? _.filter(this.state.municipalities, function(it){return it.selected}).length : 0;
    return ( 
      <div> 
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
    );    
  }
});