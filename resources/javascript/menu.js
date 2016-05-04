(function($) {
    $('document').ready(function() {
        var $window = $(window);
        var $menu = $('#menu');
        var $main = $('#main');

        $window.on('resize orientationchange', initMenu);

        initMenu();

        var slideout = new Slideout({
            'panel': $main.get(0),
            'menu': $menu.get(0),
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

        function initMenu() {
            console.log('Init menu. Height ' + $window.height());
            $menu.css({
                'overflow': 'auto',
                'height': $window.height(),
                'display': 'block'
            }).jScrollPane();

            $menu.css('display', '');
        }
    });

    function openMenu($menuSpans, transition) {
        var $span_1 = $($menuSpans.get(1));
        $span_1.css({
            'transform': 'rotate(45deg)',
            'transition': transition
        });
        var $span_2 = $($menuSpans.get(2));
        $span_2.css({
            'transform': 'rotate(-45deg)',
            'transition': transition
        });
        var $span_0 = $($menuSpans.get(0));
        $span_0.css({
            'opacity': 0,
            'transition': transition
        });
        var $span_3 = $($menuSpans.get(3));
        $span_3.css({
            'opacity': 0,
            'transition': transition
        });
    }

    function closeMenu($menuSpans, transition) {
        var $span_1 = $($menuSpans.get(1));
        $span_1.css({
            'transform': 'rotate(0)',
            'transition': transition
        });
        var $span_2 = $($menuSpans.get(2));
        $span_2.css({
            'transform': 'rotate(0)',
            'transition': transition
        });
        var $span_0 = $($menuSpans.get(0));
        $span_0.css({
            'opacity': 1,
            'transition': transition
        });
        var $span_3 = $($menuSpans.get(3));
        $span_3.css({
            'opacity': 1,
            'transition': transition
        });
    }
})(jQuery);