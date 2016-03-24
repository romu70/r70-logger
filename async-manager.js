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
  
  asyncCall: function (func, params, callback) {
    
    // inputs check
    //TODO: Check "func" is a function
    //TODO: Check "callback"" is a function
    //TODO: Check "params"...TBD  
    assert(utils.isFunction(func));
  }
}

// Private part

var counter = 0;