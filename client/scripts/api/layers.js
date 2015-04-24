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
            data: {"filters": JSON.stringify(filters)},
            crossOrigin: true
        }).fail(logFailure);
    },

    getActivitiesByMuncipalities: function (options) {
        return request({
            url: 'http://test.monitor.net.co/GISService.svc/Filters/getActivityMunicipalitiesFunding/Json',
            type: 'json',
            method: 'get',
            crossOrigin: true
        }).fail(logFailure);
    }



};