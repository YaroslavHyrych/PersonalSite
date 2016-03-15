(function($) {
    var $window = $(window);
    var $document = $(document);
    var windowScrollCoeficient = 0.2;

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
            var slide = height * windowScrollCoeficient;
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

        var timeout;
        var $contacts = $('#front-page').find('li');
        $contacts.hover(function() {
            showTooltip(this);
        }, function() {
            hideTooltip(this);
        });

        $contacts.on('touchstart', function() {
            var that = this;

            var $hovered = $contacts.filter('.hover');
            if ($hovered) {
                $hovered.removeClass('hover');
                if (timeout) clearTimeout(timeout);
            }

            showTooltip(this);

            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(function() {
                hideTooltip(that);
            }, 3000);
        });

        var $sections = $('body').find('> section');
        $sections.eq($sections.size()-1).css({
            'padding-bottom' : windowScrollCoeficient * $window.height()
        });

        function showTooltip(element) {
            var $elem = $(element);
            var text = $elem.find('div').attr('text');

            $popup.removeAttr('style');
            $popup.text(text);

            var top = $elem.offset().top + $elem.innerHeight() + 10;
            var left = $elem.offset().left - $popup.innerWidth() /2;
            var width = ($popup.innerWidth() > $window.width()) ? window.width() : $popup.width();

            if (left + $popup.innerWidth() > $window.width()) {//TODO fix full width
                left = $elem.offset().left + $elem.width() - $popup.innerWidth();
            }

            $popup.css({
                top : top,
                left: left,
                width: width
            });

            $elem.addClass('hover');
            $popup.stop().show();
        }

        function hideTooltip(element) {
            $(element).removeClass('hover');
            $popup.stop().hide();
        }

        //TOTO change orientation
        function setTooltipPosition() {

        }
    });
})(jQuery);







