pez.lib.define('strings', function ($) {

    var strings = {};

    strings.format = function (v) {
        v = v.toString();
        args = Array.prototype.slice.call(arguments, 1);
        if (!args.length) {
            return v;
        }
        var argType = typeof args[0];
        if (argType !== 'string' && argType !== 'number') {
            args = args[0];
        }
        for (arg in args) {
            v = v.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
        }
        return v;
    };

    return strings;
});