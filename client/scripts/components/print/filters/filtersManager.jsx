'use strict';
var React = require('react');
var Reflux = require('reflux');
var FilterMap = require('../../../conf/filterMap.js');
var LanStore=require('../../../stores/lanStore.js');
var _=require('lodash');
var TreeList=require('./treeList.jsx');
var SingleList=require('./singleList.jsx');


var Selector = React.createClass({

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

module.exports = React.createClass({
  mixins: [Reflux.connect(LanStore, 'lan')],

  getInitialState: function() {
    return {
      activeIndex: 1,
      mode: 'basic'
    };
  },

  render: function() {
    var filters = _.sortBy(FilterMap.filters, 'order');
    return(
      <ul>
        {
          filters.map(function(def){
            return (<Selector {...def} active={true}/>)
          }.bind(this))
        }
      </ul>
    );
  }

});

