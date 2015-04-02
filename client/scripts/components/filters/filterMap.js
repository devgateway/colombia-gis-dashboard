
'use strict';

var filters = [
        {
          index: 1,
          label: 'Locations',
          showTree: true,
          subLevels:[
            {
              level: 1,
              childParam: 'mu',
              label: 'Departaments',
              param: 'de',
              apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/DepartmentsList/Json'
            },
            {
              level: 2,
              parentParam: 'de',
              label: 'Municipalities',
              param: 'mu',
              parentParamField: 'idDepto',
              apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/MunicipalitiesList/Json'
            }
          ]
        }, 
        {
          index: 2,
          label: 'Target Population',
          param: 'tp',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/TargetPopulation/Json'
        },
        {
          index: 3,
          label: 'Development Objectives',
          param: 'do',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/DOList/Json'
        },
        {
          index: 4,
          label: 'Crops',
          param: 'cr',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/CropsList/Json'
        },
        {
          index: 5,
          label: 'SubActivity Status',
          param: 'st',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/SubActivityStatus/Json'
        }

      ];
     
var getFilterDefinitionByParam = function (param){
    var ret = {};
    this.filters.map(function (filterDefinition){
      if (filterDefinition.param && filterDefinition.param == param){
        ret = filterDefinition;
      } else if (filterDefinition.subLevels) {
        filterDefinition.subLevels.map(function (fd){
          if (fd.param && fd.param == param){
            ret = fd;
          }
        });
      }
    });
    return ret;
};     

module.exports = {
  filters: filters,
  getFilterDefinitionByParam: getFilterDefinitionByParam
};

