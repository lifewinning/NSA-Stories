pez.extend(function ($, pez) {
    'use strict';

    pez.matching = {
        wildcards: {},
        addWildcard: function (operator, fn) {
            if (pez.matching._wildcards[operation]) {
                return console.error('Wildcard operator already exists: ' + operator);
            }
            pez.matching._wildcards[operation] = fn;
        }
    };

    var wildcards = pez.matching.wildcards;
    wildcards['$gt'] = function (a, b) { return a > b; };
    wildcards['$gte'] = function (a, b) { return a >= b; };
    wildcards['$in'] = function (a, b) { return $.inArray(a, b) >= 0; };
    wildcards['$lt'] = function (a, b) { return a < b; };
    wildcards['$lte'] = function (a, b) { return a <= b; };
    wildcards['$ne'] = function (a, b) { return a != b; };
    wildcards['$nin'] = function (a, b) { return $.inArray(a, b) === -1; };
    wildcards['$exists'] = function (a, b) { return a; };
    wildcards['$rx'] = function (a, b) { return b.test(a); };
    wildcards['$='] = function (a, b) {
        return a.indexOf(b, a.length - b.length) !== -1;
    };
    wildcards['^='] = function (a, b) {
        return a.indexOf(b) === 0;
    };
    wildcards['*='] = function (a, b) {
        return a.indexOf(b) !== -1;
    };
    wildcards['$and'] = function (a, b) {
        if (!b) {
            console.warn('$and operator used with no evaluator.');
            return false;
        }
        var match = true;
        for (var i = 0; i < b.length; i++) {
            if (!pez.match(a, b[i])) {
                return false;
            }
        }
        return true;
    };
    wildcards['$or'] = function (a, b) {
        if (!b) {
            console.warn('$or operator used with no evaluator.');
            return false;
        }
        for (var i = 0; i < b.length; i++) {
            if (pez.match(a, b[i])) {
                return true;
            }
        }
        return false;
    };

    /**
    * Evaluates a single property to see if it matches a pattern.
    * @param {object} a
    * @param {object} the pattern
    * @return true or false
    */
    pez.matching.checkProperty = function (a, b) {
        if (a == b) {
            return true;
        }
        else if (typeof b === 'function') {
            return b.apply(a);
        }
        else if (typeof b === 'object') {
            for (var i in b) {
                if (b.hasOwnProperty(i)) {
                    var wildcard = wildcards[i];
                    if ((!wildcard || !wildcard(a, b[i])) && !pez.match(a[i], b[i])) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    };

    /**
    * Evaluates an object to see if it matches a pattern.
    * @param {object} a
    * @param {object} the pattern
    * @return true or false
    */
    pez.match = function (o, pattern) {
        if (!(typeof pattern === 'object') && !(typeof pattern === 'function')) {
            return o == pattern;
        }
        if (!pattern || !o) {
            return false;
        }
        for (var i in pattern) {
            if (pattern.hasOwnProperty(i)) {
                if (!pez.matching.checkProperty(o[i], pattern[i])) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
    * Evaluates a jQuery object to see if it matches a pattern.
    * @param {jQuery} $o
    * @param {object} pattern
    */
    pez.$match = function ($o, pattern) {
        return pez.match($o.data(), pattern);
    };

    /**
    * Specifies a set of functions that should be fired when the pez script tag matches the evaluator.
    * @param {object} evaluator 
    * @param {object} o Page features
    */
    pez.page = function (o) {
        var context = pez.bind();
        if (o.match && (o.match === 'any'
        || (typeof o.match === 'string' && o.match == $('head #pez-js').attr('data-page'))
        || pez.$match($('body'), o.match))) {
            if (o.load) {
                o.load.apply(context, [$]);
            }
            if (o.pageLoad) {
                $(function () {
                    o.pageLoad.apply(context, [$]);
                });
            }
        }
    };
});