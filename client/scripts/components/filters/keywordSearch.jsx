
var React = require('react');

var KeywordSearch = React.createClass({

  _onKeyUp: function(ev) {

    var lengthLimit=this.props.lengthLimit || 2;
    var value = $(ev.target).val();
    var length = value.length;
        // filter the items only if we have at least 3 characters
        if (this.props.onSearch ) {
          this.props.onSearch(value);
        }
        if (ev.keyCode == 13 && this.props.onSearchEnterKey){
         this.props.onSearchEnterKey(value);
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
