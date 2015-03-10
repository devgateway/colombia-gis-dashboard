
/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterActions = require('../../actions/filterActions.js');


var FilterItem = React.createClass({
 
    _onItemChanged: function(event) {     
        FilterActions.changeFilterItemState(this.props.filterType, event.target.value, event.target.checked);
    },
 

    render: function() {
        return(
            <div>
                <span className="select">
                    <input className="glyphicon glyphicon-stop"
                        type="checkbox"
                        checked={this.props.selected}
                        onChange={this.props.onItemChanged}
                        value={this.props.id} />
                    
                </span> 
                {this.props.name}                
            </div>
        );
    }
});

module.exports = FilterItem;