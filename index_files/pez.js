
(function ($, pez) {
    'use strict';

    if (pez) {
        return console.error('window.pez already defined.');
    }

    pez = window.pez = {};

    /**
    *Extend pez
    */
    pez.extend = function (fn) {
        fn($, pez);
    };

    /**
    * Adds listen() and did() to any object. 
    * @param {object} o
    * @param {object} l event names and listeners
    * @return {object} bindable version of o
    */
    pez.bind = function (o, l) {
        o = o || {};
        if (o.__listenFor) {
            return o;
        }
        $.extend(o, {
            __listenFor: {}
        });
        $.extend(o, {
            listen: function () {
                if (arguments.length < 2) {
                    return console.error('You must pass an event name and at least one listener function.');
                }
                var event = arguments[0];
                var listeners = o.__listenFor[event] || [];
                for (var i = 1; i < arguments.length; i++) {
                    var fn = arguments[i];
                    if (fn && typeof (fn) === 'function') {
                        listeners.push(fn);
                    } else {
                        console.warn('Non-function passed as listener: ');
                        console.warn(fn);
                    }
                }
                o.__listenFor[event] = listeners;
            },
            did: function () {
                var event = arguments[0];
                var params = Array.prototype.slice.call(arguments, 1);
                var listeners = o.__listenFor[event];
                if (listeners) {
                    for (var j = 0; j < listeners.length; j++) {
                        listeners[j].apply(o, params);
                    }
                }
            }
        });
        if (l) {
            for (var i in l) {
                if (l.hasOwnProperty(i)) {
                    o.listen(i, l[i]);
                }
            }
        }
        return o;
    };

    /**
    * Create a library of loadable js code blocks. 
    */
    pez.Library = function () {
        var library = this;
        var _books = {};
        var _inits = {};
        var _params = [];
        var _context = pez.bind({
            library: library
        });

        library.exists = function (book) {
            return _inits[book] != null;
        };

        library.isLoaded = function (book) {
            return _books[book] != null;
        };

        library.define = function (book, fn) {
            if (library.exists(book)) {
                return console.error('Book already defined: ' + book + '.');
            }
            _inits[book] = fn;
        };

        library.load = function (book) {
            var params = Array.prototype.slice.call(arguments, 1);
            _books[book] = _inits[book].apply(_context, $.merge(_params.slice(), params));
            return _books[book];
        };

        library.require = function (book) {
            if (library.isLoaded(book)) {
                return _books[book];
            }
            if (library.exists(book)) {
                return library.load.apply(null, arguments);
            } else {
                return console.error('Book not defined: ' + book + '.');
            }
        };

        library.inject = function () {
            if (!arguments.length) {
                console.warn('No injected parameters passed to library.inject.');
                _params = [];
                return;
            }
            _params = Array.prototype.slice.call(arguments, 0);
        }
    };

    /**
    * Library - pez.lib
    */
    pez.lib = new pez.Library();
    pez.lib.inject($);

})(jQuery, window.pez);