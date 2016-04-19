/* ================================================================
 * java-home by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Aug 04 2015 14:11:13 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2013 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var javaHome = require('..');

describe('test', function(){
  it('getPath should be a promise', function(done) {
    javaHome.getPath().then(javaHomePath => {
      console.log(javaHomePath);
      done();
    }, err => {
      console.log(err);
      done();
    });
  });

  it('getPath should accept callback', function(done) {
    javaHome.getPath((err, javaHomePath) => {
      if (err) {
        console.log(err);
        done();
      } else {
        console.log(javaHomePath);
        done();
      }
    });
  });
});
