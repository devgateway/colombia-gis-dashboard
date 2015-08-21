/*Basic list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./singleListItem.jsx');
var _=require('lodash');
var CommonsMixins=require('./commonsMixins.jsx');
var KeywordSearch=require('./keywordSearch.jsx');
var SelectAllNone=require('./allNoneSelector.jsx');
var SelectionCounter = require('./selectionCounter.jsx');
var CustomCheckbox = require('../commons/customCheckbox.jsx');

module.exports = React.createClass({

  mixins: [CommonsMixins, PureRenderMixin],

  componentDidUpdate: function(){
    $(this.getDOMNode()).find('.filter-list-container').mCustomScrollbar({theme:"inset-dark"});
    this.props.onChangeCounter(this.props.param, _.filter(this.state.items, function(it){return it.selected}).length, this.state.items.length);    
  },

  getInitialState: function() {
    return {
      showOnlySelected: false,
      items: [],
      selected: [],
      filter: '',
    };
  },

  _getItemList: function() {
    var self = this;
    var list = [];
    if (this.props.searchAndSelectMode){
      return _.filter(this.state.items, function(it){return ((!it.hide)  || (self.state.showOnlySelected && it.selected))});
    } else {
      return this.state.items;
    }  
  },

  render: function() {
    var itemList = this._getItemList();
    var showOnlySelected = this.props.searchAndSelectMode? false : this.state.showOnlySelected;
    var noResults = "";
    if (this.props.searchAndSelectMode) {
      if (itemList.length==0){
        noResults = <div className="filter-no-results"><br/>{<Message message="filters.performSearch"/>}</div>
      }
    } else {
      if (this.state.noResults){
        noResults = <div className="filter-no-results"><br/>{<Message message="filters.noResults"/>}</div>
      }
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
              <KeywordSearch onSearch={this._onSearch} 
                lengthLimit={this.props.searchAndSelectMode? "5" : ""} 
                onSearchEnterKey={this.props.searchAndSelectMode? "" : this._onSearchEnterKey}
                onClear={this._onSearchClear}/>
              {noResults}
              <div className="filter-list-container">
                <ul className="filter-list">
                {
                  itemList.map(function(item) {
                    return (<li>
                        <Item {...item} 
                          onItemChange={this._onItemChange} 
                          showOnlySelected={this.state.showOnlySelected}
                          searchAndSelectMode={this.props.searchAndSelectMode}/>
                      </li>)                    
                  },this) 
                }
                </ul>
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