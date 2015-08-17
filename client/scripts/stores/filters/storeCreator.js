'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins = require('./mixins.js');
var TreeMixins = require('./treeMixins.js');
var MultiLevelMixins = require('./multiLevelSearchMixins.js');
var Actions = require('../../actions/filterActions.js');
var RestoreActions = require('../../actions/restoreActions.js');


function makeStore(actions, source, initParams) {
  return Reflux.createStore({
    listenables: [actions, RestoreActions],
    mixins: [Mixins],
    load: function() {
     this._loadItems(window.DATA_PATH + '/' + source);
    },
    init: function(){
      this.state = {};
      _.assign(this.state, initParams);
    }
  })
};

function makeTreeStore(actions, initParams) {
  return Reflux.createStore({
    listenables: [actions, RestoreActions],
    mixins: [TreeMixins],

    init: function(){
      this.state = {};
      _.assign(this.state, initParams);
    } 
  })
};

function makeMultiLevelSearchStore(actions, initParams) {
  return Reflux.createStore({
    listenables: [actions, RestoreActions],
    mixins: [MultiLevelMixins],

    init: function(){
      this.state = {};
      _.assign(this.state, initParams);
    } 
  })
};

var subImplementersTree = {
    'level': 0, 
    'levelParam': 'sit', 
    'sourcePath': '/subImplementersType.json',
    'child': {
      'level': 1, 
      'levelParam': 'si', 
      'sourcePath': '/subImplementers.json', 
      'parentIdField': 'idType'
      }
    };

var locationTree = {
    'level': 0, 
    'levelParam': 'de', 
    'sourcePath': '/departmentList.json',
    'child': {
      'level': 1, 
      'levelParam': 'mu', 
      'sourcePath': '/municipalitiesList.json', 
      'parentIdField': 'idDepto'
      }
    };

var classificationTypeBasic = {
    'level': 0, 
    'levelParam': 'a1', 
    'sourcePath': '/clasificationType1.json',
    'child': {
      'level': 1, 
      'levelParam': 'a2', 
      'sourcePath': '/clasificationType2.json', 
      'parentIdField': 'idLevel1'
      }
    };

var classificationTypeAdvanced = {
    'level': 0, 
    'levelParam': 'a1', 
    'sourcePath': '/clasificationType1.json',
    'child': {
      'level': 1, 
      'levelParam': 'a2', 
      'sourcePath': '/clasificationType2.json', 
      'parentIdField': 'idLevel1',
      'child': {
        'level': 2, 
        'levelParam': 'a3', 
        'sourcePath': '/clasificationType3.json', 
        'parentIdField': 'idLevel2',
        'child': {
          'level': 3, 
          'levelParam': 'a4', 
          'sourcePath': '/clasificationType4.json', 
          'parentIdField': 'idLevel3',
          'child': {
            'level': 4, 
            'levelParam': 'a5', 
            'sourcePath': '/clasificationType5.json', 
            'parentIdField': 'idLevel4'
            }
          }
        }
      }
    };

module.exports = {
  Locations: makeTreeStore(Actions.Locations, {'levels': locationTree, 'lowestLevel': 'mu'}),
  SubImplementers: makeTreeStore(Actions.SubImplementers, {'levels': subImplementersTree, 'lowestLevel': 'si'}),
  ClassificationTypeBasic: makeTreeStore(Actions.ClassificationType, {'levels': classificationTypeBasic, 'lowestLevel': 'a2'}),
  ClassificationTypeAdvanced: makeMultiLevelSearchStore(Actions.ClassificationType, {'levels': classificationTypeAdvanced, 'lowestLevel': 'a5'}),
  AorCor: makeStore(Actions.AorCor, 'aor-corNames.json', {'param': 'ar'}),
  ContractType: makeStore(Actions.ContractType, 'contractTypes.json', {'param': 'ct'}),
  Crops: makeStore(Actions.Crops, 'cropsList.json', {'param': 'cr'}),
  DevelopmentObjectives: makeStore(Actions.DevelopmentObjectives, 'doList.json', {'param': 'do'}),
  EnvironmentalManagementPlans: makeStore(Actions.EnvironmentalManagementPlans, 'typesEnviromentalPlans.json', {'param': 'te'}),
  PublicPrivatePartnership: makeStore(Actions.PublicPrivatePartnership, 'publicPrivatePartnership.json', {'param': 'pp'}),
  RapidImpact: makeStore(Actions.RapidImpact, 'rapidImpact.json', {'param': 'ri'}),
  SubActivityStatus: makeStore(Actions.SubActivityStatus, 'subActivityStatus.json', {'param': 'st'}),
  SubActivities: makeStore(Actions.SubActivities, 'subActivitiesList.json', {'param': 'st', 'searchAndSelectMode': true}),
  TargetPopulation: makeStore(Actions.TargetPopulation, 'targetPopulation.json', {'param': 'tp'})
}