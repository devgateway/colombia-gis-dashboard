/*Basic list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./singleListItem.jsx');
var _=require('lodash');
var CommonsMixins=require('./commonsMixins.jsx');
var KeywordSearch=require('./keywordSearch.jsx');
var SelectAllNone=require('./allNoneSelector.jsx');
var SelectionCounter = require('./selectionCounter.jsx');

module.exports = React.createClass({

  mixins: [CommonsMixins, PureRenderMixin],

  componentDidUpdate: function(){
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
    var selectedItems = _.filter(this.state.items, function(it){return it.selected}); 
    if (this.props.active){
      return ( 
        <div className="tab-content">
          <div className="tab-pane fade active in">
            <div className="filter-group-panel selected">
              
              <div className="filter-group-panel-header">
                <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
                <SelectionCounter total={this.state.items.length} selected={selectedItems.length} onCounterClicked={this._onCounterClicked}/>
                <SelectAllNone onSelectAll={this._onSelectAll} onSelectNone={this._onSelectNone}/>
              </div>
              <KeywordSearch onSearch={this._onSearch} onSearchEnterKey={this._onSearchEnterKey}/>
              <div className="filter-list-container">
                <ul className="filter-list">
                {
                  this.state.items.map(function(item) {
                    return (<li><Item {...item} onItemChange={this._onItemChange} showOnlySelected={this.state.showOnlySelected}/></li>)                    
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