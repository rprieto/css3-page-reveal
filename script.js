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

    var sliding = false;
    var DISTANCE_TO_SWIPE = $(window).width() / 3;
    
    $('li').swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
            if (phase === 'start') {
                sliding = false;
            }
            if (!sliding) {
              if (phase === 'move' && direction === 'left' && distance > 0) {
                  $('li.right').addClass('wiggle').css('-webkit-transform', 'translate3d(' + ($(window).width() - distance) + 'px,0,0)');
              }
              if (phase === 'move' && direction === 'left' && distance > DISTANCE_TO_SWIPE) {
                  sliding = true;
                  $('li').removeClass('wiggle').css('-webkit-transform', '');
                  slideTo($('li.current').next());
              }
              if (phase === 'move' && direction === 'right' && distance > 0) {
                  $('li.left').addClass('wiggle').css('-webkit-transform', 'translate3d(' + (-$(window).width() + distance) + 'px,0,0)');
              }
              if (phase === 'move' && direction === 'right' && distance > DISTANCE_TO_SWIPE) {
                  sliding = true;
                  $('li').removeClass('wiggle').css('-webkit-transform', '');
                  slideTo($('li.current').prev());
              }
            }
            if (phase === 'end') {
                $('li').removeClass('wiggle').css('-webkit-transform', '');
            }
        },
        allowPageScroll: 'vertical'
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
