/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var FilterMap = require('./filterMap.js');
var FilterStore=require('../../stores/filterStore.js');
var FilterGroup = require('./filterGroup.jsx');
var FilterActionButton = require('./filterActionButton.jsx');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    render: function() {
      var filters = FilterMap.filters;
        /*return(
          <div className="activity-nav">
            <TabbedArea className="activities" defaultActiveKey={1}>
              {
                filters.map(function(filterDefinition){
                  if (!filterDefinition.isChild){
                    var label = filterDefinition.label;// + " (" + FilterStore.getAllSelected(filterDefinition.param).length + "/" + FilterStore.getAll(filterDefinition.param).length + ")";
                    return <TabPane eventKey={parseInt(filterDefinition.index)} tab={label}>
                      <FilterGroup filterDefinition={filterDefinition} />
                    </TabPane>
                  }
                })
              }                 
            </TabbedArea>
            <FilterActionButton/>
          </div>
        );*/
        if ($('.m-scooch').length>0){
          debugger;
          $('.m-scooch').scooch();
        }
        return(
            <div className="m-scooch m-center m-scaled m-fade-out">
              <div className="m-scooch-inner">
                {
                  filters.map(function(filterDefinition){
                    if (!filterDefinition.isChild){
                      var label = filterDefinition.label;
                      return  <div className="m-item">
                                <div className="m-card-light">
                                  <FilterGroup filterDefinition={filterDefinition} />
                                </div>  
                              </div> 
                    }
                  })
                }  
              </div>                   
              <div className="m-scooch-controls m-scooch-bulleted">
                <a href="#" data-m-slide="prev">‹ Previous -</a>
                <a href="#" data-m-slide  ="next">- Next ›</a>                
              </div>              
            </div>

          ); 
       
        
    }
});

module.exports = Filter;