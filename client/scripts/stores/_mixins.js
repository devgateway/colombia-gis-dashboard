'use strict';
var _ = require('lodash');

module.exports = {

   update: function(assignable, options) {
      options = options || {};
      this.state = _.assign(this.state, assignable);
      if (!options.silent) {
         this.trigger(this.state);
      }
   }

}