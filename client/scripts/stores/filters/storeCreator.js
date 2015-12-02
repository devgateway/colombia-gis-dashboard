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
     this._loadItems(source);
    },
    init: function(){
      this.state = {};
      _.assign(this.state, initParams);
    }
  });
}

function makeTreeStore(actions, initParams) {
  return Reflux.createStore({
    listenables: [actions, RestoreActions],
    mixins: [TreeMixins],

    init: function(){
      this.state = {};
      _.assign(this.state, initParams);
    } 
  });
}

function makeMultiLevelSearchStore(actions, initParams) {
  return Reflux.createStore({
    listenables: [actions, RestoreActions],
    mixins: [MultiLevelMixins],

    init: function(){
      this.state = {};
      _.assign(this.state, initParams);
    } 
  });
}

var subImplementersTree = {
    'level': 0, 
    'levelParam': 'sit', 
    'sourcePath': window.LIST_SOURCE_SUBIMPLEMENTERSTYPE,
    'child': {
      'level': 1, 
      'levelParam': 'si', 
      'sourcePath': window.LIST_SOURCE_SUBIMPLEMENTERS, 
      'parentIdField': 'idType'
      }
    };

var locationTree = {
    'level': 0, 
    'levelParam': 'de', 
    'sourcePath': window.LIST_SOURCE_DEPARTAMENTS,
    'child': {
      'level': 1, 
      'levelParam': 'mu', 
      'sourcePath': window.LIST_SOURCE_MUNICIPALITIES, 
      'parentIdField': 'idDepto'
      }
    };

var classificationTypeBasic = {
    'level': 0, 
    'levelParam': 'a1', 
    'sourcePath': window.LIST_SOURCE_CLASSIFICATIONTYPE1,
    'child': {
      'level': 1, 
      'levelParam': 'a2', 
      'sourcePath': window.LIST_SOURCE_CLASSIFICATIONTYPE2, 
      'parentIdField': 'idLevel1'
      }
    };

var classificationTypeAdvanced = {
    'level': 0, 
    'levelParam': 'a1', 
    'sourcePath': window.LIST_SOURCE_CLASSIFICATIONTYPE1,
    'child': {
      'level': 1, 
      'levelParam': 'a2', 
      'sourcePath': window.LIST_SOURCE_CLASSIFICATIONTYPE2, 
      'parentIdField': 'idLevel1',
      'child': {
        'level': 2, 
        'levelParam': 'a3', 
        'sourcePath': window.LIST_SOURCE_CLASSIFICATIONTYPE3, 
        'parentIdField': 'idLevel2',
        'child': {
          'level': 3, 
          'levelParam': 'a4', 
          'sourcePath': window.LIST_SOURCE_CLASSIFICATIONTYPE4, 
          'parentIdField': 'idLevel3',
          'child': {
            'level': 4, 
            'levelParam': 'a5', 
            'sourcePath': window.LIST_SOURCE_CLASSIFICATIONTYPE5, 
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
  AorCor: makeStore(Actions.AorCor, window.LIST_SOURCE_AORCORNAMES, {'param': 'ar'}),
  ContractType: makeStore(Actions.ContractType, window.LIST_SOURCE_CONTRACTTYPES, {'param': 'ct'}),
  Crops: makeStore(Actions.Crops, window.LIST_SOURCE_CROPS, {'param': 'cr'}),
  DevelopmentObjectives: makeStore(Actions.DevelopmentObjectives, window.LIST_SOURCE_DOS, {'param': 'do'}),
  EnvironmentalManagementPlans: makeStore(Actions.EnvironmentalManagementPlans, window.LIST_SOURCE_TYPESENVIROMENTALPLANS, {'param': 'te'}),
  PublicPrivatePartnership: makeStore(Actions.PublicPrivatePartnership, window.LIST_SOURCE_PPP, {'param': 'pp'}),
  RapidImpact: makeStore(Actions.RapidImpact, window.LIST_SOURCE_RAPIDIMPACT, {'param': 'ri'}),
  SubActivityStatus: makeStore(Actions.SubActivityStatus, window.LIST_SOURCE_SUBACTIVITYSTATUS, {'param': 'st'}),
  SubActivities: makeStore(Actions.SubActivities, window.LIST_SOURCE_SUBACTIVITYLIST, {'param': 'sa', 'searchAndSelectMode': true}),
  TargetPopulation: makeStore(Actions.TargetPopulation, window.LIST_SOURCE_TARGETPOPULATION, {'param': 'tp'})
};