/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var _=require('lodash');
var CommonsMixins=require('./commonsMixins.jsx');
var Item=require('./singleListItem.jsx')
var TreeList=require('./treeList.jsx')


var SingleList= React.createClass({
   mixins: [CommonsMixins],

getInitialState: function() {
    return {
      items: [],
      selected: [],
    };
  },

  render: function() {
    console.log(this.state)
    var items=_.filter(this.state.items,function(item){return item.selected})
    if(items.length > 0){
    return (
           <div className="filter-list-container">
                <h4>{<Message message={this.props.label}/>}</h4>
                <ul className="filter-list">
                {
                  _.map(items,function(item) {
                    return (<li><Item {...item}/></li>)                    
                  },this) 
                }
                </ul>
              </div>
      )}else{
      return null;
    }
  }

})

module.exports = React.createClass({

 render: function() {
  var content;

  switch(this.props.type) {
    case 'list':
      content = <SingleList {...this.props}/>
      break;
    case 'tree':
      content = <TreeList {...this.props}/>
      break;
    case 'date':
      content = null
      break;
    case 'valueRange':
      content = null
      break;
    case 'multiLevelSearch':
      content = null
      break;
  }


  return(<div>{content}</div>);    
}
});



