var _=require('lodash');

module.exports = {
	
  onStatusChange: function(status) {
    this.setState(_.clone(status)); //make a copy of the state would make sense 
  },
  
  componentDidMount: function() {
    if (this.props.store){
      this.unsubscribe = this.props.store.listen(this.onStatusChange);
      this.actions = this.props.actions;
      this.actions.load();
    }
  },

  componentWillUnmount: function() {
    if (this.props.store){
      this.unsubscribe();
    }
  },

}