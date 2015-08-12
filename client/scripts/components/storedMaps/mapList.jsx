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

module.exports  = React.createClass({

mixins: [Reflux.connect(Store,"store")],

  componentDidMount:function(){
    Actions.findMaps();    
  },

  _open:function(id){
    Actions.openMap(id);
  },

getInitialState:function(){
    return {showDownload:false}
  },

  render: function() {
    
    var mapList=this.state.store.maps || [];
    return (

      <div>
      <div className="text-search-wrapper">
      <div className="search-box">
      <button type="submit" className="search-button" onClick={this._handleCLick}>
      <i className="fa fa-search"></i>
      </button>
      <input onKeyPress={this.handleOnkeypress} className="keyword-search" type="text" placeholder={i18n.t("maps.searchMap")} ref="search_input"/>
      </div>
      </div>
      <h3>List of saved Maps</h3>
      <ul>
        {
          _.map(mapList,function(m){
              return (
                  <li>
                    <Grid>
                      <Row>
                        <Col md={6}>
                          <div>   
                            <h5>
                              <Label bsStyle='warning'> {m.title}</Label>
                              <PrintDialog key={m.id} id={m._id}/>
                              <a href="#">
                              <i className="pull-right fa fa-folder-open-o" title='Open' onClick={this._open.bind(this,m._id)}></i>
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
            }.bind(this))
            
        }
      </ul>
      </div>
      );
  }

});
