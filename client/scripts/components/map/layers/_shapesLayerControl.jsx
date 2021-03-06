'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Store = require('../../../stores/shapesLayerStore.js');
var LayerActions = require('../../../actions/layersAction.js');
var FilterActions = require('../../../actions/filterActions.js');
var Toggler = require('../../commons/toggler.jsx').Toggler;
var TogglerContent = require('../../commons/toggler.jsx').TogglerContent;
var If = require('../../commons/if.jsx');
var CustomRadio = require('../../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../../commons/customRadioButton.jsx').RadioGroup;
var Layer = require('./_layer.jsx');
var _=require('lodash');
var CustomCheckbox = require('../../commons/customCheckbox.jsx');
var CommonsMixins = require('./_mixins.js');

var Breaker=require('./_breaker.jsx');
//var FilterStore = require('../../../stores/filterStore.js');

var breaks = [0, 20, 40, 60, 80, 100];
var breakStyle = 'percentage';

module.exports = React.createClass({

 //mixins: [Reflux.connect(FilterStore), Reflux.connect(Store)],
 mixins: [CommonsMixins, Reflux.connect(Store)],

  _getLayerId: function() {
    return 'shapes';
  },

  getInitialState:function(){
    return {'fundingSourceSelected': [], 'breakSelected': 0};
  },

  _changeBreaksWrapper:function(value){
    this.setState({'breakSelected': value});
    this.handleClickForBreaks(value, breaks, breakStyle);
  },

  _onFundingSourceChanged: function(obj) {
    var fundingSourceSelected = _.clone(this.state.fundingSourceSelected);
    if (obj.selected){
      fundingSourceSelected.push(obj.value);
    } else {
      fundingSourceSelected.splice(fundingSourceSelected.indexOf(obj.value));
    }
    this.setState({'fundingSourceSelected': fundingSourceSelected});
    LayerActions.changeFilterSelection('shapes', 'ft', fundingSourceSelected);
  },

  _showDisbursements: function() {
    LayerActions.changeFilterSelection('shapes', 'fs', 'disbursements');
  },

  _showCommitments: function() {
    LayerActions.changeFilterSelection('shapes', 'fs', 'commitments');
  },

  componentDidMount: function(){
    $('.layer-control').tooltip();
  },

  render: function() {
    console.log('...................... Layer State ......................');
    console.log(this.state.fundingTypes);
    console.log('...................... Layer State ......................');
    var self = this;
    var level=this.state.level;
    var fundingSources = this.state.fundingSourceItems || [];
    _.map(fundingSources, function(fs){
      var isSelected = _.find(self.state.fundingSourceSelected, function(s){return s==fs.id});
      if(isSelected){
        fs.selected = true;
      } else {
        fs.selected = false;
      }
    });

    var fundingType = this.state.fundingType;

    var showClassification = true;
    var breaks = this.state.breaks.breaks;
    var filteredArray;
    if(this.state.geoData){
      filteredArray = _.filter(this.state.geoData.features, function(f){return f.properties.fundingUS?true:false;})
    }
    if(filteredArray && filteredArray.length==1){
      breaks = new Object({'Level4':this.state.breaks.breaks.Level4});
      showClassification = false;
    }
    return (
    <li>
      <Toggler ref='toggler'>
        <TogglerContent visibleWhen='collapsed'>
          <div toggler={true} className='toggler-button'><i className='fa fa-chevron-down'></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen='expanded'>
          <div toggler={true} className='toggler-button'><i className='fa fa-chevron-up'></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen='collapsed'>
          <Layer id='shapes'
            opacity={this.state.opacity}
            onChangeOpacity={this._onChangeOpacity}
            onChangeVisibility={this._changeVisibility}
            visible={this.state.visible}
            title={i18n.t('layers.fundingByType')}
            showBasicControl={true}/>
        </TogglerContent>
        <TogglerContent visibleWhen='expanded'>
          <Layer id='shapes'
            opacity={this.state.opacity}
            onChangeOpacity={this._onChangeOpacity}
            onChangeVisibility={this._changeVisibility}
            title={i18n.t('layers.fundingByType')}
            visible={this.state.visible}/>
          <ul>
            <li className='layer-option-section'>
              <h3><Message message='layers.level'/></h3>
              <CustomRadioGroup>
                <CustomRadio  className='inline' name='departament' checked={(level=='departament')? true : false}
                onClick={this._showByDepartment} label='layers.byDepartment'/>
                <CustomRadio  className='inline' name='municipality' checked={(level=='municipality')? true : false}
                onClick={this._showByMunicipality} label='layers.byMunicipality'/>
              </CustomRadioGroup>
            </li>
            <li className='layer-option-section'>
              <h3><Message message='layers.fundingSource'/></h3>
              {
                fundingSources.map(function(fundingSource){
                  return(
                      <li className='funding-type-option'>
                      <CustomCheckbox
                              selected={fundingSource.selected}
                              onChange={self._onFundingSourceChanged}
                              value={fundingSource.id}/>
                      <span>{fundingSource.name}</span>
                      </li>
                  );
                })
              }
            </li>
            <li>
              <div className='vbuffer'/>
              <div className='clearFix'/>
              <div>
                <If condition={showClassification}>
                  <div className='breaksTemplates'>
                    <h3 className='color-control'><Message message='layers.classificationScheme'/></h3>
                    <div className={this.state.breakSelected==0?'label label-info-selected':'label label-info'} onClick={this._changeBreaksWrapper.bind(this, 0)} title={i18n.t('filters.defaultTip')}><Message message='filters.default'/></div>
                    <div className={this.state.breakSelected==1?'label label-info-selected':'label label-info'} onClick={this._changeBreaksWrapper.bind(this, 1)} title={i18n.t('filters.jenksTip')}><Message message='filters.jenks'/></div>
                    <div className={this.state.breakSelected==2?'label label-info-selected':'label label-info'} onClick={this._changeBreaksWrapper.bind(this, 2)} title={i18n.t('filters.arithmeticTip')}><Message message='filters.arithmetic'/></div>
                    <div className={this.state.breakSelected==3?'label label-info-selected':'label label-info'} onClick={this._changeBreaksWrapper.bind(this, 3)} title={i18n.t('filters.geometricTip')}><Message message='filters.geometric'/></div>
                  </div>
                </If>
                <div className='clearFix'/>
                <div className='breaksTemplates'>
                  <h3 className='color-control'><Message message='layers.colorPalettes'/></h3>
                  <div className='colorpicker-element'>
                  <span className='input-group-addon' onClick={this.handleClickForColor.bind(this, 0, null)} title={i18n.t('filters.defaultColor')}><i style={{backgroundColor:'#AA3900'}}></i></span></div>

                  <div className='colorpicker-element'>
                  <span className='input-group-addon' onClick={this.handleClickForColor.bind(this, 1)} title={i18n.t('filters.contrast1')}><i style={{backgroundColor:'#FF3333'}}></i></span></div>
                  <div className='colorpicker-element'>
                  <span className='input-group-addon' onClick={this.handleClickForColor.bind(this, 2)} title={i18n.t('filters.contrast2')}><i style={{backgroundColor:'#3399FF'}}></i></span></div>
                  <div className='colorpicker-element'>
                  <span className='input-group-addon' onClick={this.handleClickForColor.bind(this, 3)} title={i18n.t('filters.gradient1')}><i style={{backgroundColor:'#66FFB2'}}></i></span></div>
                  <div className='colorpicker-element'>
                  <span className='input-group-addon' onClick={this.handleClickForColor.bind(this, 4)} title={i18n.t('filters.gradient2')}><i style={{backgroundColor:'#FFFF66'}}></i></span></div>

                </div>
              </div>
              <div className='clearFix'/>
            </li>
            <li>
              <h3 className='color-control percent-funding'><Message message='layers.fundingPercent'/></h3>
              <h3 className='color-control'><Message message='layers.colorSelection'/></h3>
              {
                _.map(_.keys(breaks),function(key){
                  var br=breaks[key];
                  var minLabel = br.min.toFixed(br.min<10?2:0);
                  var maxLabel = br.max.toFixed(br.max<10?2:0);
                return (
                        <Breaker  level={key} label={minLabel+' - '+maxLabel} color={br.style.color} onChangeColor={this._changeColor} />
                        )
                }.bind(this))
              }
            </li>
          </ul>
        </TogglerContent>
      </Toggler>
    </li>);

}
});
