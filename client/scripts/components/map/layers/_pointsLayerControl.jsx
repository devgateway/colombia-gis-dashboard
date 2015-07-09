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

var _ = require('lodash');
var Breaker=require('./_breaker.jsx');

var Store = require('../../../stores/pointsLayerStore.js');



module.exports = React.createClass({

 mixins: [Reflux.connect(Store)],

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
          <li><h3>Activity Density</h3></li>
          <li className="color-selection">
            <h3>Color Selection</h3>
            <div>
            </div>
            {
              _.map(_.keys(this.state.breaks.breaks),function(key){
                  var br=this.state.breaks.breaks[key];
                return (
                      <Breaker  level={key} label={br.min+'-'+br.max} radius={br.style.radius} color={br.style.color} onChangeColor={this._changeColor}
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
