(function($) {
    var $window = $(window);
    var $document = $(document);

    function rebuildFrontPage() {
        var width = $window.width();
        var height = $window.height();
        height -= height /5;

        $('#front-page').css({
            height: height
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

        //if (wScroll > $window.height() /5) {
        //    $('.first').addClass('isShowing');
        //    //setTimeout(function() {}, 150);
        //}

        var $projects = $('article .container');
        $projects.each(function(i) {
            var $project = $projects.eq(i);
            var height = $window.height();
            var slide = height * 0.2;
            if (wScroll + height - slide > $project.offset().top) {
                $project.addClass('isShowing');
            }
        });

        //$('.projects > header').css({
        //    'transform' : 'translate(-' +  wScroll /2 + 'px, 0px)'
        //});
    });

    $window.on('resize orientationchange', rebuildFrontPage);

    $document.ready(function() {
        rebuildFrontPage();

        $('div[class*=contact]').hover(function() {
            //console.log($())
        });

    });
})(jQuery);







