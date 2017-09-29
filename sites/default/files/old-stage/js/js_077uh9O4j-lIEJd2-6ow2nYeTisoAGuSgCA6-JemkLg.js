
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
 * Implement a simple, clickable dropbutton menu.
 *
 * See dropbutton.theme.inc for primary documentation.
 *
 * The javascript relies on four classes:
 * - The dropbutton must be fully contained in a div with the class
 *   ctools-dropbutton. It must also contain the class ctools-no-js
 *   which will be immediately removed by the javascript; this allows for
 *   graceful degradation.
 * - The trigger that opens the dropbutton must be an a tag wit hthe class
 *   ctools-dropbutton-link. The href should just be '#' as this will never
 *   be allowed to complete.
 * - The part of the dropbutton that will appear when the link is clicked must
 *   be a div with class ctools-dropbutton-container.
 * - Finally, ctools-dropbutton-hover will be placed on any link that is being
 *   hovered over, so that the browser can restyle the links.
 *
 * This tool isn't meant to replace click-tips or anything, it is specifically
 * meant to work well presenting menus.
 */

(function ($) {
  Drupal.behaviors.CToolsDropbutton = {
    attach: function() {
      // Process buttons. All dropbuttons are buttons.
      $('.ctools-button')
        .once('ctools-button')
        .removeClass('ctools-no-js');

      // Process dropbuttons. Not all buttons are dropbuttons.
      $('.ctools-dropbutton').once('ctools-dropbutton', function() {
        var $dropbutton = $(this);
        var $button = $('.ctools-content', $dropbutton);
        var $secondaryActions = $('li', $button).not(':first');
        var $twisty = $(".ctools-link", $dropbutton);
        var open = false;
        var hovering = false;
        var timerID = 0;

        var toggle = function(close) {
          // if it's open or we're told to close it, close it.
          if (open || close) {
            // If we're just toggling it, close it immediately.
            if (!close) {
              open = false;
              $secondaryActions.slideUp(100);
              $dropbutton.removeClass('open');
            }
            else {
              // If we were told to close it, wait half a second to make
              // sure that's what the user wanted.
              // Clear any previous timer we were using.
              if (timerID) {
                clearTimeout(timerID);
              }
              timerID = setTimeout(function() {
                if (!hovering) {
                  open = false;
                  $secondaryActions.slideUp(100);
                  $dropbutton.removeClass('open');
                }}, 500);
            }
          }
          else {
            // open it.
            open = true;
            $secondaryActions.animate({height: "show", opacity: "show"}, 100);
            $dropbutton.addClass('open');
          }
        }
        // Hide the secondary actions initially.
        $secondaryActions.hide();

        $twisty.click(function() {
            toggle();
            return false;
          });

        $dropbutton.hover(
          function() {
            hovering = true;
          }, // hover in
          function() { // hover out
            hovering = false;
            toggle(true);
            return false;
          }
        );
      });
    }
  }
})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
(function($){
/**
 * To make a form auto submit, all you have to do is 3 things:
 *
 * ctools_add_js('auto-submit');
 *
 * On gadgets you want to auto-submit when changed, add the ctools-auto-submit
 * class. With FAPI, add:
 * @code
 *  '#attributes' => array('class' => array('ctools-auto-submit')),
 * @endcode
 *
 * If you want to have auto-submit for every form element,
 * add the ctools-auto-submit-full-form to the form. With FAPI, add:
 * @code
 *   '#attributes' => array('class' => array('ctools-auto-submit-full-form')),
 * @endcode
 *
 * If you want to exclude a field from the ctool-auto-submit-full-form auto submission,
 * add the class ctools-auto-submit-exclude to the form element. With FAPI, add:
 * @code
 *   '#attributes' => array('class' => array('ctools-auto-submit-exclude')),
 * @endcode
 *
 * Finally, you have to identify which button you want clicked for autosubmit.
 * The behavior of this button will be honored if it's ajaxy or not:
 * @code
 *  '#attributes' => array('class' => array('ctools-use-ajax', 'ctools-auto-submit-click')),
 * @endcode
 *
 * Currently only 'select', 'radio', 'checkbox' and 'textfield' types are supported. We probably
 * could use additional support for HTML5 input types.
 */

Drupal.behaviors.CToolsAutoSubmit = {
  attach: function(context) {
    // 'this' references the form element
    function triggerSubmit (e) {
      var $this = $(this);
      if (!$this.hasClass('ctools-ajaxing')) {
        $this.find('.ctools-auto-submit-click').click();
      }
    }

    // the change event bubbles so we only need to bind it to the outer form
    $('form.ctools-auto-submit-full-form', context)
      .add('.ctools-auto-submit', context)
      .filter('form, select, input:not(:text, :submit)')
      .once('ctools-auto-submit')
      .change(function (e) {
        // don't trigger on text change for full-form
        if ($(e.target).is(':not(:text, :submit, .ctools-auto-submit-exclude)')) {
          triggerSubmit.call(e.target.form);
        }
      });

    // e.keyCode: key
    var discardKeyCode = [
      16, // shift
      17, // ctrl
      18, // alt
      20, // caps lock
      33, // page up
      34, // page down
      35, // end
      36, // home
      37, // left arrow
      38, // up arrow
      39, // right arrow
      40, // down arrow
       9, // tab
      13, // enter
      27  // esc
    ];
    // Don't wait for change event on textfields
    $('.ctools-auto-submit-full-form input:text, input:text.ctools-auto-submit', context)
      .filter(':not(.ctools-auto-submit-exclude)')
      .once('ctools-auto-submit', function () {
        // each textinput element has his own timeout
        var timeoutID = 0;
        $(this)
          .bind('keydown keyup', function (e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID && clearTimeout(timeoutID);
            }
          })
          .keyup(function(e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID = setTimeout($.proxy(triggerSubmit, this.form), 500);
            }
          })
          .bind('change', function (e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID = setTimeout($.proxy(triggerSubmit, this.form), 500);
            }
          });
      });
  }
}
})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
/**
 * @file
 * Javascript related to the main view list.
 */
(function ($) {

Drupal.behaviors.viewsUIList = {
  attach: function (context) {
    $('#ctools-export-ui-list-items thead a').once('views-ajax-processed').each(function() {
      $(this).click(function() {
        var query = $.deparam.querystring(this.href);
        $('#ctools-export-ui-list-form select[name=order]').val(query['order']);
        $('#ctools-export-ui-list-form select[name=sort]').val(query['sort']);
        $('#ctools-export-ui-list-form input.ctools-auto-submit-click').trigger('click');
        return false;
      });
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');
  this.displayWeight = null;

  // React to columns change to avoid making checks in the scroll callback.
  this.originalTable.bind('columnschange', function (e, display) {
    // This will force header size to be calculated on scroll.
    self.widthCalculated = (self.displayWeight !== null && self.displayWeight === display);
    self.displayWeight = display;
  });

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    var $that = null;
    var $stickyCell = null;
    var display = null;
    var cellWidth = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.originalHeaderCells.length; i < il; i += 1) {
      $that = $(this.originalHeaderCells[i]);
      $stickyCell = this.stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        cellWidth = $that.css('width');
        // Exception for IE7.
        if (cellWidth === 'auto') {
          cellWidth = $that[0].clientWidth + 'px';
        }
        $stickyCell.css({'width': cellWidth, 'display': display});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.stickyTable.css('width', this.originalTable.outerWidth());
  }
};

})(jQuery);
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
