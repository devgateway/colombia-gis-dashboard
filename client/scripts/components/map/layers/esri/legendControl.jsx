/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var LegendStore=require('../../../../stores/legendStore.js');

var If=React.createClass({
  render:function(){
    if (this.props.condition){
      return <span>{this.props.children}</span>
    }else{
      return null;
    }
  }
});

var LegendSymbol=React.createClass({

  _getStrokeDasharray:function(symbol){
    var lineStyle = symbol.outline? symbol.outline.style : symbol.style;
    var ret = "";
    switch(lineStyle) {
      case "esriSLSDash":
        ret = "6,3";
        break;
      case "esriSLSDashDot":
        ret = "6,3,3,3";
        break;
      case "esriSLSDashDotDot":
        ret = "6,3,3,3,3,3";
        break;
      case "esriSLSDot":
        ret = "3,3";
        break;
    }
    return ret;
  },

  _getSymbolPath:function(symbol){
    var ret = "";
    switch(symbol.type) {
      case "esriSFS":
        ret = "M-10-10 L10 0 L10 10 L-10 10 Z";
        break;
      case "esriSMS":
        switch(symbol.style) {
          case "esriSMSCross":
            ret = "M-10 0 L10 0 M0 -10 L0 10";
            break;
          case "esriSMSDiamond":
            ret = "M-10 0 L0 -10 L10 0 L0 10 Z";
            break;
          case "esriSMSSquare":
            ret = "M-10 10 L-10 -10 L10 -10 L10 10 Z";
            break;
          case "esriSMSX":
            ret = "M-10 10 L10 -10 M-10 -10 L10 10";
            break;
          case "esriSMSTriangle":
            ret = "M 0 -10 L-10 10 L10 10 Z";
            break;
        }
        break;
      case "esriSLS":
        ret = "M-15 0 L15 0"
        break;
    }
    return ret;
  },

  render:function(){
    var image = "";
    var symbol = this.props.symbol;
    var fill = "rgb("+symbol.color[0]+","+symbol.color[1]+","+symbol.color[2]+")";
    var stroke = symbol.outline? "rgb("+symbol.outline.color[0]+","+symbol.outline.color[1]+","+symbol.outline.color[2]+")" : fill;
    var strokeWidth = symbol.outline? symbol.outline.width : symbol.width;
    var strokeDasharray = this._getStrokeDasharray(symbol);
    var path = this._getSymbolPath(symbol);
    return (
      <svg overflow="hidden" width="30" height="30">
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          d={path}
          transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,15.00000000)">
        </path>
      </svg>
    );
  }

});

var LayerLegends=React.createClass({

  getInitialState: function() {
    this.state = this.state || {'expanded': false};
    return this.state;
  },

  _toggleVisibility: function(){
    this.setState({'expanded': !this.state.expanded});
  },

  render:function(){
   return (<div>
            <div className="legend-group-title" onClick={this._toggleVisibility}>
              <i className={this.state.expanded? "fa fa-sort-asc" : "fa fa-sort-desc"}/>
              <span>{this.props.layerTitle}</span>
            </div>
            <If condition={this.state.expanded}>
              <div className="legend-group">
                <ul>
                {
                  this.props.legendGroups.map(function(legendGroup){
                    return (
                      <li>
                        <h2>{legendGroup.layerName}</h2>
                        <div className="legends-list">
                          <ul>
                          {
                            legendGroup.legends.map(function(legend){
                              var image = "";
                              if (legend.imageData || (legend.symbol && legend.symbol.imageData)){
                                var imgData = legend.imageData? legend.imageData : legend.symbol.imageData;
                                var cntType = legend.contentType? legend.contentType : legend.symbol.contentType;
                                var src = "data:"+cntType+";base64,"+imgData;
                                image = <img src={src}/>;
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
                        </div>
                      </li>
                    );
                  })
                }
                </ul>
              </div>
            </If>
          </div>)
  }

});

var LegendControl  = React.createClass({
    mixins: [Reflux.connect(LegendStore)],

    getInitialState: function() {
      this.state = this.state || {'shown': false};
      return this.state;
    },

    _toggleVisibility: function(){
      this.setState({'shown': !this.state.shown});
    },

    render: function() {
      var legendContent = "";
      var buttonLabel = this.state.shown? <Message message="layers.hideLegend"/> : <Message message="layers.showLegend"/>
      if (this.state.layersLegends.length>0){
        return (<div className="legends-container">
                <button className="show-legends-button" onClick={this._toggleVisibility}>{buttonLabel}</button>
                <If condition={this.state.shown}>
                  <div className="legends-content">
                    {
                      this.state.layersLegends.map(function(layerLegends){
                        return (<LayerLegends legendGroups={layerLegends.legendGroups} layerTitle={layerLegends.layerTitle}/>);
                      })
                    }
                  </div>
                </If>
              </div>
        );
      }
      return null;
    }
});

module.exports = LegendControl;
