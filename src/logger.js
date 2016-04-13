'use strict';

const path = require('path');
const fs  = require('fs');

// private stuff here

// File descriptor of the log file. If it's not null, that means the log has been initialized. 
var fd = null;

// Returns a single object, this is a singleton!
module.exports = {
  // Initializes the new logger
  // 
  // Inputs:
  // - logfile: the log file full logfile
  init: function (logfile) {

    if(fd !== null)
      throw new Error("Logger is already initialized");
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
    
    // At this point, all is ok, we should be able to open the log file.
    fd = fs.openSync(logfile, 'w');      
  },
  
  // Close this log
  close: function() {
    fs.closeSync(fd);
    fd = null;
  },
  
  isInitialized: function() {
    return fd !== null;
  },
  
  get fd() {
    return fd;
  }
}