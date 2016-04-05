'use strict';

// const assert = require('assert');
// const utils = require('./utils.js');

// private stuff here

// If true, this means the logger has already been initialized 
var initialized = false;

// Returns a single object, this is a singleton!
module.exports = {
  // Initializes the new logger
  // 
  // Inputs:
  // - path: the log file full path
  init: function (path) {
    if(path === undefined || path === null)
      throw new TypeError("Logger: the path can't be null");
  },
  
  // getter of: initialized 
  get initialized() {
    return initialized;
  }
}