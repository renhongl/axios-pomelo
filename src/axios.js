
// require("@babel/polyfill");
const utils = require('./utils');
const request = require('./request');
const Interceptor = require('./interceptor');

const TYPES = ['get', 'post', 'options', 'put', 'delete'];

/**
 * The constructor of class Axios
 * @param {Object} config 
 */
function Axios(config) {
  this.config = config;
  this.interceptors = {
    request: new Interceptor(),
    response: new Interceptor(),
  };
  let _this = this;
  return new Proxy(this.request, {
    apply(target, thisArg, args) {
      return _this.request(args[0]);
    },
    get(target, name) {
      return _this[name.toLowerCase()];
    }
  });
}

/**
 * All different request function will come to here
 */
Axios.prototype.request = function(config) {
  return request.call(this, config);
};


Axios.prototype.create = function(config) {
  return new Axios()(config);
}

/**
 * For each to create get, post request
 */
utils.forEach(TYPES, function(type) {
  Axios.prototype[type] = function (...args) {
    if (typeof args[0] === 'string') {
      let config = args[1] || {};
      config.url = args[0];
      config.method = type;
      return this.request(config);
    }
  }
});

const axios = new Axios();

module.exports = axios;


