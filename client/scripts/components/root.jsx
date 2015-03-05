'use strict';

var React = require('react/addons')
var RouteHandler = require('react-router').RouteHandler;
var SlideBar=require('./containers/slideBar.jsx');
var Header=require('./header.jsx');
var Footer=require('./footer.jsx');
var Controls=require('./controls.jsx');


module.exports = React.createClass({
 render: function() {
  return (
  <div>
    <Header/>
    <SlideBar>
      <Controls/>
    </SlideBar>
    <div id="map-container">
      {/* defer to the child route handler */}
      <RouteHandler {...this.props}/>
    </div>
    <Footer/>
  </div>
  );
  }
});


