

const toString = Object.prototype.toString;


function isNumber(val) {
    return typeof val === 'number';
}

function isString(val) {
    return typeof val === 'string';
}

function isBoolean(val) {
    return typeof val === 'boolean';
}

function isArray(val) {
    return toString.call(val) === '[object Array]';
}

function isObject(val) {
    return toString.call(val) === '[object Object]';
}

function isUndefined(val) {
    return typeof val === 'undefined';
}

function isNull(val) {
    return toString.call(val) === '[object Null]';
}

function isFile(val) {
    return toString.call(val) === '[object File]';
}

function isBlob(val) {
    return toString.call(val) === '[object Blob]';
}

function isDate(val) {
    return toString.call(val) === '[object Date]';
}

function isBrowser() {
    return toString.call(global) === '[object Window]';
}

function merge(obj /**, obj1, obj2, obj3 */) {
    let result = [];
    forEach(arguments, function(obj) {
        forEach(obj, function(val, key) {
            result[key] = val;
        });
    });
    return result;
}

function trim(str) {
    return str.replace(/^\s*|\s$/, '');
}

function forEach(obj, fn) {
    if (isNull(obj) || isUndefined(obj)) {
        return;
    }
    if (typeof obj !== 'object' && !isArray(obj)) {
        obj = [obj];
    }
    if (isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        } 
    } else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

module.exports = {
    isNumber,
    isString,
    isBoolean,
    isUndefined,
    isNull,
    isArray,
    isObject,
    isFile,
    isDate,
    isBlob,
    forEach,
    merge,
    trim,
    isBrowser,
};











