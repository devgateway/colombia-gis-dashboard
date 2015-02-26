/*
 * Leaflet raw map component used by ./map.jsx (use that if you want a map)
 */

 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var MapActions=require('../../actions/mapActions.js');
 var DataLayerStore=require('../../stores/dataLayerStore.jsx');

 function getStoreState(){
  return MapStore.state()
 };

 module.exports = React.createClass({

  mixins: [Reflux.connect(DataLayerStore,"mapState")],

  componentDidMount: function() {
    
  },

  componentWillMount :function(){
    debugger; 
    console.log('Calling load Action')
    MapActions.loadActivitiesByDepartments();
  },

  componentWillReceiveProps: function(nextProps) {
    
  },

   componentWillUnmount: function() {
    
  },

  
  render: function() {
    console.log('Executing render');
    return <div className="map react-leaflet-map">Load Points</div>
  }
});
