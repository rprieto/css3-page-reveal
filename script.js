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
    
    $('li').swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
            if (phase === 'start') {
                sliding = false;
            }
            if (!sliding) {
              if (phase === 'move' && direction === 'left' && distance > 10) {
                  $('li.right').addClass('reveal');
              }
              if (phase === 'move' && direction === 'left' && distance > 80) {
                  sliding = true;
                  $('li').removeClass('reveal');
                  slideTo($('li.current').next());
              }
              if (phase === 'move' && direction === 'right' && distance > 10) {
                  $('li.left').addClass('reveal');
              }
              if (phase === 'move' && direction === 'right' && distance > 80) {
                  sliding = true;
                  $('li').removeClass('reveal');
                  slideTo($('li.current').prev());
              }
            }
            if (phase === 'end') {
                $('li').removeClass('reveal');
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
