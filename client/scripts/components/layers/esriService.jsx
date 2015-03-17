var React = require('react');
var Reflux = require('reflux');
var EsriLayer=require('./esriLayer.jsx');

module.exports =React.createClass({ 

	

	getDefaultProps: function() {
       return {expanded:false};
  	},

	toggle:function(){

		this.props.expanded=( !this.props.expanded);
	  	this.forceUpdate();
	},


	
	handleVisbility:function(){
		this.props.service.defaultVisibility=(!this.props.service.defaultVisibility);
		this.updateAll(this.props.service.defaultVisibility);

	},

   /*tell parrent something has changed */
	update:function(){
		this.props.onChange();

	},

	updateAll:function(isVisible){
		this.props.service.layers.map( function (l){
			l.defaultVisibility=isVisible;
		});
		this.forceUpdate();
		this.update();
	},

	render: function() {
		var service=this.props.service;
		var layers=this.props.service.layers;
		return (
				<div>
					<ul>
						<li>
							<input name={service.metadata.id} onChange={this.handleVisbility} type="checkbox" checked={this.props.service.defaultVisibility}/> 
							<span onClick={this.toggle} className="clickeable">
								{service.metadata.title}  
							</span>
							<span>
								&nbsp;<i onClick={this.toggle} className={this.props.expanded?"fa small fa-minus-circle":"fa small fa-plus-circle"}></i>
							</span>
							<ul ref="list" className={this.props.expanded?"expanded":"collapsed"}>
								{   
									layers.map( function (l){
										return (<EsriLayer onChange={this.update} layer={l}/>) 
									}.bind(this))
							}
							</ul>
						</li>
					</ul>
				</div>
				) 
	}

});