'use strict';

var React = require('react');
var Reflux = require('reflux');

module.exports  = React.createClass({


  render: function() {

    if (!this.props.feature){
      return (<p></p>)
    }
    return (
      <div>
       <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">
                 {this.props.feature.properties.municipality?this.props.feature.properties.municipality:this.props.feature.properties.department}
            </h3> 
        </div>
         <div className="panel-body">
               <p>actividades {this.props.feature.properties.actividades}</p>
                <p>U$D {this.props.feature.properties.fundingUS}</p>
                 <p>Number of projects {this.props.feature.properties.projects}</p>
                  
          </div>
      </div>
      </div>
      );
  }

});
