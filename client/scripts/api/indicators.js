'use strict';
var request = require('reqwest');


function logFailure(err, message) {
    console.error(message);
    console.error(err);
}

module.exports = {

    getIndicatorsList: function (filters) {
        return request({
            url: 'http://test.monitor.net.co/GISService.svc/Filters/IndicatorSearch/Json',
            type: 'json',
            method: 'post',
            contentType: "application/json",
            data: JSON.stringify(filters),
            crossOrigin: true
        }).fail(logFailure);
    },

    getActivityList: function (filters) {
        return request({
            url: 'http://test.monitor.net.co/GisService.svc/Filters/ActivitiesListByProgram/Json',
            type: 'json',
            method: 'post',
            contentType: "application/json",
            data: JSON.stringify(filters),
            crossOrigin: true
        }).fail(logFailure);
    }
};