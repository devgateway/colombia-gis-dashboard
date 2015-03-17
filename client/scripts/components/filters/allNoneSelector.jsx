var React = require('react');
var FilterActions = require('../../actions/filterActions.js');

var AllNoneSelector = React.createClass({

    _allSelected: function() {
        FilterActions.changeAllFilterItemState(this.props.filterType, true);  
    },    

    _noneSelected: function() {  
        FilterActions.changeAllFilterItemState(this.props.filterType, false);  
    },

    render: function() {
        return(
              <div className="filter-selectors">
                  <span><a href="#" onClick={this._allSelected}>select all</a></span> / <span><a href="#" onClick={this._noneSelected}>diselect all</a></span>
              </div>
            );
    }
});

module.exports = AllNoneSelector;