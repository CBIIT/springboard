(function ($) {
    Drupal.behaviors.sidebar_card_links = {
        attach: function () {
            $('.add-card-link').click(function(event) {
                event.stopPropagation();
                if ($(this).find('div').hasClass('plus-icon')) {
                    cardClass = $(this).attr('class').split(' ')[2];
                    cardValue = cardClass.replace('btn-', '');
                    Drupal.behaviors.springboard_actiondeck_cookies.add_card(cardValue);
                    $(this).removeClass('plus-icon').html('<div class="check-icon"></div>In Your Action Deck').closest('a').addClass('active');
                }
                else if ($(this).find('div').hasClass('check-icon')) {
                    cardClass = $(this).attr('class').split(' ')[2];
                    cardValue = cardClass.replace('btn-', '');
                    Drupal.behaviors.springboard_actiondeck_cookies.remove_card(cardValue);
                    $(this).removeClass('check-icon').html('<div class="plus-icon"></div>In Your Action Deck').closest('a').removeClass('active');
                }
            });
        }
    }
    Drupal.behaviors.sidebar_card_links.init = function() {
        deck = Drupal.behaviors.springboard_actiondeck_cookies.get_cards();
        for (i = 0; i < deck.length; i++) {
            $('.add-card-link.btn-' + deck[i]).html('<div class="check-icon"></div>In Your Action Deck').closest('a').addClass('active');
        }
    };

    $(document).ready(function(){
        Drupal.behaviors.sidebar_card_links.init();
    });
}(jQuery));;
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function decode(s) {
		if (config.raw) {
			return s;
		}
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function decodeAndParse(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		s = decode(s);

		try {
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				result = decodeAndParse(cookie);
				break;
			}

			if (!key) {
				result[name] = decodeAndParse(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));
;
