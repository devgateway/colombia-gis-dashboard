'use strict';

var filters = [
        /*{
          index: 1,
          childParam: 'mu',
          label: 'Departaments',
          param: 'de',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/DepartmentsList/Json'
        },
        {
          isChild: true,
          key: 'mu',
          label: 'Municipalities',
          param: 'mu',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/MunicipalitiesList/Json'
        },*/
        {
          index: 1,
          label: 'Target Population',
          param: 'tp',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/TargetPopulation/Json'
        },
        {
          index: 2,
          label: 'Development Objectives',
          param: 'do',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/DOList/Json'
        },
        {
          index: 3,
          label: 'Crops',
          param: 'cr',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/CropsList/Json'
        },
        {
          index: 4,
          label: 'SubActivity Status',
          param: 'st',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/SubActivityStatus/Json'
        }

      ];
      
module.exports = {
  filters: filters
};

