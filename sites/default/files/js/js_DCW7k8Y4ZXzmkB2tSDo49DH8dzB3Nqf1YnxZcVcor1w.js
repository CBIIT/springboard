
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
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.oldWindowWidth = 0;
  Drupal.TBMegaMenu.displayedMenuMobile = false;
  Drupal.TBMegaMenu.supportedScreens = [980];
  Drupal.TBMegaMenu.menuResponsive = function () {
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    var navCollapse = $('.tb-megamenu').children('.nav-collapse');
    if (windowWidth < Drupal.TBMegaMenu.supportedScreens[0]) {
      navCollapse.addClass('collapse');
      if (Drupal.TBMegaMenu.displayedMenuMobile) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      } else {
        navCollapse.css({height: 0, overflow: 'hidden'});
      }
    } else {
      // If width of window is greater than 980 (supported screen).
      navCollapse.removeClass('collapse');
      if (navCollapse.height() <= 0) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      }
    }
  };
  
  Drupal.behaviors.tbMegaMenuAction = {
    attach: function(context) {
      $('.tb-megamenu-button', context).once('menuIstance', function () {
        var This = this;
        $(This).click(function() {
          if(parseInt($(this).parent().children('.nav-collapse').height())) {
            $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
            Drupal.TBMegaMenu.displayedMenuMobile = false;
          }
          else {
            $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
            Drupal.TBMegaMenu.displayedMenuMobile = true;
          }
        });
      });
      
      
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion) && !(/Windows NT(.*)Chrome/gi).test(navigator.appVersion) && !(/Windows NT(.*)Firefox/gi).test(navigator.appVersion);
      if(!isTouch){
        $(document).ready(function($){
          var mm_duration = 0;
          $('.tb-megamenu').each (function(){
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });
          var mm_timeout = mm_duration ? 100 + mm_duration : 500;
          $('.nav > li, li.mega').hover(function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.addClass ('open')}, 100));  
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.addClass ('open')}, 100));
            }
          },
          function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', 
              setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.removeClass ('open')}, 100));
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.removeClass ('open')}, 100));
            }
          });
        });
      }
      
      $(window).resize(function() {
        var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        if(windowWidth != Drupal.TBMegaMenu.oldWindowWidth){
          Drupal.TBMegaMenu.oldWindowWidth = windowWidth;
          Drupal.TBMegaMenu.menuResponsive();
        }
      });
    },
  }
})(jQuery);

;
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.createTouchMenu = function(items) {
      items.children('a').each( function() {
	var $item = $(this);
        var tbitem = $(this).parent();
        $item.click( function(event){
          if ($item.hasClass('tb-megamenu-clicked')) {
            var $uri = $item.attr('href');
            window.location.href = $uri;
          }
          else {
            event.preventDefault();
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
            }
          }
        }).closest('li').mouseleave( function(){
          $item.removeClass('tb-megamenu-clicked');
          tbitem.removeClass('open');
        });
     });
     /*
     items.children('a').children('span.caret').each( function() {
	var $item = $(this).parent();
        $item.click(function(event){
          tbitem = $item.parent();
          if ($item.hasClass('tb-megamenu-clicked')) {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            if(tbitem.hasClass('open')){	
              tbitem.removeClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
          else {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
        });
     });
     */
  }
  
  Drupal.TBMegaMenu.eventStopPropagation = function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    else if (window.event) {
      window.event.cancelBubble = true;
    }
  }  
  Drupal.behaviors.tbMegaMenuTouchAction = {
    attach: function(context) {
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion) && !(/Windows NT(.*)Chrome/gi).test(navigator.appVersion) && !(/Windows NT(.*)Firefox/gi).test(navigator.appVersion);
      if(isTouch){
        $('html').addClass('touch');
        Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));
      }
    }
  }
})(jQuery);
;
/**
 * @file
 * JavaScript behaviors for the front-end display of webforms.
 */

