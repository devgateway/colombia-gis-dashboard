/*Tree list*/

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var _ = require('lodash');
var If = require('../../commons/if.jsx');

var CommonsMixins = require('./commonsMixins.jsx');


function checkNestedVisibility(item) {

  if (item.selected) {
    return true
  }
  
  if (item.nested) {
    for (var i = 0; i < item.nested.length; i++) {
        console.log(item.nested[i].name);        
        if(checkNestedVisibility(item.nested[i])){
          return true;
        } 
      }
    }

  return false;
}


var TreeView = React.createClass({

  _isVisible: function(item) {
    return checkNestedVisibility(item);
  },

  getInitialState: function() {
    return {
      items: [],
    };
  },

  render: function() {
    var visible = this._isVisible(this.props);
    return (
      (visible) ? <li> {this.props.name} 
          <ul> {
            (this.props.nested? _.map(this.props.nested, function(item) {
               return (<TreeView {...item}/>)            
              }.bind(this)): null)
           }
         </ul> 
        </li>:null);
  }
});

/*end tree view*/


module.exports = React.createClass({

  mixins: [CommonsMixins],

  _isVisible:function(){
    debugger;
    for(var i=0;i < this.state.itemsTree.length;i++){
      if (checkNestedVisibility(this.state.itemsTree[i])){
        return true;
      }
    }
    return false;
  },

  getInitialState: function() {
    return {
      itemsTree: []
    };
  },

  render: function() {
    console.log('...........RENDER TREE LIST ...........');

    var items = this.state.itemsTree || [];
    return (this._isVisible()? <div>
      <h4> <Message message={this.props.label}/></h4>
      <ul> {
        items.map(function(item, index) {
          return ( <TreeView {...item}/>)            
        }.bind(this))
      } </ul> </div>:null);    

  }
});