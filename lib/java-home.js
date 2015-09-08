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
var co = require('co');
var _ = require('./helper');
var exec = require('./exec');

var JAVA_HOME = {};
var ERROR = {
  PATH_INVALID: '$JAVA_HOME path is invalid',
  PATH_NOTFOUND: '$JAVA_HOME is not found',
  PATH_NOTSET: '$JAVA_HOME not set'
};

JAVA_HOME.getPath = function(callback) {
  co(function *(ctx) {

    // try process.env.JAVA_HOME

    var javaHome = process.env.JAVA_HOME;

    if (javaHome) {

      if (fs.existsSync(javaHome)) {
        // resolve symbolic link
        javaHome = fs.realpathSync(javaHome);

        if (_.isExistedDir(javaHome)) {
          return callback(null, javaHome);
        } else {
          return callback(ERROR.PATH_INVALID);
        }
      } else {
        return callback(ERROR.PATH_INVALID);
      }
    }

    if (_.platform.isWindows) {
      return callback(ERROR.PATH_NOTSET);
    }

    // try $JAVA_HOME variables

    javaHome = yield exec('echo $JAVA_HOME');

    if (javaHome.trim()) {

      if (fs.existsSync(javaHome)) {
        // resolve symbolic link
        javaHome = fs.realpathSync(javaHome);

        if (_.isExistedDir(javaHome)) {
          return callback(null, javaHome);
        } else {
          return callback(ERROR.PATH_INVALID);
        }
      } else {
        return callback(ERROR.PATH_INVALID);
      }
    }

    // try /usr/libexec/java_home

    if (!_.platform.isOSX) {
      return callback(ERROR.PATH_NOTFOUND);
    }

    try {
      javaHome = yield exec('/usr/libexec/java_home');
      if (javaHome.trim()) {
        return callback(null, javaHome);
      }
    } catch (e) {
      return callback(ERROR.PATH_NOTFOUND);
    }
  })(this);
};

module.exports = JAVA_HOME;
