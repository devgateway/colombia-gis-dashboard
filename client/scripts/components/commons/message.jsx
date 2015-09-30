'use strict';
var React = require('react');
var Reflux = require('reflux');

var LanStore=require('../../stores/lanStore.js');

module.exports = React.createClass({

	mixins: [Reflux.connect(LanStore, 'lan')],

	render: function() {
		return (
			<span>{i18n.t(this.props.message)}</span>
		);
	}
});


