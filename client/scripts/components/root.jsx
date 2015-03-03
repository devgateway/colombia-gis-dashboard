'use strict';

var React = require('react/addons')
var RouteHandler = require('react-router').RouteHandler;
var SlideBar=require('./containers/slideBar.jsx');
//var Nav=require('./containers/nav.jsx');
module.exports = React.createClass({
  render: function() {
    return (
         

         <div>

            
                 <SlideBar>
                 </SlideBar>

              <div id="map-container">
                 {/* defer to the child route handler */}
                    <RouteHandler {...this.props}/>
              </div>
          
            <nav className="nav navbar-inverse navbar-fixed-bottom map-footer">
              <div className="container">
                <a className="navbar-brand" href="#">
                  <img src="images/usaid-logo.png" className="logo"/>
                  </a>
                </div>
              </nav>
        </div>
         
         
           
      
    );
  }
});
