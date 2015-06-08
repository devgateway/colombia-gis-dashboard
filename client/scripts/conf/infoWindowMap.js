'use strict';

var infoWindowEndpoint = [
        {
          key: 'costShareBreakdown',
          label: 'Cost Share Breakdown',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/Clusters/Json'
        }
    ];

var getInfoWindowData = function (param){
    console.log("conf->infoWindowMap: getInfoWindowData");
    return this.infoWindowEndpoint[0];
};


module.exports = {
  infoWindowEndpoint: infoWindowEndpoint,
  getInfoWindowData: getInfoWindowData
};