'use strict';

function getRadius(value) {
  if (!value) {
    return 15;
  };

  if (value < 20) {
    return 20
  };

  if (value < 30) {
    return 25;
  };

  if (value < 40) {
    return 30;
  };

  if (value < 60) {
    return 35;
  };

  if (value < 140) {
    return 40;
  };

  if (value < 170) {
    return 45;
  };

  if (value < 200) {
    return 50;
  };

  if (value < 250) {
    return 55;
  };

  return 60;
}



module.exports = function(options) {

  var Icon = L.Icon.extend({
    options: {
      number: '',
      shadowUrl: null,
      className: 'marker',
      iconSize: [getRadius(options.number), getRadius(options.number)],
      popupAnchor: [0, getRadius(options.number) / 2 * -1], // point from which the popup should open relative to the iconAnchor

    },

    createIcon: function() {
      var div = document.createElement('div');
      var numdiv = document.createElement('div');
      numdiv.setAttribute("class", "number");
      numdiv.setAttribute("style", "line-height:" + this.options['iconSize'][0] + "px");
      numdiv.innerHTML = "<span>" + this.options['number'] + "</span>" || '';
      div.appendChild(numdiv);
      this._setIconStyles(div, 'icon');

      return div;
    },

    //you could change this to add a shadow like in the normal marker if you really wanted
    createShadow: function() {
      return null;
    }
  });

  return new Icon(options);
}