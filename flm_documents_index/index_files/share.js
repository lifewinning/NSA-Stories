
pez.modules.define('share', function ($, $el) {
    'use strict';

    //social links
    $el.find('li a:not(.copy):not(.mail):not(.print)').click(function () {
        var $link = $(this);
        var $ul = $link.closest('ul');
        var data = $link.data();
        var href = $link.attr('href');
        var target = $link.attr('target') || '_social';
        var w = data.width || 500;
        var h = data.height || 150;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);

        window.open(href, target, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        return false;
    });
    $el.find('li a.copy').click(function () {
        var $link = $(this);
        var href = $link.attr('href');
        window.prompt('Copy to clipboard: Ctrl+C, Enter', href);
        return false;
    });
    $el.find('li a.print').click(function () {
        if (window.print) {
            window.print();
        }
        return false;
    });

    $el.find('li').click(function (e) {
        var $li = $(this);
        if ($(e.target).is('a')) {
            return true;
        } else {
            $li.find('a').click();
        }
    });

    return {};
});