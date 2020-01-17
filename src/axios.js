
require("@babel/polyfill");


const TYPES = ['get', 'post'];

function Axios(config) {
  this.config = config;
  let _this = this;
  return new Proxy(this.request, {
    apply(target, thisArg, args) {
      return _this.request(args[0]);
    },
    get(target, name) {
      return _this[name];
    }
  });
}

Axios.prototype.request = async function (config) {
  console.log(config);
  const res = await fetch(config.url, {...config});
  return res.json();
}

TYPES.forEach(type => {
  Axios.prototype[type] = function (...args) {
    if (typeof args[0] === 'string') {
      let config = args[1] || {};
      config.url = args[0];
      return this.request(config);
    }
  }
});

const axios = new Axios();

module.exports = axios;


