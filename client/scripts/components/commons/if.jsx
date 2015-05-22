var React = require('react/addons');

module.exports =React.createClass({
	render:function(){
		if (this.props.condition){
			return <span>{this.props.children}</span>
		}else{
			return null;
		}
	}
});