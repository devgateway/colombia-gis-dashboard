'use strict';

var React = require('react');
var Reflux = require('reflux');
var DatePicker=require('.../../../commons/datePicker.jsx');

var DateFormat = 'dd/mm/yy';

var DateFilter = React.createClass({

    onStatusChange: function(status, selection) {
        if(status.loadedFromSaved){
            this._setStartDate(status.sd);
            this._setEndDate(status.ed);
        }
    },

    _setStartDate: function(date){
        this.setState({'startDate': date});
        this.actions.updateItemValue('sd', date);
        if (!this.state.endDate && date!=''){
            var d = $.datepicker.parseDate(DateFormat, date);
            d.setFullYear(d.getFullYear() + 1);
            var dFormated = $.datepicker.formatDate(DateFormat,d)
            this.setState({'endDate': dFormated});
            this.actions.updateItemValue('ed', dFormated);
        }
    },    

    _setEndDate: function(date){
        this.setState({'endDate': date});
        this.actions.updateItemValue('ed', date);
        if (!this.state.startDate && date!=''){
            var d = $.datepicker.parseDate(DateFormat, date);
            d.setFullYear(d.getFullYear() - 1);
            var dFormated = $.datepicker.formatDate(DateFormat,d)
            this.setState({'startDate': dFormated});
            this.actions.updateItemValue('sd', dFormated);
        }
    },

    _clearDates: function(){
        this.setState({'endDate': '', 'startDate': ''});
        this.actions.updateItemValue('sd', "");
        this.actions.updateItemValue('ed', "");
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
                                <DatePicker dateFormat={DateFormat} maxDate={this.state.endDate} defaultDate={this.state.startDate} onChange={this._setStartDate}/>
                            </div>
                            <div className="input-group date">
                                <span className="filter-label" role="label"><Message message='filters.endDate'/></span>
                                <DatePicker dateFormat={DateFormat} minDate={this.state.startDate} defaultDate={this.state.endDate} onChange={this._setEndDate}/>
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