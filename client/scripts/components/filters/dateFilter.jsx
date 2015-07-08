'use strict';

var React = require('react');
var Reflux = require('reflux');

var DateFilter = React.createClass({

    onStatusChange: function(status, selection) {
        this._setStartDate(status.sd);
        this._setEndDate(status.ed);
    },

    _setStartDate: function(date){
        $(this.getDOMNode()).find('.start-date').datepicker('setDate', date);
        this.setState({'startDate': date}); 
    },    

    _setEndDate: function(date){
        $(this.getDOMNode()).find('.end-date').datepicker('setDate', date);
        this.setState({'endDate': date});
    },

    _clearDates: function(){
        $(this.getDOMNode()).find('.start-date').datepicker('setDate', '');
        $(this.getDOMNode()).find('.end-date').datepicker('setDate', '');
        this.setState({'endDate': '', 'startDate': ''});
    },    

    componentDidUpdate: function(){
        var self = this;
        $('.start-date').datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText) {
                $(".end-date").datepicker("option","minDate", dateText);
                self.actions.updateItemValue('sd', dateText);
                if ($(".end-date").val().length==0){ //if end date is null, then set it to a year after startDate
                    var d = $.datepicker.parseDate('dd/mm/yy', dateText);
                    d.setFullYear(d.getFullYear() + 1);
                    self.actions.updateItemValue('ed', d);                
                }
            }
        });
        $('.end-date').datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText) {
                $(".start-date").datepicker("option","maxDate", dateText);
                self.actions.updateItemValue('ed', dateText);
                if ($(".start-date").val().length==0){ //if start date is null, then set it to a year before endDate
                    var d = $.datepicker.parseDate('dd/mm/yy', dateText);
                    d.setFullYear(d.getFullYear() - 1);
                    self.actions.updateItemValue('sd', d); 
                }
            }
        });      
    },    

    componentDidMount: function(){
        this.actions = this.props.actions;
        this.unsubscribe = this.props.store.listen(this.onStatusChange);        
    },   

    componentWillUnmount: function() {
        this.unsubscribe();
    },

    getInitialState: function() {
        return {
            startDate: '',
            endDate: ''
        };
    },

    render: function() {  
        console.log('DateFilter -> render');
        if (this.props.active){
            return(
                <div className="tab-content">
                    <div className="tab-pane fade active in">
                        <div className="filter-group-panel selected">
                            <div className="filter-group-panel-header">
                                <span className="filter-label" role="label"><Message message='filters.subActivitiesBetween'/></span>                                                                
                            </div>
                            <div className="input-group date">
                                <span className="filter-label" role="label"><Message message='filters.startDate'/></span>
                                <input type="text" className="start-date"/>
                            </div>
                            <div className="input-group date">
                                <span className="filter-label" role="label"><Message message='filters.endDate'/></span>
                                <input type="text" className="end-date"/>
                            </div>
                            <div className="input-group date">
                                <button type="button" className="btn btn-apply clear-dates" role="button" onClick={this._clearDates}><Message message="filters.clearDates"/></button>    
                            </div>
                        </div>
                    </div>
                </div>
            );  
        } else {
            return null;
        }
    }
});

module.exports = DateFilter;