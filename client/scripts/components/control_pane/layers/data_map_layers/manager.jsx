'use strict';

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var LayersAction=require('../../../../actions/layersAction.js');
var DataLayerStore=require('../../../../stores/dataLayerStore.js');
var RadioButton=require('../../../commons/customRadioButton.jsx');


module.exports  = React.createClass({
 mixins: [Reflux.connect(DataLayerStore)], 

	showByDepartment:function(){
		console.log('layers->dataLayerSelector: ShowByDepartment');		
		if (this.state.dataLayer=='indicator'){
			LayersAction.loadIndicatorsByDepartments();
		} else {
			LayersAction.loadActivitiesByDepartments();
		}
	},

	showByMunicipality:function(){
		console.log('layers->dataLayerSelector: showByMunicipality');
		if (this.state.dataLayer=='indicator'){
			LayersAction.loadIndicatorsByMuncipalities();
		} else {
			LayersAction.loadActivitiesByMuncipalities();
		}
	},

	enableFinancingSelector:function(){
		if (this.state.dataLevel=='departament'){
			LayersAction.loadActivitiesByDepartments();
		} else {
			LayersAction.loadActivitiesByMuncipalities();
		}
	},

	enableIndicatorSelector:function(){
		if (this.state.dataLevel=='departament'){
			LayersAction.loadIndicatorsByDepartments();
		} else {
			LayersAction.loadIndicatorsByMuncipalities();
		}
	},

	componentDidMount :function(){ 
		console.log('layers->manager: componentDidMount');
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
				<RadioButton name="dataLayer" label="layers.funding" selected={dataLayer=='funding'? true : false} onClick={this.enableFinancingSelector}/>
				<div className={finSelectorClass}>
					<ul>
						<li>
							<RadioButton name="finLevel" selected={(dataLayer=='funding'&&dataLevel=='departament')? true : false} onClick={this.showByDepartment} label="layers.byDepartment"/>
							<RadioButton name="finLevel" selected={(dataLayer=='funding'&&dataLevel=='municipality')? true : false} onClick={this.showByMunicipality} label="layers.byMunicipality"/>	
						</li>
					</ul>					
				</div>
			</div>	
			<div className="">
				<RadioButton name="dataLayer" label="layers.indicators" selected={dataLayer=='indicator'? true : false} onClick={this.enableIndicatorSelector}/>
				<div className={indSelectorClass}>
					<ul>
						<li>
							<RadioButton name="indLevel" selected={(dataLayer=='indicator'&&dataLevel=='departament')? true : false} onClick={this.showByDepartment} label="layers.byDepartment"/>
							<RadioButton name="indLevel" selected={(dataLayer=='indicator'&&dataLevel=='municipality')? true : false} onClick={this.showByMunicipality} label="layers.byMunicipality"/>
						</li>
					</ul>
				</div>
			</div>	
		</div>   
		);
	}

});