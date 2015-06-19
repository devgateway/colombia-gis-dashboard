/*Tree list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./treeListItem.jsx');
var _=require('lodash');
var If=require('../commons/if.jsx');

var TreeView =  React.createClass({


  onStatusChange: function(status) {
    this.setState(_.clone(status)); //make a copy of the state would make sense 
    if (this.props.onItemsLoaded){
      this.props.onItemsLoaded(this._getItemsFiltered());
    }
  },

  _getItemsFiltered: function() {
    return (this.props.parentIdValue)? this._filterItems(this.state.items,this.props.parentField,this.props.parentIdValue):this.state.items;
  },
  
  _addSelected: function(list, id) {
    options = options || {};
    list.push(id);
  },

  _removeSelected: function(list, id) {
    options = options || {};
    _.remove(list, function(item) {
      return item == id
    })
  },

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
    this.setState(_.assign(this.state, {
      'selected': newSelection
    }));

    if (this.props.onSelectionChange){
      this.props.onSelectionChange(this.state.selected);
    }
  },

  _filterItems: function(items,field,value){
    return _.filter(items,
      function(item){
        return item[field]==value;
      })
  },

  _toggle:function(){
    this.setState(_.assign(this.state,{expanded:!this.state.expanded}));
  },

  _onSelectAll: function() {
    var selection = [];
    this._getItemsFiltered().map(function(item) {
      this._addSelected(selection, item.id)
    }, this);
    this._triggerSelectionChange(selection);
  },

  _onSelectNone: function() {
    this._triggerSelectionChange([]);
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.selectAll!=undefined && nextProps.selectAll!=this.props.selectAll){
      if (nextProps.selectAll){
        this._onSelectAll();
      } else {
        this._onSelectNone();
      }
    }
  },
  
  componentDidMount: function() {
    if (this.props.store){
      this.unsubscribe = this.props.store.listen(this.onStatusChange);
      this.props.store.load();
    }
  },

  componentWillUnmount: function() {
    if (this.props.store){
      this.unsubscribe();
    }
  },

  getInitialState: function() {
    return {
      expanded:false,
      items: [],
      selected: [],
      filter: '',
    };
  },

  render: function() {
    var items = this._getItemsFiltered();
    if (!this.props.collapsed){
      return ( 
      <ul>{this.props.label}
      {
        items.map(function(item) {    
          return (
            <ul>
              <Item {...item} onItemChange={this._onItemChange} showToggler={this.props.nested!=undefined} selected={this.state.selected.indexOf(item.id)> -1}> 
                {(this.props.nested)? <TreeView {...this.props.nested} parentIdValue={item.id}/>:null}
              </Item>
            </ul>)            
        }.bind(this))
      }
      </ul>
      );
    } else {
      return null;
    }
 }
});

/*end tree view*/

module.exports = React.createClass({

  mixins: [PureRenderMixin],
  
  _onItemChange: function(id, selected) {
    console.log('TreeList -> _onItemChange');
  },

  _onSearch: function(keyword) {
    console.log('TreeList -> _onSearch');
  },


  _onSearchEnterKey: function() {
    console.log('TreeList -> _onSearchEnterKey');
  },

  _onSelectAll: function() {
    this.setState(_.assign(this.state,{selectAll: true,date:new Date()}));
    this.forceUpdate();
  },

  _onSelectNone: function() {
    this.setState(_.assign(this.state,{selectAll: false,date:new Date()}));
    this.forceUpdate();
  },

  getInitialState: function() {
    return {
      selectAll: false
    };
  },

  render: function() {
    console.log('TreeList -> Render');
    var children = React.Children.map(this.props.children, function(child) {
      return child ? 
      React.addons.cloneWithProps(child, { 
        onSearch:this._onSearch, onSearchEnterKey:this._onSearchEnterKey, 
        onSelectAll:this._onSelectAll, onSelectNone:this._onSelectNone}) 
      : null;
    }, this);

    return ( 
      <div> 
        {children}
        <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
        <TreeView {...this.props.nested} selectAll={this.state.selectAll} date={this.state.date}/>
      </div>
      );
  }

});