'use strict';

var React = require('react');
var Reflux = require('reflux');

module.exports  = React.createClass({

  componentDidMount:function(){
    console.log('popup>componentDidMount');
  },

  componentWillMount:function(){
    console.log('popup>componentWillMount');
  },

  handleClick:function(){
    alert('handleClick');
  },


  render: function() {
    console.log('popup>render');
    debugger;
    if (!this.props){
      return (<p></p>)
    }
    return (

    <div className="leaflet-popup-content-wrapper">
     <div className="leaflet-popup-content">
       <div className="panel panel-default" data-reactid="">
         <div className="panel-heading popup-header" data-reactid="">
           <h3 className="panel-title" data-reactid="">{this.props.name}</h3>
            <span className="title-label"> - Total Activities</span>
         </div>
         <div className="popup-nav-wrapper">
           <nav className="tabs" role="tablist" data-reactid="">
             <ul className="tabs nav nav-tabs" role="tablist" data-reactid="">
               <li className="active" data-reactid="" role="tab">
                 <a href="#" data-reactid="">
                   <span className="popup-icon chart"></span>
                 </a>
               </li>
               <li className="" data-reactid="" role="tab">
                 <a href="#" data-reactid="">
                   <span className="popup-icon funding-dev-obj"></span>
                 </a>
               </li>
               <li className="" data-reactid="" role="tab">
                 <a href="#" data-reactid="">
                   <span className="popup-icon subactivities"></span>
                 </a>
               </li>
               <li data-reactid="">
                 <a href="#" data-reactid="" role="tab">
                   <span className="popup-icon export"></span>
                 </a>
               </li>
             </ul>
           </nav>
         </div>
         <div className="panel-body" data-reactid="">
           <div className="popup-content">

             This is where the chart will be displayed. We could also have a text.

             <h4>Sub-Activities</h4>

             <ul>
               <li>This is subactivity 1</li>
               <li>This is subactivity 2</li>
               <li>This is subactivity 3</li>
               <li><a href="#">This is subactivity 4</a></li>
             </ul>

             This is where the chart will be displayed. We could also have a text.

             <h4>Sub-Activities</h4>

             <ul>
               <li>This is subactivity 1</li>
               <li>This is subactivity 2</li>
               <li>This is subactivity 3</li>
               <li><a href="#">Example of a link</a></li>
             </ul>


           </div>

         </div>
       </div>
     </div>
   </div>

     )
}

});
