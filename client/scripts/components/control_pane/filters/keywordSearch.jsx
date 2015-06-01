
var React = require('react');

var KeywordSearch = React.createClass({

    _onKeyUp: function(ev) {
        var value = $(ev.target).val();
        var length = value.length;
        // filter the items only if we have at least 3 characters
        if (length > 2 || ev.keyCode == 13) {
            this.props.onSearch(value);
        } else {
            this.props.onSearch();
        }
    },

    render: function() {
        return(
              <div className="text-search-wrapper">
                  <div className="search-box">
                  <button type="submit" className="search-button" onClick={this.handleCLick}>
          					<i className="fa fa-search"></i>
          				</button>
                      <input className="keyword-search" placeholder={i18n.t("filters.searchFilters")} name="keyword-search" type="text" onKeyUp={this._onKeyUp} />
                  </div>
              </div>
            );
    }
});

module.exports = KeywordSearch;
