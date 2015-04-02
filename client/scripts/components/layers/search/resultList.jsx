'use strict';

var React = require('react');
var Reflux = require('reflux');


var AddButton= React.createClass({

	handleAdd:function(){
		this.props.onAddLayer(this.props.service);
	},

	render: function() {
		return(<button disabled={this.props.disabled} 
			className={this.props.disabled?"btn btn-xs btn-default":"btn btn-xs btn-info"} onClick={this.handleAdd}>ADD</button>);	
	}
});


var EsriService=React.createClass({

	componentWillReceiveProps: function(nextProps) {

	},



	render: function() {
		console.log("layers->search->resultList: Render EsriService");
		var service=this.props.service;
		return(

			<li>
			<div className="title" data-toggle="Loing is required">{service.title} {service.loginRequired?<i className="text-warning small">Loing is required</i>:''}</div>
			<div className="thumbnail"><img width="90px" height="60px" src={"http://www.arcgis.com/sharing/content/items/"+service.id+"/info/"+service.thumbnail}/></div>
			<div className="type">{service.type}  - {service.access}  </div>
			<div className="add"> 
			{service.added?<span>Added</span>:null}
			<AddButton {...this.props}  disabled={((service.loginRequired && !this.props.token)||service.added)?true:false}/>
			</div>
			</li>
			)	
	}

});

module.exports=React.createClass({
	render: function() {
		console.log("layers->search->resultList: Render EsriServiceList");
		return(
			<div>
			{(this.props.error)?<p className='label label-warning'>{this.props.error.message}</p>:null}
			
			<ul className="esri-result-list small">
				{ 
				this.props.services.map(function(s){
					return( <EsriService {...this.props} service={s} />)
				}.bind(this))}
				<li><a onClick={this.moreResults}>More results</a></li>
				</ul>
				</div>
				);	
	}	

});