'use strict';
var request = require('reqwest');


function logFailure(err, message) {
    console.error(message);
    console.error(err);
}

module.exports = {

    getActivitiesByDepartment: function (filters) {
        return request({
            url: 'http://test.monitor.net.co/GisService.svc/Filters/DepartmentsFunding/Json',
            type: 'json',
            method: 'post',
            contentType: "application/json",
            data: JSON.stringify({"filters": filters? filters : []}),
            crossOrigin: true
        }).fail(logFailure);
    },

    getActivitiesByMuncipalities: function (filters) {
        return request({
            url: 'http://test.monitor.net.co/GisService.svc/Filters/MunicipalitiesFunding/Json',
            type: 'json',
            method: 'post',
            contentType: "application/json",
            data: JSON.stringify({"filters": filters? filters : []}),
            crossOrigin: true
        }).fail(logFailure);
    },

    loadDepartments:function(){
      
        return request({
            url: 'json-data/departmentsGeoOptimized.json',
            type: 'json',
            method: 'post',
            contentType: "application/json",
            data: JSON.stringify({"filters": filters? filters : []}),
            crossOrigin: true
        }).fail(logFailure);  
    }
};