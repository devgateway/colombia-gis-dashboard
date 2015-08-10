'use strict';
var React = require('react/addons');
var Reflux = require('reflux');
var Store=require('../../stores/filters/filterStore.js')
module.exports = React.createClass({

	  mixins: [Reflux.connect(Store)],

	
	render: function() {
		console.log('PRINT FILTEEEEEEEEEEEEEER')
		console.log(this.state)
		return (<div>
			<h1>Filters</h1>
		</div>)
	}
});
