'use strict';

var React = require('react');
var Reflux = require('reflux');
var FilterStore=require('../../../stores/filterStore.js')
var FilterActions=require('../../../actions/filterActions.js')

var DateFilter = React.createClass({

    _clearStartDate: function(ev){
        $('.start-date').datepicker('setDate', null);
        this.props.onValueChanged('sd', '');  
    },    

    _clearEndDate: function(ev){
        $('.end-date').datepicker('setDate', null);
        this.props.onValueChanged('ed', '');   
    },

    componentDidUpdate: function(){
        console.log("control-pane->filters->dateFilter-->componentDidUpdate");
        if(this.props && this.props.resetDates){
            FilterActions.resetDates();
            if($('.start-date').val()!=""){
                this._clearStartDate();
            }
            if($('.end-date').val()!=""){
                this._clearEndDate();
            }
        }
    },

 
    componentDidMount: function(){
        var self = this;
        $('.start-date').datepicker({
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true,
                onSelect: function(dateText) {
                    self.props.onValueChanged('sd', dateText);
                }
            });
        $('.end-date').datepicker({
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true,
                onSelect: function(dateText) {
                    self.props.onValueChanged('ed', dateText);
                }
            });      
    },    

    render: function() {  
              
        return(
            <div className="filter-group-panel selected">
                <div className="filter-group-panel-header">
                    <span className="filter-label" role="label"><Message message='filters.date'/></span>                                                                
                </div>
                <div className="input-group date">
                    <span className="filter-label" role="label"><Message message='filters.startDate'/></span>
                    <input type="text" className="start-date" onChange={this._changeStartDate}/>
                    <i className="fa fa-trash" onClick={this._clearStartDate}></i>
                </div>
                <div className="input-group date">
                    <span className="filter-label" role="label"><Message message='filters.endDate'/></span>
                    <input type="text" className="end-date" onChange={this._changeEndDate}/>
                    <i className="fa fa-trash" onClick={this._clearEndDate}></i>
                </div>
            </div>
            );  
        
    }
});

module.exports = DateFilter;