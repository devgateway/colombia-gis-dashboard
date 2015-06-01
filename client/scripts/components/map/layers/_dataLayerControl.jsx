'use strict';

var React = require('react/addons')
var Reflux = require('reflux');

var Toggler=require('../../commons/toggler.jsx').Toggler;
var TogglerContent=require('../../commons/toggler.jsx').TogglerContent;
var If=require('../../commons/if.jsx')
var FundingLayerControl=require('./_fundingLayerControl.jsx')

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
                    <input type="checkbox"/> <Message message='layers.fundingDistribution'/></div> 
              </TogglerContent>
              <TogglerContent visibleWhen="expanded">
                <FundingLayerControl/>
              </TogglerContent>
            </Toggler>
          </li>
     
      );
  }
});
