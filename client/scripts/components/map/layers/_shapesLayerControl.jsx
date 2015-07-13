'use strict';

var React = require('react/addons')
var Reflux = require('reflux');

var Store = require('../../../stores/shapesLayerStore.js');
var LayerActions = require('../../../actions/layersAction.js');
var FilterActions = require('../../../actions/filterActions.js');
var Toggler = require('../../commons/toggler.jsx').Toggler;
var TogglerContent = require('../../commons/toggler.jsx').TogglerContent;
var If = require('../../commons/if.jsx')
var CustomRadio = require('../../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../../commons/customRadioButton.jsx').RadioGroup;
var Layer = require('./_layer.jsx');
var _=require('lodash');
var CustomCheckbox = require('../../commons/customCheckbox.jsx');

var Breaker=require('./_breaker.jsx');
//var FilterStore = require('../../../stores/filterStore.js');

var color0 = [[255, 200, 170, 0.8], [212, 143, 106, 0.8], [253, 154, 0, 0.8], [170, 57, 0, 0.8], [128, 58, 21, 0.8]];
var color1 = [[255, 51, 51, 0.8], [255, 153, 51, 0.8], [255, 255, 51, 0.8], [153, 255, 51, 0.8], [51, 255, 153, 0.8]];
var color2 = [[51, 153, 255, 0.8], [102, 102, 255, 0.8], [178, 102, 255, 0.8], [255, 102, 255, 0.8], [255, 102, 178, 0.8]];
var color3 = [[102, 255, 178, 0.8], [51, 255, 153, 0.8], [0, 255, 128, 0.8], [0, 204, 102, 0.8], [0, 153, 76, 0.8]];
var color4 = [[255, 255, 102, 0.8], [255, 255, 51, 0.8], [255, 255, 0, 0.8], [204, 204, 0, 0.8], [153, 153, 0, 0.8]];

