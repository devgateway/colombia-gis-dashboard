/*Tree list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./treeListItem.jsx');
var _=require('lodash');
var If=require('../commons/if.jsx');

var TreeView =  React.createClass({


  onStatusChange: function(status) {
     this.setState(_.clone(status)); //make a copy of the state would make sense 
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


  _filterItems:function(items,field,value){
    return _.filter(items,
      function(item){
        return item[field]==value;
      })
  },
  
  _toggle:function(){
    debugger;
    this.setState(_.assign(this.state,{expanded:!this.state.expanded}));
  },

  render: function() {
   var items = (this.props.parentIdValue)? this._filterItems(this.state.items,this.props.parentField,this.props.parentIdValue):this.state.items;
   console.log(this.props.label +' - '+ this.state.expanded)
   


   return ( 

    <ul>{this.props.label}
    {
      items.map(function(item) {
        
        return (
          <ul>
          {this.props.nested!=undefined}
            <Item {...item} showToggler={this.props.nested!=undefined}> 

             {(this.props.nested)? <TreeView {...this.props.nested} parentIdValue={item.id} />:null}
               

              </Item>
          </ul>)            
      }.bind(this))
    }
    </ul>
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
   console.log('TreeList -> _onSearch');

 },


 _onSearchEnterKey: function() {
   console.log('TreeList -> _onSearchEnterKey');

 },

 _onSelectAll: function() {
   console.log('TreeList -> _onSelectAll');
 },


 render: function() {

  console.log('TreeList -> Render');
  var children = React.Children.map(this.props.children, function(child) {

    return child ? React.addons.cloneWithProps(child, { 
      onSearch:this._onSearch, onSearchEnterKey:this._onSearchEnterKey, onSelectAll:this._onSelectAll, onSelectNone:this._onSelectNone}) : null;}, this);

  return ( 
   <div> 
   {children}
   <span className="filter-label" role="label">{<Message message={this.props.label}/>}</span>
   <TreeView   {...this.props.nested}/>
   </div>
   );
}

});