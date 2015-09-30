'use strict';
var React = require('react');
var Reflux = require('reflux');

var LanStore=require('../../stores/lanStore.js');

var KeywordSearch = React.createClass({

  mixins: [Reflux.connect(LanStore, 'lan')],

  _onKeyUp: function(ev) {

    var lengthLimit=this.props.lengthLimit || 0;
    var value = $(ev.target).val();
    var length = value.length;
        // filter the items only if we have at least 3 characters
        if (this.props.onSearch && length>=lengthLimit) {
          this.props.onSearch(value);
        } else if (this.props.onClear && length===0){
          this.props.onClear();
        }
        if (ev.keyCode == 13 && this.props.onSearchEnterKey){
         this.props.onSearchEnterKey(value);
       }

     },

     render: function() {
      var placeholder = i18n.t('filters.searchFilters');
      if (this.props.lengthLimit>2){
         placeholder = placeholder + i18n.t('filters.searchLengthMessage1') + this.props.lengthLimit + i18n.t('filters.searchLengthMessage2');
      }
      return(
        <div className='text-search-wrapper'>
          <div className='search-box'>
            <button type='submit' className='search-button' onClick={this.handleCLick}>
               <i className='fa fa-search'></i>
             </button>
              <input className='keyword-search' placeholder={placeholder} name='keyword-search' type='text' onKeyUp={this._onKeyUp} />
          </div>
        </div>
        );
    }
  });

module.exports = KeywordSearch;
