/*Basic list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Item=require('./item.jsx');
var _=require('lodash');

module.exports = React.createClass({

 // mixins: [PureRenderMixin],

 onStatusChange: function(status) {
        this.setState(_.clone(status)); //make a copy of the state would make sense 
      },


      /*Item selection*/

      _addSelected:function(id,options){
        options=options || {};
        
        var selection=this.state.selected.slice(0); //clone current state 
        selection.push(id);
        if (!options.silent){
            this._triggerSelectionChange(selection);
        }
      },

      _removeSelected:function(id,options){
        options=options || {};
        var selection=this.state.selected.slice(0);
        _.remove(selection,function(item){return item==id})
        if (!options.silent){
            this._triggerSelectionChange(selection);
        }
      },

      _triggerSelectionChange:function(newSelection){
         this.setState(_.assign(this.state,{'selected':newSelection}));
      },

      _onItemChange: function(id,selected) {
        if (selected){
            this._addSelected(id);
        }else{
          this._removeSelected(id);
        }

     },

      _onSelectionChanged:function(){
        var total=_.size(this.state.items);
        var count=this.state.selected.length;
        console.log(count+'/'+total);

        if (this.props.onSelectionChange){
          this.props.onSelectionChange(count,total);
        }
      },

      /*Search*/
      _onSearch:function(keyword){

        if (keyword.length > 3){
          this.setState(_.assign(this.state,{'filter':keyword}));
        }else if(this.state.filter.length > 0 ){
          this.setState(_.assign(this.state,{'filter':''}));
        }
      },


      _onSearchEnterKey:function(){
       this.state.items.map(function(item) {
        if (this._isVisible(item)){

        }
      },this)

       this.setState(_.assign(this.state,{items:items}))

     },

     componentDidMount: function() {
      this.unsubscribe = this.props.store.listen(this.onStatusChange);
      this.props.store.load() //this should be an event ...
    },

    componentWillUnmount: function() {
      this.unsubscribe();
    },

    getInitialState: function() {
      return {
        items: [],
        selected: [],
        filter:'',
      };
    },

    
    _isVisible:function(item){
      console.log(this.state.filter)
      if (this.state.filter.length > 1){
        var pattern = new RegExp(this.state.filter, 'i');
        return pattern.test(item.name) 
      }else{
        return true;
      }
    },


    render: function() {

      var children = React.Children.map(this.props.children, function(child) {
        return child ? React.addons.cloneWithProps(child, {onSearch:this._onSearch,lengthLimit:1,onSearchEnterKey:this._onSearchEnterKey}) : null;
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