var API = require('../../../../api/esri.js');

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


module.exports = {
    'commons' : commonsMixins,
    'layerMixins' : layerMixins
};
