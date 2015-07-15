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
var CommonsMixins = require('./_mixins.js');

var Breaker=require('./_breaker.jsx');
//var FilterStore = require('../../../stores/filterStore.js');

var breaks = [0, 20, 40, 60, 80, 100];
var breakStyle = "percentage";

module.exports = React.createClass({

 //mixins: [Reflux.connect(FilterStore), Reflux.connect(Store)], 
 mixins: [CommonsMixins, Reflux.connect(Store)], 
 
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
    LayerActions.changeFundingFilterSelection(obj.value, obj.selected);
  },

  _changeBreaksWrapper:function(value){
    this.handleClickForBreaks(value, breaks, breakStyle);
  },

  render: function() {

    console.log('...................... Layer State ......................')
    console.log(this.state.fundingTypes);
    console.log('...................... Layer State ......................')

    var level=this.state.level;
    var fundingTypes = this.state.fundingFilterItems || [];
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
              <h3 className="color-control"><Message message='layers.fundingType'/></h3>
              <div className="funding-types">
              <ul>
                <li><span className="selectable-radio"></span>
                  <Message message='layers.fundingSourceCommitments'/>
                </li>
                <li><span className="selectable-radio"></span>
                  <Message message='layers.fundingSourceDisbursements'/>
                </li>
              </ul>
              </div>
            </li>

<li className="layer-option-section">
<h3><Message message='layers.fundingSource'/></h3>

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
              <div className="clearFix"/>
              <h3 className="color-control"><Message message='layers.classificationScheme'/></h3>
              <div>
                <div className="breaksTemplates">
                  <div className="label label-info" onClick={this._changeBreaksWrapper.bind(this, 0)}>Default</div> 
                  <div className="label label-info" onClick={this._changeBreaksWrapper.bind(this, 1)}>Jenks</div>
                  <div className="label label-info" onClick={this._changeBreaksWrapper.bind(this, 2)}>Arithmetic</div>
                  <div className="label label-info" onClick={this._changeBreaksWrapper.bind(this, 3)}>Geometric</div>
                </div>
                <div className="clearFix"/>
                <div className="breaksTemplates">
                  <h3 className="color-control"><Message message='layers.colorPalettes'/></h3>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 0, null)} ><i style={{backgroundColor:'#AA3900'}}></i></span></div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 1)} ><i style={{backgroundColor:'#FF3333'}}></i></span></div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 2)} ><i style={{backgroundColor:'#3399FF'}}></i></span></div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 3)} ><i style={{backgroundColor:'#66FFB2'}}></i></span></div>
                  <div className="colorpicker-element">
                  <span className="input-group-addon" onClick={this.handleClickForColor.bind(this, 4)} ><i style={{backgroundColor:'#FFFF66'}}></i></span></div>
                </div>
              </div>
              <div className="clearFix"/>
            </li>
            <li>
            <h3 className="color-control percent-funding"><Message message='layers.fundingPercent'/></h3>
            <h3 className="color-control"><Message message='layers.colorSelection'/></h3>

            {

              _.map(_.keys(this.state.breaks.breaks),function(key){
                  var br=this.state.breaks.breaks[key];
                return (
                      <Breaker  level={key} label={br.min.toFixed(2)+'-'+br.max.toFixed(2)} color={br.style.color} onChangeColor={this._changeColor} />
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
