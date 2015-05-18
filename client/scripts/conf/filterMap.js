
'use strict';
     
var filters = [
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
              apiEndPoint: window.DATA_PATH + '/departmentList.json'
            },
            {
              level: 2,
              parentParam: 'de',
              label: 'Municipalities',
              param: 'mu',
              parentParamField: 'idDepto',
              apiEndPoint: window.DATA_PATH + '/municipalitiesList.json'
            }
          ]
        }, 
        {
          index: 2,
          label: 'Target Population',
          advanced: false,
          param: 'tp',
          apiEndPoint: window.DATA_PATH + '/targetPopulation.json'
        },
        {
          index: 3,
          label: 'Development Objectives',
          advanced: false,
          param: 'do',
          apiEndPoint: window.DATA_PATH + '/doList.json'
        },
        {
          index: 4,
          label: 'Crops',
          advanced: true,
          param: 'cr',
          apiEndPoint: window.DATA_PATH + '/cropsList.json'
        },
        {
          index: 5,
          label: 'SubActivity Status',
          advanced: false,
          param: 'st',
          apiEndPoint: window.DATA_PATH + '/subActivityStatus.json'
        },
        {
          index: 6,
          label: 'Sub Implementers',
          advanced: false,
          showTree: true,
          subLevels:[
            {
              level: 1,
              childParam: 'si',
              label: 'Sub Implementers Type',
              param: 'sit',
              apiEndPoint: window.DATA_PATH + '/subImplementersType.json'
            },
            {
              level: 2,
              parentParam: 'sit',
              label: 'Sub Implementers',
              param: 'si',
              parentParamField: 'idType',
              apiEndPoint: window.DATA_PATH + '/subImplementers.json'
            }
          ]
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
              apiEndPoint: window.DATA_PATH + '/clasificationType.json'
            },
            {
              level: 2,
              parentParam: 'ac',
              label: 'Activity Classification Sub-Type 1',
              param: 'ac1',
              parentParamField: 'idTipo',
              apiEndPoint: window.DATA_PATH + '/clasificationSubType.json'
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

