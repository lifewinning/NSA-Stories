
pez.modules.define('nav', function ($, $el) {
    'use strict';

    $el.find('.hamburger').click(function () {
        $el.toggleClass('on');
    });
});