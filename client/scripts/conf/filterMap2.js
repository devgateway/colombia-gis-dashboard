var LocationStore = require('../stores/filters/locationStore.js')
var DepartamentsStore = require('../stores/filters/departamentsStore.js')
var MunicipalitiesStore = require('../stores/filters/municipalitiesStore.js')
var TargetPopulationStore = require('../stores/filters/targetPopulationStore.js')
var DevelopmentObjectivesStore = require('../stores/filters/developmentObjectivesStore.js')
var SubActivityStatusStore = require('../stores/filters/subActivityStatusStore.js')
var SubImplementersTypeStore = require('../stores/filters/subImplementersTypeStore.js')
var SubImplementersStore = require('../stores/filters/subImplementersStore.js')
var ActivityClassificationTypeStore = require('../stores/filters/activityClassificationTypeStore.js')
var ActivityClassificationSubType1Store = require('../stores/filters/activityClassificationSubType1Store.js')
var PublicPrivatePartnershipStore = require('../stores/filters/publicPrivatePartnershipStore.js')
var CropsStore = require('../stores/filters/cropsStore.js')
var EnvironmentalManagementPlansStore = require('../stores/filters/environmentalManagementPlansStore.js')
var ContractTypeStore = require('../stores/filters/contractTypeStore.js')
var AorCorStore = require('../stores/filters/aorCorStore.js')
var RapidImpactStore = require('../stores/filters/rapidImpactStore.js')


var Actions = require('../actions/filterListActions.js');
var filters = [
 {
    index: 1,
    label: 'filters.locations',
    modes: ['basic', 'advanced'],
    type: 'tree',
    store: LocationStore,
    actions: Actions.Locations,
    nested: {
      label: 'Departaments',
      param: 'de',
      //store: DepartamentsStore,
      //actions: Actions.Departaments,
      nested: {
        label: 'Municipalities',
        param: 'mu',
        parentField: 'idDepto',
        //store: MunicipalitiesStore,
        //actions: Actions.Municipalities
      }
    }
  }, {
    index: 2,
    type: 'list',
    label: 'filters.targetPopulation',
    modes: ['basic', 'advanced'],
    param: 'tp',
    store: TargetPopulationStore,
    actions: Actions.TargetPopulation
  },
  {
    index: 3,
    type: 'list',
    modes: ['basic', 'advanced'],
    label: 'filters.developmentObjectives',
    param: 'do',
    store: DevelopmentObjectivesStore,
    actions: Actions.DevelopmentObjectives
  },
  {
    index: 4,
    type: 'list',
    modes: ['basic', 'advanced'],
    label: 'SubActivity Status',
    param: 'st',
    store: SubActivityStatusStore,
    actions: Actions.SubActivityStatus
  },
  {
    index: 5,
    label: 'filters.subImplementer',
    modes: ['basic', 'advanced'],
    type: 'tree',
    nested: {
      label: 'Sub Implementers Type',
      param: 'sit',
      store: SubImplementersTypeStore,
      actions: Actions.SubImplementersType,
      nested: {
        label: 'Sub Implementers',
        param: 'si',
        parentField: 'idType',
        store: SubImplementersStore,
        actions: Actions.SubImplementers
      }
    }
  }, 
  {
    index: 6,
    label: 'filters.activityClassification',
    modes: ['basic', 'advanced'],
    type: 'tree',
    nested: {
      label: 'Activity Classification Type',
      param: 'a1',
      store: ActivityClassificationTypeStore,
      actions: Actions.ActivityClassificationType,
      nested: {
        label: 'Activity Classification Sub-Type 1',
        param: 'a2',
        parentField: 'idTipo',
        store: ActivityClassificationSubType1Store,
        actions: Actions.ActivityClassificationSubType1
      }
    }
  },
  {
    index: 7,
    label: 'filters.ppp',
    type: 'list',
    modes: ['basic', 'advanced'],
    param: 'pp',
    store: PublicPrivatePartnershipStore,
    actions: Actions.PublicPrivatePartnership
  },
  {
    index: 8,
    label: 'Crops',
    type: 'list',
    modes: ['advanced'],
    param: 'cr',
    store: CropsStore,
    actions: Actions.Crops
  },
  {
    index: 9,
    label: 'filters.contractType',
    type: 'list',
    modes: ['advanced'],
    param: 'ct',
    store: ContractTypeStore,
    actions: Actions.ContractType
  },
  {
    index: 10,
    label: 'filters.environmentalManagementPlans',
    type: 'list',
    modes: ['advanced'],
    param: 'te',
    store: EnvironmentalManagementPlansStore,
    actions: Actions.EnvironmentalManagementPlans
  },
  {
    index: 11,
    label: 'AOR/COR',
    type: 'list',
    modes: ['advanced'],
    param: 'ar',
    store: AorCorStore,
    actions: Actions.AorCor
  },
  {
    index: 12,
    label: 'filters.rapidImpact',
    type: 'list',
    modes: ['advanced'],
    param: 'ri',
    store: RapidImpactStore,
    actions: Actions.RapidImpact
  }      

];

module.exports = {
  filters: filters
};