 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var _ = require('lodash');
 var NumberedDivIcon = require('./_numberedDivIcon.js');
 var Store = require('../../../../stores/indicatorLayerStore.js');
 var Popup = require('./_popup2.jsx')
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
     // var lowerFirstLetter = topName.slice(3, 4).toLowerCase();  // first letter after top
     // return lowerFirstLetter + topName.slice(4);
   });

 module.exports = React.createClass({

       mixins: [Mixins, Reflux.connect(Store)],

       _pointToLayer: function(feature, latlng) {

         var style = this._getStyle(feature.properties.activities);
        
         var icon = NumberedDivIcon({
           radius: style.radius,
           bgColor: style.color,
           number: feature.properties.activities
         });

         var marker = new L.Marker(latlng, {
           icon: icon
         });


         return marker;

       },


       _setStyles: function() {
         this.layer.eachLayer(function(l) {
            if(l._icon){
             var style = this._getStyle(l.feature.properties.activities);
             var rgbColor = style.color.r + "," + style.color.g + "," + style.color.b + "," + style.color.a;
             $(l._icon).css('width', style.radius);
             $(l._icon).css('height', style.radius);
             $(l._icon).find('.number').css('line-height', style.radius + 'px')
             l._icon.style.backgroundColor = 'rgba(' + rgbColor + ')';
             l._icon.style.boxShadow = 'rgba(' + rgbColor + ') 0px 0px 4px 3px, rgba(' + rgbColor + ') 0px 0px 0px 4px, rgba(' + rgbColor + ') 0px 0px 0px 8px';
           }
         }.bind(this));
       },



       _bindPopup: function(feature, layer) {
         layer.bindPopup('');
         layer.on('popupopen', function(e) {
           layer._popup.options.autoPanPaddingTopLeft = new L.Point(0, 83);
           var popupHolder = this.getDOMNode();
           var _onChange = function() {
             popupHolder.firstChild.style.display = "";
             e.popup.setContent(popupHolder.innerHTML);
             //popupHolder.firstChild.style.display="none";
             this.fixReactIds(e.popup);
           }.bind(this)
           React.render(React.createElement(Popup, _.assign(feature.properties, {
             onChange: _onChange,
             level: this.state.level,
             filters: this.state.filters
           })), popupHolder);
           e.popup.setContent(popupHolder.innerHTML);
           popupHolder.firstChild.style.display = "none";
           this.fixReactIds(e.popup);
           this.fixReactEvents(e.popup);
         }.bind(this));
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



       _onEachFeature: function(feature, layer) {
         this._bindPopup(feature, layer);
       },

       _filter: function(feature, layer) {
         return true;
       },

       _style: function(feature) {
         console.log('style');
       },


       render: function() {
         return ( < div > < /div>);
         }

       });