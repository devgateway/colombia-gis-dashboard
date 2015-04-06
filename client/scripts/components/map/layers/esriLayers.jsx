'use strict';

var React = require('react');
var Reflux = require('reflux');
var ArcgisLayerStore = require('../../../stores/arcgisLayerStore.jsx')
var ArcgisLayerActions = require('../../../actions/arcgisLayersActions.js')
var API=require('../../../api/esri.js');
    var _ = require('lodash');


    var commonsMixins = {

        getMap: function () {
            return this.props.getMap();
        },

        getService: function () {
            return this.props.service;
        },

        getLayer: function () {
            return this.props.layer;
        },

        getVisibleIds: function (layers) {
            return layers_.findWhere({
                defaultVisibility: true
            }).map(function (l) {
                return l.id
            });
        },

    };

    var layerMixins = {
        addtoMap: function (esriLayer) {
            this.esriLayer = esriLayer;
            this.esriLayer.addTo(this.getMap());
        },

        componentWillUnmount: function () {
            if (this.getMap().hasLayer(this.esriLayer)) {
                this.getMap().removeLayer(this.esriLayer);
            }
        },
        componentWillMount: function () {
            var url = this.getService().metadata.url + (this.getLayer() ? '/' + this.getLayer().id.toString() : '');
            this.addtoMap(this.loadLayer({}, url));
        },


        loadLayer: function (options, url) {
            return API.createLefleatLayer(this.lClass,options,url);
        },

        render: function () {
            return null;
        }
    }

    var FeatureLayer = React.createClass({
        mixins: [commonsMixins, layerMixins],
        lClass: L.esri.featureLayer
    });

    var MapSever = React.createClass({
        mixins: [commonsMixins, layerMixins],
        lClass: L.esri.dynamicMapLayer,
    });

    var TiledMapServer = React.createClass({
        mixins: [commonsMixins, layerMixins],
        lClass: L.esri.tiledMapLayer
    });

    var ImageServer = React.createClass({
        mixins: [commonsMixins, layerMixins],
        lClass: L.esri.imageMapLayer

    });


    /*A feature service*/
    var FeatureServer = React.createClass({
        mixins: [commonsMixins],

        render: function () {
            return ( <div> {
                this.getService().layers.map(function (layer) {
                    return <i > (layer.defaultVisibility ? < FeatureLayer layer = {
                        layer
                    } {...this.props
                    }
                    />:null)</i >
                }.bind(this))
                } < /div>
                )
            }
        });

            /*Choose what service will render the layer*/
            var Service = React.createClass({
                render: function () {
                    var Layer;
                    if (this.props.service.metadata.type === "Map Service") {
                        if (this.props.service.singleFusedMapCache) {
                            Layer = TiledMapServer;
                        } else {
                            Layer = MapSever;
                        }
                    }
                    if (this.props.service.metadata.type === "Feature Service") {
                        Layer = FeatureServer;
                    }
                    if (this.props.service.metadata.type === "Image Service") {
                        Layer = ImageServer;
                    }
                    return (<Layer {...this.props}/>);
}
});

/*ROOT COMP*/
module.exports = React.createClass({
    mixins: [Reflux.connect(ArcgisLayerStore, 'layers')],
    render: function () {
        var visibleServices = _.filter(this.state.layers.services, {
            defaultVisibility: true
        }) || [];

        return ( < div > {
            visibleServices.map(function (service) {
                return <Service {...this.props
                }
                service = {
                    service
                }
                />
            }.bind(this))
        } < /div>);
        }
    });