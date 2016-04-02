$(document).ready(function () {

    $("ul.navbar-nav > li").on("click", function (e) {
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

});

