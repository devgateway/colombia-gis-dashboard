
'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var CustomCheckbox = require('../../commons/customCheckbox.jsx');

var FilterItem = React.createClass({
    
    _onItemChanged: function(value, selected) {  
        selected = !this.state.selected; 
        this.setState({selected: selected});
        this.props.onItemChanged(this.props.filterType, value, selected);
    },
 
    _onLabelClicked: function(e) { 
        var selected = !this.state.selected; 
        this.setState({selected: selected});
        this.props.onItemChanged(this.props.filterType, $(e.currentTarget).data('id'), selected);
    },
 
    getInitialState: function() {  
       return {selected: this.props.selected};
    },
 
    componentWillReceiveProps: function(newProps) {  
       this.setState({selected: newProps.selected});
    },

    render: function() {
        //console.log("filters->filter-item: render");
        var childSelectedCount = "";
        var className = "filter-col";
        var collapseDiv = "";
        var label = "";
        if (this.props.onExpandCollapse){
            className = "filter-col-parent";
            collapseDiv = <div className="parent-toggle" onClick={this.props.onExpandCollapse}>
                            <span>{this.props.collapsed? "expand" : "collapse"}</span>
                            <span className={this.props.collapsed? "collapse-icon fa fa-plus" : "collapse-icon fa fa-minus"}></span>
                        </div>;
        }
        if (this.props.childSelectedCount){
            childSelectedCount = <div className="children-count">
                                    ({this.props.childSelectedCount})
                                </div>;
        }
        if (this.state.selected){
            label = <span title={this.props.name} 
                        onClick={this._onLabelClicked} 
                        data-id={this.props.id} 
                        data-placement="top" 
                        className="item-label label-selected">
                            {this.props.name}
                    </span>;
        } else {
            label = <span title={this.props.name}
                        onClick={this._onLabelClicked} 
                        data-id={this.props.id} 
                        data-placement="top" 
                        className="item-label">
                        {this.props.name}
                    </span>;
        }
        return(
        <div className={className}>
            <CustomCheckbox 
                    selected={this.state.selected}
                    onChange={this._onItemChanged}
                    value={this.props.id}/>
            {label} 
            {childSelectedCount}
            {collapseDiv}
        </div>
        );
    }
});

module.exports = FilterItem;