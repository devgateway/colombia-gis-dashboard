
var React = require('react');

var SelectionCounter = React.createClass({

    _showSelected: function(event) {
        this.props.onCounterClicked(true);
    },

    _showAll: function(event) {
        this.props.onCounterClicked(false);
    },

    componentDidMount: function(){
        $('.filter-count span').tooltip();
    },

    render: function() {
        return(
              <div className="filter-count">
                  <span>[</span>
                  <span title="Show Only Selected" data-placement="top">
                    <a href="#" onClick={this._showSelected}>{this.props.selected}</a>
                  </span>
                  <span>/</span>
                  <span title="Show All" data-placement="top">
                    <a href="#" onClick={this._showAll}>{this.props.total}</a>
                  </span>
                  <span>]</span>                  
              </div>
            );
    }
});

module.exports = SelectionCounter;
