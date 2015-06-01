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

var Store = require('../../../stores/shapesLayerStore.js');

module.exports = React.createClass({

 mixins: [Reflux.connect(Store)], 
  
  _changevisibility: function(id, value) {
    LayerActions.changeLayerValue(id,'visible',value); //TODO:property mame should be in a globar variable 
  },
  
  _onChangeOpacity:function(id,value){
    LayerActions.changeLayerValue(id,'opacity',value); //TODO:property mame should be in a globar variable 
  },

  _showByDepartment:function(){
  	LayerActions.changeLayerValue('shapes','level','departament'); //TODO:property mame should be in a globar variable 
  },

 _showByMunicipality:function(){
  	LayerActions.changeLayerValue('shapes','level','municipality'); //TODO:property mame should be in a globar variable 
 },


 render: function() {
  var level=this.state.level;

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
        
        <Layer id="shapes" title="Funding by Type"  
                       opacity={this.state.opacity} onChangeOpacity={this._onChangeOpacity} 
            onChangeVisibility={this._changevisibility} visible={this.state.visible}/>

      </TogglerContent>
      <TogglerContent visibleWhen="expanded">
        <ul>
          <li>
            <h3>Level</h3>
            <CustomRadioGroup>
              <CustomRadio  className="horizontal" name="departament" checked={(level=='departament')? true : false}    
                             onClick={this._showByDepartment} label="layers.byDepartment"/>
              <CustomRadio  className="horizontal" name="municipality" checked={(level=='municipality')? true : false}  
                              onClick={this._showByMunicipality} label="layers.byMunicipality"/>    
            </CustomRadioGroup>
          </li>
          <li>
            <h3>Funding Type</h3>
            <CustomRadioGroup>
              <CustomRadio  className="horizontal" name="usaid"  onClick={this.showByDepartment} label="layers.internationalCooperation"/>
              <span>&nbsp;</span>    
              <CustomRadio  className="horizontal" name="community" onClick={this.showByMunicipality} label="layers.communityBeneficiaries"/>   
              <div className="clearFix"/>
              <CustomRadio  className="horizontal" name="usaid" onClick={this.showByDepartment} label="layers.privateSector"/>
              <span>&nbsp;</span>
              <CustomRadio  className="horizontal" name="private" onClick={this.showByMunicipality} label="layers.publicSector"/>
            </CustomRadioGroup>
          </li>
        </ul>                    
      </TogglerContent>
    </Toggler>
  </li>);
  
}
});
