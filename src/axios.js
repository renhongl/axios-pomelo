
require("@babel/polyfill");
const utils = require('./utils');

const TYPES = ['get', 'post', 'options', 'put', 'delete'];

/**
 * The constructor of class Axios
 * @param {Object} config 
 */
function Axios(config) {
  const defaults = {
    method: 'get',
  };
  this.config = utils.merge(defaults, config);
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
Axios.prototype.request = async function (config) {
  if (!utils.isBrowser()) {
    return await this.http(config);
  } else {
    return await this.fetch(config);
  }
}

/**
 * For node environment
 */
Axios.prototype.http = async function(config) {
  const https = require('https');
  return new Promise(function(resolve, reject) {
    return https.get(config.url, function(res) {
      let data = '';
      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
  });
}

/**
 * For browser environment
 */
Axios.prototype.fetch = async function(config) {
  const res = await fetch(config.url, {...config});
  return res.json();
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


