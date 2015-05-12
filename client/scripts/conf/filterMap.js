
'use strict';

var basicFilters = [
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
              apiEndPoint: '/json-data/departmentList.json'
            },
            {
              level: 2,
              parentParam: 'de',
              label: 'Municipalities',
              param: 'mu',
              parentParamField: 'idDepto',
              apiEndPoint: '/json-data/municipalitiesList.json'
            }
          ]
        }, 
        {
          index: 2,
          label: 'Target Population',
          param: 'tp',
          apiEndPoint: '/json-data/targetPopulation.json'
        },
        {
          index: 3,
          label: 'Development Objectives',
          param: 'do',
          apiEndPoint: '/json-data/doList.json'
        },
        {
          index: 4,
          label: 'SubActivity Status',
          param: 'st',
          apiEndPoint: '/json-data/subActivityStatus.json'
        },
        {
          index: 5,
          label: 'Sub Implementer',
          param: 'si',
          apiEndPoint: '/json-data/subImplementers.json'
        },
        {
          index: 6,
          label: 'Activity Classification',
          showTree: true,
          subLevels:[
            {
              level: 1,
              childParam: 'ac1',
              label: 'Activity Classification Type',
              param: 'ac',
              apiEndPoint: '/json-data/clasificationType.json'
            },
            {
              level: 2,
              parentParam: 'ac',
              label: 'Activity Classification Sub-Type 1',
              param: 'ac1',
              parentParamField: 'idTipo',
              apiEndPoint: '/json-data/clasificationSubType.json'
            }
          ]
        },
        {
          index: 7,
          label: 'PPP',
          param: 'pp',
          dataObjectList: [{"id": "on", "name": "With PPP"}, {"id": "off", "name": "Without PPP"}]
        }
      ];
     
var advancedFilters = [
        {
          index: 1,
          label: 'Locations',
          advanced: false,
          showTree: true,
          subLevels:[
            {
              level: 1,
              childParam: 'mu',
              label: 'Departaments',
              param: 'de',
              apiEndPoint: '/json-data/departmentList.json'
            },
            {
              level: 2,
              parentParam: 'de',
              label: 'Municipalities',
              param: 'mu',
              parentParamField: 'idDepto',
              apiEndPoint: '/json-data/municipalitiesList.json'
            }
          ]
        }, 
        {
          index: 2,
          label: 'Target Population',
          advanced: false,
          param: 'tp',
          apiEndPoint: '/json-data/targetPopulation.json'
        },
        {
          index: 3,
          label: 'Development Objectives',
          advanced: false,
          param: 'do',
          apiEndPoint: '/json-data/doList.json'
        },
        {
          index: 4,
          label: 'Crops',
          advanced: true,
          param: 'cr',
          apiEndPoint: '/json-data/cropsList.json'
        },
        {
          index: 5,
          label: 'SubActivity Status',
          advanced: false,
          param: 'st',
          apiEndPoint: '/json-data/subActivityStatus.json'
        },
        {
          index: 6,
          label: 'Sub Implementer',
          advanced: false,
          param: 'si',
          apiEndPoint: '/json-data/subImplementers.json'
        },
        {
          index: 7,
          label: 'Activity Classification',
          advanced: false,
          subLevels:[
            {
              level: 1,
              childParam: 'ac1',
              label: 'Activity Classification Type',
              param: 'ac',
              apiEndPoint: '/json-data/clasificationType.json'
            },
            {
              level: 2,
              parentParam: 'ac',
              label: 'Activity Classification Sub-Type 1',
              param: 'ac1',
              parentParamField: 'idTipo',
              apiEndPoint: '/json-data/clasificationSubType.json'
            }
          ]
        },
        {
          index: 8,
          label: 'PPP',
          advanced: false,
          param: 'pp',
          dataObjectList: [{"id": "on", "name": "With PPP"}, {"id": "off", "name": "Without PPP"}]
        }
      ];
     
var getFilterDefinitionByParam = function (param){
    var ret = {};
    this.advancedFilters.map(function (filterDefinition){
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
    this.advancedFilters.map(function (filterDefinition){
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
  basicFilters: basicFilters,
  advancedFilters: advancedFilters,
  getFilterDefinitionByParam: getFilterDefinitionByParam,
  getFilterFlatList: getFilterFlatList
};

