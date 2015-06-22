/*Basic list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./item.jsx');
var _=require('lodash');
var CommonsMixin=require('./commonsMixins.jsx');

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


  getInitialState: function() {
    return {
      items: [],
      selected: [],
      filter: '',
    };
  },


  _isVisible: function(item) {
    if (this.state.filter.length > 1) {
      var pattern = new RegExp(this.state.filter, 'i');
      return pattern.test(item.name)
    } else {
      return true;
    }
  },


  /*Select all None*/
  _onSelectAll: function() {
    var selection = this.state.selected.slice(0);

    this.state.items.map(function(item) {
      this._addSelected(selection, item.id)

    }, this);
    this._triggerSelectionChange(selection);
  },

  _onSelectNone: function() {
    this.actions.clean();
    this._triggerSelectionChange([]);
  },
  
  render: function() {

    var children = React.Children.map(this.props.children, function(child) {
      
      return child ? React.addons.cloneWithProps(child, {
        onSearch:this._onSearch,
        onSearchEnterKey:this._onSearchEnterKey,
        onSelectAll:this._onSelectAll,
        onSelectNone:this._onSelectNone

      }) : null;
    }, this);
    return ( 
      <div> 
      {children}
      <ul>
      {

        this.state.items.map(function(item) {
          if (this._isVisible(item)){
            return (<Item {...item} onItemChange={this._onItemChange} selected={this.state.selected.indexOf(item.id)> -1}/>)
          }else{
            return null
          }


        },this) 
      }
      </ul>
      </div>
      );
  }

});