// 用法$(function(){
//  var leftarrow=$(".game_btn_left");//左箭头
//  var rightarrow=$(".game_btn_right");//右箭头
//  var lilength=$(".gameSlide li").length;//li元素数量
//  var liwidth=$(".gameSlide li").eq(0).width();//li元素单个宽度
//  $(".gameSlide").ImageScroll({//gameSlide为装有li元素的父元素
//    "leftarrow":leftarrow,
//    "rightarrow":rightarrow,
//    "liLength":lilength,
//    "liwidth":liwidth,
//    "Num":3//容器中显示的有几张
//  })
// })

;
(function($) {
    $.fn.ImageScroll = function(opts) {
        var dotList=opts.dotList||"";
        var hasDot=false;
        var leftarrow = opts.leftarrow;
        var rightarrow = opts.rightarrow;
        var Ullength = opts.liLength + 1;
        var Liwidth = Math.floor(opts.liwidth);
        var gameSlideWidth = Math.floor(Ullength * Liwidth);
        this.css("width", gameSlideWidth);
        this.find("li").css("width", Liwidth).find("img").css("width", Liwidth);
        this.find("li").eq(0).clone().appendTo(this);
        this.parent(".slideCon").css("width", Liwidth);
        var _this = this;
        autoTimer = _this.timer;
        leftarrow.click(function() {
            if (!_this.is(':animated')) {
                var curpos = _this.position().left;               
                if (curpos >= 0) {
                    _this.css("left", -gameSlideWidth + Liwidth);
                    curpos = -gameSlideWidth + Liwidth;
                }
                curpos = curpos + Liwidth;
                _this.stop(true, false).animate({ "left": curpos });
                if (hasDot) {
                    dotList.removeClass("Active").eq(Math.abs(curpos / Liwidth)).addClass("Active");
                }

            }
        });

        rightarrow.click(function() {
            if (!_this.is(':animated')) {
                var curpos = _this.position().left;
                var gift3 = _this.parent().parent().find(".bg3Gift");
                if (curpos <= -gameSlideWidth + Liwidth) {
                    _this.css("left", 0);
                    curpos = 0;
                }
                curpos = curpos - Liwidth;
                _this.stop(true, false).animate({ "left": curpos });
                if (hasDot) {
                    var cur_dot = Math.abs(curpos / Liwidth) >= gift3.length ? 0 : Math.abs(curpos / Liwidth);
                    dotList.removeClass("Active").eq(cur_dot).addClass("Active");
                }
            }


        });

        $(document).on('touchstart', function() {
            clearInterval(autoTimer);
        });
        $(document).on('touchend', function() {
            autoTimer = setInterval(autoFn,4000);
        });

        function autoFn() {
            rightarrow.click();
        };

    };

})(jQuery);
