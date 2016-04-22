'use strict';

var React = require('react');
var Reflux = require('reflux');
var Store=require('../../../../stores/infoWindowIndicatorsStore.js');
var If=require('../../../commons/if.jsx');
var Loading = require('../../../commons/loading.jsx');
var Mixins = require('./_popupMixins.js');
var Table=require('react-bootstrap/lib/Table');
var _ = require('lodash');

var linkDownloaded = false;
var DisaggregationsTab = React.createClass({
  render: function() {
    return (
      <div>
        <h3 className='panel-title'><Message message='map.popup.indicatorName'/></h3>
        <div >{_.find(this.props.data, {'key': 'IndicatorName'}).value[0].value}</div>
        <div>
          <h3 className='panel-title' ><Message message='map.popup.indicatorDisaggregations'/></h3>
            <div className='popup-layer-info'>
              <ul> {
                _.find(this.props.data, {'key': 'IndicatorDisaggregation'}).value.map(function(node, index) {
                  return <li>{node.id}: ({node.value})</li>
                })
              } </ul>
            </div>
        </div>
        <div>
          <h3 className='panel-title' ><Message message='map.popup.otherDisaggregations'/></h3>
          <div className='popup-layer-info'>
              <ul> {
                _.find(this.props.data, {'key': 'IndicatorOtherDisaggregation'}).value.map(function(node, index) {
                  return <li>{node.id}: ({node.value})</li>
                })
              } </ul>
            </div>
        </div>
      </div>
    );
  }
});

var YearsAdvanceTab = React.createClass({

  openLink: function() {
    var link = _.find(this.props.data, {'key': 'Excel file'}).value[0].value;
    if (!linkDownloaded){
      linkDownloaded = true;
      window.open(link);
    }
  },
  
  render: function() {
    return (
      <div>
        <h3 className='panel-title' ><Message message='map.popup.fiscalYearAdvance'/></h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th><Message message='map.popup.fiscalYear'/></th>
              <th><Message message='map.popup.value'/></th>
            </tr>
          </thead>
          <tbody>
            {
              _.find(this.props.data, {'key': 'FiscalYearsAdvance'}).value.map(function(node, index) {
                return (
                  <tr>
                    <td>{node.name}</td>
                    <td>{node.value}</td>
                  </tr>
                  )
              })
            }
          </tbody>
        </Table>
        <div>
          <button className='btn btn-apply' onClick={this.openLink.bind(this)}>
            <Message message='map.popup.downloadFile'/>
          </button>
        </div>
      </div>
    );
  }
});


module.exports  = React.createClass({

  mixins: [Mixins, Reflux.connect(Store)],

  componentWillMount:function(){
    console.log('popup>componentWillMount');
    this.setState({tabId: 0});
    this._getInfoData(this.props.id, this.props.level, this.props.filters, 'indicators');
  },

  componentDidMount: function() {
    console.log('_popupActivitiesPoint>componentDidMount');
    this.props.onChange();
    this.setAttributeDisplay('.popup-nav-wrapper', 'data-originalreactid', 'inline');
  },

  componentDidUpdate: function(props,newState) {
    console.log('popup>componentDidUpdate');
    linkDownloaded = false;
    this.props.onChange();
    this.setAttributeDisplay('.popup-nav-wrapper', 'data-originalreactid', 'inline');
  },

  componentWillReceiveProps: function(nextProps) {
    this._getInfoData(nextProps.id, nextProps.level, nextProps.filters, 'indicators');
  },

  handleClick:function(tabId){
    console.log('popup>click');
    this.setState({'tabId':tabId});
    this.forceUpdate();
  },

  render: function() {
    console.log('_popupActivitiesPoint>render id:' + this.props.id +' tab '+this.state.tabId);
    var tabId = this.state.tabId ? this.state.tabId : 0;
    var showLoading=true;
    if(this.state.infoWindow){
      showLoading=false;
    }
    if (this.props.isClosed()){
      return null;
    }
    return (
      <div>
        <div className='leaflet-popup-content'>
          <div className='panel panel-default' >
            <div className='panel-heading popup-header' >
              <h3 className='panel-title' >
              <If condition={this.props.level=='country'} >
                {this.props.name}
              </If>
              <If condition={this.props.level!='country'} >
                {this.props.NAME_1}
              </If>
              <If condition={this.props.NAME_2} >
                - {this.props.NAME_2}
              </If>
              </h3>
            </div>
            <div className='popup-nav-wrapper'>
              <nav className='tabs' role='tablist' >
                <ul className='tabs nav nav-tabs' role='tablist' >
                  <li className={tabId==0? 'active' : ''} role='tab' >
                    <a href='#' onClick={this.handleClick.bind(this, 0)}>
                      <span className='popup-icon funding-dev-obj' title='indicator Disaggregations'></span>
                    </a>
                  </li>
                  <li className={tabId==1? 'active' : ''} role='tab' >
                    <a href='#' onClick={this.handleClick.bind(this, 1)}>
                      <span className='popup-icon subactivitiesList' title='Fiscal Years Advance'></span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='panel-body indicator-tab-container'>
              <If condition={showLoading} >
                <Loading container='popup-loading-container'/>
              </If>
              <If condition={tabId==0 && !showLoading} >
                <div className='subactivities-container'>
                  <DisaggregationsTab data={this.state.infoWindow} />
                </div>
              </If>
              <If condition={tabId==1 && !showLoading} >
                <div className='subactivities-container'>
                  <YearsAdvanceTab data={this.state.infoWindow} />
                </div>
              </If>
            </div>
          </div>
        </div>
      </div>
    );
}

});
