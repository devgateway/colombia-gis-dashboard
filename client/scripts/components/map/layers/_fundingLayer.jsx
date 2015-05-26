
'use strict';
var React = require('react/addons')
var Reflux = require('reflux');

var Toggler=require('../../commons/toggler.jsx').Toggler;
var TogglerContent=require('../../commons/toggler.jsx').TogglerContent;
var If=require('../../commons/if.jsx')


var LayersAction=require('../../../actions/layersAction.js');
var FundingByTypeStore=require('../../../stores/fundingByTypeLayerStore.js');
var CustomRadio=require('../../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup=require('../../commons/customRadioButton.jsx').RadioGroup


module.exports  = React.createClass({
    mixins: [Reflux.connect(FundingByTypeStore)], 

    showByDepartment:function(){
        LayersAction.loadFundingByType(1,'departament'); 
    },

    showByMunicipality:function(){
      LayersAction.loadFundingByType(1,'municipality');  
    },

    render: function() {
        console.log('layers->dataLayerSelector: Render');
        var dataLayer = this.state.dataLayer;
        var dataLevel = this.state.dataLevel;
        var finSelectorClass = dataLayer=='funding'? "" : "disabled";
        var indSelectorClass = dataLayer=='indicator'? "" : "disabled";
        return (  
            <div className="inline">
               <div className="">
                 <div className={finSelectorClass}>
                   <ul>
                        
                        <li>
                        <h3>Level</h3>
                            <CustomRadioGroup>
                                <CustomRadio  className="horizontal" name="departament" checked={(dataLevel=='departament')? true : false}     onClick={this.showByDepartment} label="layers.byDepartment"/>
                                <CustomRadio  className="horizontal" name="municipality" checked={(dataLevel=='municipality')? true : false}  onClick={this.showByMunicipality} label="layers.byMunicipality"/>    
                            </CustomRadioGroup>
                        </li>
                        <li>
                        <h3>Funding Type</h3>
                            <CustomRadioGroup>
                                <CustomRadio  className="horizontal" name="usaid" checked={(dataLevel=='departament')? true : false}     onClick={this.showByDepartment} label="layers.internationalCooperation"/>
                                <span>&nbsp;</span>    
                                <CustomRadio  className="horizontal" name="community" checked={(dataLevel=='municipality')? true : false}  onClick={this.showByMunicipality} label="layers.communityBeneficiaries"/>   
                                <div className="clearFix"/>
                                <CustomRadio  className="horizontal" name="usaid" checked={(dataLevel=='departament')? true : false}     onClick={this.showByDepartment} label="layers.privateSector"/>
                                <span>&nbsp;</span>
                                <CustomRadio  className="horizontal" name="private" checked={(dataLevel=='municipality')? true : false}  onClick={this.showByMunicipality} label="layers.publicSector"/>
                            </CustomRadioGroup>
                        </li>
        
                    </ul>                    
                </div>
             </div>    
            </div>   
            );
    }

});



