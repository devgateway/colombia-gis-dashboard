'use strict';

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var LayersAction=require('../../actions/layersAction.js')
module.exports  = React.createClass({

	showByDepartment:function(){
		LayersAction.loadActivitiesByDepartments();
	},

	showByMunicipality:function(){
		LayersAction.loadActivitiesByMuncipalities();
	},

	render: function() {
		return (  

		<div>
			<ul>
				<li>Financiamiento</li>
				<li>
					<ul>
						<li onClick={this.showByDepartment}><span className="btn">Show by Department</span></li>
						<li onClick={this.showByMunicipality}><span className="btn">Show by Municipality</span></li>
					</ul>
				</li>
			</ul>
		</div>   
			);
	}

});