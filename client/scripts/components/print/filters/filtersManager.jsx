/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');

var FilterMap = require('../../../conf/filterMap.js');

var LanStore=require('../../../stores/lanStore.js');

var Filter=require('./filter.jsx');

var _=require('lodash');
var Message=require('../.../../../commons/message.jsx');

var actions=require('../../../actions/filterActions.js');
var Store=require('../../../stores/filters/filterStore.js');


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
                return ( <Filter {...def} active={true}/>)
              }.bind(this))
            }
      </ul>
    );
  }

});

