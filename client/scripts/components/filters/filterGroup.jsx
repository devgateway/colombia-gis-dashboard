/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../stores/filterStore.js')
var FilterItem = require('./filterItem.jsx');
var FilterActions = require('../../actions/filterActions.js');


var FilterGroup = React.createClass({
 
    _filterByKeyword: function (keyword) {
        var items;
        if (keyword) {
            // filter the collection
            var pattern = new RegExp(keyword, 'i');
            FilterStore.getAll(this.props.filter.key).map(function (item) {
                if (!pattern.test(item.name)){
                    item.hide = true;
                }
            });
        } else {
            // display the original collection
            FilterStore.getAll(this.props.filter.key).map(function (item) {
                item.hide = false;
            });
        }
        return items;  
    },

    componentDidMount: function() {
        
    },

    _searchKeyUp: function(ev) {
        var value = $(ev.target).val();
        var length = value.length;
        // filter the items only if we have at least 3 characters
        if (length > 2 || ev.keyCode == 13) {
            this._filterByKeyword(value);
            this.forceUpdate();
        } else {
            this._filterByKeyword();
            this.forceUpdate();
        }
    },
    
    componentWillMount :function(){ 
        FilterActions.getListFromAPI(this.props.filter);          
    },

    componentWillUnmount: function() {
    },

    componentDidUpdate:function( prevProps,  prevState){
        //debugger;
    },

    render: function() {
        var filterType = this.props.filter.key;
        var items = FilterStore.getAll(filterType) || [];  
        return(
            <div>
                <input
                    className="form-control-sm"
                    placeholder="Keyword Search"
                    onKeyUp={this._searchKeyUp} />
                <ul className="scrollable-list">
                {
                    items.map(function(item){ 
                        if (!item.hide){   
                            return <li key={item.id}><FilterItem data={item} filterType={filterType} /></li>;
                        }
                    })
                }
                </ul>
            </div>
            );
    }
});

module.exports = FilterGroup;