/*Tree list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./item.jsx');
var _=require('lodash');

var TreeView =  React.createClass({

  //mixins: [PureRenderMixin],

  onStatusChange: function(status) {
    console.log('TreeView -> onStatusChange');
    this.setState(_.clone(status)); //make a copy of the state would make sense 
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
    console.log('TreeView -> _onItemChange');
    var list = this.state.selected.slice(0); //clone values;
    if (selected) {
      this._addSelected(list, id);
    } else {
      this._removeSelected(list, id);
    }
    //this._triggerSelectionChange(list);
  },

  _triggerSelectionChange: function(newSelection) {

    this.setState(_.assign(this.state, {
      'selected': newSelection
    }));
  },
  
  /*Life Cycle */
  componentDidMount: function() {
    if (this.props.store){
      this.unsubscribe = this.props.store.listen(this.onStatusChange);
    }
  },

  componentWillUnmount: function() {
    if (this.props.store){
      this.unsubscribe();
    }
  },

  getInitialState: function() {
    return {
      items: [],
      selected: [],
      filter: '',
    };
  },


  _isVisible: function(item) {
    console.log(this.state.filter)
    if (this.state.filter.length > 1) {
      var pattern = new RegExp(this.state.filter, 'i');
      return pattern.test(item.name)
    } else {
      return true;
    }
  },


  /*Select all None*/
  _onSelectAll: function() {
    console.log('TreeView -> _onSelectAll');
    var selection = this.state.selected.slice(0);

    this.state.items.map(function(item) {
      this._addSelected(selection, item.id)

    }, this);
    this._triggerSelectionChange(selection);
  },

  _onSelectNone: function() {
    this._triggerSelectionChange([]);
  },

  _filterItemsByParent: function(parent) {
    var self = this;
    return this.state.items.filter(function(it){return it[self.props.parentParamField]==parent.id});
  },

  render: function() {
    var self = this;
    console.log('TreeView -> Render');
    var items = this.props.parentItem? this._filterItemsByParent(this.props.parentItem) : this.state.items;
    return ( 
      <div> 
        <ul>
        {
          items.map(function(item) {
            return (
              <ul>
                <Item {...item} onItemChange={self._onItemChange} />
                .
                <div>
                  <TreeView {...self.props.child} parentItem={item}/>
                </div>
              </ul>
              )            
          })
        }
        </ul>
      </div>
      );
  }
});

module.exports = React.createClass({

  mixins: [PureRenderMixin],

  _onItemChange: function(id, selected) {
    
  },
  
  _onSearch: function(keyword) {

  },


  _onSearchEnterKey: function() {
     
  },

  /*Select all None*/
  _onSelectAll: function() {
   console.log('TreeList -> _onSelectAll');
     
  },

  _onSelectNone: function() {
  
  },

  componentDidMount: function() {
    this._loadStoreData(this.props.child);    
  },

  _loadStoreData: function(child) {
    child.store.load() //this should be an event ...
    if (child.child){
      this._loadStoreData(child.child);
    }
  },

  render: function() {

    console.log('TreeList -> Render');
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
        <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
        <TreeView {...this.props.child}/>
      </div>
      );
  }

});