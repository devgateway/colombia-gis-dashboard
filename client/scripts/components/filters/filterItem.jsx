
/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterActions = require('../../actions/filterActions.js');

function getStateFromStores() {
  return {};
}

var FilterItem = React.createClass({
 
    componentDidMount: function() {
        
    },

    _onItemChanged: function(event) {     
        FilterActions.changeFilterItemState(this.props.filterType, event.target.value, event.target.checked);
    },

    componentWillMount :function(){
    },

    componentWillUnmount: function() {
    },

    componentDidUpdate:function( prevProps,  prevState){
    },
 
    render: function() {
        var item = this.props.data;       
        return(
            <div>
                <input className="toggle"
                    type="checkbox"
                    checked={item.selected}
                    onChange={this._onItemChanged}
                    value={item.id} />
                <label className="checkbox-inline">
                    {item.name}
                </label>
             </div>           
        );
    }
});

module.exports = FilterItem;