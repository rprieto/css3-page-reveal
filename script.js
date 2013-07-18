$(document).ready(function() {

    $('li').css('height', $(window).height())
           .css('width',  $(window).width());

    $('#previous').on('touchstart', function() {
        slideTo($('li.current').prev());
        return false;
    });

    $('#next').on('touchstart', function() {
        slideTo($('li.current').next());
        return false;
    });

    $('li').swipe({
        swipeLeft: function(event, direction, distance, duration, fingerCount) {
            slideTo($('li.current').next());
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
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
