/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');

var FilterMap = require('../../conf/filterMap.js');

var LanStore=require('../../stores/lanStore.js');

var Filter=require('./filter.jsx');

var _=require('lodash');
var Message=require('.../../../commons/message.jsx');

var actions=require('../../actions/filterActions.js');
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

  _onChangeCounter: function(param, selected, total) {
    var counters = _.clone(this.state.counters);
    counters[param] = {"selected": selected, "total": total};
    this.setState({"counters": counters});
  },

  getInitialState: function() {
    return {
      counters: {},
      activeIndex: 1,
      mode: 'basic'
    };
  },

  render: function() {
  var filters = _.sortBy(FilterMap.filters, 'order');
  var idx = 1;
  return(
    <div className="activity-nav">
      <div className="tab-pane "> 
        <div className="activity-nav">
          <nav className="activities" >
            <ul className="activities nav nav-tabs">
              {
                _.filter(filters,function(it){return (it.modes.indexOf(this.state.mode) > -1)}.bind(this)).map(function(def){
                  return (
                    <li onClick={this._onActivateFilter.bind(null,def.index)} className={(this.state.activeIndex==def.index)?'active':''}>
                      <a href="#">
                        <Message message={def.label}/>
                        {def.param?
                          this.state.counters[def.param]? " ("+this.state.counters[def.param].selected+"/"+this.state.counters[def.param].total+")" : ""
                        : ""}
                      </a>                    
                    </li>
                    )
                }.bind(this))
              }
              <li>
                <div className="filters-more" onClick={this.state.mode=="basic"? this._turnAdvancedOn : this._turnBasicOn}>
                  {this.state.mode=="basic"? <Message message="filters.moreFilters"/> : <Message message="filters.lessFilters"/>}
                </div>
              </li>
            </ul> 
          </nav>          
          <div>
            {
              filters.map(function(def){
                return ( <Filter {...def} onChangeCounter={this._onChangeCounter} active={def.index==this.state.activeIndex}/>)
              }.bind(this))
            }
          </div>
        </div>
      </div>
      <div className="button-pane">
        <button type="button" className="btn btn-apply" role="button" onClick={this._resetFilter}><Message message="filters.reset"/></button>
        <button type="button" className="btn btn-apply space-left" role="button" onClick={this._applyFilter}><Message message="filters.apply"/></button>
      </div>
    </div>
    );
  }

});

