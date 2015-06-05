'use strict';

var React = require('react/addons')
var Reflux = require('reflux');


var LayerActions = require('../../../actions/layersAction.js');
var FilterActions = require('../../../actions/filterActions.js');
var Toggler = require('../../commons/toggler.jsx').Toggler;
var TogglerContent = require('../../commons/toggler.jsx').TogglerContent;
var If = require('../../commons/if.jsx')
var CustomRadio = require('../../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../../commons/customRadioButton.jsx').RadioGroup;
var Layer = require('./_layer.jsx');
var _=require('lodash')
var ColorPicker=require('./_colorPicker.jsx');
var CustomCheckbox = require('../../commons/customCheckbox.jsx');

var Store = require('../../../stores/shapesLayerStore.js');
var FilterStore = require('../../../stores/filterStore.js');

module.exports = React.createClass({

 mixins: [Reflux.connect(FilterStore), Reflux.connect(Store)], 
 
 _changevisibility: function(id, value) {
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

  _onFundingChanged: function(value, selected) {  
    FilterActions.changeFilterItemState("ft", value, selected);
    FilterActions.triggerFilterApply();
  },

  render: function() {

    console.log('...................... Layer State ......................')
    console.log(this.state);
    console.log('...................... Layer State ......................')

    var level=this.state.level;
    var fundingTypes = FilterStore.getAll("ft");
    var self = this;
    return (
    <li>
      <Toggler ref='toggler'>
        <TogglerContent visibleWhen="collapsed">
          <div toggler={true} className="toggler-btn"><i className="fa fa-plus-square-o"></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen="expanded">
          <div toggler={true} className="toggler-btn"><i className="fa fa-minus-square-o"></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen="always">

          <Layer id="shapes" title={i18n.t("layers.fundingByType")}  opacity={this.state.opacity} 
                onChangeOpacity={this._onChangeOpacity} onChangeVisibility={this._changevisibility} visible={this.state.visible}/>

        </TogglerContent>
        <TogglerContent visibleWhen="expanded">
          <ul>
            <li>
              <h3><Message message='layers.level'/></h3>
              <CustomRadioGroup>
                <CustomRadio  className="inline" name="departament" checked={(level=='departament')? true : false}    
                onClick={this._showByDepartment} label="layers.byDepartment"/>
                <CustomRadio  className="inline" name="municipality" checked={(level=='municipality')? true : false}  
                onClick={this._showByMunicipality} label="layers.byMunicipality"/>    
              </CustomRadioGroup>
            </li>
            <li>
              <h3>Funding Type</h3>
              {
                fundingTypes.map(function(fundingType){
                  return(
                    <div>
                      <CustomCheckbox 
                              selected={fundingType.selected}
                              onChange={self._onFundingChanged}
                              value={fundingType.id}/>
                      <span>{fundingType.name}</span>
                    </div>
                  );
                })
              }
           
            </li>
          </ul>  
          <li>
            {

              _.map(_.keys(this.state.breaks),function(key){
                  var br=this.state.breaks[key];

                  return (<div><ColorPicker  level={key} onChangeColor={this._changeColor} label={br.value +'%'} color={br.style.color}/></div>)
              }.bind(this))

            }
          </li>

        </TogglerContent>
      </Toggler>
    </li>);

}
});