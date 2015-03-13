'use strict';

var filters = [
        {
          index: 1,
          label: 'Locations',
          subLevels:[
            {
              level: 1,
              childParam: 'mu',
              label: 'Departaments',
              param: 'de',
              apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/DepartmentsList/Json'
            },
            {
              level: 2,
              parentParam: 'de',
              label: 'Municipalities',
              param: 'mu',
              parentParamField: 'idDepto',
              apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/MunicipalitiesList/Json'
            }
          ]
        }, 
        {
          index: 2,
          label: 'Target Population',
          param: 'tp',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/TargetPopulation/Json'
        },
        {
          index: 3,
          label: 'Development Objectives',
          param: 'do',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/DOList/Json'
        },
        {
          index: 4,
          label: 'Crops',
          param: 'cr',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/CropsList/Json'
        },
        {
          index: 5,
          label: 'SubActivity Status',
          param: 'st',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/SubActivityStatus/Json'
        }

      ];
      
module.exports = {
  filters: filters
};

