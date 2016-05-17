'use strict';

const formatNow = require('../src/utils.js').formatNow;
const logger = require("../src/logger.js");
const test = require('tape');
const fs = require('fs');
const util = require('util');

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

test("Log functions - when uninitailized", function (t) {
    t.plan(4);

    t.equal(false, logger.isInitialized(), "logger is not initialized");
    t.throws(function() { logger.info("test"); }, null, "logger must be initialized first");
    t.throws(function() { logger.warning("test"); }, null, "logger must be initialized first");
    t.throws(function() { logger.error("test"); }, null, "logger must be initialized first");
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

test("Log levels", function (t) {
    t.plan(6);
    
    genericTest(t, "info", "Info");
    genericTest(t, "warning", "Warning");
    genericTest(t, "error", "ERROR");
});

test("Logs ordering", function (t) {
    t.plan(6);
    
    logger.init("./ordering.log");
    for(let i = 0; i < 5; i++) {
        logger.info(`test${i}`);
    }
    logger.close();
    
    let traces = fs.readFileSync("./ordering.log", 'utf8').split("\n");
    // Ok, this is not right way to use the "length" property, but as we master entirely the array,
    // this is not a big deal.
    t.equal(true, traces.length === 6, "Check the number of lines");
    
    for(let i = 0; i < 5; i++) {
        t.equal(true, traces[i].lastIndexOf(`test${i}`) > 0, "Check the traces are correctly ordered");
    }
    
    fs.unlinkSync("./ordering.log");        
});

test("Logs level filtering", function (t) {
    t.plan(11);
    
    logger.init("./levels.log");
    logger.level = logger.LEVELS.Disabled;
    t.equal(true, logger.level === logger.LEVELS.Disabled, "set logger level works");

    // DISABLED, no change
    levelsTest(t, "info", false);

    logger.level = logger.LEVELS.Errors;
    levelsTest(t, "info", false, "ERRORS only, no change");
    levelsTest(t, "warning", false, "ERRORS only, no change");
    levelsTest(t, "error", true, "ERRORS only, change");

    logger.level = logger.LEVELS.Warnings;
    levelsTest(t, "info", false, "Warnings level, no change");
    levelsTest(t, "warning", true, "Warnings level change");
    levelsTest(t, "error", true, "Warnings level, change");

    logger.level = logger.LEVELS.All;
    levelsTest(t, "info", true, "All logged,  change");
    levelsTest(t, "warning", true, "All logged,  change");
    levelsTest(t, "error", true, "All logged,  change");

    logger.close();
    
    fs.unlinkSync("./levels.log");        
});

test("Output to console", function (t) {
    t.plan(2);
    
    logger.init("./console.log");
    logger.level = logger.LEVELS.All;

    t.pass("Easier to see with eyes than writing a complete test case");
    logger.info("visible info message");
    logger.warning("visible warning message");
    logger.error("visible error message");

    // No more console output
    t.pass("No more console output");
    logger.out2console = false;
    logger.info("invisible info message");
    logger.warning("invisible warning message");
    logger.error("invisible error message");

    logger.close();
    
    fs.unlinkSync("./console.log");        
});

function genericTest(t, type, toBeFound) {
    let now = formatNow();
    let f = `./${type}.log`
    t.doesNotThrow(function() { 
            logger.init(f);
            logger[type]("test");
            logger.close();
        }, null, "this should pass");
    let c = fs.readFileSync(f, 'utf8');
            
    // We remove the milliseconds in the checking because we're not sure the test is run in the same millisecond
    t.equal(true, c.lastIndexOf(toBeFound) !== -1, `${type} is found in the file`);
    
    // Delete the remaining log
    fs.unlinkSync(f);        
}

function levelsTest(t, type, shouldChange, msg) {
    // Get the file size before running the log function
    let size = fs.statSync("./levels.log").size;
    logger[type]("test");
    let newsize = fs.statSync("./levels.log").size;
    t.equal(!shouldChange, newsize === size, msg);    
}
//TODO: traces output to console
