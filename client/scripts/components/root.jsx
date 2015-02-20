'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;


module.exports = React.createClass({
  render: function() {
    return (
      <div className="usaid-colombia-gis">
        <div className="row">
           <div className="col-lg-3">
             Filters !
           </div>
            {/* defer to the child route handler */}
            <RouteHandler {...this.props} /* <- sends props as attributes to child handler */ />
            
        <div>
      </div>
    );
  }
});
