
var DateStore = require('../stores/filters/dateStore.js');
var ValueRangeStore = require('../stores/filters/valueRangeStore.js');
var StoreDispatcher = require('../stores/filters/storeCreator.js');
var Actions = require('../actions/filterActions.js');
var filters = [
  {
    index: 1,
    order: 7,
    label: 'filters.locations',
    modes: ['basic', 'advanced'],
    type: 'tree',
    param: 'mu',
    store: StoreDispatcher.Locations,
    actions: Actions.Locations
  }, {
    index: 2,    
    order: 10,
    type: 'list',
    label: 'filters.targetPopulation',
    modes: ['basic', 'advanced'],
    param: 'tp',
    store: StoreDispatcher.TargetPopulation,
    actions: Actions.TargetPopulation
  },
  {
    index: 3,
    order: 8,
    type: 'list',
    modes: ['basic', 'advanced'],
    label: 'filters.developmentObjectives',
    param: 'do',
    store: StoreDispatcher.DevelopmentObjectives,
    actions: Actions.DevelopmentObjectives
  },
  {
    index: 4,
    order: 4,
    type: 'list',
    modes: ['basic', 'advanced'],
    label: 'filters.subActivityStatus',
    param: 'st',
    store: StoreDispatcher.SubActivityStatus,
    actions: Actions.SubActivityStatus
  },
  {
    index: 5,
    order: 13,
    label: 'filters.subImplementer',
    modes: ['basic', 'advanced'],
    type: 'tree',
    param: 'si',
    store: StoreDispatcher.SubImplementers,
    actions: Actions.SubImplementers
  },
  {
    index: 7,
    order: 2,
    label: 'filters.ppp',
    type: 'list',
    modes: ['basic', 'advanced'],
    param: 'pp',
    store: StoreDispatcher.PublicPrivatePartnership,
    actions: Actions.PublicPrivatePartnership
  },
  {
    index: 8,
    order: 5,
    label: 'filters.date',
    type: 'date',
    modes: ['basic', 'advanced'],
    store: DateStore,
    actions: Actions.Dates
  },
  {
    index: 9,
    order: 3,
    label: 'filters.crops',
    type: 'list',
    modes: ['advanced'],
    param: 'cr',
    store: StoreDispatcher.Crops,
    actions: Actions.Crops
  },
  {
    index: 10,    
    order: 14,
    label: 'filters.contractType',
    type: 'list',
    modes: ['advanced'],
    param: 'ct',
    store: StoreDispatcher.ContractType,
    actions: Actions.ContractType
  },
  {
    index: 11,
    order: 9,
    label: 'filters.environmentalManagementPlans',
    type: 'list',
    modes: ['advanced'],
    param: 'te',
    store: StoreDispatcher.EnvironmentalManagementPlans,
    actions: Actions.EnvironmentalManagementPlans
  },
  {
    index: 12,
    order: 1,
    label: 'filters.aorCor',
    type: 'list',
    modes: ['advanced'],
    param: 'ar',
    store: StoreDispatcher.AorCor,
    actions: Actions.AorCor
  },
  {
    index: 13,
    order: 6,
    label: 'filters.rapidImpact',
    type: 'list',
    modes: ['advanced'],
    param: 'ri',
    store: StoreDispatcher.RapidImpact,
    actions: Actions.RapidImpact
  },
  {
    index: 14,
    order: 14,
    label: 'filters.activityClassification',
    modes: ['basic'],
    type: 'tree',
    param: 'a2',
    store: StoreDispatcher.ClassificationTypeBasic,
    actions: Actions.ClassificationType
  },
  {
    index: 15,
    order: 15,
    label: 'filters.activityClassification',
    modes: ['advanced'],
    type: 'multiLevelSearch',
    param: 'a5',
    store: StoreDispatcher.ClassificationTypeAdvanced,
    actions: Actions.ClassificationType
  },
  {
    index: 16,
    order: 16,
    label: 'filters.valueRange',
    modes: ['advanced'],
    type: 'valueRange',
    store: ValueRangeStore,
    actions: Actions.ValueRange
  }
        
];

module.exports = {
  filters: filters
};