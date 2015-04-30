'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');

var CustomCheckbox = React.createClass({
 
    getInitialState: function() {
        return {selected: this.props.selected? true : false, updated: false};
    },

    _onClick: function() { 
        $('[name='+this.props.name+']').removeClass('selected'); //modify and diselect siblings radio  
        this.setState({'selected': true});
        if (this.props.onClick){
            this.props.onClick(this.props.value, true);                
        } 
        this.setState({'updated': !this.state.updated}); //used to force react to update DOM, since it could be modified by another component
    },
 
    render: function() {
        var classes = this.props.selected? "selectable-radio selected" : "selectable-radio ";
        var updatedClass = this.state.updated? " y" : " n"
        return(
                <div>
                    <span updated={this.state.updated} className={classes+updatedClass} name={this.props.name} onClick={this._onClick}/>
                    <Message message={this.props.label}/>
                </div>                        
        );
    }
});

module.exports = CustomCheckbox;