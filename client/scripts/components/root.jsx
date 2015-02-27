'use strict';

var React = require('react/addons')
var RouteHandler = require('react-router').RouteHandler;
var SlideBar=require('./containers/slideBar.jsx');
var Nav=require('./containers/nav.jsx');

module.exports = React.createClass({
  render: function() {
    return (
        <div className="row layout_root">
        <div>
                
        </div>
        <SlideBar>
            <Nav>
            </Nav>          
		    </SlideBar>
          <div className="col-md-12 col-lg-12 col-sm-12  layout_map">
            {/* defer to the child route handler */}
            <RouteHandler {...this.props} /* <- sends props as attributes to child handler */ />
            </div>
           <div>Footer</div>
        </div>
      
    );
  }
});
