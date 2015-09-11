'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Store = require('../../../stores/indicatorLayerStore.js');
var LayerActions = require('../../../actions/layersAction.js');

module.exports = React.createClass({

      mixins: [Reflux.connect(Store, 'layer')],

      getInitialState: function() {
        return {
          min: 2010,
          max: 2016,
          range: 4,
          label: 'Q'
        };
      },

      componentWillMount: function() {

      },

      //current position divide by number of position per year + start year will give  the actual year
      _getYear: function(value) {
        return parseInt(value / this.state.range) + this.state.min;
      },

      //poistion- the number of position per year * current year index will give us the period
      _getYearPeriod: function(value) {
        var index = this._getYear(value) - this.state.min;
        return (parseInt(value) + 1) - (index * this.state.range) //is base 0

      },

      _onSet: function(values, handle, unencodedValues) {
        var minYear = this._getYear(unencodedValues[0]);
        var maxYear = this._getYear(unencodedValues[1]);
        var minQuarter = this._getYearPeriod(unencodedValues[0]);
        var maxQuarter = this._getYearPeriod(unencodedValues[1]);
        LayerActions.changeGroupFilterSelection([
          {"param": "fyi", "values": minYear},
          {"param": "sq", "values": minQuarter},
          {"param": "fyf", "values": maxYear},
          {"param": "eq", "values": maxQuarter}          
        ]);
      },

      _onUpdate: function(values, handle) {
        var value = values[handle];
        var year = this._getYear(value); //min year
        var period = this._getYearPeriod(value)
        this.tooltips[handle].innerHTML = year + '-' + this.state.label + period;
      },

      componentDidMount: function() {
        var maxRange = (this.state.max - this.state.min) * this.state.range;
        var subRange = this.state.range;
        var slider = this.getDOMNode()

        /*Fill some labels*/
        values = [0, maxRange];
        for (var i = 0; i < maxRange; i++) {
          if ((i) % subRange == 0) {
            values.push(i);
          }
        }

        /*Create Slider*/
        noUiSlider.create(slider, {
          connect: true,
          behaviour: 'tap',
          step: 1,
          start: [0, maxRange],
          range: {
            'min': [0],
            'max': [maxRange]
          },
          pips: {
            mode: 'values',
            values: values,
            density: 2,
          }
        });

        //Transform labels vales to years
        var values = $(slider).find('.noUi-value-large,.noUi-value-sub');
        _.map(values, function(v) {
          var year = this._getYear(v.innerHTML); //min year
          v.innerHTML = year;
        }.bind(this))

        // Add  tooltiips divs to the slider handles.
        this.tipHandles = slider.getElementsByClassName('noUi-handle'),
          this.tooltips = [];

        for (var i = 0; i < this.tipHandles.length; i++) {
          this.tooltips[i] = document.createElement('div');
          this.tooltips[i].className += 'sliderTooltip';
          this.tipHandles[i].appendChild(this.tooltips[i]);
        }

        slider.noUiSlider.on('set', this._onSet)
        slider.noUiSlider.on('update', this._onUpdate)
      },

      render: function() {
        console.log('time slider render');
        var display = (this.state.layer && this.state.layer.visible) ? "block" : "none";
        return ( < div style = {
            {
              display: display
            }
          }
          className = "timeSliderContainer" >
          < /div>);
        }

      });