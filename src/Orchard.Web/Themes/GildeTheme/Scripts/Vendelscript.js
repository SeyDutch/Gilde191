$(document).ready(function () {

    $("ul.navbar-nav > li, .navigation-tile").on("click", function (e) {
        var x = e.pageX;
        var y = e.pageY;
        var clickY = y - $(this).offset().top;
        var clickX = x - $(this).offset().left;
        var box = this;

        var setX = parseInt(clickX);
        var setY = parseInt(clickY);
        
        $("#rippleeffect").remove();

        var animateFn = function (mBox, cssPos) {
            var c = $(mBox).find("circle");
            c.animate(
              {
                  "r": $(mBox).outerWidth()
              },
              {
                  easing: "easeOutQuad",
                  duration: 400,
                  step: function (val) {
                      c.attr("r", val);
                  },
                  complete: function () {
                      if ($(mBox).css("position") != currPos) {
                          $(mBox).css("position", cssPos);
                      }
                      $("#rippleeffect").remove();
                  }
              }
            );
        };

        var currPos = $(box).css("position");
        if ($(box).hasClass("dropdown")) {
            setTimeout(function () {
                if(currPos === "static")
                    $(box).css("position", "relative");

                $(box).prepend('<svg id="rippleeffect"><circle cx="' + setX + '" cy="' + setY + '" r="' + 0 + '"></circle></svg>');
                animateFn(box, currPos);
            }, 100);
        }else{
            $(box).prepend('<svg id="rippleeffect"><circle cx="' + setX + '" cy="' + setY + '" r="' + 0 + '"></circle></svg>');
            animateFn(box, currPos);
        }
        
        
    });

    $(".navigation-tile").on("click", function (e) {
        var dataNavi = $(this).data('navi');
        if (dataNavi != undefined) {
            window.location.href = dataNavi;
        }
    });

    $(".navigation-tile").hover(function (e) {
        var bgcolor = $(this).data("color");
        var newColor = LightenDarkenColor(bgcolor, 20);
        $(this).css("background-color", newColor);

    }, function(e){
        var bgcolor = $(this).data("color");
        $(this).css("background-color", bgcolor);
    });

    function LightenDarkenColor(col, amt) {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

    }

});

