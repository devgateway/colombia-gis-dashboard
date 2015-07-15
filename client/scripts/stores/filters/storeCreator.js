'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins = require('./mixins.js');
var TreeMixins = require('./treeMixins.js');
var MultiLevelMixins = require('./multiLevelSearchMixins.js');
var Actions = require('../../actions/filterActions.js');
var RestoreActions = require('../../actions/restoreActions.js');


function makeStore(actions, source, param) {
  return Reflux.createStore({
    listenables: [actions, RestoreActions],
    mixins: [Mixins],
    load: function() {
     this._loadItems(window.DATA_PATH + '/' + source);
    },
    init: function(){
      this.state = {};
      _.assign(this.state, {'param': param});
    }
  })
};

function makeTreeStore(actions, levels, lowestLevel) {
  return Reflux.createStore({
    listenables: [actions, RestoreActions],
    mixins: [TreeMixins],

    init: function(){
      this.state = {};
      _.assign(this.state, {'levels': levels});
      _.assign(this.state, {'lowestLevel': lowestLevel});
    } 
  })
};

function makeMultiLevelSearchStore(actions, levels, lowestLevel) {
  return Reflux.createStore({
    listenables: [actions, RestoreActions],
    mixins: [MultiLevelMixins],

    init: function(){
      this.state = {};
      _.assign(this.state, {'levels': levels});
      _.assign(this.state, {'lowestLevel': lowestLevel});
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
  Locations: makeTreeStore(Actions.Locations, locationTree, 'mu'),
  SubImplementers: makeTreeStore(Actions.SubImplementers, subImplementersTree, 'si'),
  ClassificationTypeBasic: makeTreeStore(Actions.ClassificationType, classificationTypeBasic, 'a2'),
  ClassificationTypeAdvanced: makeMultiLevelSearchStore(Actions.ClassificationType, classificationTypeAdvanced, 'a5'),
  AorCor: makeStore(Actions.AorCor, 'aor-corNames.json', 'ar'),
  ContractType: makeStore(Actions.ContractType, 'contractTypes.json', 'ct'),
  Crops: makeStore(Actions.Crops, 'cropsList.json', 'cr'),
  DevelopmentObjectives: makeStore(Actions.DevelopmentObjectives, 'doList.json', 'do'),
  EnvironmentalManagementPlans: makeStore(Actions.EnvironmentalManagementPlans, 'typesEnviromentalPlans.json', 'te'),
  PublicPrivatePartnership: makeStore(Actions.PublicPrivatePartnership, 'publicPrivatePartnership.json', 'pp'),
  RapidImpact: makeStore(Actions.RapidImpact, 'rapidImpact.json', 'ri'),
  SubActivityStatus: makeStore(Actions.SubActivityStatus, 'subActivityStatus.json', 'st'),
  TargetPopulation: makeStore(Actions.TargetPopulation, 'targetPopulation.json', 'tp')
}