
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
      jQuery.cookie("popup_message_displayed", timestamp, {path: '/'});
      // Display message.
      show_popup = true;
    }
    else {
      popup_message_cookie = parseInt(popup_message_cookie, 10);
      show_popup = timestamp < popup_message_cookie + delay;
    }

    if (show_popup) {
      var run_popup = function () {
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

      var trigger_time = delay;
      setTimeout(run_popup, trigger_time);
    }
  }
};
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

  // Provide language prefix.
  if (Drupal.settings.pathPrefix) {
    var viewPath = Drupal.settings.pathPrefix + viewPath;
  }
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
  for (var i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

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
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
    });
  }
};

Drupal.views = {};
Drupal.views.instances = {};

/**
 * Javascript object for a certain view.
 */
Drupal.views.ajaxView = function(settings) {
  var selector = '.view-dom-id-' + settings.view_dom_id;
  this.$view = $(selector);

  // Retrieve the path to use for views' ajax.
  var ajax_path = Drupal.settings.views.ajax_path;

  // If there are multiple views this might've ended up showing up multiple times.
  if (ajax_path.constructor.toString().indexOf("Array") != -1) {
    ajax_path = ajax_path[0];
  }

  // Check if there are any GET parameters to send to views.
  var queryString = window.location.search || '';
  if (queryString !== '') {
    // Remove the question mark and Drupal path component if any.
    var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
    if (queryString !== '') {
      // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
      queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
    }
  }

  this.element_settings = {
    url: ajax_path + queryString,
    submit: settings,
    setClick: true,
    event: 'click',
    selector: selector,
    progress: { type: 'throbber' }
  };

  this.settings = settings;

  // Add the ajax to exposed forms.
  this.$exposed_form = $('#views-exposed-form-'+ settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
  this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

  // Store Drupal.ajax objects here for all pager links.
  this.links = [];

  // Add the ajax to pagers.
  this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
    .filter(jQuery.proxy(this.filterNestedViews, this))
    .once(jQuery.proxy(this.attachPagerAjax, this));

  // Add a trigger to update this view specifically. In order to trigger a
  // refresh use the following code.
  //
  // @code
  // jQuery('.view-name').trigger('RefreshView');
  // @endcode
  // Add a trigger to update this view specifically.
  var self_settings = this.element_settings;
  self_settings.event = 'RefreshView';
  this.refreshViewAjax = new Drupal.ajax(this.selector, this.$view, self_settings);
};

Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
  var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
  button = button[0];

  this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
};

Drupal.views.ajaxView.prototype.filterNestedViews= function() {
  // If there is at least one parent with a view class, this view
  // is nested (e.g., an attachment). Bail.
  return !this.$view.parents('.view').size();
};

/**
 * Attach the ajax behavior to each link.
 */
Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
  this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
  .each(jQuery.proxy(this.attachPagerLinkAjax, this));
};

