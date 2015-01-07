
pez.modules.define('paginator', function ($, $el) {
    'use strict';

    var $streamWrap = $('body').find('.ti-stream');
    var $stream = $streamWrap.find('.stream');

    $el.find('a').click(function () {
        $el.addClass('thinking');

        var href = $(this).attr('href');
        $.get(href, function (data) {
            var $page = $($.trim(data));
            var $excerpts = $page.find('.stream').children('.ti-excerpt');
            console.log($page.find('.stream').length);
            var $more = $page.find('.ti-paginator');
            $stream.append($excerpts);
            if ($excerpts.length && $more.length) {
                $el.find('a').attr('href', $more.find('a').attr('href'));
            } else {
                $el.hide();
                $streamWrap.addClass('no-more');
            }
            $el.removeClass('thinking');
            $(document.body).trigger("sticky_kit:recalc");

            setTimeout(function () {
                $(document.body).trigger("sticky_kit:recalc");
            }, 2000); //in case image or font loading gets funky
            //not ideal, obv

            //one more attempt
            $el.find('img').load(function () {
                $(document.body).trigger("sticky_kit:recalc");
            });
        });
        return false;
    });

    return {};
});