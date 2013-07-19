$(document).ready(function() {

    var TAP_EVENT = ('ontouchstart' in window) ? 'touchstart' : 'click';
    var PAGE_WIDTH = $('body').width();
    var DISTANCE_TO_SWIPE = PAGE_WIDTH / 3;

    $('ul,li').css('height', $(window).height());
    $('ul,li').css('width', PAGE_WIDTH);

    $('#previous').on(TAP_EVENT, slideToPrevious);
    $('#next').on(TAP_EVENT, slideToNext);

    var sliding = false;
    
    $('li').swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
            if (phase === 'start') {
                sliding = false;
            }
            if (!sliding) {
              if (phase === 'move' && direction === 'left' && distance > 0) {
                  reveal('li.right', PAGE_WIDTH - distance);
              }
              if (phase === 'move' && direction === 'left' && distance > DISTANCE_TO_SWIPE) {
                  sliding = true;
                  slideToNext();
              }
              if (phase === 'move' && direction === 'right' && distance > 0) {
                  reveal('li.left', distance - PAGE_WIDTH);
              }
              if (phase === 'move' && direction === 'right' && distance > DISTANCE_TO_SWIPE) {
                  sliding = true;
                  slideToPrevious();
              }
            }
            if (phase === 'end') {
                stopAllReveals();
            }
        },
        allowPageScroll: 'vertical'
    });
    
    function reveal(target, amount) {
        $(target).addClass('reveal').css('-webkit-transform', 'translate3d(' + amount + 'px,0,0)');
    }
    
    function stopAllReveals() {
      $('li').removeClass('reveal').css('-webkit-transform', '');
    }
    
    function slideToPrevious() {
        stopAllReveals();
        slideTo($('li.current').prev());
    }
    
    function slideToNext() {
        stopAllReveals();
        slideTo($('li.current').next());
    }
    
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
