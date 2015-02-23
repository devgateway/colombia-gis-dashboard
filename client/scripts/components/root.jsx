'use strict';

var React = require('react/addons')

var RouteHandler = require('react-router').RouteHandler;
var Filter=require('./filter/filter.jsx');
var SlideBar=require('./containers/slideBar.jsx');





module.exports = React.createClass({
  render: function() {
    return (
        <div className="row layout_root">
        <SlideBar>
        	<div>
        		<p class="testChild">Content</p>
        	</div> 
		</SlideBar>
		  

          <div className="col-md-12 col-lg-12 col-sm-12  layout_map">
            {/* defer to the child route handler */}
            <RouteHandler {...this.props} /* <- sends props as attributes to child handler */ />
            </div>
        </div>
      
    );
  }
});
