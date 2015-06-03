var React = require('react');
var Reflux = require('reflux');

module.exports =React.createClass({
    
    render:function(){
        return (<div className="loading-container"><img src="images/ajax-loader.gif"/></div>)
    }
});