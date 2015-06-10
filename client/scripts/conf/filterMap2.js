var filters = [

  {
    index: 1,
    label: 'filters.locations',
    modes: ['basic,advanced'],
    type: 'tree',
    subLevels: [{
      level: 1,
      childParam: 'mu',
      label: 'Departaments',
      param: 'de',
      apiEndPoint: window.DATA_PATH + '/departmentList.json'
    }, {
      level: 2,
      parentParam: 'de',
      label: 'Municipalities',
      param: 'mu',
      parentParamField: 'idDepto',
      apiEndPoint: window.DATA_PATH + '/municipalitiesList.json'
    }]
  },

  {
    index: 2,
    type: 'list',
    label: 'filters.targetPopulation',
    modes: ['basic','advanced'],
    param: 'tp',
    apiEndPoint: window.DATA_PATH + '/targetPopulation.json'
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
      apiEndPoint: window.DATA_PATH + '/clasificationType.json'
    }, {
      level: 2,
      parentParam: 'a1',
      label: 'Activity Classification Sub-Type 1',
      param: 'a2',
      parentParamField: 'idTipo',
      apiEndPoint: window.DATA_PATH + '/clasificationSubType.json'
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