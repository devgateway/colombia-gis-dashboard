var React = require('react');

var AllNoneSelector = React.createClass({

    _allSelected: function() {
        this.props.onAllNoneClicked(this.props.filterType, true);
    },

    _noneSelected: function() {
        this.props.onAllNoneClicked(this.props.filterType, false);
    },

    render: function() {
        return(
              <div className="filter-selectors">
                  <span><a href="#" onClick={this._allSelected}>select all</a></span> / <span><a href="#" onClick={this._noneSelected}>deselect all</a></span>
              </div>
            );
    }
});

module.exports = AllNoneSelector;
