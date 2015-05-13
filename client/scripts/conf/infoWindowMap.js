'use strict';

var costShareBreakDown = [
        {
          key: 'costShareBreakdown',
          label: 'Cost Share Breakdown',
          apiEndPoint: '/mock-data/costShareBreakdown.json'
        }
    ];

var developmentObjectives = [
        {
          key: 'developmentObjectives',
          label: 'Development Objectives',
          apiEndPoint: '/mock-data/developmentObjectives.json'
        }
    ];

var getCostShareBreakDown = function (param){
    console.log("conf->infoWindowMap: getCostShareBreakDown");
    return this.costShareBreakDown[0];
};

var getDevelopmentObjectives = function (param){
    console.log("conf->infoWindowMap: getDevelopmentObjectives");
    return this.developmentObjectives[0];
}; 

module.exports = {
  costShareBreakDown: costShareBreakDown,
  developmentObjectives: developmentObjectives,
  getCostShareBreakDown: getCostShareBreakDown,
  getDevelopmentObjectives: getDevelopmentObjectives
};