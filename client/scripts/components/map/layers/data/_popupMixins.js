'use strict';
var _ = require('lodash');

var PointsActions=require('../../../../actions/infoWindowActions.js');
var ShapesActions=require('../../../../actions/infoWindowShapesActions.js');
var IndicatorsActions=require('../../../../actions/infoWindowIndicatorsActions.js');
var UtilFormat=require('../../../../util/utilFormat.js');
var HighCharts = require('highcharts-browserify');


module.exports = {

  _getInfoData: function (id, level, filters, type) {
    var param = level? level.substring(0,2) : 'de';
    var infoWindow = [{'param':param,'values':[id]}];
    var data;
    switch(type) {
      case 'points':
        data = PointsActions.getPointsFromAPI(infoWindow, filters) || [];
        break;
      case 'shapes':
        data = ShapesActions.getShapesFromAPI(infoWindow, filters) || [];
        break;
      case 'indicators':
        var filtersClone = _.clone(filters);
        if (param==='de'){
          _.assign(filtersClone, {'departments': [id], 'municipalities':[]});
        } else if (param==='mu') {
          _.assign(filtersClone, {'municipalities': [id], 'departments': []});
        } else {
          _.assign(filtersClone, {'municipalities': [], 'departments': ['CN']});
        }
        data = IndicatorsActions.getInfoFromAPI(infoWindow, filtersClone) || [];
        break;
    }
    return data;
  },

  _getData: function(tabId) {
    var infoData = [];
    if(this.state.infoWindow){
      this.state.infoWindow.map(function(node, index) {
        infoData.push(node.value);
      });
    }
    return infoData;
  },

  _getTitles: function() {
    var titleArray = [];
    if(this.props.isShapePopup && this.props.fundingUS){
        titleArray.push(i18n.t('map.popup.funding') +  UtilFormat.formatWithThousandsSeparator(this.props.fundingUS.toFixed(2)));
    } else if (this.state.infoWindow){
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
      });
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

        var symbol = tabId==2 || tabId==3? "" : "US$";
        var totalAmount =  tabId==2 || tabId==3? i18n.t('map.popup.totalActivities') : i18n.t('map.popup.totalAmount');
        var chart = new HighCharts.Chart({
            colors: ['#FFC614', '#3897D3', '#18577A', '#97CB68', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#50B432', '#FF9655', '#FFF263', '#6AF9C4'],
            chart: {
              marginTop: 20,
              width: 420,
              height: 240,
              plotBorderWidth: null,
              renderTo: 'container',
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
                pointFormat: '{series.name}:  <b>'+symbol+' {point.y}</b>',                
            },
            plotOptions: {
              pie: {
                  innerSize: '70%',
                  name: totalAmount,
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
    this.setAttributeDisplay('.popup-nav-wrapper', 'data-originalreactid', 'inline');
  },

};