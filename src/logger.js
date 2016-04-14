'use strict';

const path = require('path');
const fs  = require('fs');

// This is a pretty simple logger object which, as intended, logs messages it receives in a text file.
// Order and timing are important here, that's why this logger only uses NodeJs "sync" functions.

// File descriptor of the log file. If it's not null, that means the log has been initialized. 
var fd = null;

// Write function which actually writes the message into the log file
function log(level, msg) {
  if(msg === undefined || msg === null)
    throw new TypeError("Logger.log: the msg can't be null");
    

}

// Returns a string of now, but formatted for the log
function formatDateTime() {
  let now = Date.now();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
}

// Returns a single object, this is a singleton!
module.exports = {
  // Initializes the new logger
  // 
  // Inputs:
  // - logfile: the log file full logfile
  init: function (logfile) {

    if(fd !== null)
      throw new Error("Logger.init is already initialized");
    if(logfile === undefined || logfile === null)
      throw new TypeError("Logger.init: the logfile can't be null");
    if(typeof logfile !== "string")
      throw new TypeError("Logger.init: the logfile must be a string");

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
  
  // Returns true if the log file has been already opened.
  isInitialized: function() {
    return fd !== null;
  },
  
  // Log the specified message to the file
  message: function(msg) {
    log("Info", msg);
  },
  
  // Log the specified warning to the file
  warning: function(msg) {
    log("Warning", msg);
  },
  
  // Log the specified error to the file
  error: function(msg) {
    log("ERROR", msg);    
  },
}