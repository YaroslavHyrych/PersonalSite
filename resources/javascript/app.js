(function($) {
    var $window = $(window);
    var $document = $(document);

    function rebuildFrontPage() {
        var width = $window.width();
        var height = $window.height();
        var newHeight = height;

        var $contentHeader = $('.content').eq(0).find('> header').eq(0);

        if ($contentHeader === undefined) return;

        var contentHeaderHeight = $contentHeader.height();

        if(height > width || height >= 600) {
            newHeight -= contentHeaderHeight;
        }

        $('#front-page').css({
            height: newHeight
        });
    }

    function showPopupAsTooltip(text, element) {

    }

    $window.scroll(function() {

        var wScroll = $(this).scrollTop();

        var pcPosY = wScroll /2;

        $('#pc').css({
            'transform' : 'translate(0px, -'+ pcPosY + 'px)'
        });

        var phonePosY = wScroll /4;
        $('.phone').css({
            'transform' : 'translate(0px, -'+ phonePosY + 'px)'
        });

        var $projects = $('article .container, #skills img');
        $projects.each(function(i) {
            var $project = $projects.eq(i);
            var height = $window.height();
            var slide = height * 0.2;
            if (wScroll + height - slide > $project.offset().top) {
                $project.addClass('isShowing');
            }
        });

    });

    $window.on('resize orientationchange', rebuildFrontPage);

    $document.ready(function() {
        var $popup = $('#popup');

        rebuildFrontPage();

        var $headers = $('.content').find('> header');

        $headers.on('click touch', function() {
            var $contentBlock = $(this).parent();
            $("html, body").animate({
                scrollTop: $contentBlock.offset().top
            }, 1000);
        });

        var showTooltip = function(element) {
            var $li = $(element);
            var text = $li.find('div').attr('text');

            $popup.text(text);

            $popup.css({
                top : $li.offset().top + $li.innerHeight() + 10,
                left: $li.offset().left - $popup.width() /2
            });

            $li.addClass('hover');
            $popup.stop().show();
        };

        var hideTooltip = function(element) {
            $(element).removeClass('hover');
            $popup.stop().hide();
        };

        var timeout;
        var $contacts = $('#front-page').find('li');
        $contacts.hover(function() {
            showTooltip(this);
        }, function() {
            hideTooltip(this);
        });

        $contacts.on('touch', function() {
            var that = this;

            var $hovered = $contacts.filter('.hover');
            if ($hovered) {
                $hovered.removeClass('hover');
            }

            showTooltip(this);

            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(function() {
                hideTooltip(that)
            }, 3000);
        });
    });
})(jQuery);







