// coalesce: returns the first non-null argument
//
// Usage: $.coalesce(val1, obj.val1, 0);

(function ($) {
    $.extend({
        coalesce: function () {
            for (var a = 0; a < arguments.length; a++) if (arguments[a] != null) return arguments[a];
            return null;
        }
    });
})(jQuery);