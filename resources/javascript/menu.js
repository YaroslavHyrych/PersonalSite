(function($) {
    $('document').ready(function() {
        var slideout = new Slideout({
            'panel': $('#main').get(0),
            'menu': $('#menu').get(0),
            'padding': 300
        });

        var $menuBtn = $('#menu-btn');
        var $menuSpans = $menuBtn.children('span');
        var transition = 'all 0.5s ease-in-out';

        $menuBtn.on('click touch', function () {
            if (slideout.isOpen()) {
                slideout.close();
                closeMenu($menuSpans, transition);
            } else {
                slideout.open();
                openMenu($menuSpans, transition);
            }
        });

        slideout.on('open', function () {
            openMenu($menuSpans, transition);

        });

        slideout.on('close', function () {
            closeMenu($menuSpans, transition);
        });

        function openMenu($menuSpans, transition) {
            var $span_1 = $($menuSpans.get(1));
            $span_1.css({
                'opacity': 0,
                'transition': transition
            });
            var $span_0 = $($menuSpans.get(0));
            $span_0.css({
                'transform': 'rotate(45deg)',
                'top': $span_1.css('top'),
                'transition': transition
            });
            var $span_2 = $($menuSpans.get(2));
            $span_2.css({
                'transform': 'rotate(-45deg)',
                'top': $span_1.css('top'),
                'transition': transition
            });
        }
    });

    function closeMenu($menuSpans, transition) {
        var $span_1 = $($menuSpans.get(1));
        $span_1.css({
            'opacity': 1,
            'transition': transition
        });
        var $span_0 = $($menuSpans.get(0));
        $span_0.css({
            'transform': 'rotate(0)',
            'top': 0,
            'transition': transition
        });
        var $span_2 = $($menuSpans.get(2));
        $span_2.css({
            'transform': 'rotate(0)',
            'top': parseInt($span_1.css('top')) * 2 + 'px',
            'transition': transition
        });
    }
})(jQuery);