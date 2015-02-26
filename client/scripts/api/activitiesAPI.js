'use strict';
var request = require('reqwest');


function logFailure(err, message) {
  console.error(message);
  console.error(err);
}


module.exports = {
  getActivitiesByDepartment:function(filterData){
  
    return request({ url: 'mock-data/getActivityDepartmentsFunding.json' }).fail(logFailure);
  }
  
};

