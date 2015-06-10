/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');



var FilterContent  = React.createClass({

  render: function() {
   if (this.props.active) {
    if (this.props.type == 'list') {
      return  <div> Filter List </div>
    }
    else if (this.props.type == 'tree') {
      return  <div> Filter Tree </div>
    }
    else if (this.props.type == 'carrousel') {
      return  <div> Filter Carrousel </div>
    }else{
      return null;
    }
  } 
  return  null;
}
});


var Filter  = React.createClass({

 _activate:function(){
   this.props.onActivate(this.props.index);
 },

 render: function() {
  var visible = this.props.modes.indexOf(this.props.mode) > -1;
  console.log(this.props.type);

  if (visible){
    return(
      <div onClick={this._activate} >
      <Message message={this.props.label}/>           
      <FilterContent {...this.props}/>
      </div>
      );
  }else{
    return null; 
  }
}
});

module.exports = Filter;