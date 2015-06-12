
var React = require('react');
var CustomCheckbox = require('../commons/customCheckbox.jsx');

module.exports = React.createClass({

  _onItemChange:function(selected){
    debugger;
    if (this.props.onItemChange){
      this.props.onItemChange(this.props.id,selected); //21,true|false
    }
    this.setState({'selected':selected})
  },

  _handleClick:function(){
    this._onItemChange(!this.state.selected);
  },

  componentWillReceiveProps :function(nextProps){
        if(nextProps.selected!=undefined){
            this.setState({'selected':nextProps.selected})
        };
    },

  getInitialState: function() {
    return {selected: this.props.selected};
  },

  render: function() {
    var itemClassNames=(this.state.selected===true)?'item-label label-selected':'item-label';
    return(  
      <li>
      <div onClick={this._handleClick} className="filter-col">
      <CustomCheckbox selected={this.state.selected} value={this.props.id} onChange={this._onItemChange}/>
      <span className={itemClassNames}> {this.props.name}</span>
      </div>
      </li>
      )
  }
});
