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


var Store = require('../../../stores/indicatorLayerStore.js');

var Finder=require('../../util/indicatorFinder.jsx');

module.exports = React.createClass({

 mixins: [CommonsMixins, Reflux.connect(Store)],

  _getLayerId: function() {
    return 'indicators';
  },

  _changeRadius:function(value,level){
    LayerActions.changeLayerValue('indicators','radius',value,level);
  },

  _selectIndicator:function(indicator){
    this.setState({'indicators':indicator})
  },

  render: function() {
   var level=this.state.level;

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
        <Layer id="indicators"
          opacity={this.state.opacity}
          onChangeOpacity={this._onChangeOpacity}
          onChangeVisibility={this._changeVisibility}
          visible={this.state.visible}
          title={i18n.t("layers.indicatorLayer")}
          showBasicControl={true}/>
      </TogglerContent>
      <TogglerContent visibleWhen="expanded">
        <Layer id="indicators"
          opacity={this.state.opacity}
          onChangeOpacity={this._onChangeOpacity}
          onChangeVisibility={this._changevisibility}
          title={i18n.t("layers.inidicatorLayer")}
          visible={this.state.visible}/>
        <ul className="controls-items">
          <li className="levels">
            <h3><Message message='layers.level'/></h3>
            <CustomRadioGroup>
              <CustomRadio className="horizontal" name="departament" checked={(level=='departament')? true : false} onClick={this._showByDepartment} label="layers.byDepartment"/>
              <CustomRadio className="horizontal" name="municipality" checked={(level=='municipality')? true : false} onClick={this._showByMunicipality} label="layers.byMunicipality"/>
            </CustomRadioGroup>
          </li>
          <li className="indicator">
            <div className="clearFix"/>
            <Finder label={this.state.indicator || 'Select Indicator'} onSelect={this._selectIndicator}/>
            <div className="vbuffer"/>
            <div className="vbuffer"/>
          </li>
          <li className="color-selection">
            <h3 className="color-control"><Message message='layers.colorSelection'/></h3>
            {
              _.map(_.keys(this.state.breaks.breaks),function(key){
                var br=this.state.breaks.breaks[key];
                var minLabel = br.min.toFixed(0);
                var maxLabel = (br.max - 1).toFixed(0);
                return (
                  <Breaker  level={key} label={minLabel+'-'+maxLabel} radius={br.style.radius} color={br.style.color} onChangeColor={this._changeColor}
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
