'use strict';

var React = require('react');
var Reflux = require('reflux');
var If=require('../commons/if.jsx');
var LanStore=require('../../stores/lanStore.js');
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
var ImageDialog=require('./imageDialog.jsx');

var SaveMap=require('./saveOrExportDialog.jsx');
var Modal=require('react-bootstrap/lib/Modal');
var Button=require('react-bootstrap/lib/Button');
var Pagination=require('react-bootstrap/lib/Pagination');


module.exports  = React.createClass({

mixins: [Reflux.connect(Store,"store"), Reflux.connect(LanStore, 'lan')],

  componentDidMount:function(){
    Actions.findMaps();
  },

  _open:function(id){
    Actions.openMap(id);
  },

  _update:function(id){
    Actions.showModal('update', id)
  },

  _showDeleteModal:function(isVisible, id){
    Actions.showDeleteModal(isVisible, id);
  },

  _delete:function(){
    Actions.deleteMap();
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

  handlePageSelect:function(event, selectedEvent){
    this.setState({
      activePage: selectedEvent.eventKey
    });
  },
  

  getInitialState:function(){
    return {pageSize:3, activePage:1, showDownload:false}
  },

  render: function() {
    var origMapList=this.state.store.maps || [];
    var mapList=_.sortBy(_.union(_.filter(origMapList, {hide:undefined}), _.filter(origMapList, {hide:false})), 'title');
    var showDeleteModal=this.state.store.showDeleteModal || false;
    var itemsSize=mapList.length>this.state.pageSize?Math.ceil(mapList.length/this.state.pageSize):1;

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
          _.map(mapList,function(m, i){
            var lowerBound = (this.state.activePage-1) * 3;
            var upperBound = this.state.activePage * 3;
            if(i>=lowerBound && i<upperBound ){
                return (
                  <li className="saved-map-list">
                    <Grid fluid>
                      <Row>
                        <Col sm={8}>
                            <h4 className="pull-left">{m.title}</h4>
                        </Col>

                        <Col sm={4}>
                            <div className="save-map-actions pull-right">
                              <a href="#">
                              <i className="pull-right fa fa-times" title={i18n.t('savemap.tooltipdelete')} onClick={this._showDeleteModal.bind(this, true, m._id)}></i>
                              </a>
                              <a href="#">
                              <i className="pull-right fa fa-pencil" title={i18n.t('savemap.tooltipupdate')} onClick={this._update.bind(this,m._id)}></i>
                              </a>
                              <SaveMap/>
                              <PrintDialog key={m.id} id={m._id}/>
                              <ImageDialog key={m.id} id={m._id}/>
                              <a href="#">
                              <i className="pull-right fa fa-folder-open" title={i18n.t('savemap.tooltipopen')} onClick={this._open.bind(this,m._id)}></i>
                              </a>
                          </div>
                        </Col>
                      </Row>
                      </Grid>

                      <Grid fluid>
                      <Row>
                        <Col md={12}>
                        <Panel className="pull-left">
                          {m.description}
                        </Panel>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                        <Panel className="pull-left">
                          {
                            _.map(m.tags,function(t){
                              return (<span className="label-tag">{t}</span> )
                            })
                          }
                        </Panel>
                        </Col>
                      </Row>
                    </Grid>

                </li>)
            }
          }.bind(this))

        }
      </ul>
      <div>
        <If condition={mapList.length>0}>
          <Pagination bsSize='small' items={itemsSize} activePage={this.state.activePage} onSelect={this.handlePageSelect} />
        </If>
      </div>
      <Modal className='dialog-save-map' {...this.props} bsSize='medium' aria-labelledby='contained-modal-title-lg'
       show={showDeleteModal} onHide={this._showDeleteModal.bind(this, false)}>
        <Modal.Header>
          <Modal.Title><Message message='savemap.confirmation'/></Modal.Title>
          <a className="close-dialog" href="#" onClick={this._showDeleteModal.bind(this, false)}>
          <i className="fa fa-times-circle-o"></i></a>
        </Modal.Header>
        <Modal.Body>
          <div className="plain-panel"><Message message='savemap.areyousure'/></div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-apply pull-right" onClick={this._delete.bind(this)}><Message message='savemap.yes'/></Button>
          <Button  className="pull-right" onClick={this._showDeleteModal.bind(this, false)}><Message message='savemap.no'/></Button>
        </Modal.Footer>
      </Modal>
      </div>
      );
  }

});
