'use strict';

const formatNow = require('./utils.js').formatNow;
const path = require('path');
const fs  = require('fs');

// This is a pretty simple logger object which, as intended, logs messages it receives in a text file.
// Order and timing are important here, that's why this logger only uses NodeJs "sync" functions.

var LEVELS = {
    Disabled: 0,   // No trace recorded in the log
    Errors: 1,     // Only the errors are recorded
    Warnings: 2,   // Only the errors and warnings are recorded
    All: 3         // All level traces recorded
  };

// File descriptor of the log file. If it's not null, that means the log has been initialized. 
var fd = null;

// The logger level
var level = LEVELS.All;

// Boolean to specify if traces must also be sent to the console output. If true, traces are sent
// to the console regarding the specified level value
// True by default
var out2console = true;

// Write function which actually writes the message into the log file
function log(msglevel, msg) {
  
  if(msg === undefined || msg === null)
    throw new TypeError("Logger.log: the msg can't be null");
  // Remove all spaces
  let msg2 = msg.replace(/\s+/g, '');    
  if(msg2.length === 0)
    throw new TypeError("Logger.log: the msg can't be an empty string");

  fs.appendFileSync(fd, `${formatNow()} - ${msglevel} - ${msg}\n`);
}

// Returns a single object, this is a singleton!
module.exports = {
  
  LEVELS: LEVELS,
  
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
    fd = fs.openSync(logfile, 'a');      
  },
  
  // Level accessors
  set level(value) { level = value; },
  get level() { return level; },
  
  // console accessors
  set console(value) { console = value; },
  get console() { return console; },
  
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
  info: function(msg) {
    if (level > LEVELS.Warnings)
      log("Info", msg);
  },
  
  // Log the specified warning to the file
  warning: function(msg) {
    if (level > LEVELS.Errors)
      log("Warning", msg);
  },
  
  // Log the specified error to the file
  error: function(msg) {
    if (level > LEVELS.Disabled)
      log("ERROR", msg);    
  },
}