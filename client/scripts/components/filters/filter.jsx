/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var SingleList=require('./singleList.jsx');
var TreeList=require('./treeList.jsx');
var DateFilter=require('./dateFilter.jsx');
var ValueRangeFilter=require('./valueRangeFilter.jsx');
var MultiLevelFilter=require('./multiLevelSearchFilter.jsx');

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
    case 'valueRange':
      content = <ValueRangeFilter {...this.props}/>
      break;
    case 'multiLevelSearch':
      content = <MultiLevelFilter {...this.props}/>
      break;
  }

  return(<div>{content}</div>);    
}
});



