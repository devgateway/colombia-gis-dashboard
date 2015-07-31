'use strict';

var React = require('react');
var Reflux = require('reflux');

module.exports  = React.createClass({

  mixins: [],

  print:function(){
    window.print();
  },

  componentDidMount:function(){
  
  },



  render: function() {
    return (

      <div className="print-btn">
        <button onClick={this.print}>Print</button>
      </div>
      );
  }

});
