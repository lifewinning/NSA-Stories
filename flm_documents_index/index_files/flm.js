(function ($) {

    moment.locale('en', {
        calendar: {
            lastDay: '[Yesterday at] LT',
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            lastWeek: 'dddd [at] LT',
            nextWeek: 'dddd [at] LT',
            sameElse: 'L'
        }
    });

    $(function () {

        // is a comment anchor clicked?
        var $setup_comment_clicks = function () {
            $("div.comment-metadata > a").click(function (event) {
                window.location.hash = this.hash;
                $(document.body).animate({
                    'scrollTop': $($(this)).offset().top - 65
                }, 500);
                event.preventDefault();
            })
        };

        var $ajaxify_comment_form = function () {
            // Get the comment form
            var commentform = $('#fl_comment_form');
            // Add a Comment Status message
            commentform.prepend('<div id="comment-status" ></div>');
            // Defining the Status message element
            var statusdiv = $('#comment-status');
            commentform.submit(function () {

                // Serialize and store form data
                var formdata = commentform.serialize();
                //Add a status message
                statusdiv.html('<p>Processing...</p>');
                //Extract action URL from commentform
                var formurl = commentform.attr('action');
                //Post Form with data
                $.ajax({
                    type: 'post',
                    url: formurl,
                    data: formdata,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        statusdiv.html('<h2 style="color: red" class="ajax-error">There was a problem with your comment: please be sure you have completed all fields and try again.</h2>');
                    },
                    success: function (data, textStatus) {
                        statusdiv.html('<h2 class="ajax-success" style="color: green">Thanks for your comment. Please be aware that many comments are held for moderation; your comment might not appear immediately.</h2>');
                        commentform.find('textarea[name=comment]').val('');
                    }
                });
                return false;
            });
        }

        $ajaxify_comment_form();

        // prettify timestamps
        $(".fltimestamp").each(function (i, e) {
            var $timestamp = $(e).data('timestamp');
            var $delta = moment().unix() - $timestamp;
            var $display_time;

            var $mouse_time = moment.unix($timestamp).format('L LT');

            if ($delta < 60 * 60) {
                $display_time = moment.unix($timestamp).fromNow();
            } else {
                $display_time = moment.unix($timestamp).calendar();
            }

            $(e).html($display_time);
            $(e).hoverIntent(
        function () {
            $(this).html($mouse_time);
        },
        function () {
            $(this).html($display_time);
        }
      );
        });

        function load_and_scroll($scrollto) {
            $.ajax("?comments=only")
        .done(function (data) {
            var $recommended = $('#comments').find('.ti-recommended');

            $('#comments').html(data).append($recommended);
            $(document.body).animate({
                'scrollTop': $($scrollto).offset().top - 60
            }, 700);
            $ajaxify_comment_form();
            $setup_comment_clicks();
        })
        .fail(function (data) {
            console.log(data);
            $("#more-comment-link").html("Sorry, comment loading failed.");
        });
        }

        var $make_comment_click_handler = function ($scrollto) {
            return function (event) {
                $(this).html("Loading comments...");
                load_and_scroll($scrollto);
                event.preventDefault();
            }
        };

        // is there a fragment that looks like a comment anchor?
        var $frag = window.location.hash;
        if (($frag.match(/^#comment\-/)) || ($frag.match(/^#comments$/))) {
            load_and_scroll($frag);
        }


        // async comment loading
        $("#more-comment-link").click($make_comment_click_handler("#comments"));
        $(".comment-count").css('cursor', 'pointer');
        $(".comment-count").click($make_comment_click_handler("#comments"));

        // user clicks "add comment" while comments are collapsed
        $('#add-comment-link').click($make_comment_click_handler("#commentform"));

        //sticky navs


        window.isMobileDevice = function () {
            var check = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|ipad|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }

        if (!window.isMobileDevice()) {
            var $stickies = $('.ti-sticky');
            var defaultOffset = $('section[role=main]').offset().top - 10;
            if ($stickies.length) {
                $stickies.each(function () {
                    var $stick = $(this);
                    var offset = $stick.data().top ? $stick.data().top : defaultOffset;
                    $stick.stick_in_parent({
                        offset_top: offset,
                        parent: $stick.closest('.ti-sticky-parent')
                    });
                });

                $(window).load(function () {
                    $(document.body).trigger("sticky_kit:recalc");
                });
                setInterval(function () {
                    $(document.body).trigger("sticky_kit:recalc");
                }, 3000);
            }
        }
    });
})(jQuery);
