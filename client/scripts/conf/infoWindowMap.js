'use strict';

var infoWindowEndpoint = [
        {
          key: 'costShareBreakdown',
          label: 'Cost Share Breakdown',
          apiEndPoint: '/mock-data/infoWindowData.json'
        }
    ];

var getInfoWindowData = function (param){
    console.log("conf->infoWindowMap: getCostShareBreakDown");
    return this.infoWindowEndpoint[0];
};


module.exports = {
  infoWindowEndpoint: infoWindowEndpoint,
  getInfoWindowData: getInfoWindowData
};