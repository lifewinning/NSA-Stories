pez.lib.define('linq', function ($) {

    var Linq = function (arr) {
        var me = this;
        var list = arr;

        me.length = list.length;

        me.where = function (expr) {
            if (!expr) {
                return me;
            }
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (pez.match(item, expr)) {
                    newList.push(item);
                }
            }
            return new Linq(newList);
        };

        me.any = function (expr) {
            return me.where(expr).length;
        };

        me.average = function (prop) {
            return me.sum(prop) / me.length;
        };

        me.contains = function (item) {
            return $.inArray(item, list);
        };

        me.count = function () {
            return me.length;
        };

        me.distinct = function (prop) {
            var hash = {};
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var val = prop ? item[prop] : item;
                if (!hash[val]) {
                    newList.push(item);
                    hash[val] = true;
                }
            }
            return new Linq(newList);
        };

        me.at = function (i, defaultVal) {
            if (i >= 0 && list.length > i) {
                return list[i];
            } else {
                return defaultVal;
            }
        };

        me.except = function (expr) {
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (!pez.match(item, expr)) {
                    newList.push(item);
                }
            }
            return new Linq(newList);
        };

        me.first = function (expr) {
            return me.where(expr).at(0);
        };

        me.last = function (expr) {
            var newList = me.where(expr);
            return newList.at(newList.length - 1);
        };

        me.sum = function (prop) {
            var sum = 0;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var val = prop ? item[prop] : item;
                if (isNaN(val)) {
                    val = 0;
                }
                sum += val;
            }
            return sum;
        };

        me.max = function (prop) {
            var curMax = null;
            var curItem = null;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var val = prop ? item[prop] : item;
                if (!curMax || val > curMax) {
                    curMax = val;
                    curItem = item;
                }
            }
            return curItem;
        };

        me.min = function (prop) {
            var curMin = null;
            var curItem = null;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var val = prop ? item[prop] : item;
                if (!curMin || val < curMin) {
                    curMin = val;
                    curItem = item;
                }
            }
            return curItem;
        };

        me.reverse = function () {
            var newList = list.slice().reverse();
            return new Linq(newList);
        };

        me.select = function (prop) {
            var newList = [];
            var fn = prop || function () { return this; };
            if (typeof prop !== 'function') {
                fn = function () { return this[prop]; };
            }

            for (var i = 0; i < list.length; i++) {
                var item = $.extend({}, list[i]);
                var newItem = fn.apply(item, [i]) || item;
                newList.push(newItem);
            }
            return new Linq(newList);
        };

        me.sort = function (prop) {
            var newList = list.slice().sort(function (a, b) {
                var aVal = prop ? a[prop] : a;
                var bVal = prop ? b[prop] : b;
                if (typeof aVal === 'string') {
                    return aVal.localeCompare(bVal);
                } else {
                    return aVal > bVal;
                }
            });
            return new Linq(newList);
        };

        me.sortDesc = function (prop) {
            return me.sort(prop).reverse();
        };

        me.single = function (expr) {
            var newList = list.where(expr);
            if (newList.length != 1) {
                console.error('single() called but more or less than one result was found.');
                return null;
            }
            return newList.first();
        };

        me.skip = function (skip) {
            var newList = list.slice(skip);
            return new Linq(newList);
        };

        me.skipWhile = function (expr) {
            var newList = [];
            var doneSkipping = false;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                doneSkipping = doneSkipping || !pez.match(item, expr);
                if (doneSkipping) {
                    newList.push(item);
                }
            }
            return new Linq(newList);
        };

        me.take = function (take) {
            var newList = list.slice(0, take);
            return new Linq(newList);
        };

        me.takeWhile = function (expr) {
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (!pez.match(item, expr)) {
                    break;
                }
                newList.push(item);
            }
            return new Linq(newList);
        };
    };

    var linq = function (list) {
        return new Linq(list);
    };

    return {
        linq: linq
    };
});