'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var Store = require('../../../stores/activitiesDataLayerStore.js');
var LayerActions = require('../../../actions/layersAction.js');
var Toggler = require('../../commons/toggler.jsx').Toggler;
var TogglerContent = require('../../commons/toggler.jsx').TogglerContent;
var If = require('../../commons/if.jsx')
var CustomRadio = require('../../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../../commons/customRadioButton.jsx').RadioGroup;
var Layer = require('./_layer.jsx');

module.exports = React.createClass({

 mixins: [Reflux.connect(Store)], 
  
  _changevisibility: function(id, value) {
    debugger;
    LayerActions.changeLayerValue('visible',value); //TODO:property mame should be in a globar variable 
  },
  
  _onChangeOpacity:function(id,value){
    LayerActions.changeLayerValue('opacity',value); //TODO:property mame should be in a globar variable 
  },

  _showByDepartment:function(){
    LayerActions.changeLayerValue('level','departament'); //TODO:property mame should be in a globar variable 
  },

 _showByMunicipality:function(){
    LayerActions.changeLayerValue('level','municipality'); //TODO:property mame should be in a globar variable 
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
        <Layer title="Funding by Type" id="fundingByType" opacity={this.state.opacity} onChangeOpacity={this._onChangeOpacity} onChangeVisibility={this._changevisibility} visible={this.state.visible}/>
      </TogglerContent>
      <TogglerContent visibleWhen="expanded">
        <ul>
          <li>
            <h3>Level</h3>
            <CustomRadioGroup>
              <CustomRadio  className="horizontal" name="departament" checked={(level=='departament')? true : false}     onClick={this._showByDepartment} label="layers.byDepartment"/>
              <CustomRadio  className="horizontal" name="municipality" checked={(level=='municipality')? true : false}  onClick={this._showByMunicipality} label="layers.byMunicipality"/>    
            </CustomRadioGroup>
          </li>
          
        </ul>                    
      </TogglerContent>
    </Toggler>
  </li>);
  
}
});
