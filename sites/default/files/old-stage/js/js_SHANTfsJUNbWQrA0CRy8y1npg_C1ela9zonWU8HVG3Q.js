
(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
/**
 * @file
 * jQuery code.
 * Based on code: Adrian "yEnS" Mato Gondelle, twitter: @adrianmg
 * Modifications for Drupal: Grzegorz Bartman grzegorz.bartman@openbit.pl
 */


// Setting up popup.
// 0 means disabled; 1 means enabled.
var popupStatus = 0;

/**
 * Loading popup with jQuery.
 */
function popup_message_load_popup() {
  // Loads popup only if it is disabled.
  if (popupStatus === 0) {
    jQuery("#popup-message-background").css({
      "opacity": "0.7"
    });
    jQuery("#popup-message-background").fadeIn("slow");
    jQuery("#popup-message-window").fadeIn("slow");
    popupStatus = 1;
  }
}

/**
 * Disabling popup with jQuery.
 */
function popup_message_disable_popup() {
  // Disables popup only if it is enabled.
  if (popupStatus == 1) {
    jQuery("#popup-message-background").fadeOut("slow");
    jQuery("#popup-message-window").fadeOut("slow");
    jQuery('#popup-message-content').empty().remove();
    popupStatus = 0;
  }
}

/**
 * Centering popup.
 */
function popup_message_center_popup(width, height) {
  // Request data for centering.
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;

  var popupWidth = 0;
  if (typeof width == "undefined") {
    popupWidth = $("#popup-message-window").width();
  }
  else {
    popupWidth = width;
  }
  var popupHeight = 0;
  if (typeof width == "undefined") {
    popupHeight = $("#popup-message-window").height();
  }
  else {
    popupHeight = height;
  }

  // Centering.
  jQuery("#popup-message-window").css({
    "position": "absolute",
    "width" : popupWidth + "px",
    "height" : popupHeight + "px",
    "top": windowHeight / 2 - popupHeight / 2,
    "left": windowWidth / 2 - popupWidth / 2
  });
  // Only need force for IE6.
  jQuery("#popup-message-background").css({
    "height": windowHeight
  });

}

/**
 * Display popup message.
 */
function popup_message_display_popup(popup_message_title, popup_message_body, width, height) {
  jQuery('body').append("<div id='popup-message-window'><a id='popup-message-close'>X</a><br /><h1 class='popup-message-title'>" + popup_message_title + "</h1><div id='popup-message-content'>" + popup_message_body + "</div></div><div id='popup-message-background'></div>");
  jQuery("#cheat_button").click(function() {jQuery("#rn_nciChatLaunchButton_4_Button").click(); jQuery(this).unbind('click')});
  // Loading popup.
  popup_message_center_popup(width, height);
  popup_message_load_popup();

  // Closing popup.
  // Click the x event!
  jQuery("#popup-message-close").click(function() {
    popup_message_disable_popup();
  });
  // Click out event!
  jQuery("#popup-message-background").click(function() {
    popup_message_disable_popup();
  });
  // Press Escape event!
  jQuery(document).keypress(function(e) {
    if (e.keyCode == 27 && popupStatus == 1) {
      popup_message_disable_popup();
    }
  });
}

/**
 * Helper function for get last element from object.
 * Used if on page is loaded more than one message.
 */
function popup_message_get_last_object_item(variable_data) {
  if (typeof(variable_data) == 'object') {
      variable_data = variable_data[(variable_data.length - 1)];
  }
  return variable_data;
}

Drupal.behaviors.popup_message = {
  attach: function(context) {
    var timestamp = (+new Date());
    var check_cookie = Drupal.settings.popup_message.check_cookie;
    check_cookie = popup_message_get_last_object_item(check_cookie);
    var popup_message_cookie = jQuery.cookie("popup_message_displayed"),
    delay = Drupal.settings.popup_message.delay * 1000,
    show_popup = false;
    if (!popup_message_cookie || check_cookie == 0) {
      // Set cookie.
      jQuery.cookie("popup_message_displayed", timestamp, {expires: 28, path: '/'});
      // Display message.
      show_popup = true;
    }
    else {
      popup_message_cookie = parseInt(popup_message_cookie, 10);
      show_popup = timestamp < popup_message_cookie + delay;
    }

    if (show_popup) {
      var run_popup = function () {
        //Scroll to the top...
        if(jQuery) {  //if jQuery loaded, use a nice animation
          jQuery("html, body").animate({scrollTop: 0}, "slow");
        } else { //otherwise a jarring jump to the top
          window.scrollTo(0,0);
        }
       	if(ga) { //if the ga object is defeined/loaded
    		ga('send', 'event', 'Live_Help_Popup', 'Displayed');
       	}
        // Get variables.
        var popup_message_title = Drupal.settings.popup_message.title,
        popup_message_body = Drupal.settings.popup_message.body,
        popup_message_width = Drupal.settings.popup_message.width,
        popup_message_height = Drupal.settings.popup_message.height;

        popup_message_title = popup_message_get_last_object_item(popup_message_title);
        popup_message_body = popup_message_get_last_object_item(popup_message_body);
        popup_message_width = popup_message_get_last_object_item(popup_message_width);
        popup_message_height = popup_message_get_last_object_item(popup_message_height);
        popup_message_display_popup(
          popup_message_title,
          popup_message_body,
          popup_message_width,
          popup_message_height);
      };
      if(!popup_message_cookie) {
        var trigger_time = delay;
      } else {
        var trigger_time = popup_message_cookie - timestamp + delay;
      }
      setTimeout(run_popup, trigger_time);
    }
  }
};
;
/**
 * @file
 * JavaScript file for the Coffee module.
 */

(function($) {
  // Remap the filter functions for autocomplete to recognise the
  // extra value "command".
  var proto = $.ui.autocomplete.prototype,
  	initSource = proto._initSource;

  function filter(array, term) {
  	var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), 'i');
  	return $.grep(array, function(value) {
                return matcher.test(value.command) || matcher.test(value.label) || matcher.test(value.value);
  	});
  }

  $.extend(proto, {
  	_initSource: function() {
  		if ($.isArray(this.options.source)) {
  			this.source = function(request, response) {
  				response(filter(this.options.source, request.term));
  			};
  		}
  		else {
  			initSource.call(this);
  		}
  	}
  });

  Drupal.coffee = Drupal.coffee || {};

  Drupal.behaviors.coffee = {
    attach: function() {
      $('body').once('coffee', function() {
        var body = $(this);

        Drupal.coffee.bg.appendTo(body).hide();

        Drupal.coffee.form
        .append(Drupal.coffee.label)
        .append(Drupal.coffee.field)
        .append(Drupal.coffee.results)
        .wrapInner('<div id="coffee-form-inner" />')
        .addClass('hide-form')
        .appendTo(body);

        // Load autocomplete data set, consider implementing
        // caching with local storage.
        Drupal.coffee.dataset = [];
        
        var jquery_ui_version = $.ui.version.split('.');
        var jquery_ui_newer_1_9 = parseInt(jquery_ui_version[0]) >= 1 && parseInt(jquery_ui_version[1]) > 9;
        var autocomplete_data_element = (jquery_ui_newer_1_9) ? 'ui-autocomplete' : 'autocomplete';

        $.ajax({
          url: Drupal.settings.basePath + '?q=admin/coffee/menu',
          dataType: 'json',
          success: function(data) {
            Drupal.coffee.dataset = data;

            // Apply autocomplete plugin on show
            var $autocomplete = $(Drupal.coffee.field).autocomplete({
              source: Drupal.coffee.dataset,
              focus: function( event, ui ) {
                  // Prevents replacing the value of the input field
                  event.preventDefault();
              },
              select: function(event, ui) {
                Drupal.coffee.redirect(ui.item.value, event.metaKey);
                event.preventDefault();
                return false;
              },
              delay: 0,
              appendTo: Drupal.coffee.results
           });

           $autocomplete.data(autocomplete_data_element)._renderItem = function(ul, item) {
              return  $('<li></li>')
                      .data('item.autocomplete', item)
                      .append('<a>' + item.label + '<small class="description">' + item.value + '</small></a>')
                      .appendTo(ul);
            };

            // This isn't very nice, there are methods within that we need
            // to alter, so here comes a big wodge of text...
            var self = Drupal.coffee.field;
            if (!jquery_ui_newer_1_9){
                $(Drupal.coffee.field).data(autocomplete_data_element).menu = $('<ol></ol>')
                    .addClass('ui-autocomplete')
                    .appendTo(Drupal.coffee.results)
                    // prevent the close-on-blur in case of a "slow" click on the menu (long mousedown).
                    .mousedown(function(event) {
                        event.preventDefault();
                    })
                    .menu({
                        selected: function(event, ui) {
                            var item = ui.item.data('item.autocomplete');
                            Drupal.coffee.redirect(item.value, event.metaKey);
                            event.preventDefault();
                        }
                    })

                    .hide()
                    .data('menu');
            }

            // We want to limit the number of results.
            $(Drupal.coffee.field).data(autocomplete_data_element)._renderMenu = function(ul, items) {
          		var self = this;
          		items = items.slice(0, 7); // @todo: max should be in Drupal.settings var.
          		$.each( items, function(index, item) {
                    if (typeof(self._renderItemData) === "undefined"){
                        self._renderItem(ul, item);
                    }
                    else {
                        self._renderItemData(ul, item);
                    }

          		});
          	};

          	// On submit of the form select the first result if available.
          	Drupal.coffee.form.submit(function() {
          	  var firstItem = jQuery(Drupal.coffee.results).find('li:first').data('item.autocomplete');
          	  if (typeof firstItem == 'object') {
          	    Drupal.coffee.redirect(firstItem.value, false);
          	  }

          	  return false;
          	});
          },
          error: function() {
            Drupal.coffee.field.val('Could not load data, please refresh the page');
          }
        });

        // Key events
        $(document).keydown(function(event) {
          var activeElement = $(document.activeElement);

          // Show the form with alt + D. Use 2 keycodes as 'D' can be uppercase or lowercase.
          if (Drupal.coffee.form.hasClass('hide-form') && 
        		  event.altKey === true && 
        		  // 68/206 = d/D, 75 = k. 
        		  (event.keyCode === 68 || event.keyCode === 206  || event.keyCode === 75)) {
            Drupal.coffee.coffee_show();
            event.preventDefault();
          }
          // Close the form with esc or alt + D.
          else if (!Drupal.coffee.form.hasClass('hide-form') && (event.keyCode === 27 || (event.altKey === true && (event.keyCode === 68 || event.keyCode === 206)))) {
            Drupal.coffee.coffee_close();
            event.preventDefault();
          }
        });
      });
    }
  };

  // Prefix the open and close functions to avoid
  // conflicts with autocomplete plugin.

  /**
   * Open the form and focus on the search field.
   */
  Drupal.coffee.coffee_show = function() {
    Drupal.coffee.form.removeClass('hide-form');
    Drupal.coffee.bg.show();
    Drupal.coffee.field.focus();
    $(Drupal.coffee.field).autocomplete({enable: true});
  };

  /**
   * Close the form and destroy all data.
   */
  Drupal.coffee.coffee_close = function() {
    Drupal.coffee.field.val('');
    //Drupal.coffee.results.empty();
    Drupal.coffee.form.addClass('hide-form');
    Drupal.coffee.bg.hide();
    $(Drupal.coffee.field).autocomplete({enable: false});
  };

  /**
   * Close the Coffee form and redirect.
   * Todo: make it work with the overlay module.
   */
  Drupal.coffee.redirect = function(path, openInNewWindow) {
    Drupal.coffee.coffee_close();

    if (openInNewWindow) {
      window.open(Drupal.settings.basePath + path);
    }
    else {
      document.location = Drupal.settings.basePath + path;
    }
  };

  /**
   * The HTML elements.
   */
  Drupal.coffee.label = $('<label for="coffee-q" class="element-invisible" />').text(Drupal.t('Query'));

  Drupal.coffee.results = $('<div id="coffee-results" />');

  // Instead of appending results one by one, we put them in a placeholder element
  // first and then append them all at once to prevent flickering while typing.
  Drupal.coffee.resultsPlaceholder = $('<ol />');

  Drupal.coffee.form = $('<form id="coffee-form" action="#" />');

  Drupal.coffee.bg = $('<div id="coffee-bg" />').click(function() {
    Drupal.coffee.coffee_close();
  });

  Drupal.coffee.field = $('<input id="coffee-q" type="text" autocomplete="off" />');

}(jQuery));
;
/**
 * @file
 * Attaches behaviors for the Dashboard module.
 */

