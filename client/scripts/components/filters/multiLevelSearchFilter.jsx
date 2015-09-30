'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./multiLevelItem.jsx');
var _=require('lodash');
var CommonsMixins=require('./commonsMixins.jsx');
var KeywordSearch=require('./keywordSearch.jsx');
var SelectAllNone=require('./allNoneSelector.jsx');
var SelectionCounter = require('./selectionCounter.jsx');
var CustomCheckbox = require('../commons/customCheckbox.jsx');

module.exports = React.createClass({

  mixins: [CommonsMixins, PureRenderMixin],

  componentDidUpdate: function(){
    $(this.getDOMNode()).find('.filter-list-container').mCustomScrollbar({theme:'inset-dark'});
    var listsFull = [];
    if (this.state.levels){
      this._getLists(listsFull, this.state.levels, true);
    } 
    var totalItems = 0;
    var totalSelected = 0;
    _.forEach(listsFull, function(list){
      if (list){
        totalItems = totalItems + list.length;
        totalSelected = totalSelected + _.filter(list, function(it){return it.selected}).length;
      }
    });
    this.props.onChangeCounter(this.state.lowestLevel, totalSelected, totalItems);
  },

  getInitialState: function() {
    return {
      showOnlySelected: false,
      items: [],
      selected: [],
      filter: ''
    };
  },

  _getLists: function(lists, level, full) {
    var self = this;
    if (full){
      lists.push(this.state[level.levelParam]);
    } else {
      lists.push(_.filter(this.state[level.levelParam], function(it){return ((!it.hide)  || (self.state.showOnlySelected && it.selected))}));
    }
    if (level.child){
      this._getLists(lists, level.child, full);
    }
  },

  _hasItems: function(array){
    var hasItems = false;
    _.forEach(array, function(arrayInside){if (arrayInside.length>0){hasItems=true}});
    return hasItems;
  },

  render: function() {
    var listsFiltered = [];
    if (this.state.levels){
      this._getLists(listsFiltered, this.state.levels);
    } 
    var noResults = '';
    if (!this._hasItems(listsFiltered)){
      noResults = <div className='filter-no-results'>
                    <br/>{<Message message='filters.performSearch'/>}
                </div>
    }
    if (this.props.active){
      return ( 
        <div className='tab-content'>
          <div className='tab-pane fade active in'>
            <div className='filter-group-panel selected'>
              
              <div className='filter-group-panel-header'>
                <span className='filter-label' role='label'>{<Message message={this.props.label}/>}</span>                
                <div className='show-selected'>
                  <span><CustomCheckbox onChange={this._onShowSelectedClicked}/></span>
                  <span><Message message='filters.showSelected'/></span>                                    
                </div> 
                <SelectAllNone onSelectAll={this._onSelectAll} onSelectNone={this._onSelectNone}/>
              </div>
              <KeywordSearch onSearch={this._onSearch} lengthLimit='3' onClear={this._onSearchClear}/>
              {noResults}
              <div className='filter-list-container'>
                <ul className='filter-list'>
                {
                  listsFiltered.map(function(list) {
                    return (list.map(function(item) {
                      return (<li><Item {...item} onItemChange={this._onItemChange} showOnlySelected={this.state.showOnlySelected}/></li>)
                    },this))                                       
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