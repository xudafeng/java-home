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

const xutil = require('xutil');
const childProcess = require('child_process');

var _ = xutil.merge({}, xutil);

_.exec = function(cmd, opts) {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, opts, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      resolve([stdout, stderr]);
    });
  });
};

module.exports = _;
