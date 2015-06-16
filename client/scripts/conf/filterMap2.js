var DepartamentsStore=require('../stores/filters/departamentsStore.js')
var MunicipalitiesStore=require('../stores/filters/municipalitiesStore.js')
var TargetPopulationStore=require('../stores/filters/targetPopulationStore.js')



var filters = [

  {
    index: 1,
    label: 'filters.locations',
    modes: ['basic','advanced'],
    type: 'tree',
    nested: {
      label: 'Departaments',
      param: 'de',
      store: DepartamentsStore,
      nested: {
        label: 'Municipalities',
        param: 'mu',
        parentField: 'idDepto',
        store:MunicipalitiesStore
      }
    }
  },
  {
    index: 2,
    type: 'list',
    label: 'filters.targetPopulation',
    modes: ['advanced'],
    param: 'tp',
    store:TargetPopulationStore   
  },

  {
    index: 3,
    type: 'carrousel',
    label: 'filters.activityClassification',
    modes: ['advanced'],
    subLevels: [{
      level: 1,
      childParam: 'a2',
      label: 'Activity Classification Type',
      param: 'a1',
      source: window.DATA_PATH + '/clasificationType.json'
    }, {
      level: 2,
      parentParam: 'a1',
      label: 'Activity Classification Sub-Type 1',
      param: 'a2',
      parentParamField: 'idTipo',
      source: window.DATA_PATH + '/clasificationSubType.json'
    }]
  }, {
    index: 4,
    type: 'options',
    label: 'filters.rapidImpact',
    modes: ['advanced'],
    param: 'ri',
    dataObjectList: [{
      "id": "on",
      "name": "Yes"
    }, {
      "id": "off",
      "name": "No"
    }]
  }
];

module.exports = {
  filters: filters  
};