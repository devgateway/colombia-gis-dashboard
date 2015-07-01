var _=require('lodash');

module.exports = {
	
  onStatusChange: function(status) {
    this.setState(_.clone(status)); //make a copy of the state would make sense 
  },

  _onItemChange: function(item, selected) {
    this.actions.updateItemSelection(item, selected);
  },

  _onSearch: function(keyword) {
    this.actions.filterByKeyword(keyword);
  },

  _onSearchEnterKey: function(keyword) {
    this.actions.selectFilteredByKeyword(keyword)
  },

  _onCounterClicked: function(selected) {
    this.setState(_.assign(this.state, {'showOnlySelected': selected}));
    this.forceUpdate();
  },
  
  /*Select all None*/
  _onSelectAll: function() {
    this.actions.updateAllSelection(true);
  },

  _onSelectNone: function() {
    this.actions.updateAllSelection(false);
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