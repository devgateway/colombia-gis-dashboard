
'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var CustomCheckbox = require('../../commons/customCheckbox.jsx');

var FilterItem = React.createClass({
 
    _onItemChanged: function(value, selected) {  
       this.props.onItemChanged(this.props.filterType, value, selected);
    },
 
    render: function() {
        var childSelectedCount = this.props.childSelectedCount? "  ("+this.props.childSelectedCount+")" : "";
        return(
            <div className="filter-col">
                <CustomCheckbox 
                        selected={this.props.selected}
                        onChange={this._onItemChanged}
                        value={this.props.id}/>
                {this.props.name} 
                {childSelectedCount}
            </div>
        );
    }
});

module.exports = FilterItem;