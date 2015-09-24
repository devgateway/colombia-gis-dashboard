'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var LayerActions = require('../../../actions/layersAction.js');
var Toggler = require('../../commons/toggler.jsx').Toggler;
var TogglerContent = require('../../commons/toggler.jsx').TogglerContent;
var If = require('../../commons/if.jsx')
var CustomRadio = require('../../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../../commons/customRadioButton.jsx').RadioGroup;
var Layer = require('./_layer.jsx');
var CommonsMixins = require('./_mixins.js');

var _ = require('lodash');
var Breaker=require('./_breaker.jsx');

var Store = require('../../../stores/pointsLayerStore.js');

var color0 = [[253, 154, 0, 0.6], [253, 154, 0, 0.6], [253, 154, 0, 0.6], [253, 154, 0, 0.6], [253, 154, 0, 0.6]];
var breaks = [0, 20, 45, 75, 175, 999];
var breakStyle = "breakValues";

module.exports = React.createClass({

 mixins: [CommonsMixins, Reflux.connect(Store)],

  _getLayerId: function() {
    return 'points';
  },

  getInitialState:function(){
    return {"breakSelected": 0, "geoDataLength": 0};
  },

  _changeBreaksWrapper:function(value){
    this.setState({"breakSelected": value});
    this.handleClickForBreaks(value, breaks, breakStyle);
  },

  _changeRadius:function(value,level){
    LayerActions.changeLayerValue('points','radius',value,level);
  },

  componentDidMount: function(){
    $('.layer-control').tooltip()
  },

  render: function() {
    var level = this.state.level;
    var breaks = this.state.breaks.breaks;
    var showClassification = true;
    if(this.state.geoData && this.state.geoData.length==1){
      var actNumber = this.state.geoData[0].properties.activities;
      var newLevel;
      var newBreak = _.find(this.state.breaks.breaks, function(e, i){if(e.min<=actNumber && e.max>=actNumber){newLevel=i;return e}});
      breaks = new Object();
      breaks[newLevel] = newBreak;
      var showClassification = false;
    }

    return (
    <li>
      <Toggler ref='toggler'>
        <TogglerContent visibleWhen="collapsed">
          <div toggler={true} className="toggler-button"><i className="fa fa-chevron-down"></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen="expanded">
          <div toggler={true} className="toggler-button"><i className="fa fa-chevron-up"></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen="collapsed">
          <Layer id="points"
            opacity={this.state.opacity}
            onChangeOpacity={this._onChangeOpacity}
            onChangeVisibility={this._changeVisibility}
            visible={this.state.visible}
            title={i18n.t("layers.subActivitiesLevel")}
            showBasicControl={true}/>
        </TogglerContent>
        <TogglerContent visibleWhen="expanded">
          <Layer id="points"
            opacity={this.state.opacity}
            onChangeOpacity={this._onChangeOpacity}
            onChangeVisibility={this._changeVisibility}
            title={i18n.t("layers.subActivitiesLevel")}
            visible={this.state.visible}/>
          <ul>
            <li className="levels">
              <h3><Message message='layers.level'/></h3>
              <CustomRadioGroup>
                <CustomRadio className="horizontal" name="departament" checked={(level=='departament')? true : false}
                  onClick={this._showByDepartment} label="layers.byDepartment"/>
                <CustomRadio className="horizontal" name="municipality" checked={(level=='municipality')? true : false}
                  onClick={this._showByMunicipality} label="layers.byMunicipality"/>
              </CustomRadioGroup>
            </li>
            <li>
                <div className="vbuffer"/>
                <div className="clearFix"/>
                <div>
                  <If condition={showClassification}>
                    <div className="breaksTemplates">
                      <h3 className="color-control"><Message message='layers.classificationScheme'/></h3>
                      <div className={this.state.breakSelected==0?"label label-info-selected":"label label-info"} onClick={this._changeBreaksWrapper.bind(this, 0)} title={i18n.t("filters.defaultTip")}><Message message='filters.default'/></div>
                      <div className={this.state.breakSelected==1?"label label-info-selected":"label label-info"} onClick={this._changeBreaksWrapper.bind(this, 1)} title={i18n.t("filters.jenksTip")}><Message message='filters.jenks'/></div>
                      <div className={this.state.breakSelected==2?"label label-info-selected":"label label-info"} onClick={this._changeBreaksWrapper.bind(this, 2)} title={i18n.t("filters.arithmeticTip")}><Message message='filters.arithmetic'/></div>
                      <div className={this.state.breakSelected==3?"label label-info-selected":"label label-info"} onClick={this._changeBreaksWrapper.bind(this, 3)} title={i18n.t("filters.geometricTip")}><Message message='filters.geometric'/></div>
                    </div>
                  </If>
                  <div className="clearFix"/>
                  <div className="breaksTemplates">
                    <h3 className="color-control"><Message message='layers.colorPalettes'/></h3>
                    <div className="colorpicker-element">
                    <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 0, color0)} title={i18n.t("filters.defaultColor")}><i style={{backgroundColor:'#F5A82E'}}></i></span></div>
                    <div className="colorpicker-element">
                    <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 1)} title={i18n.t("filters.contrast1")}><i style={{backgroundColor:'#FF3333'}}></i></span></div>
                    <div className="colorpicker-element">
                    <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 2)} title={i18n.t("filters.contrast2")}><i style={{backgroundColor:'#3399FF'}}></i></span></div>
                    <div className="colorpicker-element">
                    <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 3)} title={i18n.t("filters.gradient1")}><i style={{backgroundColor:'#66FFB2'}}></i></span></div>
                    <div className="colorpicker-element">
                    <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 4)} title={i18n.t("filters.gradient2")}><i style={{backgroundColor:'#FFFF66'}}></i></span></div>
                  </div>
                </div>
            </li>
            <li className="color-selection">
              <h3 className="color-control percent-funding"><Message message='layers.subactivitiesNumber'/></h3>
              <h3 className="color-control"><Message message='layers.colorSelection'/></h3>
              {
                _.map(_.keys(breaks),function(key){
                    var br=breaks[key];
                    var minLabel = br.min.toFixed(0);
                    var maxLabel = br.max>br.min?(br.max - 1).toFixed(0):(br.max).toFixed(0);
                  return (
                        <Breaker  level={key} label={minLabel+' - '+maxLabel} radius={br.style.radius} color={br.style.color} onChangeColor={this._changeColor}
                        onChageRadius={this._changeRadius}/>
                        )
                }.bind(this))
              }
            </li>
          </ul>
        </TogglerContent>
      </Toggler>
    </li>);

  }
});
