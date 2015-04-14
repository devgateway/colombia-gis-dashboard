
var React = require('react');

var SelectionCounter = React.createClass({

    _showSelected: function(event) {     
        this.props.onCounterClicked(true);
    },

    _showAll: function(event) {     
        this.props.onCounterClicked(false);
    },

    componentDidMount: function(){
        $('.filter-count').tooltip();      
    },

    render: function() {
        var divStyle = {display: 'inline'};
        return(
              <div style={divStyle}>
                  <span className="filter-count" title="Show Only Selected" data-placement="right">
                    <a href="#" onClick={this._showSelected}>{this.props.selected}</a>
                  </span> 
                  <span className="filter-count">/</span>
                  <span className="filter-count" title="Show All" data-placement="right">
                    <a href="#" onClick={this._showAll}>{this.props.total}</a>
                  </span>                    
              </div>
            );
    }
});

module.exports = SelectionCounter;