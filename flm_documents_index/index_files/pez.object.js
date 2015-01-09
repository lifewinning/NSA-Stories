pez.lib.define('object', function ($) {

    var clone = function () {
        var obj = {};
        var fn = function () { };

        if (arguments.length > 1) {
            obj = arguments[0];
            fn = arguments[1] || fn;
        }
        if (arguments.length == 1) {
            if (typeof arguments[0] === 'function') {
                fn = arguments[0] || fn;
            } else {
                obj = arguments[0];
            }
        }

        pez.bind(obj);
        fn.apply(obj);

        obj.clone = function (fn) {
            return clone($.extend(true, {}, obj), fn);
        };
        return obj;
    };

    return {
        clone: clone
    };
});