'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');

var CustomCheckbox = React.createClass({
 
    getInitialState: function() {
        return {selected: this.props.selected? true : false};
    },

    _onClick: function() { 
        if (!this.state.selected) {
            $(this.getDOMNode()).addClass('selected');
            this.setState({selected: true});
            if (this.props.onChange){
                this.props.onChange(this.props.value, true);                
            }
        } else {
            $(this.getDOMNode()).removeClass('selected');
            this.setState({selected: false});
            if (this.props.onChange){
                this.props.onChange(this.props.value, false);                
            }
        }
    },
 
    componentWillMount: function(){
              
    },

    render: function() {
        var classes = this.props.selected? "selectable selected" : "selectable";
        return(
            <span className={classes} onClick={this._onClick}>
                
            </span> 
                
        );
    }
});

module.exports = CustomCheckbox;