
'use strict';
var React = require('react')
var LanActions=require('../actions/lanActions.js');
var LanStore=require('../stores/lanStore.js');
var Reflux = require('reflux');



module.exports = React.createClass({

	mixins: [Reflux.connect(LanStore, 'lan')],

	handleLocaleChange:function(event){
		var target = $( event.currentTarget );
   		target.closest('.language-btn').find('[data-bind="label"]').text(target.text());
       	LanActions.changeLocale(target.data("value"));
	},


	render: function() {
		return (
			<div className="language-btn">
	            <button type="button" className="btn btn-language-select dropdown-toggle" data-toggle="dropdown">
	              <span data-bind="label">{i18n.t('app.languagelabel')}</span>&nbsp;<span className="caret"></span>
	            </button>
	            <ul className="dropdown-menu" role="menu">
	              <li onClick={this.handleLocaleChange} data-value="en"><a href="#">{i18n.t('app.languageEnglish')}</a></li>
	              <li onClick={this.handleLocaleChange} data-value="es"><a href="#">{i18n.t('app.languageSpanish')}</a></li>
	            </ul>
          	</div>
			);
	}
});
