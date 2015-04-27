'use strict';

var React = require('react');
var Reflux = require('reflux');

var ArcgisLayerStore =   require('../../../../stores/arcgisLayerStore.js')
var ArcgisLayerActions = require('../../../../actions/arcgisLayersActions.js')
var _=require('lodash');

var Service= require('./esriService.jsx');

/*ROOT COMP*/
module.exports = React.createClass({

    mixins: [Reflux.connect(ArcgisLayerStore, 'layers')],
    render: function () {
        var visibleServices = _.filter(this.state.layers.services, {defaultVisibility: true}) || [];
         return (<div>{
                visibleServices.map(function (service) {
                    return <Service {...this.props} service={service}/>
                }.bind(this))
            } </div>);
        }
    });