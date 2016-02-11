'use strict';

  module.exports={

  _changevisibility: function(id, value) {
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
  }
};