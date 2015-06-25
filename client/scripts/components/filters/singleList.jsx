/*Basic list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./item.jsx');
var _=require('lodash');
var CommonsMixin=require('./commonsMixins.jsx');
var KeywordSearch=require('./keywordSearch.jsx');
var SelectAllNone=require('./allNoneSelector.jsx');
var SelectionCounter = require('./selectionCounter.jsx');

module.exports = React.createClass({

   mixins: [CommonsMixin,PureRenderMixin],

  
  _onItemChange: function(id, selected) {
    var list = this.state.selected.slice(0); //clone values;
    if (selected) {
      this._addSelected(list, id);
    } else {
      this._removeSelected(list, id);
    }
    this._triggerSelectionChange(list);
  },

  _triggerSelectionChange: function(newSelection) {
    this.setState(_.assign(this.state, {'selected': newSelection}));
    this.forceUpdate();
  },

  _onSearch: function(keyword) {
    if (keyword.length > 0) {
      this.setState(_.assign(this.state, {
        'filter': keyword
      }));
    } else if (this.state.filter.length > 0) {
      this.setState(_.assign(this.state, {
        'filter': ''
      }));
    }
    this.forceUpdate();
  },

  _onSearchEnterKey: function() {
    var selection = this.state.selected.slice(0);
    this.state.items.map(function(item) {
      if (this._isVisible(item)) {
        this._addSelected(selection, item.id)
      }
    }, this);

    this._triggerSelectionChange(selection);
  },

  _isVisible: function(item) {
    if (this.state.showOnlySelected && this.state.selected.indexOf(item.id)==-1) {
      return false;
    }
    if (this.state.filter.length > 1) {
      var pattern = new RegExp(this.state.filter, 'i');
      return pattern.test(item.name)
    } else {
      return true;
    }
  },

  _onCounterClicked: function(selected) {
    this.setState(_.assign(this.state, {'showOnlySelected': selected}));
    this.forceUpdate();
  },
    
  /*Select all None*/
  _onSelectAll: function() {
    var selection = [];
    this.state.items.map(function(item) {
      this._addSelected(selection, item.id)
    }, this);
    this._triggerSelectionChange(selection);
  },

  _onSelectNone: function() {
    this.actions.clean();
    this._triggerSelectionChange([]);
  },
  
  componentDidMount: function(){
    $(this.getDOMNode()).find('.filter-list-container').mCustomScrollbar({theme:"inset-dark"});    
  },

  getInitialState: function() {
    return {
      showOnlySelected: false,
      items: [],
      selected: [],
      filter: '',
    };
  },

  render: function() {
    //console.log("render SingleList");
    return ( 
      <div> 
        <div className="filter-group-panel-header">
          <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
          <SelectionCounter selected={this.state.selected.length} total={this.state.items.length} onCounterClicked={this._onCounterClicked}/>
          <SelectAllNone onSelectAll={this._onSelectAll} onSelectNone={this._onSelectNone}/>
        </div>
        <KeywordSearch onSearch={this._onSearch} onSearchEnterKey={this._onSearchEnterKey}/>
        <div className="filter-list-container">
          <ul className="filter-list">
          {
            this.state.items.map(function(item) {
              if (this._isVisible(item)){
                return (<li><Item {...item} onItemChange={this._onItemChange} selected={this.state.selected.indexOf(item.id)> -1}/></li>)
              }else{
                return null
              }
            },this) 
          }
          </ul>
        </div>
      </div>
      );
  }

});