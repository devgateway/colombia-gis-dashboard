/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');

var FilterMap = require('../../conf/filterMap.js');

var LanStore=require('../../stores/lanStore.js');

var Filter=require('./filter.jsx');

var _=require('lodash');
var Message=require('.../../../commons/message.jsx');

var actions=require('../../actions/filterListActions.js');
var Store=require('../../stores/filters/filterStore.js');

module.exports = React.createClass({
  mixins: [Reflux.connect(LanStore, 'lan')],

  _applyFilter:function(){
    actions.applyFilters();
  },

  _resetFilter:function(){
    for (var key in actions) {
      if (actions.hasOwnProperty(key)) {
        if (actions[key].clean){
          actions[key].clean();
        }
      }
    }
    actions.applyFilters();
  },

  _turnAdvancedOn: function() {
    this.setState({
      mode: 'advanced'
    });
  },

  _turnBasicOn: function() {
    this.setState({
      mode: 'basic'
    });
  },

  _onActivateFilter: function(index,evt) {
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
  var idx = 1;
  return(
    <div className="activity-nav">
      <div className="filter-type-wrapper">
        <ul className="filter-type-label">
          <li onClick={this._turnBasicOn}>
            <span  className={this.state.mode=="basic"? "" : "active"}><Message message='filters.basicFilters'/></span>
          </li>
          <li onClick={this._turnAdvancedOn}>
            <span className={this.state.mode=="advance"? "active" : ""}><Message message='filters.advancedFilters'/></span>
          </li>
        </ul>
      </div>

      <div className="tab-pane "> 
        <div className="activity-nav">
          <nav className="activities" >
            <ul className="activities nav nav-tabs">
              {
                _.filter(filters,function(it){return (it.modes.indexOf(this.state.mode) > -1)}.bind(this)).map(function(def){
                  return (
                    <li onClick={this._onActivateFilter.bind(null,def.index)} className={(this.state.activeIndex==def.index)?'active':''}>
                      <a href="#"><Message message={def.label}/></a>                    
                    </li>
                    )
                }.bind(this))
              }
            </ul> 
          </nav>
          <div>
            {
              filters.map(function(def){
                return ( <Filter {...def} active={def.index==this.state.activeIndex}/>)
              }.bind(this))
            }
          </div>
        </div>
      </div>
      
      <div className="btn btn-sm btn-success" onClick={this._applyFilter}>Apply Filters</div>
      <div className="btn btn-sm btn-success" onClick={this._resetFilter}>Reset All Filters</div>
    </div>
    );
  }

});

