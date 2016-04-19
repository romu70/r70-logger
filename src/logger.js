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
  // Remove all spaces
  let msg2 = msg.replace(/\s+/g, '');    
  if(msg2.length === 0)
    throw new TypeError("Logger.log: the msg can't be an empty string");

  fs.appendFileSync(fd, `${formatDateTime()} - ${level} - ${msg}\n`);
}

// Returns a string of now, but formatted for the log
function formatDateTime() {
  let now = new Date();
  let month = ("0" + now.getMonth()).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);
  let hours = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let s = ("0" + now.getSeconds()).slice(-2);
  let ms = ("00" + now.getMilliseconds()).slice(-3);
  return `${now.getFullYear()}-${month}-${day}-${hours}:${minutes}:${s}:${ms}`;
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
    fd = fs.openSync(logfile, 'a');      
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
  info: function(msg) {
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