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
var CustomCheckbox = require('../commons/customCheckbox.jsx');

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
    if (this.state.expanded){
      //this.setState(_.assign(this.state,{expanded: false})); 
      this.props.itemExpanded(-1); 
    } else {
      this.props.itemExpanded(this.props.index);
    }
  },

  getInitialState: function() {
    return {
      expanded: this.props.expanded,
      items: [],
      selected: [],
      filter: '',
    };
  },
  
  componentWillReceiveProps: function(nextProps){
    this.setState(_.assign(this.state,{expanded: nextProps.expanded}));
    if (nextProps.expanded){
      var parent = $(this.getDOMNode()).parent();
      parent.animate({scrollTop: nextProps.index*39}, '500');
    }
  },

  render: function() {
    //console.log("render location -> "+this.props.name);
    return ( 
      <div className="item-container">
        <Item {...this.props} 
          showOnlySelected={this.props.showOnlySelected}
          onItemChange={this._onItemChange} 
          expanded={this.state.expanded} 
          onToggle={this._onToggle}
          childrenTotal={this.props.nested? this.props.nested.length : 0}
          childrenSelected={this.props.nested? this._getNestedSelected().length : 0}/>
          {(this.props.nested && this.state.expanded)? 
            <ul className="filter-list tabbed">
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

  _onItemExpanded: function(item) {
    this.setState({'itemExpanded': item});
  },
  
  componentDidUpdate: function() {
    $(this.getDOMNode()).find('.filter-list-container').mCustomScrollbar({theme:"inset-dark"});
    var lowestLevel = this.state[this.state.lowestLevel];
    var lowerLevelCounterSelected =  0;
    var lowerLevelCounterTotal = 0;
    if (lowestLevel){
      lowerLevelCounterTotal = lowestLevel.length;
      lowerLevelCounterSelected =  _.filter(lowestLevel, function(it){return it.selected}).length;  
    }
    this.props.onChangeCounter(this.state.lowestLevel, lowerLevelCounterSelected, lowerLevelCounterTotal);    
  },

  getInitialState: function() {
    return {
      itemsTree: []
    };
  },

  render: function() {
    var items = this.state.itemsTree || [];    
    var noResults = "";
    if (this.state.noResults){
      noResults = <div className="filter-no-results">
                    <br/>{<Message message="filters.noResults"/>}
                </div>
    }
    if (this.props.active){
      return ( 
        <div className="tab-content">
          <div className="tab-pane fade active in">
            <div className="filter-group-panel selected">
              
              <div className="filter-group-panel-header">
                <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
                <div className="show-selected">
                  <span><CustomCheckbox onChange={this._onShowSelectedClicked}/></span>
                  <span><Message message="filters.showOnlySelected"/></span>                                    
                </div>                
                <SelectAllNone onSelectAll={this._onSelectAll} onSelectNone={this._onSelectNone}/>
              </div>
              <KeywordSearch onSearch={this._onSearch} onSearchEnterKey={this._onSearchEnterKey}/>
              {noResults}
              <div className="filter-list-container">
              {
                items.map(function(item, index) { 
                  var exp = this.state.itemExpanded==index? true : false;
                  if (this.state.itemExpanded==index){
                    console.log("itemExpanded -> "+this.state.itemExpanded);
                  }                    
                  return (
                    <TreeView {...item} 
                      index={index} 
                      itemExpanded={this._onItemExpanded} 
                      showOnlySelected={this.state.showOnlySelected} 
                      onItemChange={this._onItemChange} 
                      expanded={this.state.itemExpanded==index}/>
                    )            
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