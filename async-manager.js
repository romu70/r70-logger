'use strict';

const assert = require('assert');

// Public interface

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

  }
}

// Private part

var counter = 0;