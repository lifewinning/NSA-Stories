
pez.modules.define('search', function ($, $el) {
    'use strict';

    $el.submit(function () {
        if ($el.hasClass('form-search--open')) {
            //submit!
        } else {
            $el.addClass('form-search--open');
            $el.find('input').focus();
            $('html,body').bind('click.formsearch', function (e) {
                if (!$(e.target).closest('.form-search').length) {
                    $el.removeClass('form-search--open');
                    $('html,body').unbind('click.formsearch');
                }
            });
            return false;
        }
    });
});