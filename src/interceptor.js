
/**
 * Interceptor for add more config for request and response
 */
function Interceptor() {
    this.list = [];
}

Interceptor.prototype.use = function(fn) {
    this.list.push(fn);
}

Interceptor.prototype.list = function() {
    return this.list;
}

module.exports = Interceptor;