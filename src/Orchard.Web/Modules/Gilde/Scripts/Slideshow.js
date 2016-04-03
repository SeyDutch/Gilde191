$(document).ready(function () {

    $("body").css({ 'overflow-y': 'hidden' });

    $(window).unload(function () {
        $("body").css({ 'overflow-y': '' });
    });

    (function ($) {

        var y_space = 200,
            z_space = 200;

        var view = $('#galleryview'),
            lis = $('#galleryitemlist li'),
            prev = $('#controls .prev'),
            next = $('#controls .next'),
            left = $('#rotate_controls .left'),
            centre = $('#rotate_controls .centre'),
            right = $('#rotate_controls .right');

        var z_index = lis.length,
            current_index = 1,
            translate_y = y_space * -1,
            translate_z = z_space * -1;

        lis.each(function () {

            this.style['-webkit-transform'] = 'translate3d(0px, ' + translate_y + 'px, ' + translate_z + 'px)';
            this.style['z-index'] = z_index;

            $(this).data('translate_y', translate_y);
            $(this).data('translate_z', translate_z);

            z_index--;
            translate_y -= y_space;
            translate_z -= z_space;

        });

        next.bind('click', function () {
            if ($(this).attr('disabled')) return false;
            lis.each(function () {
                animate_stack(this, y_space, z_space);
            });
            lis.filter(':nth-child(' + current_index + ')').css('opacity', 0);
            current_index++;
            check_buttons();
        });

        prev.bind('click', function () {
            if ($(this).attr('disabled')) return false;
            lis.each(function () {
                animate_stack(this, -y_space, -z_space);
            });
            lis.filter(':nth-child(' + (current_index - 1) + ')').css('opacity', 1);
            current_index--;
            check_buttons();
        });

        //$(document).bind('mousewheel', function (event, delta, deltaX, deltaY) {
        //    if (deltaY >= 0) {
        //        next.trigger('click');
        //    }
        //    else {
        //        prev.trigger('click');
        //    }
        //});

        function check_buttons() {
            if (current_index == 1) {
                prev.attr('disabled', true);
            }
            else {
                prev.attr('disabled', false);
            }

            if (current_index == lis.length) {
                next.attr('disabled', true);
            }
            else {
                next.attr('disabled', false);
            }
        }

        left.bind('click', function () {
            view.get(0).style['-webkit-perspective-origin-x'] = '-200px';
            view.get(0).style['left'] = '100px';
        });

        centre.bind('click', function () {
            view.get(0).style['-webkit-perspective-origin-x'] = '400px';
            view.get(0).style['left'] = '0'
        });

        right.bind('click', function () {
            view.get(0).style['-webkit-perspective-origin-x'] = '1000px';
            view.get(0).style['left'] = '-200px'
        });

        function animate_stack(obj, y, z) {

            var new_y = $(obj).data('translate_y') + y;
            var new_z = $(obj).data('translate_z') + z;

            obj.style['-webkit-transform'] = 'translate3d(0px, ' + new_y + 'px, ' + new_z + 'px)';

            $(obj).data('translate_y', new_y)
            .data('translate_z', new_z);

        }


    })(jQuery);

    $('.gallery-page').bind('mousewheel', function (e) {
        var prev = $('#controls .prev'),
            next = $('#controls .next')

        if (e.originalEvent.wheelDelta / 120 > 0) {
            next.trigger('click');
        }
        else {
            prev.trigger('click');
        }
    });

});

