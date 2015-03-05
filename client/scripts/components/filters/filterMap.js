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
          index: 2,
          isChild: true,
          childKey: 'barrio',
          parentKeyField: 'idDepto',
          key: 'municipalities',
          label: 'Municipalities',
          param: 'mu',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json'
        },
        {
          index: 2,
          isChild: true,
          childKey: 'calle',
          parentKeyField: 'idDepto',
          key: 'barrio',
          label: 'Barrio',
          param: 'mu',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json'
        },
        {
          index: 2,
          isChild: true,
          parentKeyField: 'idDepto',
          key: 'calle',
          label: 'Calle',
          param: 'mu',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json'
        }
        /*{
          index: 2,
          key: 'municipalities',
          label: 'Municipalities',
          param: 'mun',
          apiEndPoint: 'http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json'
        }*/
      ];
      
module.exports = {
  filters: filters
};

