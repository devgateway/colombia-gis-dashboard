/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var SingleList=require('./singleList.jsx');
var TreeList=require('./treeList2.jsx');

module.exports = React.createClass({

 _onChangeSelection:function(){
 },

 render: function() {
  var content;

  if (this.props.type == 'list') {
    content=  (
        <SingleList {...this.props} onChange={this._onChangeSelection}/>
      )
  }
  else if (this.props.type == 'tree') {
    content=  (
        <TreeList {...this.props} onChange={this._onChangeSelection}/>
      )
  }
  else if (this.props.type == 'carrousel') {
    content= <div>Carrousel </div>
  }

  var visible = this.props.active; //set visiblity based on parents mode.
  if (visible){
    return(
        <div className="tab-content">
          <div className="tab-pane fade active in">
            <div className="filter-group-panel selected">
              {content} 
            </div>
          </div>
        </div>
      );
      
  }else{
      return null; 
  }
}
});



