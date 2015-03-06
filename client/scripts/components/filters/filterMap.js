'use strict';

var filters = [
        {
          index: 1,
          childKey: 'municipalities',
          key: 'departaments',
          label: 'Departaments',
          param: 'de',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getDepartmentsList/Json'
        },
        {
          isChild: true,
          parentKeyField: 'idDepto',
          key: 'municipalities',
          label: 'Municipalities',
          param: 'mu',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json'
        },
        {
          index: 2,
          key: 'targetPopulation',
          label: 'Target Population',
          param: 'tp',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getTargetPopulation/Json'
        },
        {
          index: 3,
          key: 'developmentObjectives',
          label: 'Development Objectives',
          param: 'do',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getDOList/Json'
        },
        {
          index: 4,
          key: 'crops',
          label: 'Crops',
          param: 'cr',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getCropsList/Json'
        },
        {
          index: 5,
          key: 'subActivityStatus',
          label: 'SubActivity Status',
          param: 'st',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getSubActivityStatus/Json'
        }

      ];
      
module.exports = {
  filters: filters
};

