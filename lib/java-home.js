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
var _ = require('./helper');

var JAVA_HOME = {};
var ERROR = {
  PATH_INVALID: '$JAVA_HOME path is invalid',
  PATH_NOTFOUND: '$JAVA_HOME not found',
  PATH_NOTSET: '$JAVA_HOME is not set'
};

function checkJavaHome(javaHome) {
  return new Promise((resolve, reject) => {
    if (!javaHome || typeof javaHome !== 'string') {
      return reject(new Error(ERROR.PATH_INVALID));
    }

    fs.access(javaHome, err => {
      if (err) {
        return reject(new Error(ERROR.PATH_INVALID));
      }

      fs.realpath(javaHome, (err, resolvedPath) => {
        if (err) {
          return reject(new Error(ERROR.PATH_INVALID));
        }
        javaHome = resolvedPath;
        fs.stat(javaHome, (err, fsStat) => {
          if (err || !fsStat.isDirectory()) {
            return reject(new Error(ERROR.PATH_INVALID));
          }
          resolve(javaHome);
        });
      });
    });
  });
}

JAVA_HOME.getPath = function(callback) {

  var promise = new Promise((resolve, reject) => {
    // try process.env.JAVA_HOME
    var javaHome = process.env.JAVA_HOME;
    checkJavaHome(javaHome)
      .then(resolve)
      .catch(err => {
        if (err && _.platform.isWindows) {
          return reject(err);
        } else {
          // try $JAVA_HOME variables
          return _.exec('echo $JAVA_HOME');
        }
      })
      .then(std => {
        var stdout = std[0];
        if (stdout.trim()) {
          javaHome = stdout;
          return checkJavaHome(javaHome);
        } else {
          throw new Error(ERROR.PATH_NOTFOUND);
        }
      })
      .then(resolve)
      .catch(err => {
        if (err && !_.platform.isOSX) {
          return reject(err);
        } else {
          // try /usr/libexec/java_home
          return _.exec('/usr/libexec/java_home');
        }
      })
      .then(std => {
        var stdout = std[0];
        if (stdout.trim()) {
          return reject(new Error(ERROR.PATH_NOTSET));
        } else {
          return reject(new Error(ERROR.PATH_NOTFOUND));
        }
      })
      .catch(e => {
        // ignored
      });
  });

  if (typeof callback === 'function') {
    return promise.then(
      res => callback(null, res),
      err => callback(err)
    );
  }
  return promise;
};

module.exports = JAVA_HOME;
