'use strict';

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var LayersAction=require('../../../actions/layersAction.js');
var DataLayerStore=require('../../../stores/dataLayerStore.js');
var CustomRadio=require('../../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup=require('../../commons/customRadioButton.jsx').RadioGroup


module.exports  = React.createClass({
	mixins: [Reflux.connect(DataLayerStore)], 

	showByDepartment:function(){
		LayersAction.loadActivitiesByDepartments();
	},

	showByMunicipality:function(){
		LayersAction.loadActivitiesByMuncipalities();
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

			<CustomRadioGroup>
				<CustomRadio  name="departament" checked={(dataLevel=='departament')? true : false} 	onClick={this.showByDepartment} label="layers.byDepartment"/>
				<CustomRadio  name="municipality" checked={(dataLevel=='municipality')? true : false}  onClick={this.showByMunicipality} label="layers.byMunicipality"/>	
			</CustomRadioGroup>
			</li>
			</ul>					
			</div>
			</div>	
			</div>   
			);
	}

});