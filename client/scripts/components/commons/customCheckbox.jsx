'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');

var CustomCheckbox = React.createClass({
 
    getInitialState: function() {
        return {selected: this.props.selected};
    },

    _onClick: function() { 
       this.setState({selected: !this.state.selected});
        this.props.onChange({selected:this.state.selected});
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