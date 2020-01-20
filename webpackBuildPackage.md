



## Jest not working

* Change library export from es6 module to commonjs
* Change `import axios from './axios'` to `const axios = require('./axios');` in test file


## Can not import axios after install this package

* Mark webpack output config to `libraryTarget: 'umd'`, this is for all module system



## Got error when use async function
* Install package `@babel/polyfill`
* Import it `require('@babel/polyfill)`


## Can not do test on browser and node.js environment and build npm package at the same time

* Seperate the webpack config, use different entry point
* Production env just build lib from core function
* Development env just run test code, import lib inside test file