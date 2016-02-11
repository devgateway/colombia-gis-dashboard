'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var LayerActions = require('../../../actions/layersAction.js');
var Toggler = require('../../commons/toggler.jsx').Toggler;
var TogglerContent = require('../../commons/toggler.jsx').TogglerContent;
var If = require('../../commons/if.jsx');
var CustomRadio = require('../../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../../commons/customRadioButton.jsx').RadioGroup;
var Layer = require('./_layer.jsx');
var CommonsMixins = require('./_mixins.js');
var Grid=require('react-bootstrap/lib/Grid');
var Row=require('react-bootstrap/lib/Row');
var Col=require('react-bootstrap/lib/Col');

var _ = require('lodash');

var Breaker=require('./_breaker.jsx');
var breaks = [0, 20, 40, 60, 80, 100];
var breakStyle = 'percentage';

var Store = require('../../../stores/indicatorLayerStore.js');

var Finder=require('../../util/indicatorFinder.jsx');

module.exports = React.createClass({

 mixins: [CommonsMixins, Reflux.connect(Store)],

  _getLayerId: function() {
    return 'indicators';
  },

  getInitialState:function(){
    return {'breakSelected': 0};
  },

  _changeBreaksWrapper:function(value){
    this.setState({'breakSelected': value});
    this.handleClickForBreaks(value, breaks, breakStyle);
  },

  _selectIndicator:function(indicator){
    this.setState({'indicators':indicator});
  },

  _onChangeVisibility:function(id,newValue,idx){
    if (this.state.layerFilters.indicatorId){
      this._changeVisibility(id,newValue,idx);
    } else {
      this.setState({'showFinder': true, 'expanded': true});
    }
  },

  _onFinderClose:function(indicator){
    this.setState({'showFinder': false, 'expanded': false});
  },

  render: function() {
    var level=this.state.level;
    var breaks = this.state.breaks.breaks;
    var showClassification = true;
    if(level=='country'){
      breaks = new Object({'Level4':this.state.breaks.breaks.Level4});
      showClassification = false;
    }
    return (
      <li>
        <Toggler ref='toggler' expanded={this.state.expanded}>
          <TogglerContent visibleWhen='collapsed'>
            <div toggler={true} className='toggler-button'><i className='fa fa-chevron-down'></i></div>
          </TogglerContent>
          <TogglerContent visibleWhen='expanded'>
            <div toggler={true} className='toggler-button'><i className='fa fa-chevron-up'></i></div>
          </TogglerContent>
          <TogglerContent visibleWhen='collapsed'>
            <Layer id='indicators'
              opacity={this.state.opacity}
              onChangeOpacity={this._onChangeOpacity}
              onChangeVisibility={this._onChangeVisibility}
              visible={this.state.visible}
              title={i18n.t('layers.indicatorLayer')}
              showBasicControl={true}/>
          </TogglerContent>
          <TogglerContent visibleWhen='expanded'>
            <Layer id='indicators'
              opacity={this.state.opacity}
              onChangeOpacity={this._onChangeOpacity}
              onChangeVisibility={this._onChangeVisibility}
              title={i18n.t('layers.indicatorLayer')}
              visible={this.state.visible}/>
            <ul>
              <li className='levels'>
                <h3><Message message='layers.level'/></h3>
                <CustomRadioGroup>
                  <CustomRadio className='horizontal' name='country' checked={(level=='country')? true : false} onClick={this._showByCountry} label='layers.byCountry'/>
                  <CustomRadio className='horizontal' name='departament' checked={(level=='departament')? true : false} onClick={this._showByDepartment} label='layers.byDepartment'/>
                  <CustomRadio className='horizontal' name='municipality' checked={(level=='municipality')? true : false} onClick={this._showByMunicipality} label='layers.byMunicipality'/>
                </CustomRadioGroup>
              </li>
              <li className='indicator'>
                <div className='clearFix'>
                  <Grid fluid={false}>
                    <Row>
                      <Col md={2} className='no-padding'>
                        <Finder visible={this.state.showFinder} onClose={this._onFinderClose} label={this.state.layerFilters.indicatorId? i18n.t('layers.changeIndicator') : i18n.t('layers.selectIndicator')}/>
                      </Col>
                      <Col md={4} className='no-padding'>                 
                        {this.state.layerFilters.indicatorId? this.state.layerFilters.indicatorName : ''}
                      </Col>
                    </Row>
                  </Grid>
                </div>

              </li>
              <li>
                <div className='clearFix'/>
                <h3 className='color-control'><Message message='layers.classificationScheme'/></h3>
                <div>
                  <If condition={showClassification}>
                    <div className='breaksTemplates'>
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
                <h3 className='color-control percent-funding'><Message message='layers.advancePercent'/></h3>
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
