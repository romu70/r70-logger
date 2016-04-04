'use strict';

const fs = require('fs');
const am = require('./asyncm.js');

let path = "/home/rtisserand/Music/Eric Clapton";
//let path = "/home/romu/Musique";

fs.readdir(path, function(err, files) {
  console.log(files);
})

am.asyncCall(this, fs.readdir, [path], function(err, files) {
  console.log(files);
  

})