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

var color0 = [[253, 154, 0, 0.8], [253, 154, 0, 0.8], [253, 154, 0, 0.8], [253, 154, 0, 0.8], [253, 154, 0, 0.8]];
var breaks = [0, 20, 45, 75, 175, 999];
var breakStyle = "breakValues";

module.exports = React.createClass({

 mixins: [CommonsMixins, Reflux.connect(Store)],

  _changevisibility: function(id, value) {
    LayerActions.changeLayerValue(id,'visible',value); //TODO:property mame should be in a globar variable
  },

  _onChangeOpacity:function(id,value){
    LayerActions.changeLayerValue(id,'opacity',value); //TODO:property mame should be in a globar variable
  },

  _showByDepartment:function(){
    LayerActions.changeLayerValue('points','level','departament'); //TODO:property mame should be in a globar variable
  },

  _showByMunicipality:function(){
    LayerActions.changeLayerValue('points','level','municipality'); //TODO:property mame should be in a globar variable
  },

  _changeColor:function(value,level){

    LayerActions.changeLayerValue('points','color',value,level); //TODO:property mame should be in a globar variable
  },

  _changeRadius:function(value,level){

    LayerActions.changeLayerValue('points','radius',value,level); //TODO:property mame should be in a globar variable
  },

  _changeBreak:function(value,level){
    LayerActions.changeLayerValue('points','break',value,level); 
  },

  _changeBreakStyle:function(value){
    LayerActions.changeLayerValue('points','breakStyle',value); 
  },

  _changeBreaksWrapper:function(value){
    this.handleClickForBreaks(value, breaks, breakStyle);
  },

 render: function() {


  var level=this.state.level;
  var fundingTypes = [];//FilterStore.getAll("ft");
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
        <div><span className="control-title">{i18n.t("layers.subActivitiesLevel")}</span></div>
      </TogglerContent>
      <TogglerContent visibleWhen="expanded">
        <Layer id="points"
          opacity={this.state.opacity}
          onChangeOpacity={this._onChangeOpacity}
          onChangeVisibility={this._changevisibility}
          visible={this.state.visible}/>
        <ul className="controls-items">
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
            <h3>Funding Type</h3>
            <ul className="funding-options">
            {
              fundingTypes.map(function(fundingType){
                return(
                  <li>
                    <CustomCheckbox
                            selected={fundingType.selected}
                            onChange={self._onFundingChanged}
                            value={fundingType.id}/>
                    <span>{fundingType.name}</span>
                  </li>
                );
              })
            }
            </ul>
          </li>
          <li>
            <div className="clearFix"/>
            <h3>Styles Breaks</h3>
            <div>
              <div><b>Property <i> {this.state.breaks.field}</i></b></div>
              <div className="breaksTemplates">
                <div className="label label-info" onClick={this._changeBreaksWrapper.bind(this, 0)}>Default</div> 
                <div className="label label-info" onClick={this._changeBreaksWrapper.bind(this, 1)}>Jenks</div>
                <div className="label label-info" onClick={this._changeBreaksWrapper.bind(this, 2)}>Arithmetic</div>
                <div className="label label-info" onClick={this._changeBreaksWrapper.bind(this, 3)}>Geometric</div>
              </div>
              <div className="clearFix"/>
              <div className="breaksTemplates">
                <div className="label label-warning">Default</div>
                <div className="colorpicker-element">
                <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 0, color0)} ><i style={{backgroundColor:'#F5A82E'}}></i></span></div>
                <div className="label label-warning">Contrast 1</div>
                <div className="colorpicker-element">
                <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 1)} ><i style={{backgroundColor:'#FF3333'}}></i></span></div>
                <div className="label label-warning">Contrast 2</div>
                <div className="colorpicker-element">
                <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 2)} ><i style={{backgroundColor:'#3399FF'}}></i></span></div>
                <div className="label label-warning">Gradient 1</div>
                <div className="colorpicker-element">
                <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 3)} ><i style={{backgroundColor:'#66FFB2'}}></i></span></div>
                <div className="label label-warning">Gradient 2</div>
                <div className="colorpicker-element">
                <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 4)} ><i style={{backgroundColor:'#FFFF66'}}></i></span></div>
              </div>
            </div>
            <div className="clearFix"/>
          </li>
          <li className="color-selection">
            <h3>Color Selection</h3>
            <div>
            </div>
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
