'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Filter=require('./filter/filter.jsx')

module.exports = React.createClass({
  render: function() {
    return (
        <div className="row layout_root">
           <div className="col-md-4 col-lg-3 hidden-sm hidden-xs layout_filter">
            <Filter/>
           </div>
          <div className="col-md-8 col-lg-9 col-sm-12  layout_map">
            {/* defer to the child route handler */}
            <RouteHandler {...this.props} /* <- sends props as attributes to child handler */ />
            </div>
        </div>
      
    );
  }
});
