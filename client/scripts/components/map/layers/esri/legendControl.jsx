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

var LegendGroup=React.createClass({

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
              <span>{this.props.layerName}</span>
            </div>
            <If condition={this.state.expanded}>
              <div className="legends-list">
                <ul>
                {
                  this.props.legends.map(function(legend){
                    var image = "data:"+legend.contentType+";base64,"+legend.imageData;
                    return (
                      <li>
                        <img src={image} />
                        {legend.label}
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
      if (this.state.legends.length>0){        
        return (<div className="legends-container">
                <button className="show-legends-button" onClick={this._toggleVisibility}>{buttonLabel}</button>
                <If condition={this.state.shown}>
                  <div className="legends-content">
                    {
                      this.state.legends.map(function(legendLayer){
                        return (<LegendGroup legends={legendLayer.legends} layerName={legendLayer.layerName}/>);
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