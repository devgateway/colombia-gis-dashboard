'use strict';
var React = require('react');
var Reflux = require('reflux');
var ArcgisLayerStore =   require('../../../../stores/arcgisLayerStore.js')
var ArcgisLayerActions = require('../../../../actions/arcgisLayersActions.js')
var Mixins=require('./commons.js');


var FeatureLayer = React.createClass({
    mixins: [Mixins.commons, Mixins.layerMixins],
    lClass: L.esri.featureLayer
});

var MapSever = React.createClass({
    mixins: [Mixins.commons, Mixins.layerMixins],
    lClass: L.esri.dynamicMapLayer,
});

var TiledMapServer = React.createClass({
    mixins: [Mixins.commons, Mixins.layerMixins],
    lClass: L.esri.tiledMapLayer
});

var ImageServer = React.createClass({
    mixins: [Mixins.commons, Mixins.layerMixins],
    lClass: L.esri.imageMapLayer

});


/*A feature service*/
var FeatureServer = React.createClass({
    mixins: [Mixins.commons],

    render: function () {
        return (<div> 
                    {
                    this.getService().layers.map(function (layer) {
                            return <i> (layer.defaultVisibility ? <FeatureLayer layer = {layer} {...this.props}/>:null)</i>
                        }.bind(this))
                    } 
                </div>
            )
        }
    });


/*Choose a service that  will render the layer */
module.exports = React.createClass({
    render: function () {
        var Layer;
        if (this.props.service.metadata.type === "Map Service") {
            if (this.props.service.singleFusedMapCache) { //check if map is a tiled map
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