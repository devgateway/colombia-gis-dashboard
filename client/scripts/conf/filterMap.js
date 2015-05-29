
'use strict';

var capitalizeLocation = function (label){
    str = label.toLowerCase();
    return str[0].toUpperCase() + str.replace(/ ([a-z])/g, function(a, b)         {
        return ' ' + b.toUpperCase();
    }).slice(1);
};  

var filters = [
        {
          index: 1,
          label: 'filters.locations',
          advanced: false,
          showTree: true,
          subLevels:[
            {
              level: 1,
              childParam: 'mu',
              label: 'Departaments',
              param: 'de',
              labelFunction: capitalizeLocation.toString(),
              apiEndPoint: window.DATA_PATH + '/departmentList.json'
            },
            {
              level: 2,
              parentParam: 'de',
              label: 'Municipalities',
              param: 'mu',
              parentParamField: 'idDepto',
              labelFunction: capitalizeLocation.toString(),
              apiEndPoint: window.DATA_PATH + '/municipalitiesList.json'
            }
          ]
        }, 
        {
          index: 2,
          label: 'filters.targetPopulation',
          advanced: false,
          param: 'tp',
          apiEndPoint: window.DATA_PATH + '/targetPopulation.json'
        },
        {
          index: 3,
          label: 'filters.developmentObjectives',
          advanced: false,
          param: 'do',
          apiEndPoint: window.DATA_PATH + '/doList.json'
        },
        {
          index: 4,
          label: 'filters.crops',
          advanced: true,
          param: 'cr',
          apiEndPoint: window.DATA_PATH + '/cropsList.json'
        },
        {
          index: 5,
          label: 'filters.subActivityStatus',
          advanced: false,
          param: 'st',
          apiEndPoint: window.DATA_PATH + '/subActivityStatus.json'
        },
        {
          index: 6,
          label: 'filters.subImplementer',
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
          label: 'filters.activityClassification',
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
          label: 'filters.ppp',
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

