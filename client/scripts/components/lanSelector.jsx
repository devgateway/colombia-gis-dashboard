'use strict';
var React = require('react')
var LanActions=require('../actions/lanActions.js');
var LanStore=require('../stores/lanStore.js');
var Reflux = require('reflux');
var LanStore=require('../stores/lanStore.js');


module.exports = React.createClass({

	mixins: [Reflux.connect(LanStore, 'lan')],

	handleLocaleChange:function(){
		var locale=this.refs.lanSelector.getDOMNode().value;
		LanActions.changeLocale(locale);
	},
	

	render: function() {
		return (
			<select ref="lanSelector" onChange={this.handleLocaleChange}>
				<option value="en" selected={this.state.lan.locale=='en'?'selected':''}>English</option>
				<option value="es" selected={this.state.lan.locale=='es'?'selected':''}>Español</option>
			</select>
			);
	}
});


