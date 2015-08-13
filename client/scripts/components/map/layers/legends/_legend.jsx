var React = require('react');
var Reflux = require('reflux');
var If=require('../../../commons/if.jsx');
var LegendSymbol=require('../esri/esriSymbols.jsx');




module.exports=React.createClass({

  getInitialState: function() {
    this.state = this.state || {'expanded': false};
    return this.state;
  },

  _toggleVisibility: function(){
    this.setState({'expanded': !this.state.expanded});
  },

  render:function(){
    if (this.props.visible) {
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
                                    var imgColor = legend.imageColor? legend.imageColor : "#FFFFFF";
                                    var cntType = legend.contentType? legend.contentType : legend.symbol.contentType;
                                    var src = "data:"+cntType+";base64,"+imgData;
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
                            </div>
                          </li>
                        );
                      })
                    }
                    </ul>
                  </div>
                </If>
              </div>)
    } else {

      return <div></div>;
    }



  }

});