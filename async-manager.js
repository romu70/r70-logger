'use strict';

const assert = require('assert');
const utils = require('./utils.js');

// Public interface, designed as a singleton, no need to run several instances

module.exports = {  
  
  //
  // asyncCall: Method to be used as a proxy to each asynchronous call
  // Parameters:
  //   func: the asynchronous function to be called
  //   params: the parameters to be passed to "func"
  //   callback: the callback function  
  // Returns: TBD
  
  asyncCall: function (caller, func, params, callback) {
    
    console.log(`This asynCall: ${this}`);
    console.log(`This asynCall caller: ${caller}`);
    // inputs check
    //TODO: Check "func" is a function
    //TODO: Check "callback"" is a function
    //TODO: Check "params"...TBD  
    assert(utils.isFunction(func));
    assert(utils.isFunction(callback));
    
    console.log(callback);
    console.log(callback.prototype);
    
    let p = params;
    // If the array has only one element, there is a big chance it should be extracted
    if(params.length == 1) {
      p = params[0];
    }
    func(p, callback);
  }
}

// Private part

var counter = 0;