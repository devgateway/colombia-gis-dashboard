
var React = require('react');
var FilterItem = require('./filterItem.jsx');

var FilterGroup = React.createClass({

    _onItemChanged: function(event) {  
        this.props.onItemChanged(this.props.filterType, event.target.value, event.target.checked);
    },

    render: function() {
        var items = this.props.items;  
        var filterType = this.props.filterType;  
        var self = this;
        return(
            <ul className="scrollable-list">
                {
                    items.map(function(item){ 
                        if (!item.hide){   
                            return <li key={item.id}>
                                <FilterItem id={item.id} name={item.name} selected={item.selected} filterType={filterType} onItemChanged={self._onItemChanged}/>
                            </li>;
                        }
                    })
                }
            </ul>
            );
    }
});

module.exports = FilterGroup;