 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/indicatorLayerStore.js');
 var Popup = require('./_popupIndicators.jsx')
 var Mixins = require('./_mixins.js');
 var EventConstants = require('react/lib/EventConstants');

 var reactEventNames = Object.keys(EventConstants.topLevelTypes)
   .filter(function(eventName) {
     var isTop = (eventName.slice(0, 3) === 'top');
     if (!isTop) {
       console.warn('React event name didn\'t start with "top"', eventName);
     }
     return isTop;
   })
   .map(function(topName) { // convert eg. `topBlur` => `blur`
     return topName.slice(3).toLowerCase();
   });

module.exports = React.createClass({

  mixins: [Mixins, Reflux.connect(Store)],

  _filter: function(feature, layer) {
    return true;
  },

  _setStyles: function() {
    this.layer.eachLayer(function(l) {
     l.setStyle(this._style(l.feature));
    }.bind(this));
  },


  _style: function(feature) {
    if (this.state.geoData) {
      var featureValue;
      var isFilteredByMunicipality = false;
      var isMunicipalitySelected = false;
      if(this.state.breakStyle && this.state.breakStyle == 'breakValues') {
        featureValue = feature.properties.value?feature.properties.value:0;

      } else {
        var maxValue = _.max(_.collect(this.state.geoData.features, function(e) {
          return e.properties.value + 0.01; //Adding some decimal to fix the max value
        }));

        var currentValue = feature.properties.value || 0;
        featureValue = (100 / (maxValue / currentValue));
      }
      
      var style = this._getStyle(featureValue, !isFilteredByMunicipality || isMunicipalitySelected);
      var rgbColor = style.color.r + ',' + style.color.g + ',' + style.color.b + ',' + style.color.a;

      return {
        color: 'rgba(' + rgbColor + ')',
        weight: style.weight
      };
    }
  },

  _onEachFeature: function(feature, layer) {
    this._bindPopup(feature, layer);
  },

  _bindPopup: function(feature, layer) {
    layer.bindPopup('');
    var _closed = true;
    var _isClosed = function() {
       return _closed;
    }.bind(this);
    layer.on('popupopen', function(e) {
      if (layer._popup){
       layer._popup.options.autoPanPaddingTopLeft = new L.Point(0, 83);
     }
       var popupHolder = this.getDOMNode();
       _closed = false;
       var _onChange = function() {
         popupHolder.firstChild.style.display = '';
         e.popup.setContent(popupHolder.innerHTML);
         this.fixReactIds(e.popup);
       }.bind(this)
       React.render(React.createElement(Popup, _.assign(feature.properties, {
         isClosed: _isClosed,
         onChange: _onChange,
         level: this.state.level,
         filters: this.state.layerFilters
       })), popupHolder);
       e.popup.setContent(popupHolder.innerHTML);
       this.fixReactIds(e.popup);
       this.fixReactEvents(e.popup);
    }.bind(this));
    layer.on('popupclose', function(e) {
        e.popup.setContent('');
        _closed = true;
    });
   },

  fixReactIds: function(popup) {
     var el = popup._container;
     // replace all the `data-reactid`s so react doesn't get confused.
     var allEls = el.querySelectorAll('*');
     Array.prototype.forEach.call(allEls, function(el) {
       var reactId = el.dataset.reactid;
       if (reactId !== undefined) { // leaflet's containers, etc.
         delete el.dataset.reactid;
         el.dataset.originalreactid = reactId;
       }
     });
  },

   /**
    * Proxy all events that react listens for from our popup that react ignores,
    * to the off-screen popup content that react listens to.
    * It's awful and it works. Though it may be pretty mouse-event-focused.
    */
   fixReactEvents: function(popup) {
     var el = popup._contentNode;

     reactEventNames.forEach(function(eventName) {
       el.addEventListener(eventName, function(e) {
         var popupEl = e.target,
           reactId = e.target.dataset.originalreactid,
           reactTarget = document.querySelector('[data-reactid="' + reactId + '"]'),
           proxiedEvent;

         if (typeof window.Event === 'function') { // IE10+
           proxiedEvent = new Event(e.type, {
             bubbles: e.bubbles,
             cancelable: e.cancelable,
             view: e.view,
             detail: e.detail,
             screenX: e.screenX,
             screenY: e.screenY,
             clientX: e.clientX,
             clientY: e.clientY,
             ctrlKey: e.ctrlKey,
             altKey: e.altKey,
             shiftKey: e.shiftKey,
             metaKey: e.metaKey,
             button: e.button,
             relatedTarget: e.reactTarget,
           });
         } else { // IE9
           proxiedEvent = document.createEvent('Event');
           proxiedEvent.initEvent(
             e.type,
             e.bubbles,
             e.cancelable,
             'window', // e.view?
             e.detail,
             e.screenX,
             e.screenY,
             e.clientX,
             e.clientY,
             e.ctrlKey,
             e.altKey,
             e.shiftKey,
             e.metaKey,
             e.button,
             e.relatedTarget
           );
         }
         if (reactTarget)
           reactTarget.dispatchEvent(proxiedEvent);
       });
     });
   },

   render: function() {
     return (<div></div>);
   }

});