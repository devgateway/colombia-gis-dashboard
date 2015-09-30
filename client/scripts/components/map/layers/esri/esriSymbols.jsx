'use strict';

var React = require('react');
var Reflux = require('reflux');

var If=require('../../../commons/if.jsx');
var LegendSymbol=require('../esri/esriSymbols.jsx');
module.exports=React.createClass({


  _getStrokeDasharray:function(symbol){
    var lineStyle = symbol.outline? symbol.outline.style : symbol.style;
    var ret = '';
    switch(lineStyle) {
      case 'esriSLSDash':
        ret = '6,3';
        break;
      case 'esriSLSDashDot':
        ret = '6,3,3,3';
        break;
      case 'esriSLSDashDotDot':
        ret = '6,3,3,3,3,3';
        break;
      case 'esriSLSDot':
        ret = '3,3';
        break;
    }
    return ret;
  },

  _getSymbolPath:function(symbol){
    var ret = '';
    switch(symbol.type) {
      case 'esriSFS':
        ret = 'M-10-10 L10 0 L10 10 L-10 10 Z';
        break;
      case 'esriSMS':
        switch(symbol.style) {
          case 'esriSMSCross':
            ret = 'M-10 0 L10 0 M0 -10 L0 10';
            break;
          case 'esriSMSDiamond':
            ret = 'M-10 0 L0 -10 L10 0 L0 10 Z';
            break;
          case 'esriSMSSquare':
            ret = 'M-10 10 L-10 -10 L10 -10 L10 10 Z';
            break;
          case 'esriSMSX':
            ret = 'M-10 10 L10 -10 M-10 -10 L10 10';
            break;
          case 'esriSMSTriangle':
            ret = 'M 0 -10 L-10 10 L10 10 Z';
            break;
        }
        break;
      case 'esriSLS':
        ret = 'M-15 0 L15 0'
        break;
    }
    return ret;
  },

  render:function(){
    var image = '';
    var symbol = this.props.symbol;
    var fill = 'rgb('+symbol.color[0]+','+symbol.color[1]+','+symbol.color[2]+')';
    var stroke = symbol.outline? 'rgb('+symbol.outline.color[0]+','+symbol.outline.color[1]+','+symbol.outline.color[2]+')' : fill;
    var strokeWidth = symbol.outline? symbol.outline.width : symbol.width;
    var strokeDasharray = this._getStrokeDasharray(symbol);
    var path = this._getSymbolPath(symbol);
    return (
      <svg overflow='hidden' width='30' height='30'>
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          d={path}
          transform='matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,15.00000000)'>
        </path>
      </svg>
    );
  }

});