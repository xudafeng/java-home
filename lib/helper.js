/* ================================================================
 * java-home by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Aug 04 2015 14:11:13 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var fs = require('fs');
var os = require('os');
var _ = require('lodash');

// get system platform
_.platform = (function() {
  var platform = os.platform();

  return {
    isWindows: platform.indexOf('win') === 0 || platform === 'cygwin',
    isLinux: platform === 'linux' || platform === 'freebsd',
    isOSX: platform === 'darwin'
  };
})();

_.isExistedFile = function(p){
  p = p.replace(/(\?|#).*$/, '');
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

_.isExistedDir = function(p){
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

module.exports = _;
