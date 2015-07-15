/*Basic list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./multiLevelItem.jsx');
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

  _getLists: function(lists, level) {
    lists.push(_.filter(this.state[level.levelParam], function(it){return !it.hide}));
    if (level.child){
      this._getLists(lists, level.child);
    }
  },

  render: function() {
    var lists = [];
    if (this.state.levels){
      this._getLists(lists, this.state.levels);
    } 
    if (this.props.active){
      return ( 
        <div className="tab-content">
          <div className="tab-pane fade active in">
            <div className="filter-group-panel selected">
              
              <div className="filter-group-panel-header">
                <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>                
              </div>
              <KeywordSearch onSearch={this._onSearch} lengthLimit="4" onClear={this._onSearchClear}/>
              <div className="filter-list-container">
                <ul className="filter-list">
                {
                  lists.map(function(list) {
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