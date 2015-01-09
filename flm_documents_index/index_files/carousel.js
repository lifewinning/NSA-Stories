
pez.modules.define('carousel', function ($, $el) {
    'use strict';

    var $selected = $el.find('.selected');
    var $lis = $el.find('ul.photos li');
    var liWidth = $lis.first().width() + 2;
    var $ul = $lis.parent();
    var currentIndex = 0;

    function centerEl(index, $el) {
        var $scroller = $el.closest('.unselected');
        var y = ($el.offset().left - $scroller.offset().left) + $scroller.scrollLeft() - 6;
        y = y - (liWidth * 3);
        $scroller.stop().animate({ scrollLeft: y }, 'slow');
    }

    function switchImg(img, caption, captionSize, credit) {
        $selected.css('background-image', img);
        $selected.find('p').remove();
        if (caption) {
            $('<p />').addClass('caption').html(caption)
                .css('font-size', captionSize || '14px')
                .appendTo($selected);
        }
        if (credit) {
            $('<p />').addClass('credit').text(credit).appendTo($selected);
        }
    }

    function show(i) {
        if (i < 0) {
            i = $lis.length - 1;
        }
        else if (i > $lis.length - 1) {
            i = 0;
        }
        currentIndex = i;
        var $li = $($lis.get(i));
        var img = $li.find('a').css('background-image');
        var $caption = $li.find('p.caption');
        var caption = $caption.html();
        var captionSize = $caption.css('font-size');
        var credit = $li.find('p.credit').text();

        switchImg(img, caption, captionSize, credit);
        $lis.removeClass('on');
        $li.addClass('on');
        centerEl(i, $li);

        //determine ul width
        var ulWidth = (($lis.first().width() + 2) * $lis.length) + 100;
        $ul.width(ulWidth);
    }

    $lis.find('a').click(function () {
        show($(this).parent().index());
        return false;
    });

    $el.find('.prev').click(function () {
        show(currentIndex - 1);
        return false;
    });

    $el.find('.next').click(function () {
        show(currentIndex + 1);
        return false;
    });

    show(0);
});