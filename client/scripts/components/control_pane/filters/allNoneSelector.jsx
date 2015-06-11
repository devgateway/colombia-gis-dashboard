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
                  <span><a href="#" onClick={this._allSelected}>
                    <Message message="filters.selectAll"/>
                  </a></span> / <span><a href="#" onClick={this._noneSelected}>
                    <Message message="filters.deselectAll"/>
                  </a></span>
              </div>
            );
    }
});

module.exports = AllNoneSelector;
