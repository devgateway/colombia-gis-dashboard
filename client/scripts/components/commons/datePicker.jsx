'use strict';

var React = require('react');
var Reflux = require('reflux');
var updated = false;

var DateFilter = React.createClass({


    componentDidUpdate: function(){
        var self = this;
        $(this.getDOMNode()).datepicker({
            dateFormat: self.props.dateFormat || 'dd/mm/yy',
            maxDate: self.props.maxDate,
            minDate: self.props.minDate,
            defaultDate: self.props.defaultDate,
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText) {
                if (self.props.onChange){
                    self.props.onChange(dateText);
                }
            }
        }); 
    },    

    componentDidMount: function(){
        var self = this;
        $(this.getDOMNode()).datepicker({
            dateFormat: self.props.dateFormat || 'dd/mm/yy',
            maxDate: self.props.maxDate,
            minDate: self.props.minDate,
            defaultDate: self.props.defaultDate,
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText) {
                if (self.props.onChange){
                    self.props.onChange(dateText);
                }
            }
        }); 
    },   

    componentWillUnmount: function() {
        
    },

    getInitialState: function() {
        return {
            updated: false
        };
    },

    render: function() { 
        var key = Date.now();
        return(
            <input type='text' key={key} value={this.props.defaultDate} className='start-date'/>
        )
    }
});

module.exports = DateFilter;