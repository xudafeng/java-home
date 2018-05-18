'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const _ = require('./helper');

const JAVA_HOME = {};
const ERROR = {
  PATH_INVALID: '$JAVA_HOME path is invalid',
  PATH_NOTFOUND: '$JAVA_HOME not found',
  PATH_NOTSET: '$JAVA_HOME is not set'
};

const checkJavaHome = javaHome => {
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
};

JAVA_HOME.getPath = function(callback) {

  const promise = new Promise((resolve, reject) => {
    // try process.env.JAVA_HOME
    let javaHome = process.env.JAVA_HOME;

    if (_.platform.isWindows) {
      if (!javaHome) {
        return reject(new Error(ERROR.PATH_NOTSET));
      } else {
        const javafile = path.join(javaHome, 'bin', 'java.exe');

        if (!_.isExistedFile(javafile)) {
          return reject(new Error(ERROR.PATH_INVALID));
        }
      }
      return resolve(javaHome);
    }
    checkJavaHome(javaHome)
      .then(resolve)
      .catch(err => {
        if (err) {
          return reject(err);
        } else {
          // try $JAVA_HOME variables
          const proc = child_process.execSync('echo $JAVA_HOME');
          return proc.toString().trim();
        }
      })
      .then(std => {
        const stdout = std[0];
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
          const proc = child_process.execSync('/usr/libexec/java_home');
          return proc.toString().trim();
        }
      })
      .then(std => {
        const stdout = std[0];
        if (stdout.trim()) {
          return reject(new Error(ERROR.PATH_NOTSET));
        } else {
          return reject(new Error(ERROR.PATH_NOTFOUND));
        }
      })
      .catch(e => {
        console.log(e);
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
