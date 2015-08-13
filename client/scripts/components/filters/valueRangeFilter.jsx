'use strict';

var React = require('react');
var Reflux = require('reflux');

var ValueRangeFilter = React.createClass({

    onStatusChange: function(status, selection) {
        this._setRangeMin(status.vr1);
        this._setRangeMax(status.vr2);
        
    },

    _setRangeMin: function(value){
        this.setState({'valueRangeMin': value}); 
    },    

    _setRangeMax: function(value){
        this.setState({'valueRangeMax': value});
    },

    _rangeMinChanged: function(event){
        this.setState({'valueRangeMin': event.target.value});
        this.actions.updateItemValue('vr1', event.target.value);
    },

    _rangeMaxChanged: function(event){
        this.setState({'valueRangeMax': event.target.value});
        this.actions.updateItemValue('vr2', event.target.value);
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
            valueRangeMin: '',
            valueRangeMax: ''
        };
    },

    render: function() {  
        console.log('valueRangeFilter -> render');
        if (this.props.active){
            return(
                <div className="tab-content">
                    <div className="tab-pane fade active in">
                        <div className="filter-group-panel selected">
                            <div className="filter-group-panel-header">
                                <span className="filter-label" role="label"><Message message='filters.valueRangesBetween'/></span>                                                                
                            </div>
                            <div className="input-group date">
                                <span className="filter-label" role="label">Min $: </span>
                                <input type="text" value={this.state.valueRangeMin} onChange={this._rangeMinChanged} className="start-date"/>
                            </div>
                            <div className="input-group date">
                                <span className="filter-label" role="label">Max $: </span>
                                <input type="text" value={this.state.valueRangeMax} onChange={this._rangeMaxChanged} className="start-date"/>
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

module.exports = ValueRangeFilter;