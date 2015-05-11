'use strict';

var React = require('react');
var Reflux = require('reflux');


var AddButton= React.createClass({
	handleAdd:function(){
		this.props.onAddLayer(); //add current service to map
	},

	render: function() {
		if (this.props.error){
			return (<div className="btn btn-xs btn-danger">error</div>);
		}else if (this.props.loading){
			return (<div className="btn btn-xs btn-warning">loading</div>);
		}
		else if (this.props.loaded){
			return (<div className="btn btn-xs btn-default">added</div>)
		}else{
			return (<button disabled={this.props.disabled}  className={this.props.disabled?"btn btn-xs btn-default":"btn btn-apply"}
			 onClick={this.handleAdd}>ADD</button>)
		}
	}
});


var ResultRecord=React.createClass({

	_handleAdd:function(){
		
		this.props.onAddLayer({'id':this.props.id,'url':this.props.url,'type':this.props.type,title:this.props.title})
	},

	render: function() {
		console.log("layers->search->resultList: Render EsriService");
		return(
				<li>
					<div className="layer-wrapper">
						<div className="thumbnail pull-left">
							<img width="110px" height="73px" src={"http://www.arcgis.com/sharing/content/items/"+this.props.id+"/info/"+this.props.thumbnail+  (this.props.token?"?token="+this.props.token:"") }/>
						</div>

					<div className="layer-info">
					<div className="title" data-toggle="Loing is required">{this.props.title} {this.props.loginRequired?<i className="text-warning small">Loing is required</i>:''}
				</div>
				
				<div className="details">{this.props.snippet}</div>
				<div className="details small">{this.props.type}  - {this.props.access}</div>
					<div className="add">

						<AddButton className="btn btn-apply"  
							onAddLayer={this._handleAdd}  
							loading={this.props.loading}	
							error={this.props.error} 
							loaded={this.props.loaded}
							disabled={((this.props.loginRequired && !this.props.token)|| this.props.loaded)?true:false}/>
					</div>
				</div>

			</div>
			</li>
			)
	}

});

//default view
module.exports=React.createClass({

	render: function() {
		console.log("layers->search->resultList: Render EsriServiceList");
		return(
			<div>
			{(this.props.error)?<div> <p className='label label label-danger'>{this.props.error.message}</p>
			<hr class="h-divider"></hr></div>:null}

			<ul className="esri-result-list">
			{
				this.props.search.results.map(function(record){ 
					return( <ResultRecord  onAddLayer={this.props.onAddLayer}  token={this.props.token}   {...record}/>
				)}.bind(this))
			}

			{(this.props.search.nextStart>-1)?(
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
