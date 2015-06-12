/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var KeywodSearch=require('./keywordSearch.jsx');
var SingleList=require('./singleList.jsx');
module.exports = React.createClass({

 _activate:function(){
   this.props.onActivate(this.props.index);
 },

 _onChangeSelection:function(){

 },

 render: function() {
  var content;

  if (this.props.type == 'list') {
    content=  (
      <SingleList {...this.props} onChange={this._onChangeSelection}>
        <KeywodSearch/>
      </SingleList> )
  }
  else if (this.props.type == 'tree') {
    content=  (<div>Tree</div>)
  }
  else if (this.props.type == 'carrousel') {
    content= <div>Carrousel </div>
  }

  var visible = this.props.modes.indexOf(this.props.mode) > -1; //set visiblity based on parents mode.
  if (visible){
    return(
      <div onClick={this._activate} className="filter-group-panel selected" >
            <div className="filter-group-panel selected">
            <div className="filter-group-panel-header">
              <span className="filter-label" role="label"><Message message={this.props.label}/></span>
            </div>
            <div className="filter-list-container">
               {content} 
           </div>
         </div>
      </div>);
      
  }else{
      return null; 
  }
}
});



