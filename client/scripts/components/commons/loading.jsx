var React = require('react');
var Reflux = require('reflux');
var Store = require('../../stores/pointsLayerStore.js');

module.exports =React.createClass({
    mixins: [Reflux.connect(Store)], 

    componentDidUpdate: function() {
        debugger;
        if(this.state.loading){
            $('.loading-container').css('display','');
        } else {
            $('.loading-container').css('display','none');
        }
    },

    render:function(){
        return (<div className="loading-container"><img src="images/ajax-loader.gif"/></div>)
    }
});