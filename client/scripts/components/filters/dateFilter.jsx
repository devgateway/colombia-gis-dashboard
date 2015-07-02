'use strict';

var React = require('react');
var Reflux = require('reflux');

var DateFilter = React.createClass({

    onStatusChange: function(status, selection) {
        console.log('onStatusChange -> '+status);
        debugger;
        this._setStartDate(status.sd);
        this._setEndDate(status.ed);
    },

    _setStartDate: function(date){
        $(this.getDOMNode()).find('.start-date').datepicker('setDate', date);
        //this.actions.updateItemValue('sd', date);
        this.setState({'startDate': date}); 
    },    

    _setEndDate: function(date){
        $(this.getDOMNode()).find('.end-date').datepicker('setDate', date);
        //this.actions.updateItemValue('ed', date);  
        this.setState({'endDate': date});
    },

    _clearStartDate: function(date){
        this._setStartDate('');
    },    

    _clearEndDate: function(date){
        this._setEndDate('');   
    },

    componentDidUpdate: function(){
        var self = this;
        $('.start-date').datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText) {
                self.actions.updateItemValue('sd', dateText);
            }
        });
        $('.end-date').datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText) {
                self.actions.updateItemValue('ed', dateText);
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
                                <span className="filter-label" role="label"><Message message='filters.date'/></span>                                                                
                            </div>
                            <div className="input-group date">
                                <span className="filter-label" role="label"><Message message='filters.startDate'/></span>
                                <input type="text" className="start-date"/>
                                <i className="fa fa-trash" onClick={this._clearStartDate}></i>
                            </div>
                            <div className="input-group date">
                                <span className="filter-label" role="label"><Message message='filters.endDate'/></span>
                                <input type="text" className="end-date"/>
                                <i className="fa fa-trash" onClick={this._clearEndDate}></i>
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