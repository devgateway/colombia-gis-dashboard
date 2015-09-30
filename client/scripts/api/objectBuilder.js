'use strict';
var _=require('lodash');
var shortid = require('shortid');

function logFailure(err, message) {
    console.error(message);
    console.error(err);
}

function createObject(){
    return {id:shortid.generate()};
}


module.exports = {

    //return minial set of fields needed for  ERI layer  results list 
    reduceResults:function(data){
    },


    buildLayerInfo:function(layer,options){
        return _.assign(createObject(),{'layer':layer},options);
    },

    buildObject:function(assignable){
    	return _.assign(createObject(),assignable);
    } 	
};