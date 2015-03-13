/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var FilterMap = require('./filterMap.js');
var FilterStore=require('../../stores/filterStore.js');
var FilterGroup = require('./filterGroup.jsx');
var FilterGroupWithSubLevels = require('./filterGroupWithSubLevels.jsx');
var FilterActionButton = require('./filterActionButton.jsx');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    render: function() {
      var filters = FilterMap.filters;
        return(
          <div className="activity-nav">
            <TabbedArea className="activities" defaultActiveKey={1}>
              {
                filters.map(function(filterDefinition){
                  if (!filterDefinition.subLevels){
                    var group = <FilterGroup filterDefinition={filterDefinition} />
                  } else {
                    var group = <FilterGroupWithSubLevels filterDefinition={filterDefinition} />
                  }
                  return <TabPane eventKey={parseInt(filterDefinition.index)} tab={filterDefinition.label}>
                    {group}
                  </TabPane>                  
                })
              }                 
            </TabbedArea>
            <FilterActionButton/>
          </div>
        );
        /*if ($('.m-scooch').length>0){
          debugger;
          $('.m-scooch').scooch();
        }
        return(
            <div className="m-scooch m-center m-scaled m-fade-out">
              <div className="m-scooch-inner">
                {
                  filters.map(function(filterDefinition){
                    if (!filterDefinition.subLevels){
                      var label = filterDefinition.label;
                      return  <div className="m-item">
                                <div className="">
                                  <FilterGroup filterDefinition={filterDefinition} />
                                </div>
                              </div> 
                    }
                  })
                }  
              </div>                   
              <div className="m-scooch-controls ">
                <a href="#" data-m-slide="prev">‹ Previous -</a>
                <a href="#" data-m-slide  ="next">- Next ›</a>                
              </div>              
            </div>

          ); */
       
        
    }
});

module.exports = Filter;