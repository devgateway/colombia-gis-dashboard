'use strict';
var request = require('reqwest');


function logFailure(err, message) {
    console.error(message);
    console.error(err);
}

module.exports = {

    getActivitiesByDepartment: function (filters) {
        return request({
            url: window.DATA_API_URL + '/gisservice/gisservice.svc/Filters/DepartmentsFunding/Json',
            type: 'json',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({'filters': filters? filters : []}),
            crossOrigin: true
        }).fail(logFailure);
    },

    getActivitiesByMuncipalities: function (filters) {
        return request({
            url: window.DATA_API_URL + '/gisservice/gisservice.svc/Filters/MunicipalitiesFunding/Json',
            type: 'json',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({'filters': filters? filters : []}),
            crossOrigin: true
        }).fail(logFailure);
    },

    loadDepartmentsShapes:function(){
      
        return request({
            url: window.DATA_PATH + '/departmentsGeoOptimized.json',
            type: 'json'
        }).fail(logFailure);  
    },

    loadMunicipalitiesShapes:function(){
      
        return request({
            url: window.DATA_PATH + '/municipalitiesOptimized.json',
            type: 'json'
        }).fail(logFailure);  
    },

    getIndicatorsByDepartment: function (filters) {
        return request({
            url: window.DATA_API_URL + '/gisservice/gisservice.svc/IndicatorInfoByDepartments/Json',
            data: JSON.stringify(filters),
            type: 'json',
            method: 'post',
            contentType: 'application/json',
            crossOrigin: true
        }).fail(logFailure);
    },

    getIndicatorsByMuncipalities: function (filters) {
        return request({
            url: window.DATA_API_URL + '/gisservice/gisservice.svc/IndicatorInfoByMunicipalities/Json',
            data: JSON.stringify(filters),
            type: 'json',
            method: 'post',
            contentType: 'application/json',
            crossOrigin: true
        }).fail(logFailure);
    }
};