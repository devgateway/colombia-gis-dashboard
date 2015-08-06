'use strict';

var React = require('react');
var Reflux = require('reflux');
var Store=require('../../stores/saveStore.js');
var Actions=require('../../actions/saveActions.js');
var Grid=require('react-bootstrap/lib/Grid');
var Row=require('react-bootstrap/lib/Row');
var Col=require('react-bootstrap/lib/Col');
var Panel=require('react-bootstrap/lib/Panel');
var Label=require('react-bootstrap/lib/Label');
var Tooltip=require('react-bootstrap/lib/Tooltip');
var _=require('lodash');
var PrintDialog=require('./printDialog.jsx');
var SaveMap=require('./saveDialog.jsx');


module.exports  = React.createClass({

mixins: [Reflux.connect(Store,"store")],

  componentDidMount:function(){
    Actions.findMaps();
  },

  _open:function(id){
    Actions.openMap(id);
  },

  _update:function(id){
    Actions.showModal('update', id)
  },

  _delete:function(id){
    Actions.deleteMap(id);
  },

  _onKeyUp: function(ev) {
    if (ev.keyCode == 13){
      this.handleClick();
    }
  },

  handleClick:function(){
    var value = this.refs.search_input.getDOMNode().value;
    Actions.filterByKeyword(value);
  },

  getInitialState:function(){
    return {showDownload:false}
  },

  render: function() {
    var mapList=this.state.store.maps || [];
    return (

      <div className="saved-maps">
      <div className="text-search-wrapper">
      <div className="search-box">
      <button type="submit" className="search-button" onClick={this.handleClick}>
      <i className="fa fa-search"></i>
      </button>
      <input onKeyUp={this._onKeyUp} className="keyword-search" type="text" placeholder={i18n.t("savemap.savedmapssearch")} ref="search_input"/>
      </div>
      </div>
      <h3><Message message='savemap.savedmapstitle'/></h3>
      <ul>
        {
          _.map(mapList,function(m){
            if(!m.hide){
                return (
                  <li>
                    <Grid>
                      <Row>
                        <Col md={6}>
                          <div className="save-map-actions">
                            <h5>
                              <span>{m.title}</span>
                              <a href="#">
                              <i className="pull-right fa fa-times" title='Delete' onClick={this._delete.bind(this,m._id)}></i>
                              </a>
                              <a href="#">
                              <i className="pull-right fa fa-pencil" title='Update' onClick={this._update.bind(this,m._id)}></i>
                              </a>
                              <SaveMap/>
                              <PrintDialog key={m.id} id={m._id}/>
                              <a href="#">
                              <i className="pull-right fa fa-folder-open" title='Open' onClick={this._open.bind(this,m._id)}></i>
                              </a>
                            </h5>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                            <Panel >
                              {m.description}
                            </Panel>
                        </Col>
                      </Row>
                    </Grid>

                </li>)
            }
          }.bind(this))

        }
      </ul>
      </div>
      );
  }

});
