/*Tree list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./treeListItem2.jsx');
var _=require('lodash');
var If=require('../commons/if.jsx');

var TreeView =  React.createClass({

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

  _onItemChange: function(level, id, selected) {
    this.props.onItemChange(level, id, selected);
  },

  _triggerSelectionChange: function(newSelection) {
    this.setState(_.assign(this.state, {
      'selected': newSelection
    }));

    if (this.props.onSelectionChange){
      this.props.onSelectionChange(this.state.selected);
    }
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

  changeFullSelection: function(selected) {
    var selection = [];
    if (selected){
      this._getItemsFiltered().map(function(item) {
        this._addSelected(selection, item.id)
      }, this);
    }
    this._triggerSelectionChange(selection);
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.selectAll!=undefined){
      if (nextProps.selectAll.timestamp && nextProps.selectAll.timestamp!=this.props.selectAll.timestamp){
        this.changeFullSelection(nextProps.selectAll.value);
      } else if (nextProps.selectAll.value!=this.props.selectAll.value){
        this.changeFullSelection(nextProps.selectAll.value);
      }
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
  
  render: function() {
    //console.log("render location -> "+this.props.name);
    return ( 
      <div>
        <Item {...this.props} 
          onItemChange={this._onItemChange} 
          expanded={this.state.expanded} 
          onToggle={this._onToggle}
          childrenTotal={this.props.nested? this.props.nested.length : 0}
          childrenSelected={this.props.nested? this._getNestedSelected().length : 0}/>
          {(this.props.nested && this.state.expanded)? 
            <ul>
            {
              this.props.nested.map(function(item) {   
                  return (<li><TreeView {...item} onItemChange={this.props.onItemChange} expanded={false}/></li>)            
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

  _addSelected: function(list, id) {
    options = options || {};
    list.push(id);
    this.actions.add(id);
  },

  _removeSelected: function(list, id) {
    options = options || {};
    _.remove(list, function(item) {
      return item == id
    })
    this.actions.remove(id);
  },

  _onItemChange: function(level, id, selected) {
    this.actions.updateItemSelection(level, id, selected);
  },

  _onSearch: function(keyword) {

    if (keyword.length > 0) {
      this.setState(_.assign(this.state, {
        'filter': keyword
      }));
      this.forceUpdate();
    } else if (this.state.filter.length > 0) {
      this.setState(_.assign(this.state, {
        'filter': ''
      }));
      this.forceUpdate();
    }
  },

  _onSearchEnterKey: function() {
    console.log('TreeList -> _onSearchEnterKey');
  },

  _onSelectAll: function() {
    this.setState(_.assign(this.state,{selectAll: {value: true, timestamp: Date.now()}}));
    this.forceUpdate();
  },

  _onSelectNone: function() {
    this.setState(_.assign(this.state,{selectAll: {value: false, timestamp: Date.now()}}));
    this.forceUpdate();
  },

  componentDidMount: function() {
    if (this.props.store){
      this.unsubscribe = this.props.store.listen(this.onStatusChange);
      this.actions = this.props.actions;
      this.actions.load()
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
    var items = this.state.itemsTree || [];
    var className = ""
    if (this.props.collapsed){
      className = "hidden"
    }  
    return ( 
      <div> 
        <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
        <div className="filter-list-container">
        {
          items.map(function(item) {   
            return (
              <div className="">
                <TreeView {...item} onItemChange={this._onItemChange} expanded={false}/>
              </div>)            
          }.bind(this))
        }
        </div>
      </div>
    );    
  }
});