
var React = require('react');
var CustomCheckbox = require('../commons/customCheckbox.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var _=require('lodash');

module.exports = React.createClass({

  mixins: [PureRenderMixin],

  _onItemChange:function(selected){
    if (this.props.onItemChange){
      this.props.onItemChange(this.props,selected); //21,true|false
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
    //console.log("render multilevel!!");
    var parentTrace = this.props.parentsTrace || [];
    var idx = 0;
    var itemClassNames=(this.state.selected===true)?'item-label label-selected':'item-label';
    var traceItemClassNames=(this.state.selected===true)?'trace-item-label label-selected':'trace-item-label';
    return(  
      <div className="filter-multilevel-col">
        <div>
          <CustomCheckbox selected={this.state.selected} value={this.props.id} onChange={this._handleClick}/>
        </div>
        <ul className="parent-trace-list">
          {
            parentTrace.map(function(parent) {
              var style = {'paddingLeft': idx++*10 + 'px'};                
              return (<li><i><span className={traceItemClassNames} style={style}> {parent}</span></i></li>)
            },this) 
          }
          <li><span onClick={this._handleClick} className={itemClassNames} style={{'paddingLeft': idx++*10 + 'px'}}> {this.props.label}</span></li>
        </ul>
      </div>)
        
  }
});
