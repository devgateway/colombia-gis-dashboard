 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/indicatorLayerStore.js');
 var Mixins = require('./_mixins.js');

 
 module.exports = React.createClass({

   mixins: [Mixins, Reflux.connect(Store)],


   render: function() {
    debugger;
   }

 });