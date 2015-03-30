
'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;

var FilterItem = React.createClass({
 
    _onItemChanged: function(event) {  
       this.props.onItemChanged(this.props.filterType, event.target.value, event.target.checked);
    },
 
    render: function() {
        var childSelCount = "  ("+this.props.childSelCount+")";
        return(
            <div>
                <span className="select">
                    <input className="glyphicon glyphicon-stop"
                        type="checkbox"
                        checked={this.props.selected}
                        onChange={this._onItemChanged}
                        value={this.props.id} />
                    
                </span> 
                {this.props.name} 
                {childSelCount}
            </div>
        );
    }
});

module.exports = FilterItem;