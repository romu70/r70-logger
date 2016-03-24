const fs = require('fs');
const am = require('./async-manager.js');

function trace(){
  console.log("a trace");
}

am.asyncCall(trace, null, null);