(function ($) {

  "use strict";

  Drupal.behaviors.webform = Drupal.behaviors.webform || {};

  Drupal.behaviors.webform.attach = function (context) {
    // Calendar datepicker behavior.
    Drupal.webform.datepicker(context);

    // Conditional logic.
    if (Drupal.settings.webform && Drupal.settings.webform.conditionals) {
      Drupal.webform.conditional(context);
    }
  };

  Drupal.webform = Drupal.webform || {};

  Drupal.webform.datepicker = function (context) {
    $('div.webform-datepicker').each(function () {
      var $webformDatepicker = $(this);
      var $calendar = $webformDatepicker.find('input.webform-calendar');

      // Ensure the page we're on actually contains a datepicker.
      if ($calendar.length == 0) {
        return;
      }

      var startDate = $calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
      var endDate = $calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
      var firstDay = $calendar[0].className.replace(/.*webform-calendar-day-(\d).*/, '$1');
      // Convert date strings into actual Date objects.
      startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
      endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

      // Ensure that start comes before end for datepicker.
      if (startDate > endDate) {
        var laterDate = startDate;
        startDate = endDate;
        endDate = laterDate;
      }

      var startYear = startDate.getFullYear();
      var endYear = endDate.getFullYear();

      // Set up the jQuery datepicker element.
      $calendar.datepicker({
        dateFormat: 'yy-mm-dd',
        yearRange: startYear + ':' + endYear,
        firstDay: parseInt(firstDay),
        minDate: startDate,
        maxDate: endDate,
        onSelect: function (dateText, inst) {
          var date = dateText.split('-');
          $webformDatepicker.find('select.year, input.year').val(+date[0]).trigger('change');
          $webformDatepicker.find('select.month').val(+date[1]).trigger('change');
          $webformDatepicker.find('select.day').val(+date[2]).trigger('change');
        },
        beforeShow: function (input, inst) {
          // Get the select list values.
          var year = $webformDatepicker.find('select.year, input.year').val();
          var month = $webformDatepicker.find('select.month').val();
          var day = $webformDatepicker.find('select.day').val();

          // If empty, default to the current year/month/day in the popup.
          var today = new Date();
          year = year ? year : today.getFullYear();
          month = month ? month : today.getMonth() + 1;
          day = day ? day : today.getDate();

          // Make sure that the default year fits in the available options.
          year = (year < startYear || year > endYear) ? startYear : year;

          // jQuery UI Datepicker will read the input field and base its date off
          // of that, even though in our case the input field is a button.
          $(input).val(year + '-' + month + '-' + day);
        }
      });

      // Prevent the calendar button from submitting the form.
      $calendar.click(function (event) {
        $(this).focus();
        event.preventDefault();
      });
    });
  };

  Drupal.webform.conditional = function (context) {
    // Add the bindings to each webform on the page.
    $.each(Drupal.settings.webform.conditionals, function (formKey, settings) {
      var $form = $('.' + formKey + ':not(.webform-conditional-processed)');
      $form.each(function (index, currentForm) {
        var $currentForm = $(currentForm);
        $currentForm.addClass('webform-conditional-processed');
        $currentForm.bind('change', {'settings': settings}, Drupal.webform.conditionalCheck);

        // Trigger all the elements that cause conditionals on this form.
        Drupal.webform.doConditions($form, settings);
      });
    });
  };

  /**
   * Event handler to respond to field changes in a form.
   *
   * This event is bound to the entire form, not individual fields.
   */
  Drupal.webform.conditionalCheck = function (e) {
    var $triggerElement = $(e.target).closest('.webform-component');
    var $form = $triggerElement.closest('form');
    var triggerElementKey = $triggerElement.attr('class').match(/webform-component--[^ ]+/)[0];
    var settings = e.data.settings;
    if (settings.sourceMap[triggerElementKey]) {
      Drupal.webform.doConditions($form, settings);
    }
  };

  /**
   * Processes all conditional.
   */
  Drupal.webform.doConditions = function ($form, settings) {

    var stackPointer;
    var resultStack;

    /**
     * Initializes an execution stack for a conditional group's rules and
     * sub-conditional rules.
     */
    function executionStackInitialize(andor) {
      stackPointer = -1;
      resultStack = [];
      executionStackPush(andor);
    }

    /**
     * Starts a new subconditional for the given and/or operator.
     */
    function executionStackPush(andor) {
      resultStack[++stackPointer] = {
        results: [],
        andor: andor,
      };
    }

    /**
     * Adds a rule's result to the current sub-condtional.
     */
    function executionStackAccumulate(result) {
      resultStack[stackPointer]['results'].push(result);
    }

    /**
     * Finishes a sub-conditional and adds the result to the parent stack frame.
     */
    function executionStackPop() {
      // Calculate the and/or result.
      var stackFrame = resultStack[stackPointer];
      // Pop stack and protect against stack underflow.
      stackPointer = Math.max(0, stackPointer - 1);
      var $conditionalResults = stackFrame['results'];
      var filteredResults = $.map($conditionalResults, function(val) {
        return val ? val : null;
      });
      return stackFrame['andor'] === 'or'
                ? filteredResults.length > 0
                : filteredResults.length === $conditionalResults.length;
    }

    // Track what has be set/shown for each target component.
    var targetLocked = [];

    $.each(settings.ruleGroups, function (rgid_key, rule_group) {
      var ruleGroup = settings.ruleGroups[rgid_key];

      // Perform the comparison callback and build the results for this group.
      executionStackInitialize(ruleGroup['andor']);
      $.each(ruleGroup['rules'], function (m, rule) {
        switch (rule['source_type']) {
          case 'component':
            var elementKey = rule['source'];
            var element = $form.find('.' + elementKey)[0];
            var existingValue = settings.values[elementKey] ? settings.values[elementKey] : null;
            executionStackAccumulate(window['Drupal']['webform'][rule.callback](element, existingValue, rule['value']));
            break;
          case 'conditional_start':
            executionStackPush(rule['andor']);
            break;
          case 'conditional_end':
            executionStackAccumulate(executionStackPop());
            break;
        }
      });
      var conditionalResult = executionStackPop();

      $.each(ruleGroup['actions'], function (aid, action) {
        var $target = $form.find('.' + action['target']);
        var actionResult = action['invert'] ? !conditionalResult : conditionalResult;
        switch (action['action']) {
          case 'show':
            if (actionResult != Drupal.webform.isVisible($target)) {
              var $targetElements = actionResult
                                      ? $target.find('.webform-conditional-disabled').removeClass('webform-conditional-disabled')
                                      : $target.find(':input').addClass('webform-conditional-disabled');
              $targetElements.webformProp('disabled', !actionResult);
              $target.toggleClass('webform-conditional-hidden', !actionResult);
              if (actionResult) {
                $target.show();
              }
              else {
                $target.hide();
                // Record that the target was hidden.
                targetLocked[action['target']] = 'hide';
              }
              if ($target.is('tr')) {
                Drupal.webform.restripeTable($target.closest('table').first());
              }
            }
            break;
          case 'require':
            var $requiredSpan = $target.find('.form-required, .form-optional').first();
            if (actionResult != $requiredSpan.hasClass('form-required')) {
              var $targetInputElements = $target.find("input:text,textarea,input[type='email'],select,input:radio,input:file");
              // Rather than hide the required tag, remove it so that other jQuery can respond via Drupal behaviors.
              Drupal.detachBehaviors($requiredSpan);
              $targetInputElements
                .webformProp('required', actionResult)
                .toggleClass('required', actionResult);
              if (actionResult) {
                $requiredSpan.replaceWith('<span class="form-required" title="' + Drupal.t('This field is required.') + '">*</span>');
              }
              else {
                $requiredSpan.replaceWith('<span class="form-optional"></span>');
              }
              Drupal.attachBehaviors($requiredSpan);
            }
            break;
          case 'set':
            var isLocked = targetLocked[action['target']];
            var $texts = $target.find("input:text,textarea,input[type='email']");
            var $selects = $target.find('select,select option,input:radio,input:checkbox');
            var $markups = $target.filter('.webform-component-markup');
            if (actionResult) {
              var multiple = $.map(action['argument'].split(','), $.trim);
              $selects.webformVal(multiple);
              $texts.val([action['argument']]);
              // A special case is made for markup. It is sanitized with filter_xss_admin on the server.
              // otherwise text() should be used to avoid an XSS vulnerability. text() however would
              // preclude the use of tags like <strong> or <a>
              $markups.html(action['argument']);
            }
            else {
              // Markup not set? Then restore original markup as provided in
              // the attribute data-webform-markup.
              $markups.each(function() {
                var $this = $(this);
                var original = $this.data('webform-markup');
                if (original !== undefined) {
                  $this.html(original);
                }
              });
            }
            if (!isLocked) {
              // If not previously hidden or set, disable the element readonly or readonly-like behavior.
              $selects.webformProp('disabled', actionResult);
              $texts.webformProp('readonly', actionResult);
              targetLocked[action['target']] = actionResult ? 'set' : false;
            }
            break;
        }
      }); // End look on each action for one conditional
    }); // End loop on each conditional
  };

  /**
   * Event handler to prevent propogation of events, typically click for disabling
   * radio and checkboxes.
   */
  Drupal.webform.stopEvent = function () {
    return false;
  };

  Drupal.webform.conditionalOperatorStringEqual = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase() === ruleValue.toLowerCase()) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringNotEqual = function (element, existingValue, ruleValue) {
    var found = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase() === ruleValue.toLowerCase()) {
        found = true;
      }
    });
    return !found;
  };

  Drupal.webform.conditionalOperatorStringContains = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringDoesNotContain = function (element, existingValue, ruleValue) {
    var found = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
        found = true;
      }
    });
    return !found;
  };

  Drupal.webform.conditionalOperatorStringBeginsWith = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) === 0) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringEndsWith = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().lastIndexOf(ruleValue.toLowerCase()) === value.length - ruleValue.length) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringEmpty = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var returnValue = true;
    $.each(currentValue, function (n, value) {
      if (value !== '') {
        returnValue = false;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringNotEmpty = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorStringEmpty(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorSelectGreaterThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return Drupal.webform.compare_select(currentValue[0], ruleValue, element) > 0;
  };

  Drupal.webform.conditionalOperatorSelectGreaterThanEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var comparison = Drupal.webform.compare_select(currentValue[0], ruleValue, element);
    return comparison > 0 || comparison === 0;
  };

  Drupal.webform.conditionalOperatorSelectLessThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return Drupal.webform.compare_select(currentValue[0], ruleValue, element) < 0;
  };

  Drupal.webform.conditionalOperatorSelectLessThanEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var comparison = Drupal.webform.compare_select(currentValue[0], ruleValue, element);
    return comparison < 0 || comparison === 0;
  };

  Drupal.webform.conditionalOperatorNumericEqual = function (element, existingValue, ruleValue) {
    // See float comparison: http://php.net/manual/en/language.types.float.php
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var epsilon = 0.000001;
    // An empty string does not match any number.
    return currentValue[0] === '' ? false : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) < epsilon);
  };

  Drupal.webform.conditionalOperatorNumericNotEqual = function (element, existingValue, ruleValue) {
    // See float comparison: http://php.net/manual/en/language.types.float.php
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var epsilon = 0.000001;
    // An empty string does not match any number.
    return currentValue[0] === '' ? true : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) >= epsilon);
  };

  Drupal.webform.conditionalOperatorNumericGreaterThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return parseFloat(currentValue[0]) > parseFloat(ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericGreaterThanEqual = function (element, existingValue, ruleValue) {
    return Drupal.webform.conditionalOperatorNumericGreaterThan(element, existingValue, ruleValue) ||
           Drupal.webform.conditionalOperatorNumericEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericLessThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return parseFloat(currentValue[0]) < parseFloat(ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericLessThanEqual = function (element, existingValue, ruleValue) {
    return Drupal.webform.conditionalOperatorNumericLessThan(element, existingValue, ruleValue) ||
           Drupal.webform.conditionalOperatorNumericEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorDateEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return currentValue === ruleValue;
  };

  Drupal.webform.conditionalOperatorDateNotEqual = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorDateEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorDateBefore = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && currentValue < ruleValue;
  };

  Drupal.webform.conditionalOperatorDateBeforeEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorDateAfter = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && currentValue > ruleValue;
  };

  Drupal.webform.conditionalOperatorDateAfterEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return currentValue === ruleValue;
  };

  Drupal.webform.conditionalOperatorTimeNotEqual = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorTimeEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeBefore = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally exclusive for "before".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeBeforeEqual = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally exclusive for "before".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeAfter = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally inclusive for "after".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeAfterEqual = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally inclusive for "after".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue || currentValue === ruleValue);
  };

  /**
   * Utility function to compare values of a select component.
   * @param string a
   *   First select option key to compare
   * @param string b
   *   Second select option key to compare
   * @param array options
   *   Associative array where the a and b are within the keys
   * @return integer based upon position of $a and $b in $options
   *   -N if $a above (<) $b
   *   0 if $a = $b
   *   +N if $a is below (>) $b
   */
  Drupal.webform.compare_select = function (a, b, element) {
    var optionList = [];
    $('option,input:radio,input:checkbox', element).each(function () {
      optionList.push($(this).val());
    });
    var a_position = optionList.indexOf(a);
    var b_position = optionList.indexOf(b);
    return (a_position < 0 || b_position < 0) ? null : a_position - b_position;
  };

  /**
   * Utility to return current visibility. Uses actual visibility, except for
   * hidden components which use the applied disabled class.
   */
  Drupal.webform.isVisible = function ($element) {
    return $element.hasClass('webform-component-hidden')
              ? !$element.find('input').first().hasClass('webform-conditional-disabled')
              : $element.closest('.webform-conditional-hidden').length == 0;
  };

  /**
   * Utility function to get a string value from a select/radios/text/etc. field.
   */
  Drupal.webform.stringValue = function (element, existingValue) {
    var value = [];
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        // Checkboxes and radios.
        $element.find('input[type=checkbox]:checked,input[type=radio]:checked').each(function () {
          value.push(this.value);
        });
        // Select lists.
        if (!value.length) {
          var selectValue = $element.find('select').val();
          if (selectValue) {
            if ($.isArray(selectValue)) {
              value = selectValue;
            }
            else {
              value.push(selectValue);
            }
          }
        }
        // Simple text fields. This check is done last so that the select list in
        // select-or-other fields comes before the "other" text field.
        if (!value.length) {
          $element.find('input:not([type=checkbox],[type=radio]),textarea').each(function () {
            value.push(this.value);
          });
        }
      }
    }
    else {
      switch ($.type(existingValue)) {
        case 'array':
          value = existingValue;
          break;
        case 'string':
          value.push(existingValue);
          break;
      }
    }
    return value;
  };

  /**
   * Utility function to calculate a second-based timestamp from a time field.
   */
  Drupal.webform.dateValue = function (element, existingValue) {
    var value = false;
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        var day = $element.find('[name*=day]').val();
        var month = $element.find('[name*=month]').val();
        var year = $element.find('[name*=year]').val();
        // Months are 0 indexed in JavaScript.
        if (month) {
          month--;
        }
        if (year !== '' && month !== '' && day !== '') {
          value = Date.UTC(year, month, day) / 1000;
        }
      }
    }
    else {
      if ($.type(existingValue) === 'array' && existingValue.length) {
        existingValue = existingValue[0];
      }
      if ($.type(existingValue) === 'string') {
        existingValue = existingValue.split('-');
      }
      if (existingValue.length === 3) {
        value = Date.UTC(existingValue[0], existingValue[1], existingValue[2]) / 1000;
      }
    }
    return value;
  };

  /**
   * Utility function to calculate a millisecond timestamp from a time field.
   */
  Drupal.webform.timeValue = function (element, existingValue) {
    var value = false;
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        var hour = $element.find('[name*=hour]').val();
        var minute = $element.find('[name*=minute]').val();
        var ampm = $element.find('[name*=ampm]:checked').val();

        // Convert to integers if set.
        hour = (hour === '') ? hour : parseInt(hour);
        minute = (minute === '') ? minute : parseInt(minute);

        if (hour !== '') {
          hour = (hour < 12 && ampm == 'pm') ? hour + 12 : hour;
          hour = (hour === 12 && ampm == 'am') ? 0 : hour;
        }
        if (hour !== '' && minute !== '') {
          value = Date.UTC(1970, 0, 1, hour, minute) / 1000;
        }
      }
    }
    else {
      if ($.type(existingValue) === 'array' && existingValue.length) {
        existingValue = existingValue[0];
      }
      if ($.type(existingValue) === 'string') {
        existingValue = existingValue.split(':');
      }
      if (existingValue.length >= 2) {
        value = Date.UTC(1970, 0, 1, existingValue[0], existingValue[1]) / 1000;
      }
    }
    return value;
  };

  /**
   * Make a prop shim for jQuery < 1.9.
   */
  $.fn.webformProp = $.fn.webformProp || function (name, value) {
    if (value) {
      return $.fn.prop ? this.prop(name, true) : this.attr(name, true);
    }
    else {
      return $.fn.prop ? this.prop(name, false) : this.removeAttr(name);
    }
  };

  /**
   * Make a multi-valued val() function for setting checkboxes, radios, and select
   * elements.
   */
  $.fn.webformVal = function (values) {
    this.each(function () {
      var $this = $(this);
      var value = $this.val();
      var on = $.inArray($this.val(), values) != -1;
      if (this.nodeName == 'OPTION') {
        $this.webformProp('selected', on ? value : false);
      }
      else {
        $this.val(on ? [value] : false);
      }
    });
    return this;
  };

  /**
   * Given a table's DOM element, restripe the odd/even classes.
   */
  Drupal.webform.restripeTable = function (table) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr, > tr', table)
      .filter(':visible:odd').filter('.odd')
        .removeClass('odd').addClass('even')
      .end().end()
      .filter(':visible:even').filter('.even')
        .removeClass('even').addClass('odd');
  };

})(jQuery);
;
!function(t,e){function i(e,i){var o,n,a,r=e.nodeName.toLowerCase();return"area"===r?(o=e.parentNode,n=o.name,!(!e.href||!n||"map"!==o.nodeName.toLowerCase())&&(!!(a=t("img[usemap=#"+n+"]")[0])&&s(a))):(/input|select|textarea|button|object/.test(r)?!e.disabled:"a"===r?e.href||i:i)&&s(e)}function s(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}var o=0,n=/^ui-id-\d+$/;t.ui=t.ui||{},t.extend(t.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({focus:function(e){return function(i,s){return"number"==typeof i?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),s&&s.call(e)},i)}):e.apply(this,arguments)}}(t.fn.focus),scrollParent:function(){var e;return e=t.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(t.css(this,"position"))&&/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e},zIndex:function(i){if(i!==e)return this.css("zIndex",i);if(this.length)for(var s,o,n=t(this[0]);n.length&&n[0]!==document;){if(("absolute"===(s=n.css("position"))||"relative"===s||"fixed"===s)&&(o=parseInt(n.css("zIndex"),10),!isNaN(o)&&0!==o))return o;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++o)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])},focusable:function(e){return i(e,!isNaN(t.attr(e,"tabindex")))},tabbable:function(e){var s=t.attr(e,"tabindex"),o=isNaN(s);return(o||s>=0)&&i(e,!o)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(i,s){function o(e,i,s,o){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],a=s.toLowerCase(),r={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+s]=function(i){return i===e?r["inner"+s].call(this):this.each(function(){t(this).css(a,o(this,i)+"px")})},t.fn["outer"+s]=function(e,i){return"number"!=typeof e?r["outer"+s].call(this,e):this.each(function(){t(this).css(a,o(this,e,!0,i)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(i){return arguments.length?e.call(this,t.camelCase(i)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.support.selectstart="onselectstart"in document.createElement("div"),t.fn.extend({disableSelection:function(){return this.bind((t.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),t.extend(t.ui,{plugin:{add:function(e,i,s){var o,n=t.ui[e].prototype;for(o in s)n.plugins[o]=n.plugins[o]||[],n.plugins[o].push([i,s[o]])},call:function(t,e,i){var s,o=t.plugins[e];if(o&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(s=0;o.length>s;s++)t.options[o[s][0]]&&o[s][1].apply(t.element,i)}},hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",o=!1;return e[s]>0||(e[s]=1,o=e[s]>0,e[s]=0,o)}})}(jQuery),function(t,e){var i=0,s=Array.prototype.slice,o=t.cleanData;t.cleanData=function(e){for(var i,s=0;null!=(i=e[s]);s++)try{t(i).triggerHandler("remove")}catch(t){}o(e)},t.widget=function(i,s,o){var n,a,r,l,h={},u=i.split(".")[0];i=i.split(".")[1],n=u+"-"+i,o||(o=s,s=t.Widget),t.expr[":"][n.toLowerCase()]=function(e){return!!t.data(e,n)},t[u]=t[u]||{},a=t[u][i],r=t[u][i]=function(t,i){return this._createWidget?(arguments.length&&this._createWidget(t,i),e):new r(t,i)},t.extend(r,a,{version:o.version,_proto:t.extend({},o),_childConstructors:[]}),(l=new s).options=t.widget.extend({},l.options),t.each(o,function(i,o){return t.isFunction(o)?(h[i]=function(){var t=function(){return s.prototype[i].apply(this,arguments)},e=function(t){return s.prototype[i].apply(this,t)};return function(){var i,s=this._super,n=this._superApply;return this._super=t,this._superApply=e,i=o.apply(this,arguments),this._super=s,this._superApply=n,i}}(),e):(h[i]=o,e)}),r.prototype=t.widget.extend(l,{widgetEventPrefix:a?l.widgetEventPrefix:i},h,{constructor:r,namespace:u,widgetName:i,widgetFullName:n}),a?(t.each(a._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,r,i._proto)}),delete a._childConstructors):s._childConstructors.push(r),t.widget.bridge(i,r)},t.widget.extend=function(i){for(var o,n,a=s.call(arguments,1),r=0,l=a.length;l>r;r++)for(o in a[r])n=a[r][o],a[r].hasOwnProperty(o)&&n!==e&&(i[o]=t.isPlainObject(n)?t.isPlainObject(i[o])?t.widget.extend({},i[o],n):t.widget.extend({},n):n);return i},t.widget.bridge=function(i,o){var n=o.prototype.widgetFullName||i;t.fn[i]=function(a){var r="string"==typeof a,l=s.call(arguments,1),h=this;return a=!r&&l.length?t.widget.extend.apply(null,[a].concat(l)):a,r?this.each(function(){var s,o=t.data(this,n);return o?t.isFunction(o[a])&&"_"!==a.charAt(0)?(s=o[a].apply(o,l),s!==o&&s!==e?(h=s&&s.jquery?h.pushStack(s.get()):s,!1):e):t.error("no such method '"+a+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; attempted to call method '"+a+"'")}):this.each(function(){var e=t.data(this,n);e?e.option(a||{})._init():t.data(this,n,new o(a,this))}),h}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,s){var o,n,a,r=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(r={},o=i.split("."),i=o.shift(),o.length){for(n=r[i]=t.widget.extend({},this.options[i]),a=0;o.length-1>a;a++)n[o[a]]=n[o[a]]||{},n=n[o[a]];if(i=o.pop(),s===e)return n[i]===e?null:n[i];n[i]=s}else{if(s===e)return this.options[i]===e?null:this.options[i];r[i]=s}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,o){var n,a=this;"boolean"!=typeof i&&(o=s,s=i,i=!1),o?(s=n=t(s),this.bindings=this.bindings.add(s)):(o=s,s=this.element,n=this.widget()),t.each(o,function(o,r){function l(){return i||!0!==a.options.disabled&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?a[r]:r).apply(a,arguments):e}"string"!=typeof r&&(l.guid=r.guid=r.guid||l.guid||t.guid++);var h=o.match(/^(\w+)\s*(.*)$/),u=h[1]+a.eventNamespace,p=h[2];p?n.delegate(p,u,l):s.bind(u,l)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var o,n,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],n=i.originalEvent)for(o in n)o in i||(i[o]=n[o]);return this.element.trigger(i,s),!(t.isFunction(a)&&!1===a.apply(this.element[0],[i].concat(s))||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,o,n){"string"==typeof o&&(o={effect:o});var a,r=o?!0===o||"number"==typeof o?i:o.effect||i:e;"number"==typeof(o=o||{})&&(o={duration:o}),a=!t.isEmptyObject(o),o.complete=n,o.delay&&s.delay(o.delay),a&&t.effects&&t.effects.effect[r]?s[e](o):r!==e&&s[r]?s[r](o.duration,o.easing,n):s.queue(function(i){t(this)[e](),n&&n.call(s[0]),i()})}})}(jQuery),function(t){var e=!1;t(document).mouseup(function(){e=!1}),t.widget("ui.mouse",{version:"1.10.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!e){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,o=1===i.which,n=!("string"!=typeof this.options.cancel||!i.target.nodeName)&&t(i.target).closest(this.options.cancel).length;return!(o&&!n&&this._mouseCapture(i))||(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=!1!==this._mouseStart(i),!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return s._mouseMove(t)},this._mouseUpDelegate=function(t){return s._mouseUp(t)},t(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),e=!0,!0))}},_mouseMove:function(e){return t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=!1!==this._mouseStart(this._mouseDownEvent,e),this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}(jQuery),function(t,e){function i(t,e,i){return[parseFloat(t[0])*(d.test(t[0])?e/100:1),parseFloat(t[1])*(d.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function o(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var n,a=Math.max,r=Math.abs,l=Math.round,h=/left|center|right/,u=/top|center|bottom/,p=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,d=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),o="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth;return{width:"scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight?t.position.scrollbarWidth():0,height:o?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var n,d,g,m,b,v,_=t(e.of),w=t.position.getWithinInfo(e.within),y=t.position.getScrollInfo(w),z=(e.collision||"flip").split(" "),x={};return v=o(_),_[0].preventDefault&&(e.at="left top"),d=v.width,g=v.height,m=v.offset,b=t.extend({},m),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=h.test(s[0])?s.concat(["center"]):u.test(s[0])?["center"].concat(s):["center","center"]),s[0]=h.test(s[0])?s[0]:"center",s[1]=u.test(s[1])?s[1]:"center",t=p.exec(s[0]),i=p.exec(s[1]),x[this]=[t?t[0]:0,i?i[0]:0],e[this]=[c.exec(s[0])[0],c.exec(s[1])[0]]}),1===z.length&&(z[1]=z[0]),"right"===e.at[0]?b.left+=d:"center"===e.at[0]&&(b.left+=d/2),"bottom"===e.at[1]?b.top+=g:"center"===e.at[1]&&(b.top+=g/2),n=i(x.at,d,g),b.left+=n[0],b.top+=n[1],this.each(function(){var o,h,u=t(this),p=u.outerWidth(),c=u.outerHeight(),f=s(this,"marginLeft"),v=s(this,"marginTop"),P=p+f+s(this,"marginRight")+y.width,D=c+v+s(this,"marginBottom")+y.height,T=t.extend({},b),C=i(x.my,u.outerWidth(),u.outerHeight());"right"===e.my[0]?T.left-=p:"center"===e.my[0]&&(T.left-=p/2),"bottom"===e.my[1]?T.top-=c:"center"===e.my[1]&&(T.top-=c/2),T.left+=C[0],T.top+=C[1],t.support.offsetFractions||(T.left=l(T.left),T.top=l(T.top)),o={marginLeft:f,marginTop:v},t.each(["left","top"],function(i,s){t.ui.position[z[i]]&&t.ui.position[z[i]][s](T,{targetWidth:d,targetHeight:g,elemWidth:p,elemHeight:c,collisionPosition:o,collisionWidth:P,collisionHeight:D,offset:[n[0]+C[0],n[1]+C[1]],my:e.my,at:e.at,within:w,elem:u})}),e.using&&(h=function(t){var i=m.left-T.left,s=i+d-p,o=m.top-T.top,n=o+g-c,l={target:{element:_,left:m.left,top:m.top,width:d,height:g},element:{element:u,left:T.left,top:T.top,width:p,height:c},horizontal:0>s?"left":i>0?"right":"center",vertical:0>n?"top":o>0?"bottom":"middle"};p>d&&d>r(i+s)&&(l.horizontal="center"),c>g&&g>r(o+n)&&(l.vertical="middle"),l.important=a(r(i),r(s))>a(r(o),r(n))?"horizontal":"vertical",e.using.call(this,t,l)}),u.offset(t.extend(T,{using:h}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,o=s.isWindow?s.scrollLeft:s.offset.left,n=s.width,r=t.left-e.collisionPosition.marginLeft,l=o-r,h=r+e.collisionWidth-n-o;e.collisionWidth>n?l>0&&0>=h?(i=t.left+l+e.collisionWidth-n-o,t.left+=l-i):t.left=h>0&&0>=l?o:l>h?o+n-e.collisionWidth:o:l>0?t.left+=l:h>0?t.left-=h:t.left=a(t.left-r,t.left)},top:function(t,e){var i,s=e.within,o=s.isWindow?s.scrollTop:s.offset.top,n=e.within.height,r=t.top-e.collisionPosition.marginTop,l=o-r,h=r+e.collisionHeight-n-o;e.collisionHeight>n?l>0&&0>=h?(i=t.top+l+e.collisionHeight-n-o,t.top+=l-i):t.top=h>0&&0>=l?o:l>h?o+n-e.collisionHeight:o:l>0?t.top+=l:h>0?t.top-=h:t.top=a(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,o=e.within,n=o.offset.left+o.scrollLeft,a=o.width,l=o.isWindow?o.scrollLeft:o.offset.left,h=t.left-e.collisionPosition.marginLeft,u=h-l,p=h+e.collisionWidth-a-l,c="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,d="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>u?(0>(i=t.left+c+d+f+e.collisionWidth-a-n)||r(u)>i)&&(t.left+=c+d+f):p>0&&((s=t.left-e.collisionPosition.marginLeft+c+d+f-l)>0||p>r(s))&&(t.left+=c+d+f)},top:function(t,e){var i,s,o=e.within,n=o.offset.top+o.scrollTop,a=o.height,l=o.isWindow?o.scrollTop:o.offset.top,h=t.top-e.collisionPosition.marginTop,u=h-l,p=h+e.collisionHeight-a-l,c="top"===e.my[1]?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,d="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,f=-2*e.offset[1];0>u?(s=t.top+c+d+f+e.collisionHeight-a-n,t.top+c+d+f>u&&(0>s||r(u)>s)&&(t.top+=c+d+f)):p>0&&(i=t.top-e.collisionPosition.marginTop+c+d+f-l,t.top+c+d+f>p&&(i>0||p>r(i))&&(t.top+=c+d+f))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,o,n,a=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(a?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},a&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(n in s)e.style[n]=s[n];e.appendChild(r),(i=a||document.documentElement).insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",o=t(r).offset().left,t.support.offsetFractions=o>10&&11>o,e.innerHTML="",i.removeChild(e)}()}(jQuery),function(t){t.widget("ui.draggable",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(e){var i=this.options;return!(this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0)&&(this.handle=this._getHandle(e),!!this.handle&&(t(!0===i.iframeFix?"iframe":i.iframeFix).each(function(){t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(t(this).offset()).appendTo("body")}),!0))},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),!1===this._trigger("start",e)?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_mouseDrag:function(e,i){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(!1===this._trigger("drag",e,s))return this._mouseUp({}),!1;this.position=s.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),!("original"===this.options.helper&&!t.contains(this.element[0].ownerDocument,this.element[0]))&&("invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||!0===this.options.revert||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){!1!==i._trigger("stop",e)&&i._clear()}):!1!==this._trigger("stop",e)&&this._clear(),!1)},_mouseUp:function(e){return t("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(e){return!this.options.handle||!!t(e.target).closest(this.element.find(this.options.handle)).length},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.element.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,o=this.options;return o.containment?"window"===o.containment?void(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===o.containment?void(this.containment=[0,0,t(document).width()-this.helperProportions.width-this.margins.left,(t(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):o.containment.constructor===Array?void(this.containment=o.containment):("parent"===o.containment&&(o.containment=this.helper[0].parentNode),i=t(o.containment),void((s=i[0])&&(e="hidden"!==i.css("overflow"),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i))):void(this.containment=null)},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:o.scrollTop(),left:o.scrollLeft()}),{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*s}},_generatePosition:function(e){var i,s,o,n,a=this.options,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=e.pageX,h=e.pageY;return this.offset.scroll||(this.offset.scroll={top:r.scrollTop(),left:r.scrollLeft()}),this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),a.grid&&(o=a.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,h=i?o-this.offset.click.top>=i[1]||o-this.offset.click.top>i[3]?o:o-this.offset.click.top>=i[1]?o-a.grid[1]:o+a.grid[1]:o,n=a.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,l=i?n-this.offset.click.left>=i[0]||n-this.offset.click.left>i[2]?n:n-this.offset.click.left>=i[0]?n-a.grid[0]:n+a.grid[0]:n)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s]),"drag"===e&&(this.positionAbs=this._convertPositionTo("absolute")),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i){var s=t(this).data("ui-draggable"),o=s.options,n=t.extend({},i,{item:s.element});s.sortables=[],t(o.connectToSortable).each(function(){var i=t.data(this,"ui-sortable");i&&!i.options.disabled&&(s.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",e,n))})},stop:function(e,i){var s=t(this).data("ui-draggable"),o=t.extend({},i,{item:s.element});t.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(e),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",e,o))})},drag:function(e,i){var s=t(this).data("ui-draggable"),o=this;t.each(s.sortables,function(){var n=!1,a=this;this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(n=!0,t.each(s.sortables,function(){return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this!==a&&this.instance._intersectsWith(this.instance.containerCache)&&t.contains(a.instance.element[0],this.instance.element[0])&&(n=!1),n})),n?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=t(o).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},e.target=this.instance.currentItem[0],this.instance._mouseCapture(e,!0),this.instance._mouseStart(e,!0,!0),this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,s._trigger("toSortable",e),s.dropped=this.instance.element,s.currentItem=s.element,this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(e)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",e,this.instance._uiHash(this.instance)),this.instance._mouseStop(e,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),s._trigger("fromSortable",e),s.dropped=!1)})}}),t.ui.plugin.add("draggable","cursor",{start:function(){var e=t("body"),i=t(this).data("ui-draggable").options;e.css("cursor")&&(i._cursor=e.css("cursor")),e.css("cursor",i.cursor)},stop:function(){var e=t(this).data("ui-draggable").options;e._cursor&&t("body").css("cursor",e._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i){var s=t(i.helper),o=t(this).data("ui-draggable").options;s.css("opacity")&&(o._opacity=s.css("opacity")),s.css("opacity",o.opacity)},stop:function(e,i){var s=t(this).data("ui-draggable").options;s._opacity&&t(i.helper).css("opacity",s._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(){var e=t(this).data("ui-draggable");e.scrollParent[0]!==document&&"HTML"!==e.scrollParent[0].tagName&&(e.overflowOffset=e.scrollParent.offset())},drag:function(e){var i=t(this).data("ui-draggable"),s=i.options,o=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-e.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=o=i.scrollParent[0].scrollTop+s.scrollSpeed:e.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=o=i.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-e.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=o=i.scrollParent[0].scrollLeft+s.scrollSpeed:e.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=o=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(e.pageY-t(document).scrollTop()<s.scrollSensitivity?o=t(document).scrollTop(t(document).scrollTop()-s.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<s.scrollSensitivity&&(o=t(document).scrollTop(t(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(e.pageX-t(document).scrollLeft()<s.scrollSensitivity?o=t(document).scrollLeft(t(document).scrollLeft()-s.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<s.scrollSensitivity&&(o=t(document).scrollLeft(t(document).scrollLeft()+s.scrollSpeed)))),!1!==o&&t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(i,e)}}),t.ui.plugin.add("draggable","snap",{start:function(){var e=t(this).data("ui-draggable"),i=e.options;e.snapElements=[],t(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=t(this),s=i.offset();this!==e.element[0]&&e.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:s.top,left:s.left})})},drag:function(e,i){var s,o,n,a,r,l,h,u,p,c,d=t(this).data("ui-draggable"),f=d.options,g=f.snapTolerance,m=i.offset.left,b=m+d.helperProportions.width,v=i.offset.top,_=v+d.helperProportions.height;for(p=d.snapElements.length-1;p>=0;p--)r=d.snapElements[p].left,l=r+d.snapElements[p].width,h=d.snapElements[p].top,u=h+d.snapElements[p].height,r-g>b||m>l+g||h-g>_||v>u+g||!t.contains(d.snapElements[p].item.ownerDocument,d.snapElements[p].item)?(d.snapElements[p].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,e,t.extend(d._uiHash(),{snapItem:d.snapElements[p].item})),d.snapElements[p].snapping=!1):("inner"!==f.snapMode&&(s=g>=Math.abs(h-_),o=g>=Math.abs(u-v),n=g>=Math.abs(r-b),a=g>=Math.abs(l-m),s&&(i.position.top=d._convertPositionTo("relative",{top:h-d.helperProportions.height,left:0}).top-d.margins.top),o&&(i.position.top=d._convertPositionTo("relative",{top:u,left:0}).top-d.margins.top),n&&(i.position.left=d._convertPositionTo("relative",{top:0,left:r-d.helperProportions.width}).left-d.margins.left),a&&(i.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left)),c=s||o||n||a,"outer"!==f.snapMode&&(s=g>=Math.abs(h-v),o=g>=Math.abs(u-_),n=g>=Math.abs(r-m),a=g>=Math.abs(l-b),s&&(i.position.top=d._convertPositionTo("relative",{top:h,left:0}).top-d.margins.top),o&&(i.position.top=d._convertPositionTo("relative",{top:u-d.helperProportions.height,left:0}).top-d.margins.top),n&&(i.position.left=d._convertPositionTo("relative",{top:0,left:r}).left-d.margins.left),a&&(i.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left)),!d.snapElements[p].snapping&&(s||o||n||a||c)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,e,t.extend(d._uiHash(),{snapItem:d.snapElements[p].item})),d.snapElements[p].snapping=s||o||n||a||c)}}),t.ui.plugin.add("draggable","stack",{start:function(){var e,i=this.data("ui-draggable").options,s=t.makeArray(t(i.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});s.length&&(e=parseInt(t(s[0]).css("zIndex"),10)||0,t(s).each(function(i){t(this).css("zIndex",e+i)}),this.css("zIndex",e+s.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i){var s=t(i.helper),o=t(this).data("ui-draggable").options;s.css("zIndex")&&(o._zIndex=s.css("zIndex")),s.css("zIndex",o.zIndex)},stop:function(e,i){var s=t(this).data("ui-draggable").options;s._zIndex&&t(i.helper).css("zIndex",s._zIndex)}})}(jQuery),function(t){function e(t){return parseInt(t,10)||0}function i(t){return!isNaN(parseInt(t,10))}t.widget("ui.resizable",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var e,i,s,o,n,a=this,r=this.options;if(this.element.addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),e=this.handles.split(","),this.handles={},i=0;e.length>i;i++)s=t.trim(e[i]),n="ui-resizable-"+s,(o=t("<div class='ui-resizable-handle "+n+"'></div>")).css({zIndex:r.zIndex}),"se"===s&&o.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(o);this._renderAxis=function(e){var i,s,o,n;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=t(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=t(this.handles[i],this.element),n=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),o=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(o,n),this._proportionallyResize()),t(this.handles[i]).length},this._renderAxis(this.element),this._handles=t(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){a.resizing||(this.className&&(o=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),a.axis=o&&o[1]?o[1]:"se")}),r.autoHide&&(this._handles.hide(),t(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(t(this).removeClass("ui-resizable-autohide"),a._handles.show())}).mouseleave(function(){r.disabled||a.resizing||(t(this).addClass("ui-resizable-autohide"),a._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(e){var i,s,o=!1;for(i in this.handles)((s=t(this.handles[i])[0])===e.target||t.contains(s,e.target))&&(o=!0);return!this.options.disabled&&o},_mouseStart:function(i){var s,o,n,a=this.options,r=this.element.position(),l=this.element;return this.resizing=!0,/absolute/.test(l.css("position"))?l.css({position:"absolute",top:l.css("top"),left:l.css("left")}):l.is(".ui-draggable")&&l.css({position:"absolute",top:r.top,left:r.left}),this._renderProxy(),s=e(this.helper.css("left")),o=e(this.helper.css("top")),a.containment&&(s+=t(a.containment).scrollLeft()||0,o+=t(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:o},this.size=this._helper?{width:l.outerWidth(),height:l.outerHeight()}:{width:l.width(),height:l.height()},this.originalSize=this._helper?{width:l.outerWidth(),height:l.outerHeight()}:{width:l.width(),height:l.height()},this.originalPosition={left:s,top:o},this.sizeDiff={width:l.outerWidth()-l.width(),height:l.outerHeight()-l.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===n?this.axis+"-resize":n),l.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(e){var i,s=this.helper,o={},n=this.originalMousePosition,a=this.axis,r=this.position.top,l=this.position.left,h=this.size.width,u=this.size.height,p=e.pageX-n.left||0,c=e.pageY-n.top||0,d=this._change[a];return!!d&&(i=d.apply(this,[e,p,c]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),this.position.top!==r&&(o.top=this.position.top+"px"),this.position.left!==l&&(o.left=this.position.left+"px"),this.size.width!==h&&(o.width=this.size.width+"px"),this.size.height!==u&&(o.height=this.size.height+"px"),s.css(o),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(o)||this._trigger("resize",e,this.ui()),!1)},_mouseStop:function(e){this.resizing=!1;var i,s,o,n,a,r,l,h=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),o=s&&t.ui.hasScroll(i[0],"left")?0:u.sizeDiff.height,n=s?0:u.sizeDiff.width,a={width:u.helper.width()-n,height:u.helper.height()-o},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,l=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,h.animate||this.element.css(t.extend(a,{top:l,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!h.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(t){var e,s,o,n,a,r=this.options;a={minWidth:i(r.minWidth)?r.minWidth:0,maxWidth:i(r.maxWidth)?r.maxWidth:1/0,minHeight:i(r.minHeight)?r.minHeight:0,maxHeight:i(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||t)&&(e=a.minHeight*this.aspectRatio,o=a.minWidth/this.aspectRatio,s=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,e>a.minWidth&&(a.minWidth=e),o>a.minHeight&&(a.minHeight=o),a.maxWidth>s&&(a.maxWidth=s),a.maxHeight>n&&(a.maxHeight=n)),this._vBoundaries=a},_updateCache:function(t){this.offset=this.helper.offset(),i(t.left)&&(this.position.left=t.left),i(t.top)&&(this.position.top=t.top),i(t.height)&&(this.size.height=t.height),i(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,s=this.size,o=this.axis;return i(t.height)?t.width=t.height*this.aspectRatio:i(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===o&&(t.left=e.left+(s.width-t.width),t.top=null),"nw"===o&&(t.top=e.top+(s.height-t.height),t.left=e.left+(s.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,s=this.axis,o=i(t.width)&&e.maxWidth&&e.maxWidth<t.width,n=i(t.height)&&e.maxHeight&&e.maxHeight<t.height,a=i(t.width)&&e.minWidth&&e.minWidth>t.width,r=i(t.height)&&e.minHeight&&e.minHeight>t.height,l=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,u=/sw|nw|w/.test(s),p=/nw|ne|n/.test(s);return a&&(t.width=e.minWidth),r&&(t.height=e.minHeight),o&&(t.width=e.maxWidth),n&&(t.height=e.maxHeight),a&&u&&(t.left=l-e.minWidth),o&&u&&(t.left=l-e.maxWidth),r&&p&&(t.top=h-e.minHeight),n&&p&&(t.top=h-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var t,e,i,s,o,n=this.helper||this.element;for(t=0;this._proportionallyResizeElements.length>t;t++){if(o=this._proportionallyResizeElements[t],!this.borderDif)for(this.borderDif=[],i=[o.css("borderTopWidth"),o.css("borderRightWidth"),o.css("borderBottomWidth"),o.css("borderLeftWidth")],s=[o.css("paddingTop"),o.css("paddingRight"),o.css("paddingBottom"),o.css("paddingLeft")],e=0;i.length>e;e++)this.borderDif[e]=(parseInt(i[e],10)||0)+(parseInt(s[e],10)||0);o.css({height:n.height()-this.borderDif[0]-this.borderDif[2]||0,width:n.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize;return{left:this.originalPosition.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize;return{top:this.originalPosition.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).data("ui-resizable"),s=i.options,o=i._proportionallyResizeElements,n=o.length&&/textarea/i.test(o[0].nodeName),a=n&&t.ui.hasScroll(o[0],"left")?0:i.sizeDiff.height,r=n?0:i.sizeDiff.width,l={width:i.size.width-r,height:i.size.height-a},h=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(l,u&&h?{top:u,left:h}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};o&&o.length&&t(o[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var i,s,o,n,a,r,l,h=t(this).data("ui-resizable"),u=h.options,p=h.element,c=u.containment,d=c instanceof t?c.get(0):/parent/.test(c)?p.parent().get(0):c;d&&(h.containerElement=t(d),/document/.test(c)||c===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(i=t(d),s=[],t(["Top","Right","Left","Bottom"]).each(function(t,o){s[t]=e(i.css("padding"+o))}),h.containerOffset=i.offset(),h.containerPosition=i.position(),h.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},o=h.containerOffset,n=h.containerSize.height,a=h.containerSize.width,r=t.ui.hasScroll(d,"left")?d.scrollWidth:a,l=t.ui.hasScroll(d)?d.scrollHeight:n,h.parentData={element:d,left:o.left,top:o.top,width:r,height:l}))},resize:function(e){var i,s,o,n,a=t(this).data("ui-resizable"),r=a.options,l=a.containerOffset,h=a.position,u=a._aspectRatio||e.shiftKey,p={top:0,left:0},c=a.containerElement;c[0]!==document&&/static/.test(c.css("position"))&&(p=l),h.left<(a._helper?l.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-l.left:a.position.left-p.left),u&&(a.size.height=a.size.width/a.aspectRatio),a.position.left=r.helper?l.left:0),h.top<(a._helper?l.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-l.top:a.position.top),u&&(a.size.width=a.size.height*a.aspectRatio),a.position.top=a._helper?l.top:0),a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top,i=Math.abs((a._helper,a.offset.left-p.left+a.sizeDiff.width)),s=Math.abs((a._helper?a.offset.top-p.top:a.offset.top-l.top)+a.sizeDiff.height),o=a.containerElement.get(0)===a.element.parent().get(0),n=/relative|absolute/.test(a.containerElement.css("position")),o&&n&&(i-=a.parentData.left),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,u&&(a.size.height=a.size.width/a.aspectRatio)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,u&&(a.size.width=a.size.height*a.aspectRatio))},stop:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.containerOffset,o=e.containerPosition,n=e.containerElement,a=t(e.helper),r=a.offset(),l=a.outerWidth()-e.sizeDiff.width,h=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(n.css("position"))&&t(this).css({left:r.left-o.left-s.left,width:l,height:h}),e._helper&&!i.animate&&/static/.test(n.css("position"))&&t(this).css({left:r.left-o.left-s.left,width:l,height:h})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).data("ui-resizable").options,i=function(e){t(e).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseInt(e.width(),10),height:parseInt(e.height(),10),left:parseInt(e.css("left"),10),top:parseInt(e.css("top"),10)})})};"object"!=typeof e.alsoResize||e.alsoResize.parentNode?i(e.alsoResize):e.alsoResize.length?(e.alsoResize=e.alsoResize[0],i(e.alsoResize)):t.each(e.alsoResize,function(t){i(t)})},resize:function(e,i){var s=t(this).data("ui-resizable"),o=s.options,n=s.originalSize,a=s.originalPosition,r={height:s.size.height-n.height||0,width:s.size.width-n.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0},l=function(e,s){t(e).each(function(){var e=t(this),o=t(this).data("ui-resizable-alsoresize"),n={},a=s&&s.length?s:e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(a,function(t,e){var i=(o[e]||0)+(r[e]||0);i&&i>=0&&(n[e]=i||null)}),e.css(n)})};"object"!=typeof o.alsoResize||o.alsoResize.nodeType?l(o.alsoResize):t.each(o.alsoResize,function(t,e){l(t,e)})},stop:function(){t(this).removeData("resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).data("ui-resizable");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).data("ui-resizable");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.size,o=e.originalSize,n=e.originalPosition,a=e.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,l=r[0]||1,h=r[1]||1,u=Math.round((s.width-o.width)/l)*l,p=Math.round((s.height-o.height)/h)*h,c=o.width+u,d=o.height+p,f=i.maxWidth&&c>i.maxWidth,g=i.maxHeight&&d>i.maxHeight,m=i.minWidth&&i.minWidth>c,b=i.minHeight&&i.minHeight>d;i.grid=r,m&&(c+=l),b&&(d+=h),f&&(c-=l),g&&(d-=h),/^(se|s|e)$/.test(a)?(e.size.width=c,e.size.height=d):/^(ne)$/.test(a)?(e.size.width=c,e.size.height=d,e.position.top=n.top-p):/^(sw)$/.test(a)?(e.size.width=c,e.size.height=d,e.position.left=n.left-u):(e.size.width=c,e.size.height=d,e.position.top=n.top-p,e.position.left=n.left-u)}})}(jQuery),function(t){var e,i,s,o,n="ui-button ui-widget ui-state-default ui-corner-all",a="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",r=function(){var e=t(this);setTimeout(function(){e.find(":ui-button").button("refresh")},1)},l=function(e){var i=e.name,s=e.form,o=t([]);return i&&(i=i.replace(/'/g,"\\'"),o=s?t(s).find("[name='"+i+"']"):t("[name='"+i+"']",e.ownerDocument).filter(function(){return!this.form})),o};t.widget("ui.button",{version:"1.10.3",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,r),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var a=this,h=this.options,u="checkbox"===this.type||"radio"===this.type,p=u?"":"ui-state-active",c="ui-state-focus";null===h.label&&(h.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(n).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){h.disabled||this===e&&t(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){h.disabled||t(this).removeClass(p)}).bind("click"+this.eventNamespace,function(t){h.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){a.buttonElement.addClass(c)}).bind("blur"+this.eventNamespace,function(){a.buttonElement.removeClass(c)}),u&&(this.element.bind("change"+this.eventNamespace,function(){o||a.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(t){h.disabled||(o=!1,i=t.pageX,s=t.pageY)}).bind("mouseup"+this.eventNamespace,function(t){h.disabled||(i!==t.pageX||s!==t.pageY)&&(o=!0)})),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return!h.disabled&&!o&&void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(h.disabled||o)return!1;t(this).addClass("ui-state-active"),a.buttonElement.attr("aria-pressed","true");var e=a.element[0];l(e).not(e).map(function(){return t(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return!h.disabled&&(t(this).addClass("ui-state-active"),e=this,void a.document.one("mouseup",function(){e=null}))}).bind("mouseup"+this.eventNamespace,function(){return!h.disabled&&void t(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(e){return!h.disabled&&void((e.keyCode===t.ui.keyCode.SPACE||e.keyCode===t.ui.keyCode.ENTER)&&t(this).addClass("ui-state-active"))}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){t(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===t.ui.keyCode.SPACE&&t(this).click()})),this._setOption("disabled",h.disabled),this._resetButton()},_determineButtonType:function(){var t,e,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=t.length?t.siblings():this.element.siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),(i=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(n+" ui-state-hover ui-state-active  "+a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){return this._super(t,e),"disabled"===t?void(e?this.element.prop("disabled",!0):this.element.prop("disabled",!1)):void this._resetButton()},refresh:function(){var e=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOption("disabled",e),"radio"===this.type?l(this.element[0]).each(function(){t(this).is(":checked")?t(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"!==this.type){var e=this.buttonElement.removeClass(a),i=t("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),s=this.options.icons,o=s.primary&&s.secondary,n=[];s.primary||s.secondary?(this.options.text&&n.push("ui-button-text-icon"+(o?"s":s.primary?"-primary":"-secondary")),s.primary&&e.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&e.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(n.push(o?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||e.attr("title",t.trim(i)))):n.push("ui-button-text-only"),e.addClass(n.join(" "))}else this.options.label&&this.element.val(this.options.label)}}),t.widget("ui.buttonset",{version:"1.10.3",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var e="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(e?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})}(jQuery),function(t){var e={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};t.widget("ui.dialog",{version:"1.10.3",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),(t=e.parent.children().eq(e.index)).length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i=this;this._isOpen&&!1!==this._trigger("beforeClose",e)&&(this._isOpen=!1,this._destroyOverlay(),this.opener.filter(":focusable").focus().length||t(this.document[0].activeElement).blur(),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",e)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var i=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return i&&!e&&this._trigger("focus",t),i},open:function(){var e=this;return this._isOpen?void(this._moveToTop()&&this._focusTabbable()):(this._isOpen=!0,this.opener=t(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),void this._trigger("open"))},_focusTabbable:function(){var t=this.element.find("[autofocus]");t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).focus()},_keepFocus:function(e){function i(){var e=this.document[0].activeElement;this.uiDialog[0]===e||t.contains(this.uiDialog[0],e)||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),void this.close(e);if(e.keyCode===t.ui.keyCode.TAB){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),o=i.filter(":last");e.target!==o[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(o.focus(1),e.preventDefault()):(s.focus(1),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=t("<button></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(e),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title||t.html("&#160;"),t.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?void this.uiDialog.removeClass("ui-dialog-buttons"):(t.each(i,function(i,s){var o,n;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),o=s.click,s.click=function(){o.apply(e.element[0],arguments)},n={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,t("<button></button>",s).button(n).appendTo(e.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),void this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,o){t(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(o))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(o,n){s.position=[n.position.left-i.document.scrollLeft(),n.position.top-i.document.scrollTop()],t(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",o,e(n))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,s=this.options,o=s.resizable,n=this.uiDialog.css("position"),a="string"==typeof o?o:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:a,start:function(s,o){t(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(o))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(o,n){s.height=t(this).height(),s.width=t(this).width(),t(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",o,e(n))}}).css("position",n)},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(s){var o=this,n=!1,a={};t.each(s,function(t,s){o._setOption(t,s),t in e&&(n=!0),t in i&&(a[t]=s)}),n&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",a)},_setOption:function(t,e){var i,s,o=this.uiDialog;"dialogClass"===t&&o.removeClass(this.options.dialogClass).addClass(e),"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:""+e}),"draggable"===t&&((i=o.is(":data(ui-draggable)"))&&!e&&o.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&((s=o.is(":data(ui-resizable)"))&&!e&&o.resizable("destroy"),s&&"string"==typeof e&&o.resizable("option","handles",e),s||!1===e||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return!!t(e.target).closest(".ui-dialog").length||!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=this,i=this.widgetFullName;t.ui.dialog.overlayInstances||this._delay(function(){t.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(s){e._allowInteraction(s)||(s.preventDefault(),t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())})}),this.overlay=t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),t.ui.dialog.overlayInstances++}},_destroyOverlay:function(){this.options.modal&&this.overlay&&(--t.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),t.ui.dialog.overlayInstances=0,!1!==t.uiBackCompat&&t.widget("ui.dialog",t.ui.dialog,{_position:function(){var e,i=this.options.position,s=[],o=[0,0];i?(("string"==typeof i||"object"==typeof i&&"0"in i)&&(1===(s=i.split?i.split(" "):[i[0],i[1]]).length&&(s[1]=s[0]),t.each(["left","top"],function(t,e){+s[t]===s[t]&&(o[t]=s[t],s[t]=e)}),i={my:s[0]+(0>o[0]?o[0]:"+"+o[0])+" "+s[1]+(0>o[1]?o[1]:"+"+o[1]),at:s.join(" ")}),i=t.extend({},t.ui.dialog.prototype.options.position,i)):i=t.ui.dialog.prototype.options.position,(e=this.uiDialog.is(":visible"))||this.uiDialog.show(),this.uiDialog.position(i),e||this.uiDialog.hide()}})}(jQuery);;
!function(e){function t(e){return"object"==typeof e?e:{top:e,left:e}}var n=e.scrollTo=function(t,n,o){e(window).scrollTo(t,n,o)};n.defaults={axis:"xy",duration:parseFloat(e.fn.jquery)>=1.3?0:1,limit:!0},n.window=function(t){return e(window)._scrollable()},e.fn._scrollable=function(){return this.map(function(){var t=this;if(!(!t.nodeName||-1!=e.inArray(t.nodeName.toLowerCase(),["iframe","#document","html","body"])))return t;var n=(t.contentWindow||t).document||t.ownerDocument||t;return/webkit/i.test(navigator.userAgent)||"BackCompat"==n.compatMode?n.body:n.documentElement})},e.fn.scrollTo=function(o,r,i){return"object"==typeof r&&(i=r,r=0),"function"==typeof i&&(i={onAfter:i}),"max"==o&&(o=9e9),i=e.extend({},n.defaults,i),r=r||i.duration,i.queue=i.queue&&i.axis.length>1,i.queue&&(r/=2),i.offset=t(i.offset),i.over=t(i.over),this._scrollable().each(function(){function a(e){u.animate(l,r,i.easing,e&&function(){e.call(this,f,i)})}if(null!=o){var s,c=this,u=e(c),f=o,l={},d=u.is("html,body");switch(typeof f){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(f)){f=t(f);break}if(!(f=e(f,this)).length)return;case"object":(f.is||f.style)&&(s=(f=e(f)).offset())}e.each(i.axis.split(""),function(e,t){var o="x"==t?"Left":"Top",r=o.toLowerCase(),m="scroll"+o,h=c[m],w=n.max(c,t);if(s)l[m]=s[r]+(d?0:h-u.offset()[r]),i.margin&&(l[m]-=parseInt(f.css("margin"+o))||0,l[m]-=parseInt(f.css("border"+o+"Width"))||0),l[m]+=i.offset[r]||0,i.over[r]&&(l[m]+=f["x"==t?"width":"height"]()*i.over[r]);else{var b=f[r];l[m]=b.slice&&"%"==b.slice(-1)?parseFloat(b)/100*w:b}i.limit&&/^\d+$/.test(l[m])&&(l[m]=l[m]<=0?0:Math.min(l[m],w)),!e&&i.queue&&(h!=l[m]&&a(i.onAfterFirst),delete l[m])}),a(i.onAfter)}}).end()},n.max=function(t,n){var o="x"==n?"Width":"Height",r="scroll"+o;if(!e(t).is("html,body"))return t[r]-e(t)[o.toLowerCase()]();var i="client"+o,a=t.ownerDocument.documentElement,s=t.ownerDocument.body;return Math.max(a[r],s[r])-Math.min(a[i],s[i])}}(jQuery);;
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function n(e){return t.raw?e:decodeURIComponent(e.replace(i," "))}function o(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")),e=n(e);try{return t.json?JSON.parse(e):e}catch(e){}}var i=/\+/g,t=e.cookie=function(i,r,a){if(void 0!==r){if("number"==typeof(a=e.extend({},t.defaults,a)).expires){var c=a.expires,d=a.expires=new Date;d.setDate(d.getDate()+c)}return r=t.json?JSON.stringify(r):String(r),document.cookie=[t.raw?i:encodeURIComponent(i),"=",t.raw?r:encodeURIComponent(r),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}for(var f=document.cookie.split("; "),p=i?void 0:{},u=0,s=f.length;u<s;u++){var m=f[u].split("="),x=n(m.shift()),l=m.join("=");if(i&&i===x){p=o(l);break}i||(p[x]=o(l))}return p};t.defaults={},e.removeCookie=function(n,o){return void 0!==e.cookie(n)&&(e.cookie(n,"",e.extend({},o,{expires:-1})),!0)}});;
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(n,e,t,u,a){return jQuery.easing[jQuery.easing.def](n,e,t,u,a)},easeInQuad:function(n,e,t,u,a){return u*(e/=a)*e+t},easeOutQuad:function(n,e,t,u,a){return-u*(e/=a)*(e-2)+t},easeInOutQuad:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e+t:-u/2*(--e*(e-2)-1)+t},easeInCubic:function(n,e,t,u,a){return u*(e/=a)*e*e+t},easeOutCubic:function(n,e,t,u,a){return u*((e=e/a-1)*e*e+1)+t},easeInOutCubic:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e+t:u/2*((e-=2)*e*e+2)+t},easeInQuart:function(n,e,t,u,a){return u*(e/=a)*e*e*e+t},easeOutQuart:function(n,e,t,u,a){return-u*((e=e/a-1)*e*e*e-1)+t},easeInOutQuart:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e+t:-u/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(n,e,t,u,a){return u*(e/=a)*e*e*e*e+t},easeOutQuint:function(n,e,t,u,a){return u*((e=e/a-1)*e*e*e*e+1)+t},easeInOutQuint:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e*e+t:u/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(n,e,t,u,a){return-u*Math.cos(e/a*(Math.PI/2))+u+t},easeOutSine:function(n,e,t,u,a){return u*Math.sin(e/a*(Math.PI/2))+t},easeInOutSine:function(n,e,t,u,a){return-u/2*(Math.cos(Math.PI*e/a)-1)+t},easeInExpo:function(n,e,t,u,a){return 0==e?t:u*Math.pow(2,10*(e/a-1))+t},easeOutExpo:function(n,e,t,u,a){return e==a?t+u:u*(1-Math.pow(2,-10*e/a))+t},easeInOutExpo:function(n,e,t,u,a){return 0==e?t:e==a?t+u:(e/=a/2)<1?u/2*Math.pow(2,10*(e-1))+t:u/2*(2-Math.pow(2,-10*--e))+t},easeInCirc:function(n,e,t,u,a){return-u*(Math.sqrt(1-(e/=a)*e)-1)+t},easeOutCirc:function(n,e,t,u,a){return u*Math.sqrt(1-(e=e/a-1)*e)+t},easeInOutCirc:function(n,e,t,u,a){return(e/=a/2)<1?-u/2*(Math.sqrt(1-e*e)-1)+t:u/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;r=i/4}else r=i/(2*Math.PI)*Math.asin(u/s);return-s*Math.pow(2,10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i)+t},easeOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;r=i/4}else r=i/(2*Math.PI)*Math.asin(u/s);return s*Math.pow(2,-10*e)*Math.sin((e*a-r)*(2*Math.PI)/i)+u+t},easeInOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(2==(e/=a/2))return t+u;if(i||(i=a*(.3*1.5)),s<Math.abs(u)){s=u;r=i/4}else r=i/(2*Math.PI)*Math.asin(u/s);return e<1?s*Math.pow(2,10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i)*-.5+t:s*Math.pow(2,-10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i)*.5+u+t},easeInBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*(e/=a)*e*((r+1)*e-r)+t},easeOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*((e=e/a-1)*e*((r+1)*e+r)+1)+t},easeInOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),(e/=a/2)<1?u/2*(e*e*((1+(r*=1.525))*e-r))+t:u/2*((e-=2)*e*((1+(r*=1.525))*e+r)+2)+t},easeInBounce:function(n,e,t,u,a){return u-jQuery.easing.easeOutBounce(n,a-e,0,u,a)+t},easeOutBounce:function(n,e,t,u,a){return(e/=a)<1/2.75?u*(7.5625*e*e)+t:e<2/2.75?u*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?u*(7.5625*(e-=2.25/2.75)*e+.9375)+t:u*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(n,e,t,u,a){return e<a/2?.5*jQuery.easing.easeInBounce(n,2*e,0,u,a)+t:.5*jQuery.easing.easeOutBounce(n,2*e-a,0,u,a)+.5*u+t}});;
!function(e,t,i,n){"use strict";var o=i("html"),a=i(e),r=i(t),s=i.fancybox=function(){s.open.apply(this,arguments)},l=navigator.userAgent.match(/msie/i),c=null,d=void 0!==t.createTouch,p=function(e){return e&&e.hasOwnProperty&&e instanceof i},h=function(e){return e&&"string"===i.type(e)},f=function(e){return h(e)&&e.indexOf("%")>0},u=function(e){return e&&!(e.style.overflow&&"hidden"===e.style.overflow)&&(e.clientWidth&&e.scrollWidth>e.clientWidth||e.clientHeight&&e.scrollHeight>e.clientHeight)},g=function(e,t){var i=parseInt(e,10)||0;return t&&f(e)&&(i=s.getViewport()[t]/100*i),Math.ceil(i)},m=function(e,t){return g(e,t)+"px"};i.extend(s,{version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!d,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(l?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:i.noop,beforeLoad:i.noop,afterLoad:i.noop,beforeShow:i.noop,afterShow:i.noop,beforeChange:i.noop,beforeClose:i.noop,afterClose:i.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){if(e&&(i.isPlainObject(t)||(t={}),!1!==s.close(!0)))return i.isArray(e)||(e=p(e)?i(e).get():[e]),i.each(e,function(n,o){var a,r,l,c,d,f,u,g={};"object"===i.type(o)&&(o.nodeType&&(o=i(o)),p(o)?(g={href:o.data("fancybox-href")||o.attr("href"),title:o.data("fancybox-title")||o.attr("title"),isDom:!0,element:o},i.metadata&&i.extend(!0,g,o.metadata())):g=o),a=t.href||g.href||(h(o)?o:null),r=void 0!==t.title?t.title:g.title||"",!(c=(l=t.content||g.content)?"html":t.type||g.type)&&g.isDom&&((c=o.data("fancybox-type"))||(c=(d=o.prop("class").match(/fancybox\.(\w+)/))?d[1]:null)),h(a)&&(c||(s.isImage(a)?c="image":s.isSWF(a)?c="swf":"#"===a.charAt(0)?c="inline":h(o)&&(c="html",l=o)),"ajax"===c&&(a=(f=a.split(/\s+/,2)).shift(),u=f.shift())),l||("inline"===c?a?l=i(h(a)?a.replace(/.*(?=#[^\s]+$)/,""):a):g.isDom&&(l=o):"html"===c?l=a:c||a||!g.isDom||(c="inline",l=o)),i.extend(g,{href:a,type:c,content:l,title:r,selector:u}),e[n]=g}),s.opts=i.extend(!0,{},s.defaults,t),void 0!==t.keys&&(s.opts.keys=!!t.keys&&i.extend({},s.defaults.keys,t.keys)),s.group=e,s._start(s.opts.index)},cancel:function(){var e=s.coming;e&&!1!==s.trigger("onCancel")&&(s.hideLoading(),s.ajaxLoad&&s.ajaxLoad.abort(),s.ajaxLoad=null,s.imgPreload&&(s.imgPreload.onload=s.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),s.coming=null,s.current||s._afterZoomOut(e))},close:function(e){s.cancel(),!1!==s.trigger("beforeClose")&&(s.unbindEvents(),s.isActive&&(s.isOpen&&!0!==e?(s.isOpen=s.isOpened=!1,s.isClosing=!0,i(".fancybox-item, .fancybox-nav").remove(),s.wrap.stop(!0,!0).removeClass("fancybox-opened"),s.transitions[s.current.closeMethod]()):(i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),s._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(s.player.timer)},i=function(){t(),s.current&&s.player.isActive&&(s.player.timer=setTimeout(s.next,s.current.playSpeed))},n=function(){t(),r.unbind(".player"),s.player.isActive=!1,s.trigger("onPlayEnd")};!0===e||!s.player.isActive&&!1!==e?function(){s.current&&(s.current.loop||s.current.index<s.group.length-1)&&(s.player.isActive=!0,r.bind({"onCancel.player beforeClose.player":n,"onUpdate.player":i,"beforeLoad.player":t}),i(),s.trigger("onPlayStart"))}():n()},next:function(e){var t=s.current;t&&(h(e)||(e=t.direction.next),s.jumpto(t.index+1,e,"next"))},prev:function(e){var t=s.current;t&&(h(e)||(e=t.direction.prev),s.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,i){var n=s.current;n&&(e=g(e),s.direction=t||n.direction[e>=n.index?"next":"prev"],s.router=i||"jumpto",n.loop&&(e<0&&(e=n.group.length+e%n.group.length),e%=n.group.length),void 0!==n.group[e]&&(s.cancel(),s._start(e)))},reposition:function(e,t){var n,o=s.current,a=o?o.wrap:null;a&&(n=s._getPosition(t),e&&"scroll"===e.type?(delete n.position,a.stop(!0,!0).animate(n,200)):(a.css(n),o.pos=i.extend({},o.dim,n)))},update:function(e){var t=e&&e.type,i=!t||"orientationchange"===t;i&&(clearTimeout(c),c=null),s.isOpen&&!c&&(c=setTimeout(function(){var n=s.current;n&&!s.isClosing&&(s.wrap.removeClass("fancybox-tmp"),(i||"load"===t||"resize"===t&&n.autoResize)&&s._setDimension(),"scroll"===t&&n.canShrink||s.reposition(e),s.trigger("onUpdate"),c=null)},i&&!d?0:300))},toggle:function(e){s.isOpen&&(s.current.fitToView="boolean"===i.type(e)?e:!s.current.fitToView,d&&(s.wrap.removeAttr("style").addClass("fancybox-tmp"),s.trigger("onUpdate")),s.update())},hideLoading:function(){r.unbind(".loading"),i("#fancybox-loading").remove()},showLoading:function(){var e,t;s.hideLoading(),e=i('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"),r.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),s.cancel())}),s.defaults.fixed||(t=s.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x}))},getViewport:function(){var t=s.current&&s.current.locked||!1,i={x:a.scrollLeft(),y:a.scrollTop()};return t?(i.w=t[0].clientWidth,i.h=t[0].clientHeight):(i.w=d&&e.innerWidth?e.innerWidth:a.width(),i.h=d&&e.innerHeight?e.innerHeight:a.height()),i},unbindEvents:function(){s.wrap&&p(s.wrap)&&s.wrap.unbind(".fb"),r.unbind(".fb"),a.unbind(".fb")},bindEvents:function(){var e,t=s.current;t&&(a.bind("orientationchange.fb"+(d?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),s.update),(e=t.keys)&&r.bind("keydown.fb",function(n){var o=n.which||n.keyCode,a=n.target||n.srcElement;if(27===o&&s.coming)return!1;n.ctrlKey||n.altKey||n.shiftKey||n.metaKey||a&&(a.type||i(a).is("[contenteditable]"))||i.each(e,function(e,a){return t.group.length>1&&void 0!==a[o]?(s[e](a[o]),n.preventDefault(),!1):i.inArray(o,a)>-1?(s[e](),n.preventDefault(),!1):void 0})}),i.fn.mousewheel&&t.mouseWheel&&s.wrap.bind("mousewheel.fb",function(e,n,o,a){for(var r=e.target||null,l=i(r),c=!1;l.length&&!(c||l.is(".fancybox-skin")||l.is(".fancybox-wrap"));)c=u(l[0]),l=i(l).parent();0===n||c||s.group.length>1&&!t.canShrink&&(a>0||o>0?s.prev(a>0?"down":"left"):(a<0||o<0)&&s.next(a<0?"up":"right"),e.preventDefault())}))},trigger:function(e,t){var n,o=t||s.coming||s.current;if(o){if(i.isFunction(o[e])&&(n=o[e].apply(o,Array.prototype.slice.call(arguments,1))),!1===n)return!1;o.helpers&&i.each(o.helpers,function(t,n){n&&s.helpers[t]&&i.isFunction(s.helpers[t][e])&&s.helpers[t][e](i.extend(!0,{},s.helpers[t].defaults,n),o)}),r.trigger(e)}},isImage:function(e){return h(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(e){return h(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,n,o,a,r,l={};if(e=g(e),!(t=s.group[e]||null))return!1;if(l=i.extend(!0,{},s.opts,t),a=l.margin,r=l.padding,"number"===i.type(a)&&(l.margin=[a,a,a,a]),"number"===i.type(r)&&(l.padding=[r,r,r,r]),l.modal&&i.extend(!0,l,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),l.autoSize&&(l.autoWidth=l.autoHeight=!0),"auto"===l.width&&(l.autoWidth=!0),"auto"===l.height&&(l.autoHeight=!0),l.group=s.group,l.index=e,s.coming=l,!1!==s.trigger("beforeLoad")){if(o=l.type,n=l.href,!o)return s.coming=null,!(!s.current||!s.router||"jumpto"===s.router)&&(s.current.index=e,s[s.router](s.direction));if(s.isActive=!0,"image"!==o&&"swf"!==o||(l.autoHeight=l.autoWidth=!1,l.scrolling="visible"),"image"===o&&(l.aspectRatio=!0),"iframe"===o&&d&&(l.scrolling="scroll"),l.wrap=i(l.tpl.wrap).addClass("fancybox-"+(d?"mobile":"desktop")+" fancybox-type-"+o+" fancybox-tmp "+l.wrapCSS).appendTo(l.parent||"body"),i.extend(l,{skin:i(".fancybox-skin",l.wrap),outer:i(".fancybox-outer",l.wrap),inner:i(".fancybox-inner",l.wrap)}),i.each(["Top","Right","Bottom","Left"],function(e,t){l.skin.css("padding"+t,m(l.padding[e]))}),s.trigger("onReady"),"inline"===o||"html"===o){if(!l.content||!l.content.length)return s._error("content")}else if(!n)return s._error("href");"image"===o?s._loadImage():"ajax"===o?s._loadAjax():"iframe"===o?s._loadIframe():s._afterLoad()}else s.coming=null},_error:function(e){i.extend(s.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:s.coming.tpl.error}),s._afterLoad()},_loadImage:function(){var e=s.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,s.coming.width=this.width/s.opts.pixelRatio,s.coming.height=this.height/s.opts.pixelRatio,s._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,s._error("image")},e.src=s.coming.href,!0!==e.complete&&s.showLoading()},_loadAjax:function(){var e=s.coming;s.showLoading(),s.ajaxLoad=i.ajax(i.extend({},e.ajax,{url:e.href,error:function(e,t){s.coming&&"abort"!==t?s._error("ajax",e):s.hideLoading()},success:function(t,i){"success"===i&&(e.content=t,s._afterLoad())}}))},_loadIframe:function(){var e=s.coming,t=i(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",d?"auto":e.iframe.scrolling).attr("src",e.href);i(e.wrap).bind("onReset",function(){try{i(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(s.showLoading(),t.one("load",function(){i(this).data("ready",1),d||i(this).bind("load.fb",s.update),i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),s._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||s._afterLoad()},_preloadImages:function(){var e,t,i=s.group,n=s.current,o=i.length,a=n.preload?Math.min(n.preload,o-1):0;for(t=1;t<=a;t+=1)"image"===(e=i[(n.index+t)%o]).type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,n,o,a,r,l=s.coming,c=s.current,d="fancybox-placeholder";if(s.hideLoading(),l&&!1!==s.isActive){if(!1===s.trigger("afterLoad",l,c))return l.wrap.stop(!0).trigger("onReset").remove(),void(s.coming=null);switch(c&&(s.trigger("beforeChange",c),c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),s.unbindEvents(),e=l,t=l.content,n=l.type,o=l.scrolling,i.extend(s,{wrap:e.wrap,skin:e.skin,outer:e.outer,inner:e.inner,current:e,previous:c}),a=e.href,n){case"inline":case"ajax":case"html":e.selector?t=i("<div>").html(t).find(e.selector):p(t)&&(t.data(d)||t.data(d,i('<div class="'+d+'"></div>').insertAfter(t).hide()),t=t.show().detach(),e.wrap.bind("onReset",function(){i(this).find(t).length&&t.hide().replaceAll(t.data(d)).data(d,!1)}));break;case"image":t=e.tpl.image.replace("{href}",a);break;case"swf":t='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+a+'"></param>',r="",i.each(e.swf,function(e,i){t+='<param name="'+e+'" value="'+i+'"></param>',r+=" "+e+'="'+i+'"'}),t+='<embed src="'+a+'" type="application/x-shockwave-flash" width="100%" height="100%"'+r+"></embed></object>"}p(t)&&t.parent().is(e.inner)||e.inner.append(t),s.trigger("beforeShow"),e.inner.css("overflow","yes"===o?"scroll":"no"===o?"hidden":o),s._setDimension(),s.reposition(),s.isOpen=!1,s.coming=null,s.bindEvents(),s.isOpened?c.prevMethod&&s.transitions[c.prevMethod]():i(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(),s.transitions[s.isOpened?e.nextMethod:e.openMethod](),s._preloadImages()}},_setDimension:function(){var e,t,n,o,a,r,l,c,d,p,h,u,y,x,v,w=s.getViewport(),b=0,k=!1,C=!1,O=s.wrap,W=s.skin,_=s.inner,S=s.current,T=S.width,L=S.height,E=S.minWidth,R=S.minHeight,j=S.maxWidth,P=S.maxHeight,H=S.scrolling,M=S.scrollOutside?S.scrollbarWidth:0,A=S.margin,I=g(A[1]+A[3]),D=g(A[0]+A[2]);if(O.add(W).add(_).width("auto").height("auto").removeClass("fancybox-tmp"),e=g(W.outerWidth(!0)-W.width()),t=g(W.outerHeight(!0)-W.height()),n=I+e,o=D+t,a=f(T)?(w.w-n)*g(T)/100:T,r=f(L)?(w.h-o)*g(L)/100:L,"iframe"===S.type){if(x=S.content,S.autoHeight&&1===x.data("ready"))try{x[0].contentWindow.document.location&&(_.width(a).height(9999),v=x.contents().find("body"),M&&v.css("overflow-x","hidden"),r=v.outerHeight(!0))}catch(e){}}else(S.autoWidth||S.autoHeight)&&(_.addClass("fancybox-tmp"),S.autoWidth||_.width(a),S.autoHeight||_.height(r),S.autoWidth&&(a=_.width()),S.autoHeight&&(r=_.height()),_.removeClass("fancybox-tmp"));if(T=g(a),L=g(r),d=a/r,E=g(f(E)?g(E,"w")-n:E),j=g(f(j)?g(j,"w")-n:j),R=g(f(R)?g(R,"h")-o:R),P=g(f(P)?g(P,"h")-o:P),l=j,c=P,S.fitToView&&(j=Math.min(w.w-n,j),P=Math.min(w.h-o,P)),u=w.w-I,y=w.h-D,S.aspectRatio?(T>j&&(L=g((T=j)/d)),L>P&&(T=g((L=P)*d)),T<E&&(L=g((T=E)/d)),L<R&&(T=g((L=R)*d))):(T=Math.max(E,Math.min(T,j)),S.autoHeight&&"iframe"!==S.type&&(_.width(T),L=_.height()),L=Math.max(R,Math.min(L,P))),S.fitToView)if(_.width(T).height(L),O.width(T+e),p=O.width(),h=O.height(),S.aspectRatio)for(;(p>u||h>y)&&T>E&&L>R&&!(b++>19);)L=Math.max(R,Math.min(P,L-10)),(T=g(L*d))<E&&(L=g((T=E)/d)),T>j&&(L=g((T=j)/d)),_.width(T).height(L),O.width(T+e),p=O.width(),h=O.height();else T=Math.max(E,Math.min(T,T-(p-u))),L=Math.max(R,Math.min(L,L-(h-y)));M&&"auto"===H&&L<r&&T+e+M<u&&(T+=M),_.width(T).height(L),O.width(T+e),p=O.width(),h=O.height(),k=(p>u||h>y)&&T>E&&L>R,C=S.aspectRatio?T<l&&L<c&&T<a&&L<r:(T<l||L<c)&&(T<a||L<r),i.extend(S,{dim:{width:m(p),height:m(h)},origWidth:a,origHeight:r,canShrink:k,canExpand:C,wPadding:e,hPadding:t,wrapSpace:h-W.outerHeight(!0),skinSpace:W.height()-L}),!x&&S.autoHeight&&L>R&&L<P&&!C&&_.height("auto")},_getPosition:function(e){var t=s.current,i=s.getViewport(),n=t.margin,o=s.wrap.width()+n[1]+n[3],a=s.wrap.height()+n[0]+n[2],r={position:"absolute",top:n[0],left:n[3]};return t.autoCenter&&t.fixed&&!e&&a<=i.h&&o<=i.w?r.position="fixed":t.locked||(r.top+=i.y,r.left+=i.x),r.top=m(Math.max(r.top,r.top+(i.h-a)*t.topRatio)),r.left=m(Math.max(r.left,r.left+(i.w-o)*t.leftRatio)),r},_afterZoomIn:function(){var e=s.current;e&&(s.isOpen=s.isOpened=!0,s.wrap.css("overflow","visible").addClass("fancybox-opened"),s.update(),(e.closeClick||e.nextClick&&s.group.length>1)&&s.inner.css("cursor","pointer").bind("click.fb",function(t){i(t.target).is("a")||i(t.target).parent().is("a")||(t.preventDefault(),s[e.closeClick?"close":"next"]())}),e.closeBtn&&i(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb",function(e){e.preventDefault(),s.close()}),e.arrows&&s.group.length>1&&((e.loop||e.index>0)&&i(e.tpl.prev).appendTo(s.outer).bind("click.fb",s.prev),(e.loop||e.index<s.group.length-1)&&i(e.tpl.next).appendTo(s.outer).bind("click.fb",s.next)),s.trigger("afterShow"),e.loop||e.index!==e.group.length-1?s.opts.autoPlay&&!s.player.isActive&&(s.opts.autoPlay=!1,s.play()):s.play(!1))},_afterZoomOut:function(e){e=e||s.current,i(".fancybox-wrap").trigger("onReset").remove(),i.extend(s,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),s.trigger("afterClose",e)}}),s.transitions={getOrigPosition:function(){var e=s.current,t=e.element,i=e.orig,n={},o=50,a=50,r=e.hPadding,l=e.wPadding,c=s.getViewport();return!i&&e.isDom&&t.is(":visible")&&((i=t.find("img:first")).length||(i=t)),p(i)?(n=i.offset(),i.is("img")&&(o=i.outerWidth(),a=i.outerHeight())):(n.top=c.y+(c.h-a)*e.topRatio,n.left=c.x+(c.w-o)*e.leftRatio),("fixed"===s.wrap.css("position")||e.locked)&&(n.top-=c.y,n.left-=c.x),n={top:m(n.top-r*e.topRatio),left:m(n.left-l*e.leftRatio),width:m(o+l),height:m(a+r)}},step:function(e,t){var i,n,o=t.prop,a=s.current,r=a.wrapSpace,l=a.skinSpace;"width"!==o&&"height"!==o||(i=t.end===t.start?1:(e-t.start)/(t.end-t.start),s.isClosing&&(i=1-i),n=e-("width"===o?a.wPadding:a.hPadding),s.skin[o](g("width"===o?n:n-r*i)),s.inner[o](g("width"===o?n:n-r*i-l*i)))},zoomIn:function(){var e=s.current,t=e.pos,n=e.openEffect,o="elastic"===n,a=i.extend({opacity:1},t);delete a.position,o?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===n&&(t.opacity=.1),s.wrap.css(t).animate(a,{duration:"none"===n?0:e.openSpeed,easing:e.openEasing,step:o?this.step:null,complete:s._afterZoomIn})},zoomOut:function(){var e=s.current,t=e.closeEffect,i="elastic"===t,n={opacity:.1};i&&(n=this.getOrigPosition(),e.closeOpacity&&(n.opacity=.1)),s.wrap.animate(n,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:i?this.step:null,complete:s._afterZoomOut})},changeIn:function(){var e,t=s.current,i=t.nextEffect,n=t.pos,o={opacity:1},a=s.direction;n.opacity=.1,"elastic"===i&&(e="down"===a||"up"===a?"top":"left","down"===a||"right"===a?(n[e]=m(g(n[e])-200),o[e]="+=200px"):(n[e]=m(g(n[e])+200),o[e]="-=200px")),"none"===i?s._afterZoomIn():s.wrap.css(n).animate(o,{duration:t.nextSpeed,easing:t.nextEasing,complete:s._afterZoomIn})},changeOut:function(){var e=s.previous,t=e.prevEffect,n={opacity:.1},o=s.direction;"elastic"===t&&(n["down"===o||"up"===o?"top":"left"]=("up"===o||"left"===o?"-":"+")+"=200px"),e.wrap.animate(n,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){i(this).trigger("onReset").remove()}})}},s.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!d,fixed:!0},overlay:null,fixed:!1,el:i("html"),create:function(e){e=i.extend({},this.defaults,e),this.overlay&&this.close(),this.overlay=i('<div class="fancybox-overlay"></div>').appendTo(s.coming?s.coming.parent:e.parent),this.fixed=!1,e.fixed&&s.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=i.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(a.bind("resize.overlay",i.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){if(i(e.target).hasClass("fancybox-overlay"))return s.isActive?s.close():t.close(),!1}),this.overlay.css(e.css).show()},close:function(){var e,t;a.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&(i(".fancybox-margin").removeClass("fancybox-margin"),e=a.scrollTop(),t=a.scrollLeft(),this.el.removeClass("fancybox-lock"),a.scrollTop(e).scrollLeft(t)),i(".fancybox-overlay").remove().hide(),i.extend(this,{overlay:null,fixed:!1})},update:function(){var e,i="100%";this.overlay.width(i).height("100%"),l?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),r.width()>e&&(i=r.width())):r.width()>a.width()&&(i=r.width()),this.overlay.width(i).height(r.height())},onReady:function(e,t){var n=this.overlay;i(".fancybox-overlay").stop(!0,!0),n||this.create(e),e.locked&&this.fixed&&t.fixed&&(n||(this.margin=r.height()>a.height()&&i("html").css("margin-right").replace("px","")),t.locked=this.overlay.append(t.wrap),t.fixed=!1),!0===e.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){var n,o;t.locked&&(!1!==this.margin&&(i("*").filter(function(){return"fixed"===i(this).css("position")&&!i(this).hasClass("fancybox-overlay")&&!i(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),n=a.scrollTop(),o=a.scrollLeft(),this.el.addClass("fancybox-lock"),a.scrollTop(n).scrollLeft(o)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!s.coming&&this.overlay.fadeOut(e.speedOut,i.proxy(this.close,this))}},s.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t,n,o=s.current,a=o.title,r=e.type;if(i.isFunction(a)&&(a=a.call(o.element,o)),h(a)&&""!==i.trim(a)){switch(t=i('<div class="fancybox-title fancybox-title-'+r+'-wrap">'+a+"</div>"),r){case"inside":n=s.skin;break;case"outside":n=s.wrap;break;case"over":n=s.inner;break;default:n=s.skin,t.appendTo("body"),l&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),s.current.margin[2]+=Math.abs(g(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](n)}}},i.fn.fancybox=function(e){var t,n=i(this),o=this.selector||"",a=function(a){var r,l,c=i(this).blur(),d=t;a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||c.is(".fancybox-wrap")||(r=e.groupAttr||"data-fancybox-group",(l=c.attr(r))||(r="rel",l=c.get(0)[r]),l&&""!==l&&"nofollow"!==l&&(d=(c=(c=o.length?i(o):n).filter("["+r+'="'+l+'"]')).index(this)),e.index=d,!1!==s.open(c,e)&&a.preventDefault())};return e=e||{},t=e.index||0,o&&!1!==e.live?r.undelegate(o,"click.fb-start").delegate(o+":not('.fancybox-item, .fancybox-nav')","click.fb-start",a):n.unbind("click.fb-start").bind("click.fb-start",a),this.filter("[data-fancybox-start=1]").trigger("click"),this},r.ready(function(){var t,n;void 0===i.scrollbarWidth&&(i.scrollbarWidth=function(){var e=i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),n=t.innerWidth()-t.height(99).innerWidth();return e.remove(),n}),void 0===i.support.fixedPosition&&(i.support.fixedPosition=function(){var e=i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),t=20===e[0].offsetTop||15===e[0].offsetTop;return e.remove(),t}()),i.extend(s.defaults,{scrollbarWidth:i.scrollbarWidth(),fixed:i.support.fixedPosition,parent:i("body")}),t=i(e).width(),o.addClass("fancybox-lock-test"),n=i(e).width(),o.removeClass("fancybox-lock-test"),i("<style type='text/css'>.fancybox-margin{margin-right:"+(n-t)+"px;}</style>").appendTo("head")})}(window,document,jQuery);;
!function(e,n,t,r,o,a){function i(e,n){var t=typeof e[n];return"function"==t||!("object"!=t||!e[n])||"unknown"==t}function s(e,n){return!("object"!=typeof e[n]||!e[n])}function c(e){return"[object Array]"===Object.prototype.toString.call(e)}function l(){var e="Shockwave Flash",n="application/x-shockwave-flash";if(!w(navigator.plugins)&&"object"==typeof navigator.plugins[e]){var t=navigator.plugins[e].description;t&&!w(navigator.mimeTypes)&&navigator.mimeTypes[n]&&navigator.mimeTypes[n].enabledPlugin&&(D=t.match(/\d+/g))}if(!D){var r;try{r=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),D=Array.prototype.slice.call(r.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1),r=null}catch(e){}}if(!D)return!1;var o=parseInt(D[0],10),a=parseInt(D[1],10);return S=o>9&&a>0,!0}function u(){if(!z){z=!0,I("firing dom_onReady");for(var e=0;e<Q.length;e++)Q[e]();Q.length=0}}function d(e,n){z?e.call(n):Q.push(function(){e.call(n)})}function f(){var e=parent;if(""!==j)for(var n=0,t=j.split(".");n<t.length;n++){if(!e)throw new Error(t.slice(0,n+1).join(".")+" is not an object");e=e[t[n]]}if(!e||!e.easyXDM)throw new Error("Could not find easyXDM in parent."+j);return e.easyXDM}function p(n){if("string"!=typeof n||!n)throw new Error("namespace must be a non-empty string");return I("Settings namespace to '"+n+"'"),e.easyXDM=A,(j=n)&&(J="easyXDM_"+j.replace(".","_")+"_"),L}function h(e){if(!e)throw new Error("url is undefined or empty");return e.match(C)[3]}function g(e){if(!e)throw new Error("url is undefined or empty");return e.match(C)[4]||""}function m(e){if(!e)throw new Error("url is undefined or empty");if(/^file/.test(e))throw new Error("The file:// protocol is not supported");var n=e.toLowerCase().match(C),t=n[2],r=n[3],o=n[4]||"";return("http:"==t&&":80"==o||"https:"==t&&":443"==o)&&(o=""),t+"//"+r+o}function v(e){if(!e)throw new Error("url is undefined or empty");if(!(e=e.replace(B,"$1/")).match(/^(http||https):\/\//)){var n="/"===e.substring(0,1)?"":t.pathname;"/"!==n.substring(n.length-1)&&(n=n.substring(0,n.lastIndexOf("/")+1)),e=t.protocol+"//"+t.host+n+e}for(;X.test(e);)e=e.replace(X,"");return I("resolved url '"+e+"'"),e}function y(e,n){if(!n)throw new Error("parameters is undefined or null");var t="",r=e.indexOf("#");-1!==r&&(t=e.substring(r),e=e.substring(0,r));var o=[];for(var i in n)n.hasOwnProperty(i)&&o.push(i+"="+a(n[i]));return e+(q?"#":-1==e.indexOf("?")?"?":"&")+o.join("&")+t}function w(e){return void 0===e}function b(e,n,t){var r;for(var o in n)n.hasOwnProperty(o)&&(o in e?"object"==typeof(r=n[o])?b(e[o],r,t):t||(e[o]=n[o]):e[o]=n[o]);return e}function k(){var e=n.body.appendChild(n.createElement("form")),t=e.appendChild(n.createElement("input"));t.name=J+"TEST"+P,E=t!==e.elements[t.name],n.body.removeChild(e),I("HAS_NAME_PROPERTY_BUG: "+E)}function _(e){I("creating frame: "+e.props.src),w(E)&&k();var t;E?t=n.createElement('<iframe name="'+e.props.name+'"/>'):(t=n.createElement("IFRAME")).name=e.props.name,t.id=t.name=e.props.name,delete e.props.name,"string"==typeof e.container&&(e.container=n.getElementById(e.container)),e.container||(b(t.style,{position:"absolute",top:"-2000px",left:"0px"}),e.container=n.body);var r=e.props.src;if(e.props.src="javascript:false",b(t,e.props),t.border=t.frameBorder=0,t.allowTransparency=!0,e.container.appendChild(t),e.onLoad&&R(t,"load",e.onLoad),e.usePost){var o,a=e.container.appendChild(n.createElement("form"));if(a.target=t.name,a.action=r,a.method="POST","object"==typeof e.usePost)for(var i in e.usePost)e.usePost.hasOwnProperty(i)&&(E?o=n.createElement('<input name="'+i+'"/>'):(o=n.createElement("INPUT")).name=i,o.value=e.usePost[i],a.appendChild(o));a.submit(),a.parentNode.removeChild(a)}else t.src=r;return e.props.src=r,t}function x(e,n){"string"==typeof e&&(e=[e]);for(var t,r=e.length;r--;)if(t=e[r],(t=new RegExp("^"==t.substr(0,1)?t:"^"+t.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$")).test(n))return!0;return!1}function T(r){var o,a=r.protocol;if(r.isHost=r.isHost||w(V.xdm_p),q=r.hash||!1,I("preparing transport stack"),r.props||(r.props={}),r.isHost)r.remote=v(r.remote),r.channel=r.channel||"default"+P++,r.secret=Math.random().toString(16).substring(2),w(a)?(a=m(t.href)==m(r.remote)?"4":i(e,"postMessage")||i(n,"postMessage")?"1":r.swf&&i(e,"ActiveXObject")&&l()?"6":"Gecko"===navigator.product&&"frameElement"in e&&-1==navigator.userAgent.indexOf("WebKit")?"5":r.remoteHelper?"2":"0",I("selecting protocol: "+a)):I("using protocol: "+a);else if(I("using parameters from query"),r.channel=V.xdm_c.replace(/["'<>\\]/g,""),r.secret=V.xdm_s,r.remote=V.xdm_e.replace(/["'<>\\]/g,""),a=V.xdm_p,r.acl&&!x(r.acl,r.remote))throw new Error("Access denied for "+r.remote);switch(r.protocol=a,a){case"0":if(b(r,{interval:100,delay:2e3,useResize:!0,useParent:!1,usePolling:!1},!0),r.isHost){if(!r.local){I("looking for image to use as local");for(var s,c=t.protocol+"//"+t.host,u=n.body.getElementsByTagName("img"),d=u.length;d--;)if((s=u[d]).src.substring(0,c.length)===c){r.local=s.src;break}r.local||(I("no image found, defaulting to using the window"),r.local=e)}var f={xdm_c:r.channel,xdm_p:0};r.local===e?(r.usePolling=!0,r.useParent=!0,r.local=t.protocol+"//"+t.host+t.pathname+t.search,f.xdm_e=r.local,f.xdm_pa=1):f.xdm_e=v(r.local),r.container&&(r.useResize=!1,f.xdm_po=1),r.remote=y(r.remote,f)}else b(r,{channel:V.xdm_c,remote:V.xdm_e,useParent:!w(V.xdm_pa),usePolling:!w(V.xdm_po),useResize:!r.useParent&&r.useResize});o=[new L.stack.HashTransport(r),new L.stack.ReliableBehavior({}),new L.stack.QueueBehavior({encode:!0,maxLength:4e3-r.remote.length}),new L.stack.VerifyBehavior({initiate:r.isHost})];break;case"1":o=[new L.stack.PostMessageTransport(r)];break;case"2":r.remoteHelper=v(r.remoteHelper),o=[new L.stack.NameTransport(r),new L.stack.QueueBehavior,new L.stack.VerifyBehavior({initiate:r.isHost})];break;case"3":o=[new L.stack.NixTransport(r)];break;case"4":o=[new L.stack.SameOriginTransport(r)];break;case"5":o=[new L.stack.FrameElementTransport(r)];break;case"6":D||l(),o=[new L.stack.FlashTransport(r)]}return o.push(new L.stack.QueueBehavior({lazy:r.lazy,remove:!0})),o}function M(e){for(var n,t={incoming:function(e,n){this.up.incoming(e,n)},outgoing:function(e,n){this.down.outgoing(e,n)},callback:function(e){this.up.callback(e)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}},r=0,o=e.length;r<o;r++)b(n=e[r],t,!0),0!==r&&(n.down=e[r-1]),r!==o-1&&(n.up=e[r+1]);return n}function O(e){e.up.down=e.down,e.down.up=e.up,e.up=e.down=null}var E,D,S,R,F,N=this,P=Math.floor(1e4*Math.random()),H=Function.prototype,C=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,X=/[\-\w]+\/\.\.\//,B=/([^:])\/\//g,j="",L={},A=e.easyXDM,J="easyXDM_",q=!1,I=H;if(i(e,"addEventListener"))R=function(e,n,t){I("adding listener "+n),e.addEventListener(n,t,!1)},F=function(e,n,t){I("removing listener "+n),e.removeEventListener(n,t,!1)};else{if(!i(e,"attachEvent"))throw new Error("Browser not supported");R=function(e,n,t){I("adding listener "+n),e.attachEvent("on"+n,t)},F=function(e,n,t){I("removing listener "+n),e.detachEvent("on"+n,t)}}var W,z=!1,Q=[];if("readyState"in n?(W=n.readyState,z="complete"==W||~navigator.userAgent.indexOf("AppleWebKit/")&&("loaded"==W||"interactive"==W)):z=!!n.body,!z){if(i(e,"addEventListener"))R(n,"DOMContentLoaded",u);else if(R(n,"readystatechange",function(){"complete"==n.readyState&&u()}),n.documentElement.doScroll&&e===top){var U=function(){if(!z){try{n.documentElement.doScroll("left")}catch(e){return void r(U,1)}u()}};U()}R(e,"load",u)}var V=function(e){for(var n,t={},r=(e=e.substring(1).split("&")).length;r--;)t[(n=e[r].split("="))[0]]=o(n[1]);return t}(/xdm_e=/.test(t.search)?t.search:t.hash),$=function(){var e={},n={a:[1,2,3]},t='{"a":[1,2,3]}';return"undefined"!=typeof JSON&&"function"==typeof JSON.stringify&&JSON.stringify(n).replace(/\s/g,"")===t?JSON:(Object.toJSON&&Object.toJSON(n).replace(/\s/g,"")===t&&(e.stringify=Object.toJSON),"function"==typeof String.prototype.evalJSON&&(n=t.evalJSON()).a&&3===n.a.length&&3===n.a[2]&&(e.parse=function(e){return e.evalJSON()}),e.stringify&&e.parse?($=function(){return e},e):null)};b(L,{version:"2.4.17.1",query:V,stack:{},apply:b,getJSONObject:$,whenReady:d,noConflict:p}),b(L,{checkAcl:x,getDomainName:h,getLocation:m,appendQueryParameters:y});var G={_deferred:[],flush:function(){this.trace("... deferred messages ...");for(var e=0,n=this._deferred.length;e<n;e++)this.trace(this._deferred[e]);this._deferred.length=0,this.trace("... end of deferred messages ...")},getTime:function(){var e=new Date,n=e.getHours()+"",t=e.getMinutes()+"",r=e.getSeconds()+"",o=e.getMilliseconds()+"";return 1==n.length&&(n="0"+n),1==t.length&&(t="0"+t),1==r.length&&(r="0"+r),o="000".substring(o.length)+o,n+":"+t+":"+r+"."+o},log:function(n){!s(e,"console")||w(console.log)?this.log=H:this.log=function(e){console.log(t.host+(j?":"+j:"")+" - "+this.getTime()+": "+e)},this.log(n)},trace:function(r){if(z){var o=n.getElementById("log");o?this.trace=function(e){try{o.appendChild(n.createElement("div")).appendChild(n.createTextNode(t.host+(j?":"+j:"")+" - "+this.getTime()+":"+e)),o.scrollTop=o.scrollHeight}catch(e){}}:s(e,"console")&&!w(console.info)&&(this.trace=function(e){console.info(t.host+(j?":"+j:"")+" - "+this.getTime()+":"+e)})}else 0===this._deferred.length&&L.whenReady(G.flush,G),this._deferred.push(r),this.log(r)},getTracer:function(e){return function(n){G.trace(e+": "+n)}}};G.log("easyXDM present on '"+t.href),L.Debug=G,I=G.getTracer("{Private}"),L.DomHelper={on:R,un:F,requiresJSON:function(t){s(e,"JSON")?G.log("native JSON found"):(G.log("loading external JSON"),n.write('<script type="text/javascript" src="'+t+'"><\/script>'))}},function(){var e={};L.Fn={set:function(n,t){this._trace("storing function "+n),e[n]=t},get:function(n,t){this._trace("retrieving function "+n);var r=e[n];return r||this._trace(n+" not found"),t&&delete e[n],r}},L.Fn._trace=G.getTracer("easyXDM.Fn")}(),L.Socket=function(e){G.getTracer("easyXDM.Socket")("constructor");var n=M(T(e).concat([{incoming:function(n,t){e.onMessage(n,t)},callback:function(n){e.onReady&&e.onReady(n)}}])),t=m(e.remote);this.origin=m(e.remote),this.destroy=function(){n.destroy()},this.postMessage=function(e){n.outgoing(e,t)},n.init()},L.Rpc=function(e,n){if(G.getTracer("easyXDM.Rpc")("constructor"),n.local)for(var t in n.local)if(n.local.hasOwnProperty(t)){var r=n.local[t];"function"==typeof r&&(n.local[t]={method:r})}var o=M(T(e).concat([new L.stack.RpcBehavior(this,n),{callback:function(n){e.onReady&&e.onReady(n)}}]));this.origin=m(e.remote),this.destroy=function(){o.destroy()},o.init()},L.stack.SameOriginTransport=function(e){var n=G.getTracer("easyXDM.stack.SameOriginTransport");n("constructor");var o,a,i,s;return o={outgoing:function(e,n,t){i(e),t&&t()},destroy:function(){n("destroy"),a&&(a.parentNode.removeChild(a),a=null)},onDOMReady:function(){n("init"),s=m(e.remote),e.isHost?(b(e.props,{src:y(e.remote,{xdm_e:t.protocol+"//"+t.host+t.pathname,xdm_c:e.channel,xdm_p:4}),name:J+e.channel+"_provider"}),a=_(e),L.Fn.set(e.channel,function(e){return i=e,r(function(){o.up.callback(!0)},0),function(e){o.up.incoming(e,s)}})):(i=f().Fn.get(e.channel,!0)(function(e){o.up.incoming(e,s)}),r(function(){o.up.callback(!0)},0))},init:function(){d(o.onDOMReady,o)}}},L.stack.FlashTransport=function(e){function o(e,n){r(function(){i("received message"),s.up.incoming(e,l)},0)}function a(t){i("creating factory with SWF from "+t);var r=e.swf+"?host="+e.isHost,o="easyXDM_swf_"+Math.floor(1e4*Math.random());L.Fn.set("flash_loaded"+t.replace(/[\-.]/g,"_"),function(){L.stack.FlashTransport[t].swf=u=f.firstChild;for(var e=L.stack.FlashTransport[t].queue,n=0;n<e.length;n++)e[n]();e.length=0}),e.swfContainer?f="string"==typeof e.swfContainer?n.getElementById(e.swfContainer):e.swfContainer:(b((f=n.createElement("div")).style,S&&e.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0}),n.body.appendChild(f));var a="callback=flash_loaded"+t.replace(/[\-.]/g,"_")+"&proto="+N.location.protocol+"&domain="+h(N.location.href)+"&port="+g(N.location.href)+"&ns="+j;a+="&log=true",f.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+o+"' data='"+r+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+r+"'></param><param name='flashvars' value='"+a+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+a+"' allowScriptAccess='always' wmode='transparent' src='"+r+"' height='1' width='1'></embed></object>"}var i=G.getTracer("easyXDM.stack.FlashTransport");if(i("constructor"),!e.swf)throw new Error("Path to easyxdm.swf is missing");var s,c,l,u,f;return s={outgoing:function(n,t,r){u.postMessage(e.channel,n.toString()),r&&r()},destroy:function(){i("destroy");try{u.destroyChannel(e.channel)}catch(e){}u=null,c&&(c.parentNode.removeChild(c),c=null)},onDOMReady:function(){i("init"),l=e.remote,L.Fn.set("flash_"+e.channel+"_init",function(){r(function(){i("firing onReady"),s.up.callback(!0)})}),L.Fn.set("flash_"+e.channel+"_onMessage",o),e.swf=v(e.swf);var n=h(e.swf),d=function(){L.stack.FlashTransport[n].init=!0,(u=L.stack.FlashTransport[n].swf).createChannel(e.channel,e.secret,m(e.remote),e.isHost),e.isHost&&(S&&e.swfNoThrottle&&b(e.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"}),b(e.props,{src:y(e.remote,{xdm_e:m(t.href),xdm_c:e.channel,xdm_p:6,xdm_s:e.secret}),name:J+e.channel+"_provider"}),c=_(e))};L.stack.FlashTransport[n]&&L.stack.FlashTransport[n].init?d():L.stack.FlashTransport[n]?L.stack.FlashTransport[n].queue.push(d):(L.stack.FlashTransport[n]={queue:[d]},a(n))},init:function(){d(s.onDOMReady,s)}}},L.stack.PostMessageTransport=function(n){function o(e){if(e.origin)return m(e.origin);if(e.uri)return m(e.uri);if(e.domain)return t.protocol+"//"+e.domain;throw"Unable to retrieve the origin of the event"}function a(e){var t=o(e);i("received message '"+e.data+"' from "+t),t==u&&e.data.substring(0,n.channel.length+1)==n.channel+" "&&s.up.incoming(e.data.substring(n.channel.length+1),t)}var i=G.getTracer("easyXDM.stack.PostMessageTransport");i("constructor");var s,c,l,u;return s={outgoing:function(e,t,r){l.postMessage(n.channel+" "+e,t||u),r&&r()},destroy:function(){i("destroy"),F(e,"message",a),c&&(l=null,c.parentNode.removeChild(c),c=null)},onDOMReady:function(){if(i("init"),u=m(n.remote),n.isHost){var o=function(t){t.data==n.channel+"-ready"&&(i("firing onReady"),l="postMessage"in c.contentWindow?c.contentWindow:c.contentWindow.document,F(e,"message",o),R(e,"message",a),r(function(){s.up.callback(!0)},0))};R(e,"message",o),b(n.props,{src:y(n.remote,{xdm_e:m(t.href),xdm_c:n.channel,xdm_p:1}),name:J+n.channel+"_provider"}),c=_(n)}else R(e,"message",a),(l="postMessage"in e.parent?e.parent:e.parent.document).postMessage(n.channel+"-ready",u),r(function(){s.up.callback(!0)},0)},init:function(){d(s.onDOMReady,s)}}},L.stack.FrameElementTransport=function(o){var a=G.getTracer("easyXDM.stack.FrameElementTransport");a("constructor");var i,s,c,l;return i={outgoing:function(e,n,t){c.call(this,e),t&&t()},destroy:function(){a("destroy"),s&&(s.parentNode.removeChild(s),s=null)},onDOMReady:function(){a("init"),l=m(o.remote),o.isHost?(b(o.props,{src:y(o.remote,{xdm_e:m(t.href),xdm_c:o.channel,xdm_p:5}),name:J+o.channel+"_provider"}),(s=_(o)).fn=function(e){return delete s.fn,c=e,r(function(){i.up.callback(!0)},0),function(e){i.up.incoming(e,l)}}):(n.referrer&&m(n.referrer)!=V.xdm_e&&(e.top.location=V.xdm_e),c=e.frameElement.fn(function(e){i.up.incoming(e,l)}),i.up.callback(!0))},init:function(){d(i.onDOMReady,i)}}},L.stack.NameTransport=function(e){function n(n){var t=e.remoteHelper+(c?"#_3":"#_2")+e.channel;i("sending message "+n),i("navigating to  '"+t+"'"),l.contentWindow.sendMessage(n,t)}function t(){c?2!=++f&&c||s.up.callback(!0):(n("ready"),i("calling onReady"),s.up.callback(!0))}function o(e){i("received message "+e),s.up.incoming(e,h)}function a(){p&&r(function(){p(!0)},0)}var i=G.getTracer("easyXDM.stack.NameTransport");if(i("constructor"),e.isHost&&w(e.remoteHelper))throw i("missing remoteHelper"),new Error("missing remoteHelper");var s,c,l,u,f,p,h,g;return s={outgoing:function(e,t,r){p=r,n(e)},destroy:function(){i("destroy"),l.parentNode.removeChild(l),l=null,c&&(u.parentNode.removeChild(u),u=null)},onDOMReady:function(){i("init"),c=e.isHost,f=0,h=m(e.remote),e.local=v(e.local),c?(L.Fn.set(e.channel,function(n){i("received initial message "+n),c&&"ready"===n&&(L.Fn.set(e.channel,o),t())}),g=y(e.remote,{xdm_e:e.local,xdm_c:e.channel,xdm_p:2}),b(e.props,{src:g+"#"+e.channel,name:J+e.channel+"_provider"}),u=_(e)):(e.remoteHelper=e.remote,L.Fn.set(e.channel,o));var n=function(){var o=l||this;F(o,"load",n),L.Fn.set(e.channel+"_load",a),function e(){"function"==typeof o.contentWindow.sendMessage?t():r(e,50)}()};l=_({props:{src:e.local+"#_4"+e.channel},onLoad:n})},init:function(){d(s.onDOMReady,s)}}},L.stack.HashTransport=function(n){function t(e){if(s("sending message '"+(h+1)+" "+e+"' to "+w),v){var t=n.remote+"#"+h+++"_"+e;(l||!y?v.contentWindow:v).location=t}else s("no caller window")}function o(e){s("received message '"+(p=e)+"' from "+w),c.up.incoming(p.substring(p.indexOf("_")+1),w)}function a(){if(g){var e=g.location.href,n="",t=e.indexOf("#");-1!=t&&(n=e.substring(t)),n&&n!=p&&(s("poll: new message"),o(n))}}function i(){s("starting polling"),u=setInterval(a,f)}var s=G.getTracer("easyXDM.stack.HashTransport");s("constructor");var c,l,u,f,p,h,g,v,y,w;return c={outgoing:function(e,n){t(e)},destroy:function(){e.clearInterval(u),!l&&y||v.parentNode.removeChild(v),v=null},onDOMReady:function(){if(l=n.isHost,f=n.interval,p="#"+n.channel,h=0,y=n.useParent,w=m(n.remote),l){if(b(n.props,{src:n.remote,name:J+n.channel+"_provider"}),y)n.onLoad=function(){g=e,i(),c.up.callback(!0)};else{var t=0,o=n.delay/50;!function e(){if(++t>o)throw s("unable to get reference to _listenerWindow, giving up"),new Error("Unable to reference listenerwindow");try{g=v.contentWindow.frames[J+n.channel+"_consumer"]}catch(e){}g?(i(),s("got a reference to _listenerWindow"),c.up.callback(!0)):r(e,50)}()}v=_(n)}else g=e,i(),y?(v=parent,c.up.callback(!0)):(b(n,{props:{src:n.remote+"#"+n.channel+new Date,name:J+n.channel+"_consumer"},onLoad:function(){c.up.callback(!0)}}),v=_(n))},init:function(){d(c.onDOMReady,c)}}},L.stack.ReliableBehavior=function(e){var n=G.getTracer("easyXDM.stack.ReliableBehavior");n("constructor");var t,r,o=0,a=0,i="";return t={incoming:function(e,s){n("incoming: "+e);var c=e.indexOf("_"),l=e.substring(0,c).split(",");e=e.substring(c+1),l[0]==o&&(n("message delivered"),i="",r&&(r(!0),r=null)),e.length>0&&(n("sending ack, and passing on "+e),t.down.outgoing(l[1]+","+o+"_"+i,s),a!=l[1]&&(a=l[1],t.up.incoming(e,s)))},outgoing:function(e,n,s){i=e,r=s,t.down.outgoing(a+","+ ++o+"_"+e,n)}}},L.stack.QueueBehavior=function(e){function n(){if(e.remove&&0===c.length)return t("removing myself from the stack"),void O(i);if(!l&&0!==c.length&&!s){t("dispatching from queue"),l=!0;var o=c.shift();i.down.outgoing(o.data,o.origin,function(e){l=!1,o.callback&&r(function(){o.callback(e)},0),n()})}}var t=G.getTracer("easyXDM.stack.QueueBehavior");t("constructor");var i,s,c=[],l=!0,u="",d=0,f=!1,p=!1;return i={init:function(){w(e)&&(e={}),e.maxLength&&(d=e.maxLength,p=!0),e.lazy?f=!0:i.down.init()},callback:function(e){l=!1;var t=i.up;n(),t.callback(e)},incoming:function(n,r){if(p){var a=n.indexOf("_"),s=parseInt(n.substring(0,a),10);u+=n.substring(a+1),0===s?(t("received the last fragment"),e.encode&&(u=o(u)),i.up.incoming(u,r),u=""):t("waiting for more fragments, seq="+n)}else i.up.incoming(n,r)},outgoing:function(r,o,s){e.encode&&(r=a(r));var l,u=[];if(p){for(;0!==r.length;)l=r.substring(0,d),r=r.substring(l.length),u.push(l);for(;l=u.shift();)t("enqueuing"),c.push({data:u.length+"_"+l,origin:o,callback:0===u.length?s:null})}else c.push({data:r,origin:o,callback:s});f?i.down.init():n()},destroy:function(){t("destroy"),s=!0,i.down.destroy()}}},L.stack.VerifyBehavior=function(e){function n(){t("requesting verification"),o=Math.random().toString(16).substring(2),r.down.outgoing(o)}var t=G.getTracer("easyXDM.stack.VerifyBehavior");if(t("constructor"),w(e.initiate))throw new Error("settings.initiate is not set");var r,o,a;return r={incoming:function(i,s){var c=i.indexOf("_");-1===c?i===o?(t("verified, calling callback"),r.up.callback(!0)):a||(t("returning secret"),a=i,e.initiate||n(),r.down.outgoing(i)):i.substring(0,c)===a&&r.up.incoming(i.substring(c+1),s)},outgoing:function(e,n,t){r.down.outgoing(o+"_"+e,n,t)},callback:function(t){e.initiate&&n()}}},L.stack.RpcBehavior=function(e,n){function t(e){e.jsonrpc="2.0",a.down.outgoing(s.stringify(e))}function r(e,n){var r=Array.prototype.slice;return i("creating method "+n),function(){i("executing method "+n);var o,a=arguments.length,s={method:n};a>0&&"function"==typeof arguments[a-1]?(a>1&&"function"==typeof arguments[a-2]?(o={success:arguments[a-2],error:arguments[a-1]},s.params=r.call(arguments,0,a-2)):(o={success:arguments[a-1]},s.params=r.call(arguments,0,a-1)),u[""+ ++l]=o,s.id=l):s.params=r.call(arguments,0),e.namedParams&&1===s.params.length&&(s.params=s.params[0]),t(s)}}function o(e,n,r,o){if(!r)return i("requested to execute non-existent procedure "+e),void(n&&t({id:n,error:{code:-32601,message:"Procedure not found."}}));i("requested to execute procedure "+e);var a,s;n?(a=function(e){a=H,t({id:n,result:e})},s=function(e,r){s=H;var o={id:n,error:{code:-32099,message:e}};r&&(o.error.data=r),t(o)}):a=s=H,c(o)||(o=[o]);try{var l=r.method.apply(r.scope,o.concat([a,s]));w(l)||a(l)}catch(e){s(e.message)}}var a,i=G.getTracer("easyXDM.stack.RpcBehavior"),s=n.serializer||$(),l=0,u={};return a={incoming:function(e,r){var a=s.parse(e);if(a.method)i("received request to execute method "+a.method+(a.id?" using callback id "+a.id:"")),n.handle?n.handle(a,t):o(a.method,a.id,n.local[a.method],a.params);else{i("received return value destined to callback with id "+a.id);var c=u[a.id];a.error?c.error?c.error(a.error):i("unhandled error returned."):c.success&&c.success(a.result),delete u[a.id]}},init:function(){if(i("init"),n.remote){i("creating stubs");for(var t in n.remote)n.remote.hasOwnProperty(t)&&(e[t]=r(n.remote[t],t))}a.down.init()},destroy:function(){i("destroy");for(var t in n.remote)n.remote.hasOwnProperty(t)&&e.hasOwnProperty(t)&&delete e[t];a.down.destroy()}}},N.easyXDM=L}(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);;
function openNav(){document.getElementById("mobile-nav").style.height="100%"}function closeNav(){document.getElementById("mobile-nav").style.height="0%"}!function(e){function t(t,o,a,r,i,n,s,c){"#main"===t?e("#bg-container").scrollTo(o,800):"#box1"===t?e("#bg-container").scrollTo(a,800):"#box2"===t?e("#bg-container").scrollTo(r,800):"#box3"===t?e("#bg-container").scrollTo(i,800):"#box4"===t?e("#bg-container").scrollTo(n,800):"#box5"===t?e("#bg-container").scrollTo(s,800):e("#bg-container").scrollTo(c,800)}e(document).ready(function(){e(".nav-search").click(function(){e(".search-bar-form .search-bar-group").height("45px"),e(".nav-search").css("opacity",0)}),e(".search-bar-form .closebtn").click(function(){e(".nav-search").css("opacity",1),e(".search-bar-form .search-bar-group").height("0px")}),e("A.homelink").mousedown(function(){return thisNode=e(this),targetNodeRef=e(this).attr("href"),targetNode=e(targetNodeRef),thisNode.attr("href","javascript:void(0);"),e(window).width()>480?(e("#wrapper").scrollTo(targetNodeRef,0,{onAfter:function(){return targetNode.focus(),thisNode.attr("href",targetNodeRef),!0}}),t(targetNodeRef,"0%","20%","26%","32%","38%","44%","50%"),!1):(targetNode.focus(),thisNode.attr("href",targetNodeRef),!0)});"true"===e.cookie("hide-message-bar")&&(e.cookie("hide-message-bar"),e("#message-bar").hide().attr("aria-hidden","true").attr("hidden","hidden").css("display","none")),e("#close-message-bar").attr("href","#"),e("#close-message-bar").bind("click",function(){e("#message-bar").animate({display:"none",height:"0px",opacity:0},{duration:750,specialEasing:{width:"swing",height:"easeOutBounce"}}).attr("aria-hidden","true").attr("hidden","hidden"),e.cookie("hide-message-bar","true",{expires:7})}),e(".cs-style-3 figcaption").addClass("slideUp")})}(jQuery);;
window.Modernizr=function(e,t,n){function r(e){d.cssText=e}function o(e,t){return typeof e===t}var i,a,c={},l=t.documentElement,s="modernizr",u=t.createElement(s),d=u.style,f=" -webkit- -moz- -o- -ms- ".split(" "),p={},h=[],m=h.slice,y=function(e,n,r,o){var i,a,c,u,d=t.createElement("div"),f=t.body,p=f||t.createElement("body");if(parseInt(r,10))for(;r--;)c=t.createElement("div"),c.id=o?o[r]:s+(r+1),d.appendChild(c);return i=["&#173;",'<style id="s',s,'">',e,"</style>"].join(""),d.id=s,(f?d:p).innerHTML+=i,p.appendChild(d),f||(p.style.background="",p.style.overflow="hidden",u=l.style.overflow,l.style.overflow="hidden",l.appendChild(p)),a=n(d,e),f?d.parentNode.removeChild(d):(p.parentNode.removeChild(p),l.style.overflow=u),!!a},v={}.hasOwnProperty;a=o(v,"undefined")||o(v.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return v.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=m.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,a=t.apply(i,n.concat(m.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(m.call(arguments)))};return r}),p.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:y(["@media (",f.join("touch-enabled),("),s,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n};for(var g in p)a(p,g)&&(i=g.toLowerCase(),c[i]=p[g](),h.push((c[i]?"":"no-")+i));return c.addTest=function(e,t){if("object"==typeof e)for(var r in e)a(e,r)&&c.addTest(r,e[r]);else{if(e=e.toLowerCase(),c[e]!==n)return c;t="function"==typeof t?t():t,l.className+=" "+(t?"":"no-")+e,c[e]=t}return c},r(""),u=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=v.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=y[e[h]];return t||(t={},m++,e[h]=m,y[m]=t),t}function i(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():p.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),i.canHaveChildren&&!f.test(e)?r.frag.appendChild(i):i}function a(e,n){if(e||(e=t),u)return e.createDocumentFragment();for(var i=(n=n||o(e)).frag.cloneNode(),a=0,c=r(),l=c.length;a<l;a++)i.createElement(c[a]);return i}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return v.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/\w+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(v,t.frag)}function l(e){e||(e=t);var r=o(e);return v.shivCSS&&!s&&!r.hasCSS&&(r.hasCSS=!!n(e,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),u||c(e,r),e}var s,u,d=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",m=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",s="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return void 0===e.cloneNode||void 0===e.createDocumentFragment||void 0===e.createElement}()}catch(e){s=!0,u=!0}}();var v={elements:d.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==d.shivCSS,supportsUnknownElements:u,shivMethods:!1!==d.shivMethods,type:"default",shivDocument:l,createElement:i,createDocumentFragment:a};e.html5=v,l(t)}(this,t),c._version="2.6.2",c._prefixes=f,c.testStyles=y,l.className=l.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+" js "+h.join(" "),c}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==y.call(e)}function o(e){return"string"==typeof e}function i(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function c(){var e=v.shift();g=1,e?e.t?h(function(){("c"==e.t?f.injectCss:f.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),c()):g=0}function l(e,n,r,o,i,l,s){function u(t){if(!p&&a(d.readyState)&&(b.r=p=1,!g&&c(),d.onload=d.onreadystatechange=null,t)){"img"!=e&&h(function(){j.removeChild(d)},50);for(var r in T[n])T[n].hasOwnProperty(r)&&T[n][r].onload()}}var s=s||f.errorTimeout,d=t.createElement(e),p=0,y=0,b={t:r,s:n,e:i,a:l,x:s};1===T[n]&&(y=1,T[n]=[]),"object"==e?d.data=n:(d.src=n,d.type=e),d.width=d.height="0",d.onerror=d.onload=d.onreadystatechange=function(){u.call(this,y)},v.splice(o,0,b),"img"!=e&&(y||2===T[n]?(j.insertBefore(d,E?null:m),h(u,s)):T[n].push(d))}function s(e,t,n,r,i){return g=0,t=t||"j",o(e)?l("c"==t?w:C,e,t,this.i++,n,r,i):(v.splice(this.i++,0,e),1==v.length&&c()),this}function u(){var e=f;return e.loader={load:s,i:0},e}var d,f,p=t.documentElement,h=e.setTimeout,m=t.getElementsByTagName("script")[0],y={}.toString,v=[],g=0,b="MozAppearance"in p.style,E=b&&!!t.createRange().compareNode,j=E?p:m.parentNode,p=e.opera&&"[object Opera]"==y.call(e.opera),p=!!t.attachEvent&&!p,C=b?"object":p?"script":"img",w=p?"script":C,S=Array.isArray||function(e){return"[object Array]"==y.call(e)},N=[],T={},x={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};(f=function(e){function t(e){var t,n,r,e=e.split("!"),o=N.length,i=e.pop(),a=e.length,i={url:i,origUrl:i,prefixes:e};for(n=0;n<a;n++)r=e[n].split("="),(t=x[r.shift()])&&(i=t(i,r));for(n=0;n<o;n++)i=N[n](i);return i}function a(e,o,i,a,c){var l=t(e),s=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=r(o)?o:o[e]||o[a]||o[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,o,i,a,c):(T[l.url]?l.noexec=!0:T[l.url]=1,i.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(r(o)||r(s))&&i.load(function(){u(),o&&o(l.origUrl,c,a),s&&s(l.origUrl,c,a),T[l.url]=2})))}function c(e,t){function n(e,n){if(e){if(o(e))n||(d=function(){var e=[].slice.call(arguments);f.apply(this,e),p()}),a(e,d,t,0,s);else if(Object(e)===e)for(l in c=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--c&&(r(d)?d=function(){var e=[].slice.call(arguments);f.apply(this,e),p()}:d[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(f[l])),a(e[l],d,t,l,s))}else!n&&p()}var c,l,s=!!e.test,u=e.load||e.both,d=e.callback||i,f=d,p=e.complete||i;n(s?e.yep:e.nope,!!u),u&&n(u)}var l,s,d=this.yepnope.loader;if(o(e))a(e,0,d,0);else if(S(e))for(l=0;l<e.length;l++)s=e[l],o(s)?a(s,0,d,0):S(s)?f(s):Object(s)===s&&c(s,d);else Object(e)===e&&c(e,d)}).addPrefix=function(e,t){x[e]=t},f.addFilter=function(e){N.push(e)},f.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",d=function(){t.removeEventListener("DOMContentLoaded",d,0),t.readyState="complete"},0)),e.yepnope=u(),e.yepnope.executeStack=c,e.yepnope.injectJs=function(e,n,r,o,l,s){var u,d,p=t.createElement("script"),o=o||f.errorTimeout;p.src=e;for(d in r)p.setAttribute(d,r[d]);n=s?c:n||i,p.onreadystatechange=p.onload=function(){!u&&a(p.readyState)&&(u=1,n(),p.onload=p.onreadystatechange=null)},h(function(){u||(u=1,n(1))},o),l?p.onload():m.parentNode.insertBefore(p,m)},e.yepnope.injectCss=function(e,n,r,o,a,l){var s,o=t.createElement("link"),n=l?c:n||i;o.href=e,o.rel="stylesheet",o.type="text/css";for(s in r)o.setAttribute(s,r[s]);a||(m.parentNode.insertBefore(o,m),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
!function(e){function n(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function t(e,n){(s(e,n)?c:a)(e,n)}if(Modernizr.touch){var s,a,c;"classList"in document.documentElement?(s=function(e,n){return e.classList.contains(n)},a=function(e,n){e.classList.add(n)},c=function(e,n){e.classList.remove(n)}):(s=function(e,t){return n(t).test(e.className)},a=function(e,n){s(e,n)||(e.className=e.className+" "+n)},c=function(e,t){e.className=e.className.replace(n(t)," ")});var o={hasClass:s,addClass:a,removeClass:c,toggleClass:t,has:s,add:a,remove:c,toggle:t};"function"==typeof define&&define.amd?define(o):e.classie=o,[].slice.call(document.querySelectorAll("ul.grid > li > figure")).forEach(function(e,n){e.querySelector("figcaption > a").addEventListener("touchstart",function(e){e.stopPropagation()},!1),e.addEventListener("touchstart",function(e){o.toggle(this,"cs-hover")},!1)})}}(window);;
window.Modernizr=function(e,t,n){function r(e){m.cssText=e}function o(e,t){return typeof e===t}function i(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var r in e){var o=e[r];if(!i(o,"-")&&m[o]!==n)return"pfx"!=t||o}return!1}function c(e,t,r){for(var i in e){var a=t[e[i]];if(a!==n)return!1===r?e[i]:o(a,"function")?a.bind(r||t):a}return!1}function l(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+g.join(r+" ")+r).split(" ");return o(t,"string")||o(t,"undefined")?a(i,t):(i=(e+" "+b.join(r+" ")+r).split(" "),c(i,t,n))}var s,u,f={},d=t.documentElement,p="modernizr",h=t.createElement(p),m=h.style,v=" -webkit- -moz- -o- -ms- ".split(" "),y="Webkit Moz O ms",g=y.split(" "),b=y.toLowerCase().split(" "),E={},C=[],w=C.slice,j=function(e,n,r,o){var i,a,c,l,s=t.createElement("div"),u=t.body,f=u||t.createElement("body");if(parseInt(r,10))for(;r--;)c=t.createElement("div"),c.id=o?o[r]:p+(r+1),s.appendChild(c);return i=["&#173;",'<style id="s',p,'">',e,"</style>"].join(""),s.id=p,(u?s:f).innerHTML+=i,f.appendChild(s),u||(f.style.background="",f.style.overflow="hidden",l=d.style.overflow,d.style.overflow="hidden",d.appendChild(f)),a=n(s,e),u?s.parentNode.removeChild(s):(f.parentNode.removeChild(f),d.style.overflow=l),!!a},S={}.hasOwnProperty;u=o(S,"undefined")||o(S.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return S.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=w.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,a=t.apply(i,n.concat(w.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(w.call(arguments)))};return r}),E.csstransforms3d=function(){var e=!!l("perspective");return e&&"webkitPerspective"in d.style&&j("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e};for(var x in E)u(E,x)&&(s=x.toLowerCase(),f[s]=E[x](),C.push((f[s]?"":"no-")+s));return f.addTest=function(e,t){if("object"==typeof e)for(var r in e)u(e,r)&&f.addTest(r,e[r]);else{if(e=e.toLowerCase(),f[e]!==n)return f;t="function"==typeof t?t():t,d.className+=" "+(t?"":"no-")+e,f[e]=t}return f},r(""),h=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=v[e[h]];return t||(t={},m++,e[h]=m,v[m]=t),t}function i(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():p.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),i.canHaveChildren&&!d.test(e)?r.frag.appendChild(i):i}function a(e,n){if(e||(e=t),u)return e.createDocumentFragment();for(var i=(n=n||o(e)).frag.cloneNode(),a=0,c=r(),l=c.length;a<l;a++)i.createElement(c[a]);return i}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/\w+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var r=o(e);return y.shivCSS&&!s&&!r.hasCSS&&(r.hasCSS=!!n(e,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),u||c(e,r),e}var s,u,f=e.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",m=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",s="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return void 0===e.cloneNode||void 0===e.createDocumentFragment||void 0===e.createElement}()}catch(e){s=!0,u=!0}}();var y={elements:f.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==f.shivCSS,supportsUnknownElements:u,shivMethods:!1!==f.shivMethods,type:"default",shivDocument:l,createElement:i,createDocumentFragment:a};e.html5=y,l(t)}(this,t),f._version="2.6.2",f._prefixes=v,f._domPrefixes=b,f._cssomPrefixes=g,f.testProp=function(e){return a([e])},f.testAllProps=l,f.testStyles=j,d.className=d.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+" js "+C.join(" "),f}(0,this.document),function(e,t,n){function r(e){return"[object Function]"==v.call(e)}function o(e){return"string"==typeof e}function i(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function c(){var e=y.shift();g=1,e?e.t?h(function(){("c"==e.t?d.injectCss:d.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),c()):g=0}function l(e,n,r,o,i,l,s){function u(t){if(!p&&a(f.readyState)&&(b.r=p=1,!g&&c(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&h(function(){C.removeChild(f)},50);for(var r in N[n])N[n].hasOwnProperty(r)&&N[n][r].onload()}}var s=s||d.errorTimeout,f=t.createElement(e),p=0,v=0,b={t:r,s:n,e:i,a:l,x:s};1===N[n]&&(v=1,N[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){u.call(this,v)},y.splice(o,0,b),"img"!=e&&(v||2===N[n]?(C.insertBefore(f,E?null:m),h(u,s)):N[n].push(f))}function s(e,t,n,r,i){return g=0,t=t||"j",o(e)?l("c"==t?j:w,e,t,this.i++,n,r,i):(y.splice(this.i++,0,e),1==y.length&&c()),this}function u(){var e=d;return e.loader={load:s,i:0},e}var f,d,p=t.documentElement,h=e.setTimeout,m=t.getElementsByTagName("script")[0],v={}.toString,y=[],g=0,b="MozAppearance"in p.style,E=b&&!!t.createRange().compareNode,C=E?p:m.parentNode,p=e.opera&&"[object Opera]"==v.call(e.opera),p=!!t.attachEvent&&!p,w=b?"object":p?"script":"img",j=p?"script":w,S=Array.isArray||function(e){return"[object Array]"==v.call(e)},x=[],N={},F={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};(d=function(e){function t(e){var t,n,r,e=e.split("!"),o=x.length,i=e.pop(),a=e.length,i={url:i,origUrl:i,prefixes:e};for(n=0;n<a;n++)r=e[n].split("="),(t=F[r.shift()])&&(i=t(i,r));for(n=0;n<o;n++)i=x[n](i);return i}function a(e,o,i,a,c){var l=t(e),s=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=r(o)?o:o[e]||o[a]||o[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,o,i,a,c):(N[l.url]?l.noexec=!0:N[l.url]=1,i.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(r(o)||r(s))&&i.load(function(){u(),o&&o(l.origUrl,c,a),s&&s(l.origUrl,c,a),N[l.url]=2})))}function c(e,t){function n(e,n){if(e){if(o(e))n||(f=function(){var e=[].slice.call(arguments);d.apply(this,e),p()}),a(e,f,t,0,s);else if(Object(e)===e)for(l in c=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--c&&(r(f)?f=function(){var e=[].slice.call(arguments);d.apply(this,e),p()}:f[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(d[l])),a(e[l],f,t,l,s))}else!n&&p()}var c,l,s=!!e.test,u=e.load||e.both,f=e.callback||i,d=f,p=e.complete||i;n(s?e.yep:e.nope,!!u),u&&n(u)}var l,s,f=this.yepnope.loader;if(o(e))a(e,0,f,0);else if(S(e))for(l=0;l<e.length;l++)s=e[l],o(s)?a(s,0,f,0):S(s)?d(s):Object(s)===s&&c(s,f);else Object(e)===e&&c(e,f)}).addPrefix=function(e,t){F[e]=t},d.addFilter=function(e){x.push(e)},d.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",f=function(){t.removeEventListener("DOMContentLoaded",f,0),t.readyState="complete"},0)),e.yepnope=u(),e.yepnope.executeStack=c,e.yepnope.injectJs=function(e,n,r,o,l,s){var u,f,p=t.createElement("script"),o=o||d.errorTimeout;p.src=e;for(f in r)p.setAttribute(f,r[f]);n=s?c:n||i,p.onreadystatechange=p.onload=function(){!u&&a(p.readyState)&&(u=1,n(),p.onload=p.onreadystatechange=null)},h(function(){u||(u=1,n(1))},o),l?p.onload():m.parentNode.insertBefore(p,m)},e.yepnope.injectCss=function(e,n,r,o,a,l){var s,o=t.createElement("link"),n=l?c:n||i;o.href=e,o.rel="stylesheet",o.type="text/css";for(s in r)o.setAttribute(s,r[s]);a||(m.parentNode.insertBefore(o,m),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
(function(){!function(t,i,e){var s,n,a;a="slidesjs",n={width:940,height:528,start:1,navigation:{active:!0,effect:"slide"},pagination:{active:!0,effect:"slide"},play:{active:!1,effect:"slide",interval:5e3,auto:!1,swap:!0,pauseOnHover:!1,restartDelay:2500},effect:{slide:{speed:500},fade:{speed:300,crossfade:!0}},callback:{loaded:function(){},start:function(){},complete:function(){}}},s=function(){function i(i,e){this.element=i,this.options=t.extend(!0,{},n,e),this._defaults=n,this._name=a,this.init()}return i}(),s.prototype.init=function(){var e,s,n,a,o=this;return e=t(this.element),this.data=t.data(this),t.data(this,"animating",!1),t.data(this,"total",e.children().not(".slidesjs-navigation",e).length),t.data(this,"current",this.options.start-1),t.data(this,"vendorPrefix",this._getVendorPrefix()),"undefined"!=typeof TouchEvent&&(t.data(this,"touch",!0),this.options.effect.slide.speed=this.options.effect.slide.speed/2),e.css({overflow:"hidden"}),e.slidesContainer=e.children().not(".slidesjs-navigation",e).wrapAll("<div class='slidesjs-container'>",e).parent().css({overflow:"hidden",position:"relative"}),t(".slidesjs-container",e).wrapInner("<div class='slidesjs-control'>",e).children(),t(".slidesjs-control",e).css({position:"relative",left:0}),t(".slidesjs-control",e).children().addClass("slidesjs-slide").css({position:"absolute",top:0,left:0,width:"100%",zIndex:0,display:"none",webkitBackfaceVisibility:"hidden"}),t.each(t(".slidesjs-control",e).children(),function(i){return t(this).attr("slidesjs-index",i)}),this.data.touch&&(t(".slidesjs-control",e).on("touchstart",function(t){return o._touchstart(t)}),t(".slidesjs-control",e).on("touchmove",function(t){return o._touchmove(t)}),t(".slidesjs-control",e).on("touchend",function(t){return o._touchend(t)})),e.fadeIn(0),this.update(),this.data.touch&&this._setuptouch(),t(".slidesjs-control",e).children(":eq("+this.data.current+")").eq(0).fadeIn(0,function(){return t(this).css({zIndex:10})}),this.options.navigation.active&&(t("<a>",{class:"slidesjs-previous slidesjs-navigation",href:"#",title:"Previous",text:"Previous"}).appendTo(e),t("<a>",{class:"slidesjs-next slidesjs-navigation",href:"#",title:"Next",text:"Next"}).appendTo(e)),t(".slidesjs-next",e).click(function(t){return t.preventDefault(),o.stop(!0),o.next(o.options.navigation.effect)}),t(".slidesjs-previous",e).click(function(t){return t.preventDefault(),o.stop(!0),o.previous(o.options.navigation.effect)}),this.options.play.active&&(n=t("<a>",{class:"slidesjs-play slidesjs-navigation",href:"#",title:"Play",text:"Play"}).appendTo(e),a=t("<a>",{class:"slidesjs-stop slidesjs-navigation",href:"#",title:"Stop",text:"Stop"}).appendTo(e),n.click(function(t){return t.preventDefault(),o.play(!0)}),a.click(function(t){return t.preventDefault(),o.stop(!0)}),this.options.play.swap&&a.css({display:"none"})),this.options.pagination.active&&(s=t("<ul>",{class:"slidesjs-pagination"}).appendTo(e),t.each(new Array(this.data.total),function(i){var e;return e=t("<li>",{class:"slidesjs-pagination-item"}).appendTo(s),t("<a>",{href:"#","data-slidesjs-item":i,html:i+1}).appendTo(e).click(function(i){return i.preventDefault(),o.stop(!0),o.goto(1*t(i.currentTarget).attr("data-slidesjs-item")+1)})})),t(i).bind("resize",function(){return o.update()}),this._setActive(),this.options.play.auto&&this.play(),this.options.callback.loaded(this.options.start)},s.prototype._setActive=function(i){var e,s;return e=t(this.element),this.data=t.data(this),s=i>-1?i:this.data.current,t(".active",e).removeClass("active"),t(".slidesjs-pagination li:eq("+s+") a",e).addClass("active")},s.prototype.update=function(){var i,e,s;return i=t(this.element),this.data=t.data(this),t(".slidesjs-control",i).children(":not(:eq("+this.data.current+"))").css({display:"none",left:0,zIndex:0}),s=i.width(),e=this.options.height/this.options.width*s,this.options.width=s,this.options.height=e,t(".slidesjs-control, .slidesjs-container",i).css({width:s,height:e})},s.prototype.next=function(i){return t(this.element),this.data=t.data(this),t.data(this,"direction","next"),void 0===i&&(i=this.options.navigation.effect),"fade"===i?this._fade():this._slide()},s.prototype.previous=function(i){return t(this.element),this.data=t.data(this),t.data(this,"direction","previous"),void 0===i&&(i=this.options.navigation.effect),"fade"===i?this._fade():this._slide()},s.prototype.goto=function(i){var e;if(t(this.element),this.data=t.data(this),void 0===e&&(e=this.options.pagination.effect),i>this.data.total?i=this.data.total:i<1&&(i=1),"number"==typeof i)return"fade"===e?this._fade(i):this._slide(i);if("string"==typeof i){if("first"===i)return"fade"===e?this._fade(0):this._slide(0);if("last"===i)return"fade"===e?this._fade(this.data.total):this._slide(this.data.total)}},s.prototype._setuptouch=function(){var i,e,s,n;return i=t(this.element),this.data=t.data(this),n=t(".slidesjs-control",i),e=this.data.current+1,(s=this.data.current-1)<0&&(s=this.data.total-1),e>this.data.total-1&&(e=0),n.children(":eq("+e+")").css({display:"block",left:this.options.width}),n.children(":eq("+s+")").css({display:"block",left:-this.options.width})},s.prototype._touchstart=function(i){var e;return t(this.element),this.data=t.data(this),e=i.originalEvent.touches[0],this._setuptouch(),t.data(this,"touchtimer",Number(new Date)),t.data(this,"touchstartx",e.pageX),t.data(this,"touchstarty",e.pageY),i.stopPropagation()},s.prototype._touchend=function(i){var e,s,n,a,o,d,r=this;return e=t(this.element),this.data=t.data(this),i.originalEvent.touches[0],a=t(".slidesjs-control",e),a.position().left>.5*this.options.width||a.position().left>.1*this.options.width&&Number(new Date)-this.data.touchtimer<250?(t.data(this,"direction","previous"),this._slide()):a.position().left<-.5*this.options.width||a.position().left<-.1*this.options.width&&Number(new Date)-this.data.touchtimer<250?(t.data(this,"direction","next"),this._slide()):(n=this.data.vendorPrefix,d=n+"Transform",s=n+"TransitionDuration",o=n+"TransitionTimingFunction",a[0].style[d]="translateX(0px)",a[0].style[s]=.85*this.options.effect.slide.speed+"ms"),a.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){return n=r.data.vendorPrefix,d=n+"Transform",s=n+"TransitionDuration",o=n+"TransitionTimingFunction",a[0].style[d]="",a[0].style[s]="",a[0].style[o]=""}),i.stopPropagation()},s.prototype._touchmove=function(i){var e,s,n,a,o;return e=t(this.element),this.data=t.data(this),a=i.originalEvent.touches[0],s=this.data.vendorPrefix,n=t(".slidesjs-control",e),o=s+"Transform",t.data(this,"scrolling",Math.abs(a.pageX-this.data.touchstartx)<Math.abs(a.pageY-this.data.touchstarty)),this.data.animating||this.data.scrolling||(i.preventDefault(),this._setuptouch(),n[0].style[o]="translateX("+(a.pageX-this.data.touchstartx)+"px)"),i.stopPropagation()},s.prototype.play=function(i){var e,s,n,a=this;if(e=t(this.element),this.data=t.data(this),!this.data.playInterval&&(i&&(s=this.data.current,this.data.direction="next","fade"===this.options.play.effect?this._fade():this._slide()),t.data(this,"playInterval",setInterval(function(){return s=a.data.current,a.data.direction="next","fade"===a.options.play.effect?a._fade():a._slide()},this.options.play.interval)),n=t(".slidesjs-container",e),this.options.play.pauseOnHover&&(n.unbind(),n.bind("mouseenter",function(){return a.stop()}),n.bind("mouseleave",function(){return a.options.play.restartDelay?t.data(a,"restartDelay",setTimeout(function(){return a.play(!0)},a.options.play.restartDelay)):a.play()})),t.data(this,"playing",!0),t(".slidesjs-play",e).addClass("slidesjs-playing"),this.options.play.swap))return t(".slidesjs-play",e).hide(),t(".slidesjs-stop",e).show()},s.prototype.stop=function(i){var e;if(e=t(this.element),this.data=t.data(this),clearInterval(this.data.playInterval),this.options.play.pauseOnHover&&i&&t(".slidesjs-container",e).unbind(),t.data(this,"playInterval",null),t.data(this,"playing",!1),t(".slidesjs-play",e).removeClass("slidesjs-playing"),this.options.play.swap)return t(".slidesjs-stop",e).hide(),t(".slidesjs-play",e).show()},s.prototype._slide=function(i){var e,s,n,a,o,d,r,l,h,c=this;if(e=t(this.element),this.data=t.data(this),!this.data.animating&&i!==this.data.current+1)return t.data(this,"animating",!0),s=this.data.current,i>-1?(h=(i-=1)>s?1:-1,n=i>s?-this.options.width:this.options.width,o=i):(h="next"===this.data.direction?1:-1,n="next"===this.data.direction?-this.options.width:this.options.width,o=s+h),-1===o&&(o=this.data.total-1),o===this.data.total&&(o=0),this._setActive(o),r=t(".slidesjs-control",e),i>-1&&r.children(":not(:eq("+s+"))").css({display:"none",left:0,zIndex:0}),r.children(":eq("+o+")").css({display:"block",left:h*this.options.width,zIndex:10}),this.options.callback.start(s+1),this.data.vendorPrefix?(d=this.data.vendorPrefix,l=d+"Transform",a=d+"TransitionDuration",d+"TransitionTimingFunction",r[0].style[l]="translateX("+n+"px)",r[0].style[a]=this.options.effect.slide.speed+"ms",r.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){return r[0].style[l]="",r[0].style[a]="",r.children(":eq("+o+")").css({left:0}),r.children(":eq("+s+")").css({display:"none",left:0,zIndex:0}),t.data(c,"current",o),t.data(c,"animating",!1),r.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"),r.children(":not(:eq("+o+"))").css({display:"none",left:0,zIndex:0}),c.data.touch&&c._setuptouch(),c.options.callback.complete(o+1)})):r.stop().animate({left:n},this.options.effect.slide.speed,function(){return r.css({left:0}),r.children(":eq("+o+")").css({left:0}),r.children(":eq("+s+")").css({display:"none",left:0,zIndex:0},t.data(c,"current",o),t.data(c,"animating",!1),c.options.callback.complete(o+1))})},s.prototype._fade=function(i){var e,s,n,a,o,d=this;if(e=t(this.element),this.data=t.data(this),!this.data.animating&&i!==this.data.current+1)return t.data(this,"animating",!0),s=this.data.current,i?(o=(i-=1)>s?1:-1,n=i):(o="next"===this.data.direction?1:-1,n=s+o),-1===n&&(n=this.data.total-1),n===this.data.total&&(n=0),this._setActive(n),(a=t(".slidesjs-control",e)).children(":eq("+n+")").css({display:"none",left:0,zIndex:10}),this.options.callback.start(s+1),this.options.effect.fade.crossfade?(a.children(":eq("+this.data.current+")").stop().fadeOut(this.options.effect.fade.speed),a.children(":eq("+n+")").stop().fadeIn(this.options.effect.fade.speed,function(){return a.children(":eq("+n+")").css({zIndex:0}),t.data(d,"animating",!1),t.data(d,"current",n),d.options.callback.complete(n+1)})):a.children(":eq("+s+")").stop().fadeOut(this.options.effect.fade.speed,function(){return a.children(":eq("+n+")").stop().fadeIn(d.options.effect.fade.speed,function(){return a.children(":eq("+n+")").css({zIndex:10})}),t.data(d,"animating",!1),t.data(d,"current",n),d.options.callback.complete(n+1)})},s.prototype._getVendorPrefix=function(){var t,i,s,n;for(i=(e.body||e.documentElement).style,n=["Moz","Webkit","Khtml","O","ms"],s=(s="transition").charAt(0).toUpperCase()+s.substr(1),t=0;t<n.length;){if("string"==typeof i[n[t]+s])return n[t];t++}return!1},t.fn[a]=function(i){return this.each(function(){if(!t.data(this,"plugin_"+a))return t.data(this,"plugin_"+a,new s(this,i))})}}(jQuery,window,document)}).call(this);;
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,wrapperClass:"bx-wrapper",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="'+o.settings.wrapperClass+'"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing");f();o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:v()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({float:"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0!=s){var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})}else i()},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(p()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",V),o.settings.auto&&o.settings.autoStart&&(x()>1||o.settings.autoSlideForOnePage)&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&N()},p=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(i){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),"border-box"==o.viewport.css("box-sizing")?e+=parseFloat(o.viewport.css("padding-top"))+parseFloat(o.viewport.css("padding-bottom"))+parseFloat(o.viewport.css("border-top-width"))+parseFloat(o.viewport.css("border-bottom-width")):"padding-box"==o.viewport.css("box-sizing")&&(e+=parseFloat(o.viewport.css("padding-top"))+parseFloat(o.viewport.css("padding-bottom"))),e},v=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width()+o.settings.slideMargin;t=Math.floor((o.viewport.width()+o.settings.slideMargin)/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=Math.ceil(o.children.length/m());else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.outerWidth())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),F()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),F()})}},w=function(){for(var e="",i=x(),s=0;s<i;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",z),o.controls.prev.bind("click",y),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",M),o.controls.autoEl.on("click",".bx-stop",k),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(e){var i=t(this).find("img:first").attr("title");void 0!=i&&(""+i).length&&t(this).append('<div class="bx-caption"><span>'+i+"</span></div>")})},z=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},y=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},M=function(t){r.startAuto(),t.preventDefault()},k=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget);if(void 0!==i.attr("data-slide-index")){var s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()}},q=function(e){var i=o.children.length;if("short"==o.settings.pagerType)return o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),void o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i);o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")})},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){if(o.settings.autoDelay>0)setTimeout(r.startAuto,o.settings.autoDelay);else r.startAuto();o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(i){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));F(n)}),F()},F=function(t){speed=t||o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n={resetValue:"horizontal"==o.settings.mode?-i.left:-i.top};b(s,"ticker",speed,n)},N=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",O)},O=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",X),o.viewport.bind("touchend",Y)}},X=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},Y=function(t){o.viewport.unbind("touchmove",X);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode)(s=Math.abs(o.touch.start.x-o.touch.end.x))>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto());else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&s<0)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(s<0?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",Y)},V=function(e){if(o.initialized){var i=t(window).width(),s=t(window).height();a==i&&l==s||(a=i,l=s,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))}};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,e<0?o.active.index=x()-1:e>=x()?o.active.index=0:o.active.index=e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode)n=(d=o.children.eq(o.children.length-1)).position(),s=o.viewport.width()-d.outerWidth();else{var a=o.children.length-o.settings.minSlides;n=o.children.eq(a).position()}else if(o.carousel&&o.active.last&&"prev"==i){var l=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),d=r.children(".bx-clone").eq(l);n=d.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if(void 0!==n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).width(u()),o.viewport.css("height",p()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",V))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);;
