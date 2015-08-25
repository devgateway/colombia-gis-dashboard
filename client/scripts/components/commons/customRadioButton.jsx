'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var _ = require('lodash');

var RadioGroup=React.createClass({

    _handleItemClick:function(name){


        _.map(this._children,function(child){
            if(child){
                if (child.props.name==name){
                    child.props.checked=true;
                    child.props._onClick();
                } else{
                    child.props.checked=false;
                }
            }
        })

        this.forceUpdate();
    },

    componentWillMount: function () {
        this._children = React.Children.map(this.props.children, function(child) {
            if (child){
                return React.addons.cloneWithProps(child,{'_onClick':child.props.onClick,'onClick':this._handleItemClick}) //if toggler add click event
            }
        },this);
    },

    render:function(){
        return <div>{this._children}</div>
    }
});



var Radio = React.createClass({

    componentWillReceiveProps: function (nextProps) {
    },

    _onClick: function() {
        this.props.onClick(this.props.name);
    },

    render: function() {
        var classes = this.props.checked ? "selectable-radio selected" : "selectable-radio ";
        return (
        <div className={this.props.className}>
            <span  className={classes}  onClick={this._onClick}>
            </span>

            <Message message={this.props.label}/>
        </div>
        );
    }
});

module.exports = {Radio:Radio,RadioGroup:RadioGroup};
