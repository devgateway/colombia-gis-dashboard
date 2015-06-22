var _=require('lodash');

module.exports = {


	onStatusChange: function(status) {
		this.setState(_.clone(status)); //make a copy of the state would make sense 
	},

	_addSelected: function(list, id) {
		options = options || {};
		list.push(id);
		this.actions.add(id);
	},

	_removeSelected: function(list, id) {
		options = options || {};
		_.remove(list, function(item) {
			return item == id
		})
		this.actions.remove(id);
	},


	/*Life Cycle */
	componentDidMount: function() {
		this.unsubscribe = this.props.store.listen(this.onStatusChange);
		this.actions = this.props.actions;
		this.actions.load() //call load event
	},


  componentWillUnmount: function() {
    this.unsubscribe();
  },



}