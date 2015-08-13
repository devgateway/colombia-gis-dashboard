'use strict';

var LayerActions = require('../../../actions/layersAction.js');

var color0 = [[255, 200, 170, 0.6], [212, 143, 106, 0.6], [253, 154, 0, 0.6], [170, 57, 0, 0.6], [128, 58, 21, 0.6]];
var color1 = [[255, 51, 51, 0.6], [255, 153, 51, 0.6], [255, 255, 51, 0.6], [153, 255, 51, 0.6], [51, 255, 153, 0.6]];
var color2 = [[51, 153, 255, 0.6], [102, 102, 255, 0.6], [178, 102, 255, 0.6], [255, 102, 255, 0.6], [255, 102, 178, 0.6]];
var color3 = [[102, 255, 178, 0.6], [51, 255, 153, 0.6], [0, 255, 128, 0.6], [0, 204, 102, 0.6], [0, 153, 76, 0.6]];
var color4 = [[255, 255, 102, 0.6], [255, 255, 51, 0.6], [255, 255, 0, 0.6], [204, 204, 0, 0.6], [153, 153, 0, 0.6]];

module.exports = {

   handleClickForBreaks:function(option, defaultBreaks, breakStyle){
    console.log('component/map/layers/_mixins>handleClickForBreaks = ' + option);
    var self = this;
    var breaks = defaultBreaks;
    //var breakStyle = "breakValues";
    switch(option) {
    case 1:
        if(this.state.geoStats){
          breaks = this.state.geoStats.getClassJenks(5);
          console.log("--- Jenks: " + breaks);
        }
        break;
    case 2:
        if(this.state.geoStats){
          breaks = this.state.geoStats.getClassArithmeticProgression(5);
          console.log("--- Arithmetic: " + breaks);
        }
        break;
    case 3:
        if(this.state.geoStats){
          breaks = this.state.geoStats.getClassGeometricProgression(5);
          console.log("--- Geometric: " + breaks);
        }
        break;
    default:
        breaks[5] = 999;
    } 
    if(breakStyle === "percentage"){
      breaks = this._convertGeoBreaksToPercentage(breaks);
    } else {
      //fix to contain the last value
      breaks[5] = breaks[5] + 1;
    }

    self._changeBreak([breaks[0], breaks[1]], "Level0");
    self._changeBreak([breaks[1], breaks[2]], "Level1");
    self._changeBreak([breaks[2], breaks[3]], "Level2");
    self._changeBreak([breaks[3], breaks[4]], "Level3");
    self._changeBreak([breaks[4], breaks[5]], "Level4");
    self._changeBreakStyle(breakStyle);
  },

  _convertGeoBreaksToPercentage:function(geoBreaks){
    var newBreaks = [0];
    for(var i=1; i<geoBreaks.length; i++){
      newBreaks.push((geoBreaks[i]/geoBreaks[geoBreaks.length-1]*100));
    }
    newBreaks.push(100);
    return newBreaks;
  },

  handleClickForColor:function(colorPattern, defaultColor){
    console.log('component/map/layers/_mixins>handleClickForColor = ' + colorPattern);
    var self = this;
    var color;
    switch(colorPattern) {
    case 1:
        color = color1;
        break;
    case 2:
        color = color2;
        break;
    case 3:
        color = color3;
        break;
    case 4:
        color = color4;
        break;
    default:
        color = defaultColor?defaultColor:color0;
        break;
    } 
    color.map(function(n, i){
      self._changeColor({r: n[0], g: n[1], b: n[2], a: n[3]}, "Level"+i);
    })
  },

  _changeVisibility: function(id, value) {
    LayerActions.changeLayerValue(id,'visible',value); 
  },

  _onChangeOpacity:function(id,value){
    LayerActions.changeLayerValue(id,'opacity',value); 
  },

  _showByDepartment:function(){
    LayerActions.changeLayerValue(this._getLayerId(),'level','departament'); 
  },

  _showByMunicipality:function(){
    LayerActions.changeLayerValue(this._getLayerId(),'level','municipality'); 
  },

  _changeColor:function(value,level){
    LayerActions.changeLayerValue(this._getLayerId(),'color',value,level);
  },

  _changeBreak:function(value,level){
    LayerActions.changeLayerValue(this._getLayerId(),'break',value,level); 
  },

  _changeBreakStyle:function(value){
    LayerActions.changeLayerValue(this._getLayerId(),'breakStyle',value); 
  }
}