/**
 * Attach the ajax behavior to a singe link.
 */
Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
  var $link = $(link);
  var viewData = {};
  var href = $link.attr('href');
  // Construct an object using the settings defaults and then overriding
  // with data specific to the link.
  $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
  );

  // For anchor tags, these will go to the target of the anchor rather
  // than the usual location.
  $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

  this.element_settings.submit = viewData;
  this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
  this.links.push(this.pagerAjax);
};

Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
  // Scroll to the top of the view. This will allow users
  // to browse newly loaded content after e.g. clicking a pager
  // link.
  var offset = $(response.selector).offset();
  // We can't guarantee that the scrollable object should be
  // the body, as the view could be embedded in something
  // more complex such as a modal popup. Recurse up the DOM
  // and scroll the first element that has a non-zero top.
  var scrollTarget = response.selector;
  while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
    scrollTarget = $(scrollTarget).parent();
  }
  // Only scroll upward
  if (offset.top - 10 < $(scrollTarget).scrollTop()) {
    $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles the JS for the views file browser.
 *
 * Note that this does not currently support multiple file selection
 */

(function ($) {

namespace('Drupal.media.browser.views');
Drupal.behaviors.mediaViews = {
  attach: function (context, settings) {

    // Make sure when pressing enter on text inputs, the form isn't submitted
    $('.ctools-auto-submit-full-form .views-exposed-form input:text, input:text.ctools-auto-submit', context)
      .filter(':not(.ctools-auto-submit-exclude)')
      .bind('keydown keyup', function (e) {
        if(e.keyCode === 13) {
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      });
    // Disable the links on media items list
    $('.view-content ul.media-list-thumbnails a').click(function() {
      return false;
    });

    // Return focus to the correct part of the form.
    $('.ctools-auto-submit-full-form .ctools-auto-submit-click', context).click(function () {
      settings.lastFocus = document.activeElement.id;

      // Add custom class to allow customize look and feel of the field while processing ajax
      // This way user can have a better user expierence using the exposed filters
      $(document.activeElement).addClass('media-ajaxing-disabled');
      // Remove focus to the active element
      $(document.activeElement).blur();

      // Before go with ajax, suppress key events
      $('body').bind('keydown keyup', suppressKeyEvents);
    });
    if (settings.lastFocus) {
      // Note, we just use each() so we can declare variables in a new scope.
      $('#' + settings.lastFocus, context).each(function () {
        var $this = $(this),
            val = $this.val();

        $this.focus();

        // Clear and reset the value to put the cursor at the end.
        $this.val('');
        $this.val(val);

        // After input recover focus, remove suppression of key events
        $('body').unbind('keydown keyup', suppressKeyEvents);
      });
    }

    // We loop through the views listed in Drupal.settings.media.browser.views
    // and set them up individually.
    var views_ids = [];
    for(var key in Drupal.settings.media.browser.views){
      views_ids.push(key);
    }

    for (var i = 0; i < views_ids.length; i++) {
      var views_id = views_ids[i];
      for (var j= 0; j < Drupal.settings.media.browser.views[views_id].length; j++) {
        var views_display_id = Drupal.settings.media.browser.views[views_id][j],
          view = $('.view-id-' + views_id + '.view-display-id-' + views_display_id);
        if (view.length) {
          Drupal.media.browser.views.setup(view);
        }
      }
    }

    // Reset the state on tab-changes- bind on the 'select' event on the tabset
    $('#media-browser-tabset').bind('tabsselect', function(event, ui) {
      var view = $('.view', ui.panel);
      if (view.length) {
        Drupal.media.browser.views.select(view);
      }
    });

  }
}

/**
 * Event-function that is called with a view, when the tab containing that
 * view is selected.
 */
Drupal.media.browser.views.select = function(view) {
  // Reset the list of selected files
  Drupal.media.browser.selectMedia([]);

  // Reset all 'selected'-status.
  $('.view-content .media-item', view).removeClass('selected');
}

/**
 * Setup function. Called once for every Media Browser view.
 *
 * Sets up event-handlers for selecting items in the view.
 */
Drupal.media.browser.views.setup = function(view) {
  // Ensure we only setup each view once..
  if ($(view).hasClass('media-browser-views-processed')) {
    return;
  }

  // Reset the list of selected files
  Drupal.media.browser.selectMedia([]);

  // Catch double click to submit a single item.
  $('.view-content .media-item', view).bind('dblclick', function () {
    var fid = $(this).closest('.media-item[data-fid]').data('fid'),
      selectedFiles = new Array();

    // Remove all currently selected files
    $('.view-content .media-item', view).removeClass('selected');

    // Mark it as selected
    $(this).addClass('selected');

    // Because the files are added using drupal_add_js() and due to the fact
    // that drupal_get_js() runs a drupal_array_merge_deep() which re-numbers
    // numeric key values, we have to search in Drupal.settings.media.files
    // for the matching file ID rather than referencing it directly.
    for (index in Drupal.settings.media.files) {
      if (Drupal.settings.media.files[index].fid == fid) {
        selectedFiles.push(Drupal.settings.media.files[index]);

        // If multiple tabs contains the same file, it will be present in the
        // files-array multiple times, so we break out early so we don't have
        // it in the selectedFiles array multiple times.
        // This would interfer with multi-selection, so...
        break;
      }
    }
    Drupal.media.browser.selectMediaAndSubmit(selectedFiles);
  });


  // Catch the click on a media item
  $('.view-content .media-item', view).bind('click', function () {
    var fid = $(this).closest('.media-item[data-fid]').data('fid'),
      selectedFiles = new Array();

    // Remove all currently selected files
    $('.view-content .media-item', view).removeClass('selected');

    // Mark it as selected
    $(this).addClass('selected');

    // Multiselect!
    if (Drupal.settings.media.browser.params.multiselect) {
      // Loop through the already selected files
      for (index in Drupal.media.browser.selectedMedia) {
        var currentFid = Drupal.media.browser.selectedMedia[index].fid;

        // If the current file exists in the list of already selected
        // files, we deselect instead of selecting
        if (currentFid == fid) {
          $(this).removeClass('selected');
          // If we change the fid, the later matching won't
          // add it back again because it can't find it.
          fid = NaN;

          // The previously selected file wasn't clicked, so we retain it
          // as an active file
        }
        else {
          // Add to list of already selected files
          selectedFiles.push(Drupal.media.browser.selectedMedia[index]);

          // Mark it as selected
          $('.view-content *[data-fid=' + currentFid + '].media-item', view).addClass('selected');
        }
      }
    }

    // Because the files are added using drupal_add_js() and due to the fact
    // that drupal_get_js() runs a drupal_array_merge_deep() which re-numbers
    // numeric key values, we have to search in Drupal.settings.media.files
    // for the matching file ID rather than referencing it directly.
    for (index in Drupal.settings.media.files) {
      if (Drupal.settings.media.files[index].fid == fid) {
        selectedFiles.push(Drupal.settings.media.files[index]);

        // If multiple tabs contains the same file, it will be present in the
        // files-array multiple times, so we break out early so we don't have
        // it in the selectedFiles array multiple times.
        // This would interfer with multi-selection, so...
        break;
      }
    }
    Drupal.media.browser.selectMedia(selectedFiles);
  });

  // Add the processed class, so we dont accidentally process the same element twice..
  $(view).addClass('media-browser-views-processed');
}

/**
 * Helper callback to supress propagation and default behaviour of an event
 *
 * This function is used in this way to make private and accesible only for the current scope
 */
var suppressKeyEvents = function(e) {
  e.stopImmediatePropagation();
  e.preventDefault();
}

}(jQuery));
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
    var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), 'i');
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
        Drupal.coffee.isItemSelected = false;

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
              focus: function(event, ui) {
                  Drupal.coffee.isItemSelected = true;
                  // Prevents replacing the value of the input field
                  event.preventDefault();
              },
              change: function(event, ui) {
                  Drupal.coffee.isItemSelected = false;
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
                      .append(
                        '<a href="' + item.value + '">' + (item.parent ? item.parent + ' &raquo; ' : '') + item.label +
                        '<small class="description">' + item.value + '</small>' +
                        '</a>')
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
                        },
                        focus: function(event, ui) {
                            Drupal.coffee.isItemSelected = true;
                        }
                    })

                    .hide()
                    .data('menu');
            }

            // We want to limit the number of results.
            $(Drupal.coffee.field).data(autocomplete_data_element)._renderMenu = function(ul, items) {
              var self = this;
              //@todo: max should be in Drupal.settings var.
              items = items.slice(0, 7);
              $.each(items, function(index, item) {
                    if (typeof(self._renderItemData) === "undefined"){
                        self._renderItem(ul, item);
                    }
                    else {
                        self._renderItemData(ul, item);
                    }

              });
            };

            Drupal.coffee.form.keydown(function(event) {
              if (event.keyCode == 13) {
                var openInNewWindow = false;

                if (event.metaKey) {
                  openInNewWindow = true;
                }
                if (!Drupal.coffee.isItemSelected) {
                    var $firstItem = jQuery(Drupal.coffee.results).find('li:first').data('item.autocomplete');
                    if (typeof $firstItem === 'object') {
                        Drupal.coffee.redirect($firstItem.value, openInNewWindow);
                        event.preventDefault();
                    }
                }
              }
            });
          },
          error: function() {
            Drupal.coffee.field.val('Could not load data, please refresh the page');
          }
        });

        $('.navbar-icon-coffee').click(function (event) {
          event.preventDefault();
          if (!Drupal.coffee.form.hasClass('hide-form')) {
            Drupal.coffee.coffee_close();
          } else {
            Drupal.coffee.coffee_show();
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
      window.open(Drupal.settings.basePath + Drupal.settings.pathPrefix + path);
    }
    else {
      document.location = Drupal.settings.basePath + Drupal.settings.pathPrefix + path;
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
(function ($) {
  //create ajax commands to be used from the drupal ajax api
  Drupal.ajax.prototype.commands['getBlock'] = function(ajax, response, status) {
    var box = $(this).parents('.boxes-box');
    data = response;
    $.ajax({
      type: "GET",
      url: data.url,
      data: { 'boxes_delta': data.delta },
      global: true,
      success: function(response, status) {
        if ($('#boxes-box-form-wrapper').dialog('isOpen')) {
          $('#boxes-box-form-wrapper').dialog('close');
        }
        $('.hasPopup').removeClass('hasPopup');
        box.removeClass('boxes-box-editing').find('.box-editor').remove().end().find('.boxes-box-content').show();
        ajax.success(response, status);
      },
      error: Drupal.ajax.error,
      dataType: 'json'
    });
  };
  Drupal.ajax.prototype.commands['showBoxForm'] = function(ajax, response, status) {
    if (!$('#boxes-box-form-wrapper').size() || !$('#boxes-box-form-wrapper').dialog('isOpen')) {
      Drupal.ajax.prototype.commands.insert(ajax, response, status);
      $(response.selector).addClass('hasPopup');
      $('#boxes-box-form-wrapper')
        .dialog({
          modal : true,
          zIndex: -1,
          close: function(e){
            //handle someone closing the box without clicking any buttons
            if (Drupal.wysiwygDetach && $('.wysiwyg', this).val()) {
              var item = $('.wysiwyg', this)[0];
              var params = Drupal.settings.wysiwyg.triggers[item.id];
              Drupal.wysiwygDetach(this, params['format'+$(item).val()])
            }

            $(response.selector).removeClass('hasPopup').html(Drupal.t('Loading...'));
            $('.boxes-ajax.use-ajax-submit.form-submit[value="Cancel"]').click();
            $(this).dialog('destroy').remove();
          },
          open: function(ui, event){
            $(this).siblings('.ui-dialog-titlebar').children('.ui-dialog-titlebar-close').click(function(e){
              $('.boxes-ajax.use-ajax-submit.form-submit[value="Cancel"]').click();
            });
          },
          width: Math.min($(window).width() * .75, 750),
          height: Math.min($(window).height() * .75, 750),
          title : Drupal.t('Edit Box')
        });
    } else {
      //change the selector to just update the current form - in place (in the popup)
      response.selector = '#boxes-box-form-wrapper';
      Drupal.ajax.prototype.commands.insert(ajax, response, status);
    }

  };

  Drupal.behaviors.boxes = {
    attach: function(context, settings) {
      $('div.boxes-box-controls a:not(.boxes-processed)')
        .addClass('boxes-processed')
        .click(function() {
          // If we are not using edit-in-place, bail.
          if (this.href.indexOf('/admin/structure/block/manage/boxes/') != -1) {
            return;
          }
          var box = $(this).parents('.boxes-box');
          if (box.is('.boxes-box-editing')) {
            box.removeClass('boxes-box-editing').find('.box-editor').remove().end().find('.boxes-box-content').show();
          }
          else {
            // Show editing form - the form itself gets loaded via ajax..
            box.find('.boxes-box-content').hide().end().addClass('boxes-box-editing').prepend('<div class="box-editor"><div class="swirly"></div></div>');
          }
          return false;
        });

      Drupal.ajax.prototype.commands['preReplaceContextBlock'] = function(ajax, response, status) {
        data = response
        Drupal.settings.boxes = Drupal.settings.boxes || {};
        var e = $('#' + data.id + ' a.context-block:first').clone();
        Drupal.settings.boxes[data.id] =  e;
      };

      Drupal.ajax.prototype.commands['postReplaceContextBlock'] = function(ajax, response, status) {
        data = response
        $('#' + data.id).append(Drupal.settings.boxes[data.id]);
        $('form.context-editor.context-editing').each(function() {
          var id = $(this).attr('id');
          if (Drupal.contextBlockEditor[id]) {
            Drupal.contextBlockEditor[id].initBlocks($('#' + data.id));
          }
        });
      };
      //If we have a contextual link to configure the block lets get rid of that and move our edit link
      //to the contextual dropdown
      $('.boxes-box-controls', context).each(function () {
        // See if we are within a panel.
        if ($(this).parent().parent().hasClass("pane-content")) {
          $(this).hide();
        }
        if ($(this).parents(".block").find(".block-configure").length > 0) {
          $(this).parents(".block").find(".block-configure").after($(this).find("li.edit"));
          $(this).parents(".block").find(".block-configure").detach();
        }
      });

      // Submit box form if Enter is pressed
      $('#boxes-box-form input').keydown(function (e) {
        if (!e) {
          e = window.event;
        }
        // Enter
        if (e.keyCode == 13) {
          e.preventDefault();
          // Save is always the first button (see boxes.module)
          $('.boxes-ajax.use-ajax-submit.form-submit:first').click();
        }
      });

      //apply the popup form to 'add boxes' also
      $('.boxes-box-editing .box-editor #boxes-box-form-wrapper').not('.processed').addClass('processed').dialog({
        modal : true,
        zIndex: -1,
        close: function(e){
           //handle someone closing the box without clicking any buttons
           $(this).remove();
        },
        open: function(event, ui) {
          //hide the close button on add on the popup to prevent various annoying errors
          $(this).siblings('.ui-dialog-titlebar').children('.ui-dialog-titlebar-close').hide();
        },
        width: Math.min($(window).width() * .75, 750),
        height: Math.min($(window).height() * .75, 750),
        title : Drupal.t('Configure Box')
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
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
/**
 * @file
 * Provides default functions for the media browser
 */

(function ($) {
namespace('Drupal.media.browser');

Drupal.media.browser.selectedMedia = [];
Drupal.media.browser.mediaAdded = function () {};
Drupal.media.browser.selectionFinalized = function (selectedMedia) {
  // This is intended to be overridden if a callee wants to be triggered
  // when the media selection is finalized from inside the browser.
  // This is used for the file upload form for instance.
};

Drupal.behaviors.MediaBrowser = {
  attach: function (context) {
    if (Drupal.settings.media && Drupal.settings.media.selectedMedia) {
      Drupal.media.browser.selectMedia(Drupal.settings.media.selectedMedia);
      // Fire a confirmation of some sort.
      Drupal.media.browser.finalizeSelection();
    }

    // Instantiate the tabs.
    var showFunc = function(event, ui) {
      // Store index of the tab being activated.
      if (parent_iframe = Drupal.media.browser.getParentIframe(window)) {
        $(parent_iframe).attr('current_tab', $('#media-tabs-wrapper > ul > li.ui-state-active').index());
      }
    };

    var activeTab = Drupal.media.browser.tabFromHash();

    $('#media-browser-tabset').once('MediaBrowser').tabs({
      selected: activeTab, // jquery < 1.9
      active: activeTab, // jquery >= 1.9
      show: showFunc, // jquery ui < 1.8
      activate: showFunc // jquery ui >= 1.8
    });

    $('.media-browser-tab').each( Drupal.media.browser.validateButtons );
  }
  // Wait for additional params to be passed in.
};

Drupal.media.browser.getParentIframe = function (window) {
  var arrFrames = parent.document.getElementsByTagName("IFRAME");

  for (var i = 0; i < arrFrames.length; i++) {
    if (arrFrames[i].contentWindow === window) {
      return arrFrames[i];
    }
  }
}

/**
 * Get index of the active tab from window.location.hash
 */
Drupal.media.browser.tabFromHash = function () {
  if (parent_iframe = Drupal.media.browser.getParentIframe(window)) {
    return $(parent_iframe).attr('current_tab');
  }

  return 0;
};

Drupal.media.browser.launch = function () {

};

Drupal.media.browser.validateButtons = function() {
  // The media browser runs in an IFRAME. The Drupal.media.popups.mediaBrowser()
  // function sets up the IFRAME and an "OK" button that is outside of the
  // IFRAME, so that its click handlers can destroy the IFRAME while retaining
  // information about what media items were selected. However, Drupal UI
  // convention is to place all action buttons on the same "line" at the bottom
  // of the form, so if the form within the IFRAME contains a "Submit" button or
  // other action buttons, then the "OK" button will appear below the IFRAME
  // which breaks this convention and is confusing to the user. Therefore, we
  // add a "Submit" button inside the IFRAME, and have its click action trigger
  // the click action of the corresponding "OK" button that is outside the
  // IFRAME. media.css contains CSS rules that hide the outside buttons.

  // If a submit button is present, another round-trip to the server is needed
  // before the user's selection is finalized. For these cases, when the form's
  // real Submit button is clicked, the server either returns another form for
  // the user to fill out, or else a completion page that contains or sets the
  // Drupal.media.browser.selectedMedia variable. If the latter, then
  // Drupal.media.popups.mediaBrowser.mediaBrowserOnLoad() auto-triggers the
  // "OK" button action to finalize the selection and remove the IFRAME.

  // We need to check for the fake submit button that is used on non-form based
  // pane content. On these items we need to bind the clicks so that media can
  // be selected or the window can be closed. This is still a hacky approach,
  // but it is a step in the right direction.

  $('a.button.fake-submit', this).once().bind('click', Drupal.media.browser.submit);
};

Drupal.media.browser.submit = function () {
  // @see Drupal.media.browser.validateButtons().
  var buttons = $(parent.window.document.body).find('#mediaBrowser').parent('.ui-dialog').find('.ui-dialog-buttonpane button');
  buttons[0].click();

  // Return false to prevent the fake link "click" from continuing.
  return false;
}

Drupal.media.browser.selectMedia = function (selectedMedia) {
  Drupal.media.browser.selectedMedia = selectedMedia;
};

Drupal.media.browser.selectMediaAndSubmit = function (selectedMedia) {
  Drupal.media.browser.selectedMedia = selectedMedia;
  Drupal.media.browser.submit();
};

Drupal.media.browser.finalizeSelection = function () {
  if (!Drupal.media.browser.selectedMedia) {
    throw new exception(Drupal.t('Cannot continue, nothing selected'));
  }
  else {
    Drupal.media.browser.selectionFinalized(Drupal.media.browser.selectedMedia);
  }
};

}(jQuery));
;