(function ($) {

/**
 * Implements Drupal.behaviors for the Dashboard module.
 */
Drupal.behaviors.dashboard = {
  attach: function (context, settings) {
    $('#dashboard', context).once(function () {
      $(this).prepend('<div class="customize clearfix"><ul class="action-links"><li><a href="#">' + Drupal.t('Customize dashboard') + '</a></li></ul><div class="canvas"></div></div>');
      $('.customize .action-links a', this).click(Drupal.behaviors.dashboard.enterCustomizeMode);
    });
    Drupal.behaviors.dashboard.addPlaceholders();
    if (Drupal.settings.dashboard.launchCustomize) {
      Drupal.behaviors.dashboard.enterCustomizeMode();
    }
  },

  addPlaceholders: function() {
    $('#dashboard .dashboard-region .region').each(function () {
      var empty_text = "";
      // If the region is empty
      if ($('.block', this).length == 0) {
        // Check if we are in customize mode and grab the correct empty text
        if ($('#dashboard').hasClass('customize-mode')) {
          empty_text = Drupal.settings.dashboard.emptyRegionTextActive;
        } else {
          empty_text = Drupal.settings.dashboard.emptyRegionTextInactive;
        }
        // We need a placeholder.
        if ($('.dashboard-placeholder', this).length == 0) {
          $(this).append('<div class="dashboard-placeholder"></div>');
        }
        $('.dashboard-placeholder', this).html(empty_text);
      }
      else {
        $('.dashboard-placeholder', this).remove();
      }
    });
  },

  /**
   * Enters "customize" mode by displaying disabled blocks.
   */
  enterCustomizeMode: function () {
    $('#dashboard').addClass('customize-mode customize-inactive');
    Drupal.behaviors.dashboard.addPlaceholders();
    // Hide the customize link
    $('#dashboard .customize .action-links').hide();
    // Load up the disabled blocks
    $('div.customize .canvas').load(Drupal.settings.dashboard.drawer, Drupal.behaviors.dashboard.setupDrawer);
  },

  /**
   * Exits "customize" mode by simply forcing a page refresh.
   */
  exitCustomizeMode: function () {
    $('#dashboard').removeClass('customize-mode customize-inactive');
    Drupal.behaviors.dashboard.addPlaceholders();
    location.href = Drupal.settings.dashboard.dashboard;
  },

  /**
   * Sets up the drag-and-drop behavior and the 'close' button.
   */
  setupDrawer: function () {
    $('div.customize .canvas-content input').click(Drupal.behaviors.dashboard.exitCustomizeMode);
    $('div.customize .canvas-content').append('<a class="button" href="' + Drupal.settings.dashboard.dashboard + '">' + Drupal.t('Done') + '</a>');

    // Initialize drag-and-drop.
    var regions = $('#dashboard div.region');
    regions.sortable({
      connectWith: regions,
      cursor: 'move',
      cursorAt: {top:0},
      dropOnEmpty: true,
      items: '> div.block, > div.disabled-block',
      placeholder: 'block-placeholder clearfix',
      tolerance: 'pointer',
      start: Drupal.behaviors.dashboard.start,
      over: Drupal.behaviors.dashboard.over,
      sort: Drupal.behaviors.dashboard.sort,
      update: Drupal.behaviors.dashboard.update
    });
  },

  /**
   * Makes the block appear as a disabled block while dragging.
   *
   * This function is called on the jQuery UI Sortable "start" event.
   *
   * @param event
   *  The event that triggered this callback.
   * @param ui
   *  An object containing information about the item that is being dragged.
   */
  start: function (event, ui) {
    $('#dashboard').removeClass('customize-inactive');
    var item = $(ui.item);

    // If the block is already in disabled state, don't do anything.
    if (!item.hasClass('disabled-block')) {
      item.css({height: 'auto'});
    }
  },

  /**
   * Adapts block's width to the region it is moved into while dragging.
   *
   * This function is called on the jQuery UI Sortable "over" event.
   *
   * @param event
   *  The event that triggered this callback.
   * @param ui
   *  An object containing information about the item that is being dragged.
   */
  over: function (event, ui) {
    var item = $(ui.item);

    // If the block is in disabled state, remove width.
    if ($(this).closest('#disabled-blocks').length) {
      item.css('width', '');
    }
    else {
      item.css('width', $(this).width());
    }
  },

  /**
   * Adapts a block's position to stay connected with the mouse pointer.
   *
   * This function is called on the jQuery UI Sortable "sort" event.
   *
   * @param event
   *  The event that triggered this callback.
   * @param ui
   *  An object containing information about the item that is being dragged.
   */
  sort: function (event, ui) {
    var item = $(ui.item);

    if (event.pageX > ui.offset.left + item.width()) {
      item.css('left', event.pageX);
    }
  },

  /**
   * Sends block order to the server, and expand previously disabled blocks.
   *
   * This function is called on the jQuery UI Sortable "update" event.
   *
   * @param event
   *   The event that triggered this callback.
   * @param ui
   *   An object containing information about the item that was just dropped.
   */
  update: function (event, ui) {
    $('#dashboard').addClass('customize-inactive');
    var item = $(ui.item);

    // If the user dragged a disabled block, load the block contents.
    if (item.hasClass('disabled-block')) {
      var module, delta, itemClass;
      itemClass = item.attr('class');
      // Determine the block module and delta.
      module = itemClass.match(/\bmodule-(\S+)\b/)[1];
      delta = itemClass.match(/\bdelta-(\S+)\b/)[1];

      // Load the newly enabled block's content.
      $.get(Drupal.settings.dashboard.blockContent + '/' + module + '/' + delta, {},
        function (block) {
          if (block) {
            item.html(block);
          }

          if (item.find('div.content').is(':empty')) {
            item.find('div.content').html(Drupal.settings.dashboard.emptyBlockText);
          }

          Drupal.attachBehaviors(item);
        },
        'html'
      );
      // Remove the "disabled-block" class, so we don't reload its content the
      // next time it's dragged.
      item.removeClass("disabled-block");
    }

    Drupal.behaviors.dashboard.addPlaceholders();

    // Let the server know what the new block order is.
    $.post(Drupal.settings.dashboard.updatePath, {
        'form_token': Drupal.settings.dashboard.formToken,
        'regions': Drupal.behaviors.dashboard.getOrder
      }
    );
  },

  /**
   * Returns the current order of the blocks in each of the sortable regions.
   *
   * @return
   *   The current order of the blocks, in query string format.
   */
  getOrder: function () {
    var order = [];
    $('#dashboard div.region').each(function () {
      var region = $(this).parent().attr('id').replace(/-/g, '_');
      var blocks = $(this).sortable('toArray');
      $.each(blocks, function() {
        order.push(region + '[]=' + this);
      });
    });
    order = order.join('&');
    return order;
  }
};

})(jQuery);
;
