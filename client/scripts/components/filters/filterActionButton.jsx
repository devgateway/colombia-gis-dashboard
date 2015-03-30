
/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;

var FilterButtons = React.createClass({

    render: function() {
        var item = this.props.data;       
        return(
            <div class="button-pane">
                <button type="button" className="btn btn-apply" role="button" onClick={this.props.onClickApply}>Apply</button>
                <button type="button" className="btn btn-apply" role="button" onClick={this.props.onClickReset}>Reset</button>
            </div>            
        );
    }
});

module.exports = FilterButtons;