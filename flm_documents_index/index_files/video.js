
pez.modules.define('video', function ($, $el) {
    'use strict';

    var $window = $(window);

    function flush() {
        var rWidth = $el.data().width;
        var rHeight = $el.data().height;
        var ratio = rHeight / rWidth;
        var width = $el.width();
        var height = width * ratio;
        $el.find('iframe').css({
            'width': width,
            'height': height,
            'minWidth': 0,
            'minHeight': 0
        });
    }

    flush();
    $window.resize(flush);

    return {};
});