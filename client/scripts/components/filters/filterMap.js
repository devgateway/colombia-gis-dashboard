'use strict';

var filters = [
        {
          index: 1,
          key: 'departaments',
          label: 'Departaments',
          param: 'dep',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getDepartmentsList/Json'
        },
        {
          index: 2,
          key: 'municipalities',
          label: 'Municipalities',
          param: 'mun',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json'
        }
      ];
      
module.exports = {
  filters: filters
};

