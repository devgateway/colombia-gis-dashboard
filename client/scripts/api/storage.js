'use strict';

function isJSON(str) {
    if (!str || str.trim().length==0){ 
        return false
    };

    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

    return (/^[\],:{}\s]*$/).test(str);
}

module.exports = {

    put:function(key, value){
        if ((typeof value)== "object"){
            window.localStorage.setItem(key,JSON.stringify(value));
        }else{
            window.localStorage.setItem(key,value);
        }
    },

    get:function(key){
      var value=window.localStorage.getItem(key);
      return isJSON(value)? JSON.parse(value):value;    
  },

  remove:function(key){
    window.localStorage.removeItem(key);
}

};