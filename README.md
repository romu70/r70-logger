# Simple logger

This is a simple logger module, written in Js. It's intended to become a NPM module as quick as possible. Of course, NPM is probably full of logger modules. This one is mainly an educative project for me, I don't have a Js background.

It is developed following the TDD principles, the tests case are made with Tape.

## Usage

First, you need to add the module to your project:
```
npm install simple-logger --save
```

Then, to use it in your code:

```
const logger = require("simple-logger.js");

// Logger is implemented as a singleton, no new, no factory, just use the object you've got
logger.init("your-log-file-path");
logger.level = logger.LEVELS.Warnings; // Or keep the All default value

logger.info("message to be logged"); // Or warning or error methods depending on the level you want

// Best to properly close the file description at the end
logger.close();
```