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

  _isVisible: function(item) {
    if (this.props.parentVisible || this.state.childVisible){
      return true;
    }
    if (this.props.filter && this.props.filter.length > 1) {
      var pattern = new RegExp(this.props.filter, 'i');
      if (pattern.test(item.name)){
        console.log("filter: "+this.props.filter+" -- itemName: "+item.name);
        return true;
      } else {
        return false;
      }
      //return pattern.test(item.name)
    } else {
      return true;
    }
  },

  _onChildVisible: function() {
    this.setState(_.assign(this.state,{childVisible: true}));
    this.forceUpdate();
  },

  _toggle:function(){
    this.setState(_.assign(this.state,{expanded:!this.state.expanded}));
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
    var className = ""
    if (this.props.collapsed){
      className = "hidden"
    }  
    return ( 
      <div className={className}>
      {
        items.map(function(item) {   
          var visible = this._isVisible(item);
          /*if (visible && this.props.parentVisible==false && this.props.onChildVisible){
            console.log("entro aca!")
            this.props.onChildVisible();
          }*/
          return (
            <div>
              <Item {...item} 
                onItemChange={this._onItemChange} 
                showToggler={this.props.nested!=undefined} 
                selected={this.state.selected.indexOf(item.id)> -1}
                visible={visible}
                parentVisible={this.props.parentVisible}
                onSetVisible={this._onChildVisible}> 
                  {(this.props.nested)? 
                    <TreeView {...this.props.nested} 
                      onChildVisible={this._onChildVisible} 
                      parentVisible={visible} 
                      filter={this.props.filter} 
                      parentIdValue={item.id}/>
                  :null}
              </Item>
            </div>)            
        }.bind(this))
      }
      </div>
    );    
  }
});

/*end tree view*/

module.exports = React.createClass({

  mixins: [PureRenderMixin],
  
  _onItemChange: function(id, selected) {
    console.log('TreeList -> _onItemChange');
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

  getInitialState: function() {
    return {
      selectAll: {value: false, timestamp: Date.now()}
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
        <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
        {children}
        <TreeView {...this.props.nested} selectAll={this.state.selectAll} filter={this.state.filter}/>
      </div>
      );
  }

});