var React = require('react');
var Reflux = require('reflux');

module.exports =React.createClass({

    render:function(){
        return (<div className={this.props.container}><img className="loader-icon" src="images/ajax-loader.gif"/></div>)
    }
});
