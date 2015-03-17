
/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterActions = require('../../actions/filterActions.js');

var FilterButtons = React.createClass({

    _onClickApply: function(event) {     
        FilterActions.triggerFilterApply();
    },

    _onClickReset: function(event) {     
        FilterActions.triggerFilterReset();
    },

    render: function() {
        var item = this.props.data;       
        return(
            <div class="button-pane">
                <button type="button" className="btn btn-apply" role="button" onClick={this._onClickApply}>Apply</button>
                <button type="button" className="btn btn-apply" role="button" onClick={this._onClickReset}>Reset</button>
            </div>            
        );
    }
});

module.exports = FilterButtons;