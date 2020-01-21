
const axios = require('./axios');


axios.interceptors.request.use(function(config) {
    config.headers.token = 'token00001';
    return config;
});

axios.interceptors.request.use(function(config) {
    config.headers.aaa = 'aaabbb';
    return config;
});

axios.interceptors.response.use(function(config) {
    config.headers.test = 'aaabbb';
    return config;
});

axios({
    url: '/test.json',
    method: 'GET',
    headers: {
        a: 'b',
        mode: 'no-cors',
    },
    data: JSON.stringify({"page": 1, "maxResult": 10})
}).then(res => {
    console.log(res);
});

axios.create({
    url: '/test.json',
    method: 'GET',
    headers: {
        a: 'b',
        mode: 'no-cors',
    },
    data: JSON.stringify({"page": 1, "maxResult": 10})
}).then(res => {
    console.log(res);
});