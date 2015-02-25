'use strict';

module.exports = {

  	getFilterListFromServer: function(filterType) {
      /*switch(filterType) {
        case 'departaments':
          $.ajax('http://test.monitor.net.co/GisService.svc/Filters/getDepartmentsList/Json', {}).done(function(data) {
            FilterActions.receiveFilterListFromServer(data.GetDepartmentsListJsonResult, 'departaments');
          }.bind(this));
          break;
        case 'municipalities':
          $.ajax('http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json', {}).done(function(data) {
            FilterActions.receiveFilterListFromServer(data.GetMunicipalitiesListJsonResult, 'municipalities');
          }.bind(this));
          break;
        case 'developmentObjectives':
          $.ajax('http://test.monitor.net.co/GisService.svc/Filters/getDOList/Json', {}).done(function(data) {
            FilterActions.receiveFilterListFromServer(data.GetDOListResult, 'developmentObjectives');
          }.bind(this));
          break;        
      }*/
      debugger;
      var dfd = $.Deferred();
      $.ajax('http://test.monitor.net.co/GisService.svc/Filters/getMunicipalitiesList/Json', {})
      .done(function(data) {
        dfd.resolve(data);
      }).fail(function(data) {
        dfd.error(data);
      });
      return dfd.promise();
    },

};

