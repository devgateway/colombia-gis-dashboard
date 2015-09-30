'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Util = require('../api/util.js');
var API = require('../api/layers.js');
var LayersAction = require('../actions/layersAction.js');
var CommonsMixins = require('./_mixins.js');
var DataLayerMixins = require('./_overlaysMixins.js');
var RestoreActions = require('../actions/restoreActions.js');
var GeoStats = require('../api/geostats.js');


var defaultStyle = {
  'color': {
    r: 253,
    g: 154,
    b: 0,
    a: 0.6
  },
  'weight': 1,
  'opacity': 1,
  'fillOpacity': 0.9
};

var defaultBreaks = {
  'symbol': {
  'contentType': 'image/png',
  'imageData': 'iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0RGRUE0QTUwMjk5MTFFNTg0RTVCM0EwMUE0NzUyREQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0RGRUE0QTYwMjk5MTFFNTg0RTVCM0EwMUE0NzUyREQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3REZFQTRBMzAyOTkxMUU1ODRFNUIzQTAxQTQ3NTJERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3REZFQTRBNDAyOTkxMUU1ODRFNUIzQTAxQTQ3NTJERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp75SXYAAAC3UExURQAAAP/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/x4P/w3v/x4f/69f/8+P/69f/w3v/w3//26//37f/w3v/w3v/w3v/y4v/w3v/w3//x4P/w3v/w3//x3//x4P/x4f/y4//05v/27P/37P/37f/69f/79f/8+f/9+//+/v///v///+HvFC0AAAAsdFJOUwACBgcRHiIqLS4wPE1OXmVoao6Pmaiwx8vi5O3u7u/w9Pf39/f5+vz8/f7+Etve7wAAAYhJREFUOMuNlNd22zAQRIeSqUr1rihx5CLG8qV6YcH/f1ceZFlUSYh5wgHuwdkFdkbmouSw26yA1WZ3SFL7Rt+raPvJRS+v0T0U7wOu5b/FN1C4Bhh1aoWccoVaZwTwI7yCjnNg6Dk6y/GGwPvvFHQMYNq6IJLktKbg//qGwjmMy6ejklf3Sie8PIb35y8oXsPYlaRidwLApFuUJHcMP+MTtIdpWVK+7c/6zWql2uzP/HZeUnkKb8YYmSiAlqSnAT33qyC3x+BJUgv8yBiZLQwdKT/4aKTqbnwM8pIzhFdjlCzBk9SmcdVdg7YkD14SowOMHKno93Stnl+UnBEcjHbQkdSduTeQO+tK6sDOaAM1yZn0dav+xJFqsDFaQUEq0byDmpSkAqyMgJzkUb2DqnhSDjACJNWp3EEV6pLOUPZNVjVZdWf1TlYvnvl3n4nFFGwt5imILCZzbzHjf+KzWxb/dMs8zPZdcEw7ePHQwYtjdhasw8xUCfbxo3xappDlNnoUYlZJ9x/9BbJVjkkfQXN4AAAAAElFTkSuQmCC'},
  'field': 'activities',
  breaks: {
    'Level0': {
      'min': 0,
      'max': 20,
      'style': _.assign(_.clone(defaultStyle), {
        'radius': 20
      }),
    },
    'Level1': {
      'min': 20,
      'max': 45,
      'style': _.assign(_.clone(defaultStyle), {
        'radius': 30,
      }),
    },
    'Level2': {
      'min': 45,
      'max': 75,
      'style': _.assign(_.clone(defaultStyle), {

        'radius': 40,
      })
    },
    'Level3': {
      'min': 75,
      'max': 175,
      'style': _.assign(_.clone(defaultStyle), {

        'radius': 50,
      })
    },
    'Level4': {
      'min': 175,
      'max': 1000,
      'style': _.assign(_.clone(defaultStyle), {

        'radius': 55,
      })
    }
  }
};


module.exports = Reflux.createStore({

  listenables: [LayersAction, RestoreActions],
  mixins: [CommonsMixins, DataLayerMixins],

  _getLayerId: function() {
    return 'points';
  },

  _getTitle: function() {
    return 'layers.activityTitle';
  },
  
  _getSubtitle:function(){
    return this.state && this.state.subtitle?this.state.subtitle:'layers.activityDepartmentSubtitle';
  },

  _getDefaultBreaks: function() {
    return defaultBreaks;
  },

  onLayerInit: function() {
    console.log('Point layer onLayerInit');
    this._load(this.state.level); //initialize data 
  },

  onRestoreData: function(savedData) {
    if (savedData.pointsState) {
      if (!this.state.visible && savedData.pointsState.visible) {
        this.update({
          'visible': true
        }); //Hack for changing colors
      }
      this.update({
        dataToRestore: savedData.pointsState,
        isRestorePending: true,
        filters: savedData.pointsState.filters
      });
      this._load(savedData.pointsState.level); //restore data 
    } else {
      this.update({'visible':false});
    }
  },

  getInitialState: function() {
    return this.state = this.storedState ||
      _.assign(_.clone(this._getDefState()) /*Get default values*/ , {
        level: 'departament',
        subtitle:'layers.activityDepartmentSubtitle',
        breaks: defaultBreaks, //defaul styles breaks
        defaultStyle: defaultStyle, //Default symbol styles
        saveItems: ['breaks', 'defaultStyle', 'level', 'opacity', 'visible', 'filters']
      }) /*override default values*/ ;
  },

  _updateNationalSubactivities: function(data) {
    this.update({'nationalSubactivities': _.find(data, {'id': 'CN'})});
  },
  
  /*Load GIS data by department */
  _loadByDepartments: function() {
    this.update({subtitle:'layers.activityDepartmentSubtitle'});
    this._getGeoData(API.getActivitiesByDepartment); //just delegate the call to the next function passing the target method
  },

  _loadByMuncipalities: function() {
    this.update({subtitle:'layers.activityMunicipalitySubtitle'});
    this._getGeoData(API.getActivitiesByMuncipalities); //just delegate the call to the next function passing the target method
  },

  _getGeoData: function(func) {
    func(this.state.filters).then(function(results) { //call api function and process results 
      this._updateNationalSubactivities(results);
      var items = [];
      if (results.length===0){
        LayersAction.showNoResultsPopup('layers.noResultsForDataLayerMessage');   
      }
      var resultsWithCoordinates = [];
      _.map(results, function(d) {
        if (d.latitude!=0 && d.longitude!=0){
          resultsWithCoordinates.push(d);//filter only results with coordinates to show points on map
          if (!isNaN(d.id)) {
            items.push(d.activities);
          }
        }
      });
      var geoStats = new GeoStats(items);
      //tranform plain data to GeoJson
      this._setGeoData(Util.toGeoJson(resultsWithCoordinates), geoStats); //process and set changes to state  
    }.bind(this)).fail(function(e) {
      console.log('Error while loading data ...', e);
    });
  }


});