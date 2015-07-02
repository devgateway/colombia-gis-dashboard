/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var SingleList=require('./singleList.jsx');
var TreeList=require('./treeList.jsx');
var DateFilter=require('./dateFilter.jsx');

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
      content = <DateFilter {...this.props}/>
      break;
  }

  return(<div>{content}</div>);    
}
});



