
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
 * Webform node form interface enhancments.
 */

(function ($) {

  "use strict";

  Drupal.behaviors.webformAdmin = {};
  Drupal.behaviors.webformAdmin.attach = function (context) {
    // On click or change, make a parent radio button selected.
    Drupal.webform.setActive(context);
    Drupal.webform.updateTemplate(context);
    // Update the template select list upon changing a template.
    // Select all link for file extensions.
    Drupal.webform.selectCheckboxesLink(context);
    // Enhance the normal tableselect.js file to support indentations.
    Drupal.webform.tableSelectIndentation(context);
    // Automatically download exports if available.
    Drupal.webform.downloadExport(context);
    // Enhancements for the conditionals administrative page.
    Drupal.webform.conditionalAdmin(context);
    // Trigger radio/checkbox change when label click automatically selected by
    // browser.
    Drupal.webform.radioLabelAutoClick(context);
  };

  Drupal.webform = Drupal.webform || {};

  Drupal.webform.setActive = function (context) {
    $('.webform-inline-radio', context).click(function (e) {
      $(this).closest('.form-type-radio').find('input[type=radio]').webformProp('checked', true);
    });
    $('.webform-set-active', context).change(function (e) {
      if ($(this).val()) {
        $(this).closest('.form-type-radio').find('input[type=radio]').webformProp('checked', true);
      }
      e.preventDefault();
    });

    // Firefox improperly selects the parent radio button when clicking inside
    // a label that contains an input field. The only way of preventing this
    // currently is to remove the "for" attribute on the label.
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=213519.
    if (navigator.userAgent.match(/Firefox/)) {
      $('.webform-inline-radio', context).removeAttr('for');
    }
  };

  // Update e-mail templates between default and custom.
  Drupal.webform.updateTemplate = function (context) {
    var defaultTemplate = $('#edit-templates-default').val();
    var $templateSelect = $('#webform-template-fieldset select#edit-template-option', context);
    var $templateTextarea = $('#webform-template-fieldset textarea:visible', context);

    var updateTemplateSelect = function () {
      if ($(this).val() == defaultTemplate) {
        $templateSelect.val('default');
      }
      else {
        $templateSelect.val('custom');
      }
    };

    var updateTemplateText = function () {
      if ($(this).val() == 'default' && $templateTextarea.val() != defaultTemplate) {
        if (confirm(Drupal.settings.webform.revertConfirm)) {
          $templateTextarea.val(defaultTemplate);
        }
        else {
          $(this).val('custom');
        }
      }
    };

    $templateTextarea.keyup(updateTemplateSelect);
    $templateSelect.change(updateTemplateText);
  };

  Drupal.webform.selectCheckboxesLink = function (context) {
    function selectCheckboxes() {
      var group = this.className.replace(/.*?webform-select-link-([^ ]*).*/, '$1');
      var $checkboxes = $('.webform-select-group-' + group + ' input[type=checkbox]');
      var reverseCheck = !$checkboxes[0].checked;
      $checkboxes.each(function () {
        this.checked = reverseCheck;
      });
      $checkboxes.trigger('change');
      return false;
    }
    $('a.webform-select-link', context).click(selectCheckboxes);
  };

  Drupal.webform.tableSelectIndentation = function (context) {
    var $tables = $('th.select-all', context).parents('table');
    $tables.find('input.form-checkbox').change(function () {
      var $rows = $(this).parents('table:first').find('tr');
      var row = $(this).parents('tr:first').get(0);
      var rowNumber = $rows.index(row);
      var rowTotal = $rows.size();
      var indentLevel = $(row).find('div.indentation').size();
      for (var n = rowNumber + 1; n < rowTotal; n++) {
        if ($rows.eq(n).find('div.indentation').size() <= indentLevel) {
          break;
        }
        $rows.eq(n).find('input.form-checkbox').webformProp('checked', this.checked);
      }
    });
  };

  /**
   * Attach behaviors for Webform results download page.
   */
  Drupal.webform.downloadExport = function (context) {
    if (context === document && Drupal.settings && Drupal.settings.webformExport && document.cookie.match(/webform_export_info=1/)) {
      window.location = Drupal.settings.webformExport;
      delete Drupal.settings.webformExport;
    }
  };

  /**
   * Attach behaviors for Webform conditional administration.
   */
  Drupal.webform.conditionalAdmin = function (context) {
    var $context = $(context);
    // Bind to the entire form and allow events to bubble-up from elements. This
    // saves a lot of processing when new conditions are added/removed.
    $context.find('#webform-conditionals-ajax:not(.webform-conditional-processed)')
      .addClass('webform-conditional-processed')
      .bind('change', function (e) {

        var $target = $(e.target);
        if ($target.is('.webform-conditional-source select')) {
          Drupal.webform.conditionalSourceChange.apply(e.target);
        }

        if ($target.is('.webform-conditional-operator select')) {
          Drupal.webform.conditionalOperatorChange.apply(e.target);
        }

        if ($target.is('.webform-conditional-andor select')) {
          Drupal.webform.conditionalAndOrChange.apply(e.target);
        }

        if ($target.is('.webform-conditional-action select')) {
          Drupal.webform.conditionalActionChange.apply(e.target);
        }
      });

    // Add event handlers to delete the entire row if the last rule or action is removed.
    $context.find('.webform-conditional-rule-remove:not(.webform-conditional-processed)').bind('click', function () {
      this.webformRemoveClass = '.webform-conditional-rule-remove';
      window.setTimeout($.proxy(Drupal.webform.conditionalRemove, this), 100);
    }).addClass('webform-conditional-processed');
    $context.find('.webform-conditional-action-remove:not(.webform-conditional-processed)').bind('click', function () {
      this.webformRemoveClass = '.webform-conditional-action-remove';
      window.setTimeout($.proxy(Drupal.webform.conditionalRemove, this), 100);
    }).addClass('webform-conditional-processed');

    // Trigger default handlers on the source element, this in turn will trigger
    // the operator handlers.
    $context.find('.webform-conditional-source select').trigger('change');

    // Trigger defaults handlers on the action element.
    $context.find('.webform-conditional-action select').trigger('change');

    // When adding a new table row, make it draggable and hide the weight column.
    if ($context.is('tr.ajax-new-content') && $context.find('.webform-conditional').length === 1) {
      Drupal.tableDrag['webform-conditionals-table'].makeDraggable($context[0]);
      $context.find('.webform-conditional-weight').closest('td').addClass('tabledrag-hide');
      if ($.cookie('Drupal.tableDrag.showWeight') !== '1') {
        Drupal.tableDrag['webform-conditionals-table'].hideColumns();
      }
      $context.removeClass('ajax-new-content');
    }
  };

  /**
   * Event callback for the remove button next to an individual rule.
   */
  Drupal.webform.conditionalRemove = function () {
    // See if there are any remaining rules in this element.
    var rowCount = $(this).parents('.webform-conditional:first').find(this.webformRemoveClass).length;
    if (rowCount <= 1) {
      var $tableRow = $(this).parents('tr:first');
      var $table = $('#webform-conditionals-table');
      if ($tableRow.length && $table.length) {
        $tableRow.remove();
        Drupal.webform.restripeTable($table[0]);
      }
    }
  };

  /**
   * Event callback to update the list of operators after a source change.
   */
  Drupal.webform.conditionalSourceChange = function () {
    var source = $(this).val();
    var dataType = Drupal.settings.webform.conditionalValues.sources[source]['data_type'];
    var $operator = $(this).parents('.webform-conditional-rule:first').find('.webform-conditional-operator select');

    // Store a the original list of all operators for all data types in the select
    // list DOM element.
    if (!$operator[0]['webformConditionalOriginal']) {
      $operator[0]['webformConditionalOriginal'] = $operator[0].innerHTML;
    }

    // Reference the original list to create a new list matching the data type.
    var $originalList = $($operator[0]['webformConditionalOriginal']);
    var $newList = $originalList.filter('optgroup[label=' + dataType + ']');
    var newHTML = $newList[0].innerHTML;

    // Update the options and fire the change event handler on the list to update
    // the value field, only if the options have changed. This avoids resetting
    // existing selections.
    if (newHTML != $operator.html()) {
      $operator.html(newHTML);
    }
    // Trigger the change in case the source component changed from one select
    // component to another.
    $operator.trigger('change');

  };

  /**
   * Event callback to update the value field after an operator change.
   */
  Drupal.webform.conditionalOperatorChange = function () {
    var source = $(this).parents('.webform-conditional-rule:first').find('.webform-conditional-source select').val();
    var dataType = Drupal.settings.webform.conditionalValues.sources[source]['data_type'];
    var operator = $(this).val();
    var $value = $(this).parents('.webform-conditional-rule:first').find('.webform-conditional-value');
    var name = $value.find('input, select, textarea').attr('name');
    var originalValue = false;

    // Given the dataType and operator, we can determine the form key.
    var formKey = Drupal.settings.webform.conditionalValues.operators[dataType][operator]['form'];
    var formSource = typeof Drupal.settings.webform.conditionalValues.forms[formKey] == 'undefined' ? false : source;

    // On initial request, save the default field as printed on the original page.
    if (!$value[0]['webformConditionalOriginal']) {
      $value[0]['webformConditionalOriginal'] = $value[0].innerHTML;
      originalValue = $value.find('input:first').val();
    }
    // On changes to an existing operator, check if the form key is different
    // (and any per-source form, such as a select option list) before replacing
    // the form with an identical version.
    else if ($value[0]['webformConditionalFormKey'] == formKey && $value[0]['webformConditionalFormSource'] == formSource) {
      return;
    }

    // Store the current form key for checking the next time the operator changes.
    $value[0]['webformConditionalFormKey'] = formKey;
    $value[0]['webformConditionalFormSource'] = formSource;

    // If using the default (a textfield), restore the original field.
    if (formKey === 'default') {
      $value[0].innerHTML = $value[0]['webformConditionalOriginal'];
    }
    // If the operator does not need a source value (i.e. is empty), hide it.
    else if (formKey === false) {
      $value[0].innerHTML = '<input type="text" value="" style="display: none;" >';
    }
    // If there is a per-source form for this operator (e.g. option lists), use
    // the specialized value form.
    else if (typeof Drupal.settings.webform.conditionalValues.forms[formKey] == 'object') {
      $value[0].innerHTML = Drupal.settings.webform.conditionalValues.forms[formKey][source];
    }
    // Otherwise all the sources use a generic field (e.g. a text field).
    else {
      $value[0].innerHTML = Drupal.settings.webform.conditionalValues.forms[formKey];
    }

    // Set the name attribute to match the original placeholder field.
    var $firstElement = $value.find('input, select, textarea').filter(':first');
    $firstElement.attr('name', name);

    if (originalValue) {
      $firstElement.val(originalValue);
    }
  };

  /**
   * Event callback to make sure all group and/or operators match.
   */
  Drupal.webform.conditionalAndOrChange = function () {
    $(this).parents('.webform-conditional:first').find('.webform-conditional-andor select').val(this.value);
  };

  /**
   * Event callback to show argument only for appropriate actions.
   */
  Drupal.webform.conditionalActionChange = function () {
    var action = $(this).val();
    var $argument = $(this).parents('.webform-conditional-condition:first').find('.webform-conditional-argument input');
    var isShown = $argument.is(':visible');
    switch (action) {
      case 'show':
      case 'require':
        if (isShown) {
          $argument.hide();
        }
        break;
      case 'set':
        if (!isShown) {
          $argument.show();
        }
        break;
    }
  };

  /**
   * Triggers a change event when a label receives a click.
   *
   * When the browser automatically selects a radio button when it's label is
   * clicked, the FAPI states jQuery code doesn't receive an event. This function
   * ensures that automatically-selected radio buttons keep in sync with the
   * FAPI states.
   */
  Drupal.webform.radioLabelAutoClick = function (context) {
    $('label').once('webform-label').click(function () {
      $(this).prev('input:radio').change();
    });
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

})(jQuery);
;
