'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');

var CustomCheckbox = React.createClass({
 
    getInitialState: function() {
        return {selected: this.props.selected};
    },

    _onClick: function() { 
        var selected = !this.state.selected;
        this.setState({selected: selected});
        this.props.onChange({selected:selected, value:this.props.value});
    },

    componentWillReceiveProps :function(nextProps){
        if(nextProps.selected!=undefined){
            this.setState({'selected':nextProps.selected})
        };
    },
 

    render: function() {
        var classes = this.state.selected===true? "selectable selected" : "selectable";
        return(
            <span className={classes} onClick={this._onClick}>
                
            </span> 
                
        );
    }
});

module.exports = CustomCheckbox;