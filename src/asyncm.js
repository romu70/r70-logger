'use strict';

const assert = require('assert');
const utils = require('./utils.js');

// Private stuff
// Meta callback object which handles the link to the real callback object
// see its description in the factory object here below
let metacallback = {
};

// Meta callback factory
let mfc = function() {
  // the object which needs to call an async function
  let caller;
  // async function to be called
  let func;
  // parameters to be given to the real call back
  let params;
  // instance of the real callback object, private
  let callback;
  
<<<<<<< HEAD:asyncm.js
  return Object.assign(Object.create(metacallback), {
    // Accessors
    // TODO: Find a more simple syntax to directly pass the members at object creation
    get caller() { return caller },
    set caller(value) { caller = value },
    get func() { return func; },
    set func(value) { func = value },
    get params() { return params; },
    set params(value) { params = value },
    get callback() { return callback; },
    set callback(value) { callback = value },
=======
  return Object.create(metacallback, {
    caller: {
      get: function () { return caller; },
      set: function (c) { caller = c },
    },
    func: {
      get: function () { return func; },
      set: function (f) { func = f; },
    },
    params: {
      get: function () { return params; },
      set: function (p) { params = p; },
    },
    callback: {
      get: function () { return callback; },
      set: function (rc) { callback = rc; },
    },
    toto() {
      console.log("TOTO");
    },
    
    titi: function() {
      console.log("titi");
    }
>>>>>>> e061d15a25af13db779c27c67fb74ea3d78deb7d:async-manager.js
  });
}

// Public interface, designed as a singleton, no need to run several instances

module.exports = {  
  
// Requirements:
// - being able to identify the caller and the callback when it's executed
// - users should write their async code as usual as much as possible


  //
  // asyncCall: Method to be used as a proxy to each asynchronous call
  // Parameters:
  //   func: the asynchronous function to be called
  //   params: the parameters to be passed to "func"
  //   callback: the callback function  
  // Returns: TBD
  
  asyncCall: function (caller, func, params, callback) {
    
    // inputs check
    //TODO: Check "params"...TBD  
    assert(utils.isFunction(func));
    assert(utils.isFunction(callback));

    // Create a new metacallback object to store those data
    let mc = mfc();
    mc.caller = caller;
    mc.func = func;
    mc.params = params;
    mc.callback = callback;

    // Add the meta callback object as a property to the callback function
    callback.prototype.parent = mc;
    console.log(callback === mc.callback);
    console.log(callback.prototype.parent === mc);
    
    let p = params;
    // If the array has only one element, there is a big chance it should be extracted
    if(params.length == 1) {
      p = params[0];
    }
    func(p, callback);
  }
}
