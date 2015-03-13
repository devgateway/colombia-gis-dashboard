
var React = require('react');

var KeywordSearch = React.createClass({

    _onKeyUp: function(event) {  
        this.props.onKeyUp(event);
    },

    render: function() {
        return(
              <div className="text-search-wrapper">
                  <div className="search-box">
                      <input className="keyword-search" name="keyword-search" type="text" onKeyUp={this._onKeyUp} />
                  </div>
              </div>
            );
    }
});

module.exports = KeywordSearch;