
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

Drupal.ModuleFilter = {};

Drupal.ModuleFilter.explode = function(string) {
  var queryArray = string.match(/([a-zA-Z]+\:(\w+|"[^"]+")*)|\w+|"[^"]+"/g);
  if (!queryArray) {
    queryArray = new Array();
  }
  var i = queryArray.length;
  while (i--) {
    queryArray[i] = queryArray[i].replace(/"/g, "");
  }
  return queryArray;
};

Drupal.ModuleFilter.getState = function(key) {
  if (!Drupal.ModuleFilter.state) {
    Drupal.ModuleFilter.state = {};
    var cookie = $.cookie('DrupalModuleFilter');
    var query = cookie ? cookie.split('&') : [];
    if (query) {
      for (var i in query) {
        // Extra check to avoid js errors in Chrome, IE and Safari when
        // combined with JS like twitter's widget.js.
        // See http://drupal.org/node/798764.
        if (typeof(query[i]) == 'string' && query[i].indexOf('=') != -1) {
          var values = query[i].split('=');
          if (values.length === 2) {
            Drupal.ModuleFilter.state[values[0]] = values[1];
          }
        }
      }
    }
  }
  return Drupal.ModuleFilter.state[key] ? Drupal.ModuleFilter.state[key] : false;
};

Drupal.ModuleFilter.setState = function(key, value) {
  var existing = Drupal.ModuleFilter.getState(key);
  if (existing != value) {
    Drupal.ModuleFilter.state[key] = value;
    var query = [];
    for (var i in Drupal.ModuleFilter.state) {
      query.push(i + '=' + Drupal.ModuleFilter.state[i]);
    }
    $.cookie('DrupalModuleFilter', query.join('&'), { expires: 7, path: '/' });
  }
};

Drupal.ModuleFilter.Filter = function(element, selector, options) {
  var self = this;

  this.element = element;
  this.text = $(this.element).val();

  this.settings = Drupal.settings.moduleFilter;

  this.selector = selector;

  this.options = $.extend({
    delay: 500,
    striping: false,
    childSelector: null,
    empty: Drupal.t('No results'),
    rules: new Array()
  }, options);
  if (this.options.wrapper == undefined) {
    this.options.wrapper = $(self.selector).parent();
  }

  // Add clear button.
  this.element.after('<div class="module-filter-clear"><a href="#" class="js-hide">' + Drupal.t('clear') + '</a></div>');
  if (this.text) {
    $('.module-filter-clear a', this.element.parent()).removeClass('js-hide');
  }
  $('.module-filter-clear a', this.element.parent()).click(function() {
    self.element.val('');
    self.text = '';
    delete self.queries;
    self.applyFilter();
    self.element.focus();
    $(this).addClass('js-hide');
    return false;
  });

  this.updateQueries = function() {
    var queryStrings = Drupal.ModuleFilter.explode(self.text);

    self.queries = new Array();
    for (var i in queryStrings) {
      var query = { operator: 'text', string: queryStrings[i] };

      if (self.operators != undefined) {
        // Check if an operator is possibly used.
        if (queryStrings[i].indexOf(':') > 0) {
          // Determine operator used.
          var args = queryStrings[i].split(':', 2);
          var operator = args.shift();
          if (self.operators[operator] != undefined) {
            query.operator = operator;
            query.string = args.shift();
          }
        }
      }

      query.string = query.string.toLowerCase();

      self.queries.push(query);
    }

    if (self.queries.length <= 0) {
      // Add a blank string query.
      self.queries.push({ operator: 'text', string: '' });
    }
  };

  this.applyFilter = function() {
    self.results = new Array();

    self.updateQueries();

    if (self.index == undefined) {
      self.buildIndex();
    }

    self.element.trigger('moduleFilter:start');

    $.each(self.index, function(key, item) {
      var $item = item.element;

      for (var i in self.queries) {
        var query = self.queries[i];
        if (query.operator == 'text') {
          if (item.text.indexOf(query.string) < 0) {
            continue;
          }
        }
        else {
          var func = self.operators[query.operator];
          if (!(func(query.string, self, item))) {
            continue;
          }
        }

        var rulesResult = self.processRules(item);
        if (rulesResult !== false) {
          return true;
        }
      }

      $item.addClass('js-hide');
    });

    self.element.trigger('moduleFilter:finish', { results: self.results });

    if (self.options.striping) {
      self.stripe();
    }

    if (self.results.length > 0) {
      self.options.wrapper.find('.module-filter-no-results').remove();
    }
    else {
      if (!self.options.wrapper.find('.module-filter-no-results').length) {
        self.options.wrapper.append($('<p class="module-filter-no-results"/>').text(self.options.empty));
      };
    }
  };

  self.element.keyup(function(e) {
    switch (e.which) {
      case 13:
        if (self.timeOut) {
          clearTimeout(self.timeOut);
        }
        self.applyFilter();
        break;
      default:
        if (self.text != $(this).val()) {
          if (self.timeOut) {
            clearTimeout(self.timeOut);
          }

          self.text = $(this).val();

          if (self.text) {
            self.element.parent().find('.module-filter-clear a').removeClass('js-hide');
          }
          else {
            self.element.parent().find('.module-filter-clear a').addClass('js-hide');
          }

          self.element.trigger('moduleFilter:keyup');

          self.timeOut = setTimeout(self.applyFilter, self.options.delay);
        }
        break;
    }
  });

  self.element.keypress(function(e) {
    if (e.which == 13) e.preventDefault();
  });
};

Drupal.ModuleFilter.Filter.prototype.buildIndex = function() {
  var self = this;
  var index = new Array();
  $(this.selector).each(function(i) {
    var text = (self.options.childSelector) ? $(self.options.childSelector, this).text() : $(this).text();
    var item = {
      key: i,
      element: $(this),
      text: text.toLowerCase()
    };
    for (var j in self.options.buildIndex) {
      var func = self.options.buildIndex[j];
      item = $.extend(func(self, item), item);
    }
    $(this).data('indexKey', i);
    index.push(item);
    delete item;
  });
  this.index = index;
};

Drupal.ModuleFilter.Filter.prototype.processRules = function(item) {
  var self = this;
  var $item = item.element;
  var rulesResult = true;
  if (self.options.rules.length > 0) {
    for (var i in self.options.rules) {
      var func = self.options.rules[i];
      rulesResult = func(self, item);
      if (rulesResult === false) {
        break;
      }
    }
  }
  if (rulesResult !== false) {
    $item.removeClass('js-hide');
    self.results.push(item);
  }
  return rulesResult;
};

Drupal.ModuleFilter.Filter.prototype.stripe = function() {
  var self = this;
  var flip = { even: 'odd', odd: 'even' };
  var stripe = 'odd';

  $.each(self.index, function(key, item) {
    if (!item.element.hasClass('js-hide')) {
      item.element.removeClass('odd even')
        .addClass(stripe);
      stripe = flip[stripe];
    }
  });
};

$.fn.moduleFilter = function(selector, options) {
  var filterInput = this;
  filterInput.parents('.module-filter-inputs-wrapper').show();
  if (Drupal.settings.moduleFilter.setFocus) {
    filterInput.focus();
  }
  filterInput.data('moduleFilter', new Drupal.ModuleFilter.Filter(this, selector, options));
};

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
(function($) {

var lastModuleItem;

Drupal.behaviors.moduleFilterPermissions = {
  attach: function(context) {
    $('.module-filter-inputs-wrapper', context).once('module-filter', function() {
      var filterInput = $('input[name="module_filter[name]"]', context);
      var selector = '#permissions tbody tr';

      // Move location of filter input.
      $('#permissions').parent().prepend(filterInput.parent().parent());

      filterInput.moduleFilter(selector, {
        wrapper: $('#permissions').parent(),
        childSelector: 'td.module',
        buildIndex: [
          function(moduleFilter, item) {
            item.isModule = (item.text != '') ? true : false;
            if (item.isModule) {
              item.children = new Array();
              lastModuleItem = item;
            }
            else {
              item.parent = lastModuleItem;
              lastModuleItem.children.push(item);
            }
            return item;
          }
        ]
      });

      var moduleFilter = filterInput.data('moduleFilter');

      moduleFilter.operators = {
        perm: function(string, moduleFilter, item) {
          if (!item.isModule) {
            if (item.name == undefined) {
              var $name = $('td.permission', item.element).clone();
              $('.description', $name).remove();
              item.name = $name.text().trim().toLowerCase();
            }

            if (item.name.indexOf(string) >= 0) {
              return true;
            }
          }
        }
      };

      moduleFilter.element.bind('moduleFilter:finish', function(e, data) {
        for (var i in moduleFilter.results) {
          if (moduleFilter.results[i].isModule) {
            for (var k in moduleFilter.results[i].children) {
              moduleFilter.results[i].children[k].element.removeClass('js-hide');
            }
          }
          else {
            moduleFilter.results[i].parent.element.removeClass('js-hide');
          }
        }
      });
    });
  }
};

})(jQuery);;
(function ($) {

/**
 * Shows checked and disabled checkboxes for inherited permissions.
 */
Drupal.behaviors.permissions = {
  attach: function (context) {
    var self = this;
    $('table#permissions').once('permissions', function () {
      // On a site with many roles and permissions, this behavior initially has
      // to perform thousands of DOM manipulations to inject checkboxes and hide
      // them. By detaching the table from the DOM, all operations can be
      // performed without triggering internal layout and re-rendering processes
      // in the browser.
      var $table = $(this);
      if ($table.prev().length) {
        var $ancestor = $table.prev(), method = 'after';
      }
      else {
        var $ancestor = $table.parent(), method = 'append';
      }
      $table.detach();

      // Create dummy checkboxes. We use dummy checkboxes instead of reusing
      // the existing checkboxes here because new checkboxes don't alter the
      // submitted form. If we'd automatically check existing checkboxes, the
      // permission table would be polluted with redundant entries. This
      // is deliberate, but desirable when we automatically check them.
      var $dummy = $('<input type="checkbox" class="dummy-checkbox" disabled="disabled" checked="checked" />')
        .attr('title', Drupal.t("This permission is inherited from the authenticated user role."))
        .hide();

      $('input[type=checkbox]', this).not('.rid-2, .rid-1').addClass('real-checkbox').each(function () {
        $dummy.clone().insertAfter(this);
      });

      // Initialize the authenticated user checkbox.
      $('input[type=checkbox].rid-2', this)
        .bind('click.permissions', self.toggle)
        // .triggerHandler() cannot be used here, as it only affects the first
        // element.
        .each(self.toggle);

      // Re-insert the table into the DOM.
      $ancestor[method]($table);
    });
  },

  /**
   * Toggles all dummy checkboxes based on the checkboxes' state.
   *
   * If the "authenticated user" checkbox is checked, the checked and disabled
   * checkboxes are shown, the real checkboxes otherwise.
   */
  toggle: function () {
    var authCheckbox = this, $row = $(this).closest('tr');
    // jQuery performs too many layout calculations for .hide() and .show(),
    // leading to a major page rendering lag on sites with many roles and
    // permissions. Therefore, we toggle visibility directly.
    $row.find('.real-checkbox').each(function () {
      this.style.display = (authCheckbox.checked ? 'none' : '');
    });
    $row.find('.dummy-checkbox').each(function () {
      this.style.display = (authCheckbox.checked ? '' : 'none');
    });
  }
};

})(jQuery);
;
(function($) {

/**
 * Live preview of Administration menu components.
 */
Drupal.behaviors.adminMenuLivePreview = {
  attach: function (context, settings) {
    $('input[name^="admin_menu_components"]', context).once('admin-menu-live-preview')
      .change(function () {
        var target = $(this).attr('rel');
        $(target).toggle(this.checked);
      })
      .trigger('change');
  }
};

/**
 * Automatically enables required permissions on demand.
 *
 * Many users do not understand that two permissions are required for the
 * administration menu to appear. Since Drupal core provides no facility for
 * this, we implement a simple manual confirmation for automatically enabling
 * the "other" permission.
 */
Drupal.behaviors.adminMenuPermissionsSetupHelp = {
  attach: function (context, settings) {
    $('#permissions', context).once('admin-menu-permissions-setup', function () {
      // Retrieve matrix/mapping - these need to use the same indexes for the
      // same permissions and roles.
      var $roles = $(this).find('th:not(:first)');
      var $admin = $(this).find('input[name$="[access administration pages]"]');
      var $menu = $(this).find('input[name$="[access administration menu]"]');

      // Retrieve the permission label - without description.
      var adminPermission = $.trim($admin.eq(0).parents('td').prev().children().get(0).firstChild.textContent);
      var menuPermission = $.trim($menu.eq(0).parents('td').prev().children().get(0).firstChild.textContent);

      $admin.each(function (index) {
        // Only proceed if both are not enabled already.
        if (!(this.checked && $menu[index].checked)) {
          // Stack both checkboxes and attach a click event handler to both.
          $(this).add($menu[index]).click(function () {
            // Do nothing when disabling a permission.
            if (this.checked) {
              // Figure out which is the other, check whether it still disabled,
              // and if so, ask whether to auto-enable it.
              var other = (this == $admin[index] ? $menu[index] : $admin[index]);
              if (!other.checked && confirm(Drupal.t('Also allow !name role to !permission?', {
                '!name': $roles[index].textContent,
                '!permission': (this == $admin[index] ? menuPermission : adminPermission)
              }))) {
                other.checked = 'checked';
              }
            }
          });
        }
      });
    });
  }
};

})(jQuery);
;
