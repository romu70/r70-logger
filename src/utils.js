'use strict';

// Code taken from those threads:
// - http://jsperf.com/alternative-isfunction-implementations/
// - http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
// The implementation chosen here is the one from Underscore, subject to change in the future if it is not error prone enough
module.exports.isFunction = function(object) {  
   return !!(object && object.constructor && object.call && object.apply);
}

module.exports.formatNow = function() {  
  let now = new Date();
  let month = ("0" + now.getMonth()).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);
  let hours = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let s = ("0" + now.getSeconds()).slice(-2);
  let ms = ("00" + now.getMilliseconds()).slice(-3);
  return `${now.getFullYear()}-${month}-${day}-${hours}:${minutes}:${s}:${ms}`;
}

