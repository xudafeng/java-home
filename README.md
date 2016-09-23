java-home
=========

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/java-home.svg?style=flat-square
[npm-url]: https://npmjs.org/package/java-home
[travis-image]: https://img.shields.io/travis/xudafeng/java-home.svg?style=flat-square
[travis-url]: https://travis-ci.org/xudafeng/java-home
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/java-home.svg?style=flat-square
[download-url]: https://npmjs.org/package/java-home

> detect `JAVA_HOME` path in any system

## Installment

```shell
$ npm i java-home --save
```

## Usage

```javascript
var co = require('co');
var JAVA_HOME = require('../lib/java-home');

JAVA_HOME.getPath(function(error, javaHome) {
  if (error) {
    throw error;
  }
  console.log(javaHome);
});
```

## License

The MIT License (MIT)

Copyright (c) 2015 xdf
