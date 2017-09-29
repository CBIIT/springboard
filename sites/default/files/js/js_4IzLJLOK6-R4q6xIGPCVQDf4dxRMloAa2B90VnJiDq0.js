
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
 * Attaches the calendar behavior to all required fields
 */
(function($) {
  function makeFocusHandler(e) {
    if (!$(this).hasClass('date-popup-init')) {
      var datePopup = e.data;
      // Explicitely filter the methods we accept.
      switch (datePopup.func) {
        case 'datepicker':
          $(this)
            .datepicker(datePopup.settings)
            .addClass('date-popup-init');
          $(this).click(function(){
            $(this).focus();
          });
          if (datePopup.settings.syncEndDate) {
            $('.start-date-wrapper').each(function(){
              var start_date_wrapper = this;
              $(this).find('input:eq(0)').change(function(){
                $(start_date_wrapper).next('.end-date-wrapper').find('input:eq(0)').val($(this).val());
              });
            });
          }
          break;

        case 'timeEntry':
          $(this)
            .timeEntry(datePopup.settings)
            .addClass('date-popup-init');
          $(this).click(function(){
            $(this).focus();
          });
          break;

        case 'timepicker':
          // Translate the PHP date format into the style the timepicker uses.
          datePopup.settings.timeFormat = datePopup.settings.timeFormat
            // 12-hour, leading zero,
            .replace('h', 'hh')
            // 12-hour, no leading zero.
            .replace('g', 'h')
            // 24-hour, leading zero.
            .replace('H', 'HH')
            // 24-hour, no leading zero.
            .replace('G', 'H')
            // AM/PM.
            .replace('A', 'p')
            // Minutes with leading zero.
            .replace('i', 'mm')
            // Seconds with leading zero.
            .replace('s', 'ss');

          datePopup.settings.startTime = new Date(datePopup.settings.startTime);
          $(this)
            .timepicker(datePopup.settings)
            .addClass('date-popup-init');
          $(this).click(function(){
            $(this).focus();
          });
          break;
      }
    }
  }

  Drupal.behaviors.date_popup = {
    attach: function (context) {
      for (var id in Drupal.settings.datePopup) {
        $('#'+ id).bind('focus', Drupal.settings.datePopup[id], makeFocusHandler);
      }
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
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.menuFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.menu-link-form', context).drupalSetSummary(function (context) {
      if ($('.form-item-menu-enabled input', context).is(':checked')) {
        return Drupal.checkPlain($('.form-item-menu-link-title input', context).val());
      }
      else {
        return Drupal.t('Not in menu');
      }
    });
  }
};

/**
 * Automatically fill in a menu link title, if possible.
 */
Drupal.behaviors.menuLinkAutomaticTitle = {
  attach: function (context) {
    $('fieldset.menu-link-form', context).each(function () {
      // Try to find menu settings widget elements as well as a 'title' field in
      // the form, but play nicely with user permissions and form alterations.
      var $checkbox = $('.form-item-menu-enabled input', this);
      var $link_title = $('.form-item-menu-link-title input', context);
      var $title = $(this).closest('form').find('.form-item-title input');
      // Bail out if we do not have all required fields.
      if (!($checkbox.length && $link_title.length && $title.length)) {
        return;
      }
      // If there is a link title already, mark it as overridden. The user expects
      // that toggling the checkbox twice will take over the node's title.
      if ($checkbox.is(':checked') && $link_title.val().length) {
        $link_title.data('menuLinkAutomaticTitleOveridden', true);
      }
      // Whenever the value is changed manually, disable this behavior.
      $link_title.keyup(function () {
        $link_title.data('menuLinkAutomaticTitleOveridden', true);
      });
      // Global trigger on checkbox (do not fill-in a value when disabled).
      $checkbox.change(function () {
        if ($checkbox.is(':checked')) {
          if (!$link_title.data('menuLinkAutomaticTitleOveridden')) {
            $link_title.val($title.val());
          }
        }
        else {
          $link_title.val('');
          $link_title.removeData('menuLinkAutomaticTitleOveridden');
        }
        $checkbox.closest('fieldset.vertical-tabs-pane').trigger('summaryUpdated');
        $checkbox.trigger('formUpdated');
      });
      // Take over any title change.
      $title.keyup(function () {
        if (!$link_title.data('menuLinkAutomaticTitleOveridden') && $checkbox.is(':checked')) {
          $link_title.val($title.val());
          $link_title.val($title.val()).trigger('formUpdated');
        }
      });
    });
  }
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.xmlsitemapFieldsetSummaries = {
  attach: function (context) {
    $('fieldset#edit-xmlsitemap', context).drupalSetSummary(function (context) {
      var vals = [];

      // Inclusion select field.
      var status = $('#edit-xmlsitemap-status option:selected').text();
      vals.push(Drupal.t('Inclusion: @value', { '@value': status }));

      // Priority select field.
      var priority = $('#edit-xmlsitemap-priority option:selected').text();
      vals.push(Drupal.t('Priority: @value', { '@value': priority }));

      return vals.join('<br />');
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.pathFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.path-form', context).drupalSetSummary(function (context) {
      var path = $('.form-item-path-alias input', context).val();
      var automatic = $('.form-item-path-pathauto input', context).attr('checked');

      if (automatic) {
        return Drupal.t('Automatic alias');
      }
      else if (path) {
        return Drupal.t('Alias: @alias', { '@alias': path });
      }
      else {
        return Drupal.t('No alias');
      }
    });
  }
};

})(jQuery);
;
/**
 * @file
 * Custom JS for controlling the Metatag vertical tab.
 */

