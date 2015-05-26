'use strict';

var React = require('react/addons')
var Reflux = require('reflux');

var Toggler=require('../../commons/toggler.jsx').Toggler;
var TogglerContent=require('../../commons/toggler.jsx').TogglerContent;
var If=require('../../commons/if.jsx')
var LayerControl = require('./_fundingLayer.jsx')

module.exports = React.createClass({


  render: function() {
    return (
        
          <li>
            <Toggler ref='toggler'>
              <TogglerContent visibleWhen="collapsed">
                <div toggler={true} className="toggler-btn"><i className="fa fa-plus-square-o"></i></div>
              </TogglerContent>
              <TogglerContent visibleWhen="expanded">
                <div toggler={true} className="toggler-btn"><i className="fa fa-minus-square-o"></i></div>
              </TogglerContent>
              <TogglerContent visibleWhen="always">
                <div className="title">
                    <input type="checkbox"/> Funding By Type</div> 
              </TogglerContent>
              <TogglerContent visibleWhen="expanded">
                <LayerControl/>
              </TogglerContent>
            </Toggler>
          </li>
     
      );
  }
});
