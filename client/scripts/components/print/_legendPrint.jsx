'use strict';
var React = require('react');
var Reflux = require('reflux');
var If=require('../commons/if.jsx');
var LegendSymbol=require('../map/layers/esri/esriSymbols.jsx');

module.exports=React.createClass({

  getInitialState: function() {
    this.state = this.state || {'expanded': false};
    return this.state;
  },

  render:function(){
    if (this.props.visible) {
      return (<div className='pdf'>
        <div className='legend '>
          <div className='title'>{this.props.layerTitle}</div>
            <ul className='group'>
              {this.props.legendGroups.map(function(legendGroup){
                return (
                  <li>
                    <div className='title'> {legendGroup.layerName}</div>
                      <ul className='items'>
                      {
                        legendGroup.legends.map(function(legend){
                          var image = '';
                          if (legend.imageData || (legend.symbol && legend.symbol.imageData)){
                            var imgData = legend.imageData? legend.imageData : legend.symbol.imageData;
                            var imgColor = legend.imageColor? legend.imageColor : '#FFFFFF';
                            var cntType = legend.contentType? legend.contentType : legend.symbol.contentType;
                            var src = 'data:'+cntType+';base64,'+imgData;
                            image = <img src={src} style={{backgroundColor:imgColor}}/>;
                          } else {
                            image = <LegendSymbol symbol={legend.symbol}/>
                          }
                          return (
                            <li>
                              {image}
                              {legend.label}
                            </li>
                          );
                        })
                      }
                      </ul>                      
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      )
    } else {
      return (<div></div>);
    }
  }
});