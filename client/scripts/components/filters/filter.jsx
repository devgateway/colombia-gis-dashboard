/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var KeywodSearch=require('./keywordSearch.jsx');
var SingleList=require('./singleList.jsx');
var TreeList=require('./treeList.jsx');
var Message=require('./../commons/message.jsx');
var TabPane = require('react-bootstrap/lib/TabPane');

var SelectAllNone=React.createClass({

    _onAllSelected:function(){
        this.props.onSelectAll();
    },
    
    _nonNoneSelected:function(){
      this.props.onSelectNone();
    },

    render: function() {
        return(
              <div className="filter-selectors">
                  <span><a href="#" onClick={this._onAllSelected}>
                    <Message message="filters.selectAll"/>
                  </a></span> / <span><a href="#" onClick={this._nonNoneSelected}>
                    <Message message="filters.deselectAll"/>
                  </a></span>
              </div>
            );
    }
})

module.exports = React.createClass({

 _activate:function(event){
   this.props.onActivate(this.props.index);
 },

 _onChangeSelection:function(){
 },

 render: function() {
  var content;

  if (this.props.type == 'list') {
    content=  (
      <SingleList {...this.props} onChange={this._onChangeSelection}>
        <SelectAllNone/>
        <KeywodSearch/>
      </SingleList> 
      )
  }
  else if (this.props.type == 'tree') {
    content=  (
      <TreeList {...this.props} onChange={this._onChangeSelection}>
        <SelectAllNone/>
        <KeywodSearch/>
      </TreeList>)
  }
  else if (this.props.type == 'carrousel') {
    content= <div>Carrousel </div>
  }

  var visible = this.props.active; //set visiblity based on parents mode.
  if (visible){
    return(
        <TabPane tab={this.props.label}>
            <div className="filter-group-panel selected" >
              <div className="filter-group-panel selected">
              <div className="filter-group-panel-header"  onClick={this._activate}>
               <span className="filter-label" role="label"><Message message={this.props.label}/></span>
              </div>
              <div className="filter-list-container">
                 {content} 
              </div>
            </div>
          </div>
      </TabPane>
      );
      
  }else{
      return null; 
  }
}
});



