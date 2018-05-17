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
