/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../stores/filterStore.js')
var FilterItem = require('./filterItem.jsx');


var FilterGroup = React.createClass({
 
    mixins: [Reflux.connect(FilterStore)],

    _filterByKeyword: function (keyword) {
        var items;
        if (keyword) {
            // filter the collection
            var pattern = new RegExp(keyword, 'i');
            this.state[this.props.filterType].map(function (item) {
                if (!pattern.test(item.name)){
                    item.hide = true;
                }
            });
        } else {
            // display the original collection
            this.state[this.props.filterType].map(function (item) {
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
            //this.setState(this.state);
        } else {
            this._filterByKeyword();
            this.forceUpdate();
            //this.setState(this.state);
        }
    },
    
    componentWillMount :function(){        
    },

    componentWillUnmount: function() {
    },

    componentDidUpdate:function( prevProps,  prevState){
        //debugger;
    },

    render: function() {
        var filterType = this.props.filterType;
        var items = this.state[filterType] || [];  
        debugger;
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