
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
        },
        {
          index: 6,
          label: 'Sub Implementer',
          param: 'si',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/SubImplementers/Json'
        },
        {
          index: 7,
          label: 'Activity Classification',
          subLevels:[
            {
              level: 1,
              childParam: 'ac1',
              label: 'Activity Classification Type',
              param: 'ac',
              apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/ClasificationType/Json'
            },
            {
              level: 2,
              parentParam: 'ac',
              label: 'Activity Classification Sub-Type 1',
              param: 'ac1',
              parentParamField: 'idTipo',
              apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/ClasificationSubType/Json'
            }
          ]
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

var getFilterFlatList = function (param){
    var ret = [];
    this.filters.map(function (filterDefinition){
      if (filterDefinition.subLevels) {
        filterDefinition.subLevels.map(function (fd){
          ret.push(fd);
        });
      } else {
        ret.push(filterDefinition);
      }
    });
    return ret;
};     

module.exports = {
  filters: filters,
  getFilterDefinitionByParam: getFilterDefinitionByParam,
  getFilterFlatList: getFilterFlatList
};

