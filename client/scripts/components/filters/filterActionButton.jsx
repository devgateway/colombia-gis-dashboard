
/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterActions = require('../../actions/filterActions.js');

var FilterItem = React.createClass({

    _onClickApply: function(event) {     
        FilterActions.triggerFilterApply();
    },

    _onClickReset: function(event) {     
        FilterActions.triggerFilterReset();
    },

    render: function() {
        var item = this.props.data;       
        return(
            <div>
                <button className="btn btn-primary"
                    type="button"
                    onClick={this._onClickApply}>
                    Apply Filter
                </button>
                <button className="btn btn-primary"
                    type="button"
                    onClick={this._onClickReset}>
                    Reset Filter
                </button>
             </div>           
        );
    }
});

module.exports = FilterItem;