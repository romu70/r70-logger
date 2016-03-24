'use strict';

// Code taken from those threads:
// - http://jsperf.com/alternative-isfunction-implementations/
// - http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
// The implementation chosen here is the one from underscore, subject to change in the future if it is not error prone enough
module.exports.isFunction = function(object) {  
   return !!(object && object.constructor && object.call && object.apply);
}
