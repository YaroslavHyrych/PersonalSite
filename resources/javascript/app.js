(function($) {
    var $window = $(window);
    var $document = $(document);

    function rebuildFrontPage() {
        var width = $window.width();
        var height = $window.height();
        var newHeight = height;

        var $contentHeader = $('#content').find('> header').eq(0);

        if ($contentHeader === undefined) return;

        var contentHeaderHeight = $contentHeader.height();

        //if (height > width && height >= 600) {
        //    var $firstProject = $contentHeader.next();
        //    console.log('$firstProject = ' + $firstProject.height());
        //    newHeight -= $firstProject.innerHeight() + contentHeaderHeight;
        //    $window.trigger('scroll');
        //} else
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

        var $projects = $('article .container');
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

        $('#content').find('> header').on('click touch', function() {
            $("html, body").animate({ scrollTop: $('#content').offset().top }, 1000)
        });

        $('#front-page').find('li').hover(function() {
            var $li = $(this);
            var text = $li.find('div').attr('text');

            $popup.text(text);

            $popup.css({
                top : $li.offset().top + $li.innerHeight() + 10,
                left: $li.offset().left - $popup.width() /2
            });

            $li.addClass('hover');
            $popup.stop().show();
        }, function() {
            $(this).removeClass('hover');
            $popup.stop().hide();
        });
        //$('div[class*=contact]').hover(function() {
            //console.log($())
        //});

    });
})(jQuery);







