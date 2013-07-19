$(document).ready(function() {

    $('ul,li').css('height', $(window).height())
              .css('width',  $(window).width());

    $('#previous').on('touchstart', function() {
        slideTo($('li.current').prev());
        return false;
    });

    $('#next').on('touchstart', function() {
        slideTo($('li.current').next());
        return false;
    });

    var startX = 0;
    
    $('li').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].screenX;
    });
    
    $('li').on('touchmove', function(e) {
        delta = e.originalEvent.touches[0].screenX - startX;
        
        if (delta > 10) {
            $('li.left').addClass('reveal');
        } else if (delta < -10) {
            $('li.right').addClass('reveal');
        }
        
        // $('li').css('z-index', '').css('-webkit-transform', '');
        // 
        // // reveal
        // if (delta < 0) {
        //     var x = - $(window).width() - delta;
        //     $('li.left').css('z-index', 99).css('-webkit-transform', 'translate3d(' + x + 'px,0,0)');
        // } else {
        //     var x = $(window).width() - delta;
        //     $('li.right').css('z-index', 99).css('-webkit-transform', 'translate3d(' + x + 'px,0,0)');
        // }
    });
    
    $('li').on('touchend', function(e) {
        $('li').removeClass('reveal');
    });

    $('li').swipe({
        // swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
        //     if (direction === 'left' && distance > 5) {
        //         $('li.right').addClass('reveal');
        //     }
        //     if (direction === 'right' && distance > 5) {
        //         $('li.left').addClass('reveal');
        //     }
        // },
        swipeLeft: function(event, direction, distance, duration, fingerCount) {
            $('li').removeClass('reveal');
            slideTo($('li.current').next());
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
            $('li').removeClass('reveal');
            slideTo($('li.current').prev());
        }
    });

    function slideTo(current) {
        if (current.length > 0) {
            $('li').removeClass('current left right');
            current.prev().addClass('left');
            current.addClass('current');
            current.next().addClass('right');
            setTimeout(function() {
                scrollTop(current.prev());
                scrollTop(current.next());
            }, 500);
        }
    }
    
    function scrollTop(element) {
        if (element.length > 0) {
            element[0].scrollTop = 0;
        }
    }

});
