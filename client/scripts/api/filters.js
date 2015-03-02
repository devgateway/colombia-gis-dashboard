'use strict';
var request = require('reqwest');

function logFailure(err, message) {
  console.error(message);
  console.error(err);
}

module.exports = {

  	getFilterListFromServer: function(filterType) {
  		  //return request({ url: 'mock-data/getActivityDepartmentsFunding.json' }).fail(logFailure);
    }
};

