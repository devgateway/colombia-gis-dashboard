'use strict';



module.exports = function(options) {

  var Icon = L.Icon.extend({
    options: {
      number: '',
      shadowUrl: null,
      className: 'marker',
      iconSize: [options.radius, options.radius],
      popupAnchor: [0, options.radius / 2 * -1], // point from which the popup should open relative to the iconAnchor

    },

    createIcon: function() {
      var div = document.createElement('div');
      var numdiv = document.createElement('div');
      numdiv.setAttribute("class", "number");
      numdiv.setAttribute("style", "height:" + this.options.radius + "px");
      numdiv.setAttribute("style", "line-height:" + this.options.radius + "px");
      numdiv.innerHTML = "<div>" + this.options.number + "</div>" || '';
      div.appendChild(numdiv);

      
      div.style.width = options.radius;
      div.style.height = options.radius;
      div.style.backgroundColor =  'rgba(' + options.rbgaColor + ')' ;
      div.style.boxShadow = '0 0 4px 3px rgba(' + options.rbgColor + ', 0.6), 0 0 0 4px rgba(' + options.rbgColor + ',0.4), 0 0 0 8px rgba(' + options.rbgColor + ',0.24)';
      this._setIconStyles(div, 'icon');
      return div;
    },

   
  });
  return new Icon(options);
}