(function ($) {
  'use strict';

Drupal.behaviors.metatagFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.metatags-form', context).drupalSetSummary(function (context) {
      var vals = [];
      $("input[type='text'], select, textarea", context).each(function() {
        var input_field = $(this).attr('name');
        // Verify the field exists before proceeding.
        if (input_field === undefined) {
          return false;
        }
        var default_name = input_field.replace(/\[value\]/, '[default]');
        var default_value = $("input[type='hidden'][name='" + default_name + "']", context);
        if (default_value.length && default_value.val() === $(this).val()) {
          // Meta tag has a default value and form value matches default value.
          return true;
        }
        else if (!default_value.length && !$(this).val().length) {
          // Meta tag has no default value and form value is empty.
          return true;
        }
        var label = $("label[for='" + $(this).attr('id') + "']").text();
        vals.push(Drupal.t('@label: @value', {
          '@label': $.trim(label),
          '@value': Drupal.truncate($(this).val(), 25) || Drupal.t('None')
        }));
      });
      if (vals.length === 0) {
        return Drupal.t('Using defaults');
      }
      else {
        return vals.join('<br />');
      }
    });
  }
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 */
Drupal.truncate = function (str, limit) {
  if (str.length > limit) {
    return str.substr(0, limit) + '...';
  }
  else {
    return str;
  }
};

})(jQuery);
;
(function ($) {

/**
 * Attaches the autocomplete behavior to all required fields.
 */
Drupal.behaviors.autocomplete = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.autocomplete', context).once('autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input.parent()
        .attr('role', 'application')
        .append($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      new Drupal.jsAC($input, acdb[uri]);
    });
  }
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('#autocomplete').each(function () {
    this.owner.hidePopup();
  }).length == 0;
};

/**
 * An AutoComplete object.
 */
Drupal.jsAC = function ($input, db) {
  var ac = this;
  this.input = $input[0];
  this.ariaLive = $('#' + this.input.id + '-autocomplete-aria-live');
  this.db = db;

  $input
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handler for the "keydown" event.
 */
Drupal.jsAC.prototype.onkeydown = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 40: // down arrow.
      this.selectDown();
      return false;
    case 38: // up arrow.
      this.selectUp();
      return false;
    default: // All other keys.
      return true;
  }
};

/**
 * Handler for the "keyup" event.
 */
Drupal.jsAC.prototype.onkeyup = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 16: // Shift.
    case 17: // Ctrl.
    case 18: // Alt.
    case 20: // Caps lock.
    case 33: // Page up.
    case 34: // Page down.
    case 35: // End.
    case 36: // Home.
    case 37: // Left arrow.
    case 38: // Up arrow.
    case 39: // Right arrow.
    case 40: // Down arrow.
      return true;

    case 9:  // Tab.
    case 13: // Enter.
    case 27: // Esc.
      this.hidePopup(e.keyCode);
      return true;

    default: // All other keys.
      if (input.value.length > 0 && !input.readOnly) {
        this.populatePopup();
      }
      else {
        this.hidePopup(e.keyCode);
      }
      return true;
  }
};

/**
 * Puts the currently highlighted suggestion into the autocomplete field.
 */
Drupal.jsAC.prototype.select = function (node) {
  this.input.value = $(node).data('autocompleteValue');
  $(this.input).trigger('autocompleteSelect', [node]);
};

/**
 * Highlights the next suggestion.
 */
