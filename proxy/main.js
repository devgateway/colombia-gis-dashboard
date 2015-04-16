var proxy=require('./proxy.js');
var cluster = require('cluster');


/*
var numCPUs = require('os').cpus().length;
    if (cluster.isMaster) {
        // Fork workers.
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        Object.keys(cluster.workers).forEach(function (id) {
            //console.log("I am running with ID : " + cluster.workers[id].process.pid);
        });

        cluster.on('exit', function (worker, code, signal) {
            console.log('worker ' + worker.process.pid + ' died');
        });
    } else {

            startWorker();      
    }
*/


 startWorker();  
function startWorker(){
     new proxy({
        'port':3553,
        'use_credentials':true,
        'expiration_time':1440,
        'client_id':'Lcs7MzyMULXvbqEB',
        'client_secret':'c9aae480e2aa47dc8e9c4ebb4d20b0d5',
        'grant_type':'client_credentials'
    }).init();
}

     
  