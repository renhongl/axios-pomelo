

/**
 * Request default config
 */
const request = {
    url: '',
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: '',
};

/**
 * Response default config
 */
const response = {
    status: {
        code: '',
        message: '',
    },
    headers: {
    },
    data: '',
};


module.exports = {
    request,
    response,
};
