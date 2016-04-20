'use strict';

const logger = require("../src/logger.js");
const test = require('tape');
const fs = require('fs');

test("Logger opening/closing", function (t) {
    t.plan(14);

    t.equal(true, typeof logger.isInitialized === 'function', "function 'isInitialized' must exist");
    t.equal(false, logger.isInitialized(), "logger is not initialized at first time");
    t.equal(true, typeof logger.init === 'function', "function 'init' must exist");
    t.throws(logger.init, null, "logger init doesn't accept null or empty");
    t.throws(function() { logger.init(null); }, null, "logger init doesn't accept null or empty");
    t.throws(function() { logger.init(3); }, null, "logger file path must be a string");
    t.throws(function() { logger.init("/titi/toto/tutu"); }, null, "logger file path must exist");
    t.throws(function() { logger.init("/should-not-work.log"); }, null, "logger file path must be writable");
    t.doesNotThrow(function() { logger.init("./should-work.log"); }, null, "this should pass");
    t.assert(logger.isInitialized(), "logger must be initialized");
    t.throws(function() { logger.init("./should-not-work.log"); }, null, "logger can be initialized only once");
    t.equal(true, typeof logger.close === 'function', "function 'close' must exist");
    t.doesNotThrow(function() { logger.close(); }, null, "this should pass");
    t.equal(false, logger.isInitialized(), "logger is not initialized after closing");
});

test("Log functions - basic testing", function (t) {
    t.plan(14);

    t.equal(true, typeof logger.info === 'function', "function 'info' must exist");
    t.equal(true, typeof logger.warning === 'function', "function 'warning' must exist");
    t.equal(true, typeof logger.error === 'function', "function 'error' must exist");

    t.doesNotThrow(function() { logger.init("./should-work.log"); }, null, "this should pass");
    t.throws(function() { logger.info(); }, null, "logger.info doesn't accept no input");
    t.throws(function() { logger.info(null); }, null, "logger.info doesn't accept null input");
    t.throws(function() { logger.info(""); }, null, "logger.info doesn't accept null input");
    t.throws(function() { logger.warning(); }, null, "logger.info doesn't accept no input");
    t.throws(function() { logger.warning(null); }, null, "logger.info doesn't accept null input");
    t.throws(function() { logger.warning(""); }, null, "logger.info doesn't accept empty input");
    t.throws(function() { logger.error(); }, null, "logger.info doesn't accept no input");
    t.throws(function() { logger.error(null); }, null, "logger.info doesn't accept null input");
    t.throws(function() { logger.error(""); }, null, "logger.info doesn't accept empty input");
    t.doesNotThrow(function() { logger.close(); }, null, "this should pass");
    // Delete the remaining log
    fs.unlinkSync("./should-work.log");    
});

test("Log info", function (t) {
    t.plan(1);
    
    let f = "./info.log"
    t.doesNotThrow(function() { write(f, "info"); }, null, "this should pass");
    let c = fs.readFileSync(f, 'utf8');
            
    // Delete the remaining log
    fs.unlinkSync(f);    
});

// Function which write to the log file and returns the log content
// Inputs:
// - log file path
// - Function to be called to log traces
function write(f, fn) {
    logger.init(f);
    logger[fn]("test");
    logger.close();
}

//TODO: info are well recorded
//TODO: level are correctly recorded
//TODO: logs are timely recorded
//TODO: logs are correctly ordered
//TODO: Enable/Disable/Level
//TODO: feature: trace level
//TODO: traces output to console
