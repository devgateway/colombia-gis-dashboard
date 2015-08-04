'use strict';
var request = require('reqwest');


function logFailure(err, message) {
    console.error(message);
    console.error(err);
}

module.exports = {

    getActivitiesByDepartment: function (filters) {
        return request({
            //url: 'mock-data/departmentsFunding.json',
            url: 'http://test.monitor.net.co/GisService.svc/Filters/DepartmentsFunding/Json',
            type: 'json',
            method: 'post',
            //method: 'get',
            contentType: "application/json",
            data: JSON.stringify({"filters": filters? filters : []}),
            crossOrigin: true
        }).fail(logFailure);
    },

    getActivitiesByMuncipalities: function (filters) {
        return request({
            //url: 'mock-data/municipalitiesFunding.json',
            url: 'http://test.monitor.net.co/GisService.svc/Filters/MunicipalitiesFunding/Json',
            type: 'json',
            method: 'post',
            //method: 'get',
            contentType: "application/json",
            data: JSON.stringify({"filters": filters? filters : []}),
            crossOrigin: true
        }).fail(logFailure);
    },

    loadDepartmentsShapes:function(){
      
        return request({
            url: 'json-data/departmentsGeoOptimized.json',
            type: 'json'
        }).fail(logFailure);  
    },

    loadMunicipalitiesShapes:function(){
      
        return request({
            url: 'json-data/municipalitiesOptimized.json',
            type: 'json'
        }).fail(logFailure);  
    },

    getIndicatorsByDepartment: function (filters) {
        return request({
            url: 'http://test.monitor.net.co/GisService.svc/Filters/DepartmentsFunding/Json',
            data: JSON.stringify({"filters": filters? filters : []}),
            //url: 'http://test.monitor.net.co/GisService.svc/IndicatorInfoByDepartaments/Json',
            //data: JSON.stringify(filters),
            type: 'json',
            method: 'post',
            contentType: "application/json",
            crossOrigin: true
        }).fail(logFailure);
    },

    getIndicatorsByMuncipalities: function (filters) {
        return request({
            url: 'http://test.monitor.net.co/GisService.svc/Filters/MunicipalitiesFunding/Json',
            data: JSON.stringify({"filters": filters? filters : []}),
            //url: 'http://test.monitor.net.co/GisService.svc/IndicatorInfoByMunicipalities/Json',
            //data: JSON.stringify(filters),
            type: 'json',
            method: 'post',
            contentType: "application/json",
            crossOrigin: true
        }).fail(logFailure);
    }
};