'use strict';

const test = require('tape');
const fs = require('fs');
const path = require('path');
const logger = require("../src/logger.js");

//TODO: if correct input, the logger must be initialized
//TODO: if initialized, a second init call must raise an exception

test("Logger initialization", function (t) {
    t.plan(6);

    t.equal(false, logger.initialized, "logger is not initialized at first time");
    t.throws(logger.init, null, "logger init doesn't accept null or empty");
    t.throws(function() { logger.init(null); }, null, "logger init doesn't accept null or empty");
    t.throws(function() { logger.init(3); }, null, "logger file path must be a string");
    t.throws(function() { logger.init("/titi/toto/tutu"); }, null, "logger file path must exist");
    t.throws(function() { logger.init("/should-not-work.log"); }, null, "logger file path must be writable");
 
//     // Check the log file folder exists
//     let dir = path.dirname("./toto.log");
//     fs.accessSync(dir, fs.F_OK);
//     // Check the log file folder is writable
//     dir += path.sep;
//     fs.accessSync(dir, fs.W_OK);      
// 
//     fs.writeFile("./toto.log", 'Hello Node.js', (err) => {
//       if (err) throw err;
//       console.log('It\'s saved!');
//     });
//     t.equal(typeof Date.now, 'function');
//     var start = Date.now();
// 
//     setTimeout(function () {
//         t.equal(Date.now() - start, 100);
//     }, 100);
});