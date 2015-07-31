'use strict';

var React = require('react');
var Reflux = require('reflux');
var Store=require('../../stores/saveStore.js');
var Actions=require('../../actions/saveActions.js');
var _=require('lodash');

module.exports  = React.createClass({

mixins: [Reflux.connect(Store,"store")],

  componentDidMount:function(){
    Actions.findMaps();    
  },

  _handleCLick:function(){

  },


  render: function() {
    debugger
    var mapList=this.state.store.maps || [];
    return (

      <div>
      <div className="text-search-wrapper">
      <div className="search-box">
      <button type="submit" className="search-button" onClick={this._handleCLick}>
      <i className="fa fa-search"></i>
      </button>
      <input onKeyPress={this.handleOnkeypress} className="keyword-search" type="text" placeholder={i18n.t("maps.searchMap")} ref="search_input"/>
      </div>
      </div>

      <ul>
        {
          _.map(mapList,function(){
              return (<div>Map</div>)
            })
            
        }
      </ul>
      </div>
      );
  }

});
