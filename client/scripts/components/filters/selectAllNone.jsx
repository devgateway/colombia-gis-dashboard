/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');


var Message=require('./../commons/message.jsx');




module.exports  =React.createClass({
  _onAllSelected:function(){
    this.props.onSelectAll();
  },

  _nonNoneSelected:function(){
    this.props.onSelectNone();
  },

  render: function() {
    return(
      <div className="filter-selectors">
      <span><a href="#" onClick={this._onAllSelected}>
      <Message message="filters.selectAll"/>
      </a></span> / <span><a href="#" onClick={this._nonNoneSelected}>
      <Message message="filters.deselectAll"/>
      </a></span>
      </div>
      );
  }
})
