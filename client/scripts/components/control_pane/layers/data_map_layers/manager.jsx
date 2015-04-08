'use strict';

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var LayersAction=require('../../../../actions/layersAction.js');
var DataLayerStore=require('../../../../stores/dataLayerStore.js');




module.exports  = React.createClass({
 mixins: [Reflux.connect(DataLayerStore, 'layers')],

	showByDepartment:function(){
		console.log('layers->dataLayerSelector: ShowByDepartment');
		LayersAction.loadActivitiesByDepartments();
	},

	showByMunicipality:function(){
		console.log('layers->dataLayerSelector: showByMunicipality');
		LayersAction.loadActivitiesByMuncipalities();
	},

	render: function() {
		return (  
		<div className="danger">
			<ul>
				<li><input type="radio"/>Financiamiento</li>
				<li>

					<ul>
						<li onClick={this.showByDepartment}><input type="radio"/> <span className="btn"><Message message="layers.byDepartment"/></span></li>
						<li onClick={this.showByMunicipality}><input type="radio"/> 	<span className="btn"><Message message="layers.byMunicipality"/></span></li>
					</ul>
				</li>
			</ul>
		</div>   
			);
	}

});