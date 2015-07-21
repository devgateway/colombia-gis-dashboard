 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/indicatorLayerStore.js');
 var Mixins = require('./_mixins.js');

 
 module.exports = React.createClass({

   mixins: [Mixins, Reflux.connect(Store)],

   componentDidMount:function(){
  
   },

   render: function() {
    /* <div className="arcgis-sig-in">
    {(!this.state.login.token?<button onClick={this.oauth}>AGOL LOGIN</button>:<button onClick={this.logOut}>AGOL LogOut</button>)}
    </div>*/
     return (<div></div>)
   }

 });