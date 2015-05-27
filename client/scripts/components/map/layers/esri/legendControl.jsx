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

var LayerLegends=React.createClass({

  getInitialState:function(){
    this.state = this.state || {'expanded':false}
    return this.state;
  },

  _toggleVisibility:function(){
    this.setState({'expanded':(!this.state.expanded)});
  },

  render:function(){
   return (<div>
            <div className="legend-group-title" onClick={this._toggleVisibility}>
              <i className={this.state.expanded? "fa fa-minus-square-o" : "fa fa-plus-square-o"}/>
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
                              if (legend.imageData){
                                var src = "data:"+legend.contentType+";base64,"+legend.imageData;
                                image = <img src={src}/>;
                              } else {
                                var fill = "rgb("+legend.color[0]+","+legend.color[1]+","+legend.color[2]+")";
                                var border = "rgb("+legend.borderColor[0]+","+legend.borderColor[1]+","+legend.borderColor[2]+")";
                                image = <svg overflow="hidden" width="30" height="30">
                                    <path 
                                      fill={fill} 
                                      stroke={border} 
                                      path="M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 E" d="M-10-10L 10 0L 10 10L-10 10L-10-10" 
                                      transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,15.00000000)">
                                    </path>
                                  </svg>
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