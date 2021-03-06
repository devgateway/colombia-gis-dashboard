'use strict';

var React = require('react');
var Reflux = require('reflux');


var AddButton= React.createClass({
	handleAdd:function(){
		this.props.onAddLayer(); //add current service to map
	},

	render: function() {
		if (this.props.error){
			return (<div className='btn btn-xs btn-danger'>error</div>);
		} else if (this.props.loading){
			return (<div className='btn btn-xs btn-warning'>loading</div>);
		} else if (this.props.loaded){
			return (<div className='btn btn-xs btn-default'>added</div>)
		} else {
			return (<button disabled={this.props.disabled}  className={this.props.disabled?'btn btn-xs btn-default':'btn btn-apply'}
			 onClick={this.handleAdd}><Message message='layers.add'/></button>)
		}
	}
});


var ResultRecord=React.createClass({

	_handleAdd:function(){
		this.props.onAddLayer({'id':this.props.id,'url':this.props.url,'type':this.props.type,title:this.props.title});
	},

	componentDidMount: function(){
        $(this.getDOMNode()).find('.title').tooltip({container: 'body'});
        $(this.getDOMNode()).find('.details').mCustomScrollbar({theme:'inset-dark'}).tooltip({container: 'body'});    
    },

	render: function() {
		console.log('layers->search->resultList: Render EsriService');
		return(
				<div className='esri-result-item'>
					<div className='layer-wrapper'>
						<div className='thumbnail pull-left'>
							<img width='110px' height='73px' src={'http://www.arcgis.com/sharing/content/items/'+this.props.id+'/info/'+this.props.thumbnail+  (this.props.token?'?token='+this.props.token:'') }/>
						</div>
						<div className='layer-info'>
							<div className='title' data-toggle='Loging is required' title={this.props.title}>{this.props.title} {this.props.loginRequired?<i className='text-warning small'>Loing is required</i>:''}
							</div>

							<div className='details' title={this.props.snippet}>{this.props.snippet}</div>
							<div className='details small'>{this.props.type}  - {this.props.access}</div>
							<div className='add'>
								<AddButton className='btn btn-apply'
									onAddLayer={this._handleAdd}
									loading={this.props.loading}
									error={this.props.error}
									loaded={this.props.loaded}
									disabled={((this.props.loginRequired && !this.props.token)|| this.props.loaded)?true:false}/>
							</div>
						</div>
					</div>
				</div>
			)
	}

});

//default view
module.exports=React.createClass({

	componentDidUpdate: function(){
		//$(this.getDOMNode()).find('.esri-result-list').mCustomScrollbar({axis:'x', theme:'inset-dark'});    
    },

	render: function() {
		console.log('layers->search->resultList: Render EsriServiceList');
		var errorMessage = '';
		if(this.props.error){
			errorMessage = this.props.error.message;
		} 
		return(
			<div>
				{(errorMessage && errorMessage!='')?
					<div> 
						<p className='label label label-danger'>{errorMessage}</p>
						<hr className='h-divider'></hr>
					</div> :''
				}
				{(this.props.search.total==0)?(
					<div  className='filter-no-results'>
						<br/>{<Message message='layers.noResults'/>}
					</div>
					):(
					<div className='esri-result-list'>
						{
							this.props.search.results.map(function(record){
								if (this.props.token.length==0 && record.licenseInfo!=null){
									return null;
								} else {
									return(
										<ResultRecord  onAddLayer={this.props.onAddLayer}  token={this.props.token}   {...record}/>
									)
								}
							}.bind(this))
						}
						{(this.props.search.nextStart>-1)?(
							<div className='esri-result-item'>
								<button className='btn btn-apply' onClick={this.props.onNextPage}><Message message='layers.loadMoreResults'/></button>
							</div>):''
						}
					</div>
					)
				}
							
			</div>
		);
	}

});
