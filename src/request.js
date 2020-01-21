

const utils = require('./utils');
const defaults = require('./defaults');

/**
 * For node environment
 * @param {Object} config 
 */
async function requestForNode(config) {
    const https = require('https');
    return new Promise(function (resolve, reject) {
        return https.get(config.url, function (res) {
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
 * @param {Object} config 
 */
async function requestForBrowser(config) {
    let self = this;
    return new Promise(function(resolve, reject) {
        let options = transformRequest(config, self.interceptors.request.list);

        const client = new XMLHttpRequest();
        client.onreadystatechange = function() {
            if (client.readyState === 4 && client.status === 200) {
                resolve(transformResponse(client, self.interceptors.response.list));
            }
        }
        client.open(options.method, options.url, true);

        utils.forEach(options.headers, function(val, key) {
            client.setRequestHeader(key, val);
        });

        client.send(options.data);

        client.addEventListener('error', function(e) {
            console.log('Unknown error');
        });
    });
}

/**
 * TODO add different response type
 * now only support json
 * @param {Object} client 
 */
function transformResponse(client, list) {
    let response = utils.merge(defaults.response);
    utils.forEach(list, function(fn) {
        response = fn(response);
    });
    return {
        ...defaults.response,
        status: {
            code: client.status,
            message: client.statusText,
        },
        data: JSON.parse(client.response),
    };
}

/**
 * Merge input config to default config
 * @param {Object} config 
 */
function transformRequest(config, list) {
    let headers = defaults.request.headers;
    headers = utils.merge(headers, config.headers);
    let options = utils.merge(defaults.request, config);
    options.headers = headers;
    utils.forEach(list, function(fn) {
        options = fn(options);
    });
    return options;
}

/**
 * Request function for control all request
 * @param {Object} config 
 */
async function request(config) {
    if (!utils.isBrowser()) {
        return await requestForNode.call(this, config);
    } else {
        return await requestForBrowser.call(this, config);
    }
}

module.exports = request;

