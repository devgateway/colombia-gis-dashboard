/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');

var FilterMap = require('../../conf/filterMap2.js');

var LanStore=require('../../stores/lanStore.js');

var Filter=require('./filter.jsx');

var _=require('lodash');

module.exports = React.createClass({
  mixins: [Reflux.connect(LanStore, 'lan')],

  _turnAdvancedOn: function() {
    this.setState({
      mode: 'advanced'
    });
  },

  _turnBaicOn: function() {
    this.setState({
      mode: 'basic'
    });
  },

  _onActivateFilter: function(index) {
    this.setState(_.assign({
      activeIndex: index
    }));
  },

  getInitialState: function() {
    return {
      activeIndex: 1,
      mode: 'basic'
    };
  },

  render: function() {
    var filters = FilterMap.filters;
      return(
        <div className="activity-nav">
          <div className="filter-type-wrapper">
            <ul className="filter-type-label">
              <li onClick={this._turnBaicOn}>
                <span  className={this.state.mode=="basic"? "" : "active"}><Message message='filters.basicFilters'/></span>
              </li>
              <li onClick={this._turnAdvancedOn}>
                <span className={this.state.mode=="advance"? "active" : ""}><Message message='filters.advancedFilters'/></span>
              </li>
            </ul>
          </div>
  
            {
              filters.map(function(def){
                return <Filter  {...def}  mode={this.state.mode}  onActivate={this._onActivateFilter}  active={def.index==this.state.activeIndex}/>
              }.bind(this))
            }          
          
     
       </div>
      );
  }

});

