
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

Drupal.behaviors.tableSelect = {
  attach: function (context, settings) {
    // Select the inner-most table in case of nested tables.
    $('th.select-all', context).closest('table').once('table-select', Drupal.tableSelect);
  }
};

Drupal.tableSelect = function () {
  // Do not add a "Select all" checkbox if there are no rows with checkboxes in the table
  if ($('td input:checkbox', this).length == 0) {
    return;
  }

  // Keep track of the table, which checkbox is checked and alias the settings.
  var table = this, checkboxes, lastChecked;
  var strings = { 'selectAll': Drupal.t('Select all rows in this table'), 'selectNone': Drupal.t('Deselect all rows in this table') };
  var updateSelectAll = function (state) {
    // Update table's select-all checkbox (and sticky header's if available).
    $(table).prev('table.sticky-header').andSelf().find('th.select-all input:checkbox').each(function() {
      $(this).attr('title', state ? strings.selectNone : strings.selectAll);
      this.checked = state;
    });
  };

  // Find all <th> with class select-all, and insert the check all checkbox.
  $('th.select-all', table).prepend($('<input type="checkbox" class="form-checkbox" />').attr('title', strings.selectAll)).click(function (event) {
    if ($(event.target).is('input:checkbox')) {
      // Loop through all checkboxes and set their state to the select all checkbox' state.
      checkboxes.each(function () {
        this.checked = event.target.checked;
        // Either add or remove the selected class based on the state of the check all checkbox.
        $(this).closest('tr').toggleClass('selected', this.checked);
      });
      // Update the title and the state of the check all box.
      updateSelectAll(event.target.checked);
    }
  });

  // For each of the checkboxes within the table that are not disabled.
  checkboxes = $('td input:checkbox:enabled', table).click(function (e) {
    // Either add or remove the selected class based on the state of the check all checkbox.
    $(this).closest('tr').toggleClass('selected', this.checked);

    // If this is a shift click, we need to highlight everything in the range.
    // Also make sure that we are actually checking checkboxes over a range and
    // that a checkbox has been checked or unchecked before.
    if (e.shiftKey && lastChecked && lastChecked != e.target) {
      // We use the checkbox's parent TR to do our range searching.
      Drupal.tableSelectRange($(e.target).closest('tr')[0], $(lastChecked).closest('tr')[0], e.target.checked);
    }

    // If all checkboxes are checked, make sure the select-all one is checked too, otherwise keep unchecked.
    updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));

    // Keep track of the last checked checkbox.
    lastChecked = e.target;
  });

  // If all checkboxes are checked on page load, make sure the select-all one
  // is checked too, otherwise keep unchecked.
  updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));
};

Drupal.tableSelectRange = function (from, to, state) {
  // We determine the looping mode based on the order of from and to.
  var mode = from.rowIndex > to.rowIndex ? 'previousSibling' : 'nextSibling';

  // Traverse through the sibling nodes.
  for (var i = from[mode]; i; i = i[mode]) {
    // Make sure that we're only dealing with elements.
    if (i.nodeType != 1) {
      continue;
    }

    // Either add or remove the selected class based on the state of the target checkbox.
    $(i).toggleClass('selected', state);
    $('input:checkbox', i).each(function () {
      this.checked = state;
    });

    if (to.nodeType) {
      // If we are at the end of the range, stop.
      if (i == to) {
        break;
      }
    }
    // A faster alternative to doing $(i).filter(to).length.
    else if ($.filter(to, [i]).r.length) {
      break;
    }
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
