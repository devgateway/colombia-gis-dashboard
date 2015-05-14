'use strict';

var React = require('react');
var Reflux = require('reflux');

module.exports  = React.createClass({
  componentDidMount:function(){
    console.log('chart>componentDidMount');
  },

  componentWillMount:function(){
    console.log('chart>componentWillMount');
  },

  render: function() {
    console.log('charts>render type:' + this.props.type);
    debugger;

    if(this.props.infoWindow){
        
          return 
            <div className='estaClase'>
                Esta clase
            </div>
        ;


    } else {
      return <div className="">Aca no entro</div>;
    }

  }
});