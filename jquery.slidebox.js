/*
* slidebox - jQuery sliding box widget
*
* Symantically create a box where one panel slides over the other.
* http://www.dave-mccall.com/
*
* Usage: <div class="slidebox" data-speed="500" data-direction="down" data-hangover="0"
*          data-easing="linear" data-animate-background="true">[...]</div>
*
* Released under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
    $.fn.slidebox = function (method) {
        var methods = {
            init: function (options) {
				if (options == null) options = {};
				$(this).each(function () {
					var $this = $(this);
					var speed = $.coalesce(options.speed, $this.data("speed"), 500);
					var direction = $.coalesce(options.direction, $this.data("direction"), "down");
					var hangover = $.coalesce(options.hangover, $this.data("hangover"), 0);
					var easing = $.coalesce(options.easing, $this.data("easing"), "linear");
					var animateBackground = $.coalesce(options.animateBackground, $this.data("animate-background"), true);
					var $background = $this.children(":eq(0)");
					var $foreground = $this.children(":eq(1)");
					$this.css({
						position: "relative",
						overflow: "hidden",
						height: $background.height(),
						width: $background.width()
					}).data({
						speed: speed,
						direction: direction,
						hangover: hangover,
						animateBackground: animateBackground
					}).hoverIntent({
						over: function () {
							var speed = $(this).data("speed");
							var direction = $(this).data("direction");
							var easing = $(this).data("easing");
							var animateBackground = $(this).data("animateBackground");
							$(this).children(":eq(1)").stop().animate({ top: 0, left: 0 }, { duration: speed, easing: easing, queue: false });
							if (animateBackground) {
								var bgPosition = { top: 0, left: 0 };
								var $background = $(this).children(":eq(0)");
								switch (direction) {
									case "up":
										bgPosition.top = -$background.outerHeight();
										break;
									case "down":
										bgPosition.top = $background.outerHeight();
										break;
									case "left":
										bgPosition.left = -$background.outerWidth();
										break;
									case "right":
										bgPosition.left = $background.outerWidth();
										break;
								}
								$background.animate(bgPosition, { duration: speed, easing: easing });
							}
						},
						out: function () {
							var speed = $(this).data("speed");
							var direction = $(this).data("direction");
							var hangover = $(this).data("hangover");
							var easing = $(this).data("easing");
							var animateBackground = $(this).data("animateBackground");
							var position = _getPosition(this, direction, hangover);
							$background = $(this).children(":eq(0)");
							$foreground = $(this).children(":eq(1)");
							$foreground.stop().animate(position, { speed: speed, easing: easing, queue: false });
							if (animateBackground) $background.animate({ top: 0, left: 0 }, { duration: speed, easing: easing });
						}
					});
					$this.children().css({ position: "absolute" });
					$foreground.css(
						$.extend(_getPosition($this, direction, hangover), {
							height: $background.height(),
							width: $background.width()
						})
					);
					$this.css({ 
						height: $background.height(), 
						width: $background.width() 
					});
				});
				return $(this);
			}
		};
        if (methods[method])
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof method === 'object' || !method)
            return methods["init"].apply(this, arguments);
        else
            $.error("Method " + method + " does not exist in charcount");
    }
	function _getPosition(element, direction, hangover) {
		var position = {};
		var $element = $(element);
		switch (direction) {
			case "up":
				position.top = $element.outerHeight() - hangover;
				position.left = 0;
				break;
			case "down":
				position.top = hangover - $element.outerHeight();
				position.left = 0;
				break;
			case "left":
				position.top = 0;
				position.left = $element.outerWidth() - hangover;
				break;
			case "right":
				position.top = 0;
				position.left = hangover - $element.outerWidth();
				break;
		}
		return position;
	}
})(jQuery);
jQuery(document).ready(function () {
	$(".slidebox").slidebox();
});