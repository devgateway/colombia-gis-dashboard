'use strict';

var React = require('react');
var Reflux = require('reflux');
var Store=require('../../stores/nationalSubActivitiesStore.js');
var If=require('../commons/if.jsx');
var Loading = require('../commons/loading.jsx');
var Actions=require('../../actions/nationalSubActivitiesActions.js');
var HighCharts = require('highcharts-browserify');

var MyActivities = React.createClass({
  render: function() {
    var items = [];
    if(this.props.data){
      items = this.props.data;
    }
    var link;
    if(this.props.externalFile){
      this.props.externalFile.map(function(l){link=l.value})
    }
    return (
      <div>
        <div className='subactivities-list'>
        <Message message='map.popup.programList'/>: {items.length}
        <ul>
        {
          items.map(function(node, index) {
            return <li>{node.name} - ({node.value})</li>
          })
        }
        </ul></div>
        <If condition={link}>
          <div><a className='btn btn-apply' href={link} target='_blank'><Message message='map.popup.downloadFile'/></a></div>
        </If>
      </div>
    );
  }
});

module.exports  = React.createClass({
  mixins: [Reflux.connect(Store), 'filters'],

  _getInfoData: function () {
    Actions.getPopupInfoFromAPI([{'param':'de','values':['CN']}], this.props.filters);
  },

  _getData: function(tabId) {
    var infoData = [];
    if (this.state.infoWindow){
      this.state.infoWindow.map(function(node, index) {
        infoData.push(node.value||[]);
      });
    }
    return infoData;
  },

  _getTitles: function() {
    var titleArray = [];
    if (this.state.infoWindow){
      this.state.infoWindow.map(function(node, index) {
        titleArray.push(i18n.t('map.popup.'+node.key));
      });
    }
    return titleArray;
  },

  setAttributeDisplay: function(classId, attr, display){
    $(classId).map(function(node, index) {
        if(index.getAttribute(attr)){
          index.style.display=display;
        }
      })
  },

  _renderChart: function() {
    console.log('_popupActivitiesPoint>_renderChart');
    var titleArray = this._getTitles();
    var infoData = this._getData();
    var tabId = this.state.tabId ? this.state.tabId : 0;

    if(infoData.length>0 && infoData.length>tabId && infoData[tabId].length>0){
      if(tabId!=4 ){
        var chartdata = [];
        var totalValue = 0;
        infoData[tabId].map(function(node, index) {
            totalValue += parseInt(node.value);
        });
        infoData[tabId].map(function(node, index) {
          if (node.value!=0){
            var chartnode = [];
            chartnode.push(node.name);
            //chartnode.push(parseFloat((node.value/totalValue*100).toFixed(1)));
            chartnode.push(parseFloat(node.value));
            chartdata.push(chartnode);
          }
        });

        var chart = new HighCharts.Chart({
            colors: ['#FFC614', '#3897D3', '#18577A', '#97CB68', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#50B432', '#FF9655', '#FFF263', '#6AF9C4'],
            chart: {
              marginTop: 20,
              width: 420,
              height: 240,
              plotBorderWidth: null,
              renderTo: 'chartContainer',
              type: 'pie',
            },
            title: {
              align: 'left',
              text: titleArray[tabId],
              style: {
                'color': '#4278AA',
                'fontSize': '14px'
              }
            },
            tooltip: {
                pointFormat: '{series.name}:  <b>$ {point.y}</b>',                
            },
            plotOptions: {
              pie: {
                  innerSize: '70%',
                  name: 'Cantidad total',
                  animation: false,
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
            },
            legend: {
              enabled: true,
              layout: 'vertical',
              align: 'right',
              itemStyle: {
                  color: '#4F4F4F'
              },
              verticalAlign: 'middle',
              labelFormatter: function() {
                var name = this.name.length>21?this.name.substring(0,20):this.name;
                return name + ' ' + this.percentage.toFixed(3) + '%';
              }
            },
            series: [{data: chartdata}]
          });
      }

    }
    this.setAttributeDisplay('.popup-nav-wrapper2', 'data-originalreactid', 'inline');
  },

  componentWillMount:function(){
    this._getInfoData();
  },

  componentDidMount: function() {
    this._renderChart('myContainer');
  },

  componentDidUpdate: function(props,newState) {
    $(this.getDOMNode()).find('#chartContainer').html('');
    this._renderChart('chartContainer');
  },

  handleClick:function(tabId){
    console.log('_popupActivitiesPoint>click');
    this.setState({'tabId':tabId});
    this.forceUpdate();
  },

  render: function() {
    var tabId = this.state.tabId ? this.state.tabId : 0;
    var titleArray = this._getTitles();
    var infoData=[];
    if(tabId==4){
      infoData = this._getData(tabId);
    }
    var showLoading=true;
    if(this.state.infoWindow){
      showLoading=false;
    }
    return (
      <div>
        <div className='popup-nav-wrapper2'>
          <nav className='tabs' role='tablist' >
            <ul className='tabs nav national-tabs' role='tablist' >
            <li className={tabId==0? 'active' : ''} role='tab' >
              <a href='#' onClick={this.handleClick.bind(this, 0)}>
                <span className='popup-icon chart' title={i18n.t('map.popup.costShareBreakdown')}></span>
              </a>
            </li>
            <li className={tabId==1? 'active' : ''} role='tab' >
              <a href='#' onClick={this.handleClick.bind(this, 1)}>
                <span className='popup-icon funding-dev-obj' title={i18n.t('map.popup.objectivesInfoWindow')}></span>
              </a>
            </li>
            <li className={tabId==2? 'active' : ''} role='tab' >
              <a href='#' onClick={this.handleClick.bind(this, 2)}>
                <span className='popup-icon subactivities' title={i18n.t('map.popup.activityClassication')}></span>
              </a>
            </li>
            <li className={tabId==3? 'active' : ''} role='tab' >
              <a href='#' onClick={this.handleClick.bind(this, 3)}>
                <span className='popup-icon export' title={i18n.t('map.popup.ppp')}></span>
              </a>
            </li>
            <li className={tabId==4? 'active' : ''} role='tab' >
              <a href='#' onClick={this.handleClick.bind(this, 4)}>
                <span className='popup-icon subactivitiesList' title={i18n.t('map.popup.activities')}></span>
              </a>
            </li>
            </ul>
          </nav>
        </div>
        <div className='panel-body'>
          <div className='chart-container' id='chartContainer'></div>
          <If condition={showLoading} >
            <Loading container='popup-loading-container'/>
          </If>
          <If condition={tabId==4 && !showLoading} >
            <div className='subactivities-container'>
              <div className='sub-activities-title'>{titleArray[tabId]}</div>
              <MyActivities data={infoData[4]} externalFile={infoData[5]} />
            </div>
          </If>
        </div>
      </div>
    );
}

});
