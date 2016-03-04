$(window).scroll(function() {

    var wScroll = $(this).scrollTop();

    var pcPosY = wScroll /2;
    $('.pc').css({
        'transform' : 'translate(0px, -'+ pcPosY + 'px)'
    });

    var phonePosY = wScroll /4;
    $('.phone').css({
        'transform' : 'translate(0px, -'+ phonePosY + 'px)'
    });

    //$('.projects > header').css({
    //    'transform' : 'translate(-' +  wScroll /2 + 'px, 0px)'
    //});
});