Drupal.jsAC.prototype.selectDown = function () {
  if (this.selected && this.selected.nextSibling) {
    this.highlight(this.selected.nextSibling);
  }
  else if (this.popup) {
    var lis = $('li', this.popup);
    if (lis.length > 0) {
      this.highlight(lis.get(0));
    }
  }
};

/**
 * Highlights the previous suggestion.
 */
Drupal.jsAC.prototype.selectUp = function () {
  if (this.selected && this.selected.previousSibling) {
    this.highlight(this.selected.previousSibling);
  }
};

/**
 * Highlights a suggestion.
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('selected');
  }
  $(node).addClass('selected');
  this.selected = node;
  $(this.ariaLive).html($(this.selected).html());
};

/**
 * Unhighlights a suggestion.
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('selected');
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Hides the autocomplete suggestions.
 */
Drupal.jsAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed.
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.select(this.selected);
  }
  // Hide popup.
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function () { $(popup).remove(); });
  }
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Positions the suggestions popup and starts a search.
 */
Drupal.jsAC.prototype.populatePopup = function () {
  var $input = $(this.input);
  var position = $input.position();
  // Show popup.
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = $('<div id="autocomplete"></div>')[0];
  this.popup.owner = this;
  $(this.popup).css({
    top: parseInt(position.top + this.input.offsetHeight, 10) + 'px',
    left: parseInt(position.left, 10) + 'px',
    width: $input.innerWidth() + 'px',
    display: 'none'
  });
  $input.before(this.popup);

  // Do search.
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches.
  var ul = $('<ul></ul>');
  var ac = this;
  for (key in matches) {
    $('<li></li>')
      .html($('<div></div>').html(matches[key]))
      .mousedown(function () { ac.hidePopup(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', key)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  switch (status) {
    case 'begin':
      $(this.input).addClass('throbbing');
      $(this.ariaLive).html(Drupal.t('Searching for matches...'));
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $(this.input).removeClass('throbbing');
      break;
  }
};

/**
 * An AutoComplete DataBase object.
 */
Drupal.ACDB = function (uri) {
  this.uri = uri;
  this.delay = 300;
  this.cache = {};
};

/**
 * Performs a cached and delayed search.
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway. The pattern ../ is
  // stripped since it may be misinterpreted by the browser.
  searchString = searchString.replace(/^\s+|\.{2,}\/|\s+$/g, '');
  // Skip empty search strings, or search strings ending with a comma, since
  // that is the separator between search terms.
  if (searchString.length <= 0 ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before.
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search.
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function () {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion. We use Drupal.encodePath instead of
    // encodeURIComponent to allow autocomplete search terms to contain slashes.
    $.ajax({
      type: 'GET',
      url: db.uri + '/' + Drupal.encodePath(searchString),
      dataType: 'json',
      success: function (matches) {
        if (typeof matches.status == 'undefined' || matches.status != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see.
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        Drupal.displayAjaxError(Drupal.ajaxError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Cancels the current autocomplete request.
 */
Drupal.ACDB.prototype.cancel = function () {
  if (this.owner) this.owner.setStatus('cancel');
  if (this.timer) clearTimeout(this.timer);
  this.searchString = '';
};

})(jQuery);
;

(function ($) {

Drupal.behaviors.nodeFieldsetSummaries = {
  attach: function (context) {
    $('fieldset.node-form-revision-information', context).drupalSetSummary(function (context) {
      var revisionCheckbox = $('.form-item-revision input', context);

      // Return 'New revision' if the 'Create new revision' checkbox is checked,
      // or if the checkbox doesn't exist, but the revision log does. For users
      // without the "Administer content" permission the checkbox won't appear,
      // but the revision log will if the content type is set to auto-revision.
      if (revisionCheckbox.is(':checked') || (!revisionCheckbox.length && $('.form-item-log textarea', context).length)) {
        return Drupal.t('New revision');
      }

      return Drupal.t('No revision');
    });

    $('fieldset.node-form-author', context).drupalSetSummary(function (context) {
      var name = $('.form-item-name input', context).val() || Drupal.settings.anonymous,
        date = $('.form-item-date input', context).val();
      return date ?
        Drupal.t('By @name on @date', { '@name': name, '@date': date }) :
        Drupal.t('By @name', { '@name': name });
    });

    $('fieldset.node-form-options', context).drupalSetSummary(function (context) {
      var vals = [];

      $('input:checked', context).parent().each(function () {
        vals.push(Drupal.checkPlain($.trim($(this).text())));
      });

      if (!$('.form-item-status input', context).is(':checked')) {
        vals.unshift(Drupal.t('Not published'));
      }
      return vals.join(', ');
    });
  }
};

})(jQuery);
;