module.exports = React.createClass({

 //mixins: [Reflux.connect(FilterStore), Reflux.connect(Store)],
 mixins: [Reflux.connect(Store)],

 _changeVisibility: function(id, value) {
    LayerActions.changeLayerValue(id,'visible',value);
  },

  _onChangeOpacity:function(id,value){
    LayerActions.changeLayerValue(id,'opacity',value);
  },

  _showByDepartment:function(){
    LayerActions.changeLayerValue('shapes','level','departament');
  },

  _showByMunicipality:function(){
    LayerActions.changeLayerValue('shapes','level','municipality');
  },

  _changeColor:function(value,level){
    LayerActions.changeLayerValue('shapes','color',value,level);
  },

  _changeBreak:function(value,level){
    LayerActions.changeLayerValue('shapes','break',value,level);
  },

  _changeBreakStyle:function(value){
    LayerActions.changeLayerValue('shapes','breakStyle',value);
  },

  _onFundingChanged: function(obj) {
    debugger;
    LayerActions.changeFundingFilterSelection(obj.value, obj.selected);
  },

  handleClickForBreaks:function(breakId){
    console.log('_shapesLayerControl>handleClickForBreaks = ' + breakId);
    var self = this;
    var breaks = [0, 20, 40, 60, 80, 100];
    var breakStyle = "breakValues";
    switch(breakId) {
    case 1:
        if(this.state.geoStats){
          breaks = this.state.geoStats.getClassJenks(5);
        }
        break;
    case 2:
        if(this.state.geoStats){
          breaks = this.state.geoStats.getClassArithmeticProgression(5);
        }
        break;
    case 3:
        if(this.state.geoStats){
          breaks = this.state.geoStats.getClassGeometricProgression(5);
        }
        break;
    default:
        breakStyle = "percentage";
        break;
    }

    self._changeBreak([Math.round(breaks[0]), Math.round(breaks[1])], "Level0");
    self._changeBreak([Math.round(breaks[1]), Math.round(breaks[2])], "Level1");
    self._changeBreak([Math.round(breaks[2]), Math.round(breaks[3])], "Level2");
    self._changeBreak([Math.round(breaks[3]), Math.round(breaks[4])], "Level3");
    self._changeBreak([Math.round(breaks[4]), Math.round(breaks[5])], "Level4");
    self._changeBreakStyle(breakStyle);
  },


  handleClickForColor:function(colorPattern){
    console.log('_shapesLayerControl>handleClickForColor = ' + colorPattern);
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
        color = color0;
        break;
    }
    color.map(function(n, i){
      self._changeColor({r: n[0], g: n[1], b: n[2], a: n[3]}, "Level"+i);
    })
  },

  render: function() {

    console.log('...................... Layer State ......................')
    console.log(this.state.fundingTypes);
    console.log('...................... Layer State ......................')

    var level=this.state.level;
    var fundingTypes = this.state.fundingFilterItems || [];
    debugger;
    var self = this;
    return (
    <li>
      <Toggler ref='toggler'>
        <TogglerContent visibleWhen="collapsed">
          <div toggler={true} className="toggler-button"><i className="fa fa-chevron-down"></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen="expanded">
          <div toggler={true} className="toggler-button"><i className="fa fa-chevron-up"></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen="always">
          <div><span className="control-title">{i18n.t("layers.fundingByType")}</span></div>
        </TogglerContent>
        <TogglerContent visibleWhen="expanded">
          <Layer id="shapes"
            opacity={this.state.opacity}
            onChangeOpacity={this._onChangeOpacity}
            onChangeVisibility={this._changeVisibility}
            visible={this.state.visible}/>
          <ul>
            <li className="layer-option-section">
              <h3><Message message='layers.level'/></h3>
              <CustomRadioGroup>
                <CustomRadio  className="inline" name="departament" checked={(level=='departament')? true : false}
                onClick={this._showByDepartment} label="layers.byDepartment"/>
                <CustomRadio  className="inline" name="municipality" checked={(level=='municipality')? true : false}
                onClick={this._showByMunicipality} label="layers.byMunicipality"/>
              </CustomRadioGroup>
            </li>
            <li className="layer-option-section">
              <h3>Funding Type</h3>

              <div className="funding-types">
              <ul>
                <li><span className="selectable-radio"></span>Commitment</li>
                <li><span className="selectable-radio"></span>Disbursement</li>
              </ul>
              </div>
              {
                fundingTypes.map(function(fundingType){
                  return(
                      <li className="funding-type-option">
                      <CustomCheckbox
                              selected={fundingType.selected}
                              onChange={self._onFundingChanged}
                              value={fundingType.id}/>
                      <span>{fundingType.name}</span>
                      </li>
                  );
                })
              }
            </li>

          <li>
              <div className="vbuffer"/>
              <h3>Layer Styles</h3>
              <div className="clearFix"/>
              <h3>Classification Scheme</h3>
              <div>
                 <div className="breaksTemplates">
                  <div className="label label-info" onClick={this.handleClickForBreaks.bind(this, 0)}>Default</div>
                  <div className="label label-info" onClick={this.handleClickForBreaks.bind(this, 1)}>Jenks</div>
                  <div className="label label-info" onClick={this.handleClickForBreaks.bind(this, 2)}>Arithmetic</div>
                  <div className="label label-info" onClick={this.handleClickForBreaks.bind(this, 3)}>Geometric</div>
                </div>
                <div className="clearFix"/>
                <div className="breaksTemplates">
                  <div className="label label-layer-style">Default</div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 0)} ><i style={{backgroundColor:'#AA3900'}}></i></span></div>
                  <div className="label label-layer-style">Contrast 1</div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 1)} ><i style={{backgroundColor:'#FF3333'}}></i></span></div>
                  <div className="label label-layer-style">Contrast 2</div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 2)} ><i style={{backgroundColor:'#3399FF'}}></i></span></div>
                  <div className="label label-layer-style">Gradient 1</div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 3)} ><i style={{backgroundColor:'#66FFB2'}}></i></span></div>
                  <div className="label label-layer-style">Gradient 2</div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 4)} ><i style={{backgroundColor:'#FFFF66'}}></i></span></div>
                </div>
              </div>
              <div className="clearFix"/>
            </li>
            <li>
            {

              _.map(_.keys(this.state.breaks.breaks),function(key){
                  var br=this.state.breaks.breaks[key];
                return (
                      <Breaker  level={key} label={br.min+'-'+br.max} color={br.style.color} onChangeColor={this._changeColor} />
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
