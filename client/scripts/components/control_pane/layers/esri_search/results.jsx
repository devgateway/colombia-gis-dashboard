'use strict';

var React = require('react');
var Reflux = require('reflux');


var AddButton= React.createClass({
	handleAdd:function(){
		this.props.onAddLayer(this.props.service);
	},

	render: function() {
		return(<button disabled={this.props.disabled}
			className={this.props.disabled?"btn btn-xs btn-default":"btn btn-apply"} onClick={this.handleAdd}>ADD</button>);
	}
});


var EsriService=React.createClass({
	render: function() {
		console.log("layers->search->resultList: Render EsriService");
		var service=this.props.service;
		return(

			<li>
				<div className="layer-wrapper">
					<div className="thumbnail pull-left">
					<img width="110px" height="73px" src={"http://www.arcgis.com/sharing/content/items/"+service.id+"/info/"+service.thumbnail+  (this.props.token?"?token="+this.props.token:"") }/>
					</div>

					<div className="layer-info">
						<div className="title" data-toggle="Loing is required">{service.title} {service.loginRequired?<i className="text-warning small">Loing is required</i>:''}
						</div>
						<div className="details">{service.snippet}</div>
						<div className="details small">{service.type}  - {service.access}</div>
						<div className="add">
						<AddButton className="btn btn-apply"  onAddLayer={this.props.onAddLayer}  service={service}
									disabled={((service.loginRequired && !this.props.token)|| service.added)?true:false}/>
						</div>
					</div>

				</div>
			</li>
			)
	}

});

module.exports=React.createClass({
	render: function() {
		console.log("layers->search->resultList: Render EsriServiceList");
		debugger;
		return(
			<div>
				{(this.props.error)?<div><hr class="h-divider"></hr> <p className='label label-error'>{this.props.error.message}</p><hr class="h-divider"></hr></div>:null}
				
				<ul className="esri-result-list">
						{
							this.props.results.results.map(function(s){ 
								return( <EsriService  onAddLayer={this.props.onAddLayer}  token={this.props.token}  service={s}/>)
							}.bind(this))
						}


					{(this.props.results.nextStart>-1)?(
							<li>
								<div className="layer-info text-rigth">
									<button className="btn btn-info" onClick={this.props.onNextPage}>Click to load more Results</button>
								</div>

							</li>):""
					}

				</ul>	


			
			
			</div>
		);
	}

});
