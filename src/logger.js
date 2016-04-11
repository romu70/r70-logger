'use strict';

const path = require('path');
const fs  = require('fs');

// private stuff here

// If true, this means the logger has already been initialized 
var initialized = false;

// Returns a single object, this is a singleton!
module.exports = {
  // Initializes the new logger
  // 
  // Inputs:
  // - logfile: the log file full logfile
  init: function (logfile) {

     //console.log(`logfile: ${typeof logfile}`);
    // console.log(`logfile type: ${typeof logfile}`);

    if(logfile === undefined || logfile === null)
      throw new TypeError("Logger: the logfile can't be null");
    if(typeof logfile !== "string")
      throw new TypeError("Logger: the logfile must be a string");

    // Check the log file folder exists
    let dir = path.dirname(logfile);
    fs.accessSync(dir, fs.F_OK);
    // Check the log file folder is writable
    dir += path.sep;
    fs.accessSync(dir, fs.W_OK);      
  },
  
  // getter of: initialized 
  get initialized() {
    return initialized;
  }
}