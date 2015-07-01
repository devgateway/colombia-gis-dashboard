
var DateStore = require('../stores/filters/dateStore.js');
var StoreDispatcher = require('../stores/filters/storeDispatcher.js');
var Actions = require('../actions/filterListActions.js');
var filters = [
  {
    index: 1,
    label: 'filters.locations',
    modes: ['basic', 'advanced'],
    type: 'tree',
    store: StoreDispatcher.Locations,
    actions: Actions.Locations
  }, {
    index: 2,
    type: 'list',
    label: 'filters.targetPopulation',
    modes: ['basic', 'advanced'],
    param: 'tp',
    store: StoreDispatcher.TargetPopulation,
    actions: Actions.TargetPopulation
  },
  {
    index: 3,
    type: 'list',
    modes: ['basic', 'advanced'],
    label: 'filters.developmentObjectives',
    param: 'do',
    store: StoreDispatcher.DevelopmentObjectives,
    actions: Actions.DevelopmentObjectives
  },
  {
    index: 4,
    type: 'list',
    modes: ['basic', 'advanced'],
    label: 'SubActivity Status',
    param: 'st',
    store: StoreDispatcher.SubActivityStatus,
    actions: Actions.SubActivityStatus
  },
  {
    index: 5,
    label: 'filters.subImplementer',
    modes: ['basic', 'advanced'],
    type: 'tree',
    store: StoreDispatcher.SubImplementers,
    actions: Actions.SubImplementers
  },
  {
    index: 6,
    label: 'filters.activityClassification',
    modes: ['basic', 'advanced'],
    type: 'tree',
    store: StoreDispatcher.ClassificationType,
    actions: Actions.ClassificationType
  },
  {
    index: 7,
    label: 'filters.ppp',
    type: 'list',
    modes: ['basic', 'advanced'],
    param: 'pp',
    store: StoreDispatcher.PublicPrivatePartnership,
    actions: Actions.PublicPrivatePartnership
  },
  {
    index: 8,
    label: 'filters.date',
    type: 'date',
    modes: ['basic', 'advanced'],
    store: DateStore,
    actions: Actions.Dates
  },
  {
    index: 9,
    label: 'Crops',
    type: 'list',
    modes: ['advanced'],
    param: 'cr',
    store: StoreDispatcher.Crops,
    actions: Actions.Crops
  },
  {
    index: 10,
    label: 'filters.contractType',
    type: 'list',
    modes: ['advanced'],
    param: 'ct',
    store: StoreDispatcher.ContractType,
    actions: Actions.ContractType
  },
  {
    index: 11,
    label: 'filters.environmentalManagementPlans',
    type: 'list',
    modes: ['advanced'],
    param: 'te',
    store: StoreDispatcher.EnvironmentalManagementPlans,
    actions: Actions.EnvironmentalManagementPlans
  },
  {
    index: 12,
    label: 'AOR/COR',
    type: 'list',
    modes: ['advanced'],
    param: 'ar',
    store: StoreDispatcher.AorCor,
    actions: Actions.AorCor
  },
  {
    index: 13,
    label: 'filters.rapidImpact',
    type: 'list',
    modes: ['advanced'],
    param: 'ri',
    store: StoreDispatcher.RapidImpact,
    actions: Actions.RapidImpact
  }      
];

module.exports = {
  filters: filters
};