var _ = require('lodash');

module.exports = {

   update: function(assignable, options) {
      options = options || {};
      this.state = _.assign(this.state, assignable);
      if (!options.silent) {
         this.trigger(this.state);
      }
   },

   setCurrentState: function(savedState) {
      if(savedState){
         this.update(_.clone(savedState, true));
      }
   },

}