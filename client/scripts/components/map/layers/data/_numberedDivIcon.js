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
      numdiv.setAttribute("style", "line-height:" + this.options.radius + "px");
      numdiv.innerHTML = "<span>" + this.options.number + "</span>" || '';
      div.appendChild(numdiv);
      this._setIconStyles(div, 'icon');

      
      div.style.width = options.radius;
      div.style.height = options.radius;
      div.style.backgroundColor =  'rgba(' + options.bgColor + ')' ;
      div.style.boxShadow = 'rgba(' + options.bgColor + ') 0px 0px 4px 3px, rgba(' + options.bgColor + ') 0px 0px 0px 4px, rgba(' + options.bgColor + ') 0px 0px 0px 8px';
      return div;
    },

   
  });
  return new Icon(options);
}