(function($){
  "use strict";

  Drupal.behaviors.springboardLinks = {
    attach: function (context) {
      // Add target=_blank to all external links.
      $("a[href^='http']").attr('target','_blank');
    }
  };
    
    $(function() {
        $('.view-springboard-video-stories.view-display-id-page_1 .views-row .col-md-6').matchHeight();
    });
  // $('.view-springboard-video-stories.view-display-id-page_1 .views-row .col-md-6').matchHeight();
  
// Smooth scroll back to top
	$('.scrollToTop').click(function(){
		$('body,html,document').animate({scrollTop:0}, 'slow');
		return false;
	});
// Search Open and Close	
	function searchOverlay() {
		$('#search').slideToggle('fast');
		var src = ($('#nav-search-icon').attr('src') === '/sites/all/themes/springboard/images/search-open.png') ? '/sites/all/themes/springboard/images/search-close.png' : '/sites/all/themes/springboard/images/search-open.png';
  		$('#nav-search-icon').attr('src', src);
		if ($('#nav-search-title').text() === 'SEARCH') {
            $('#nav-search-title').text('CLOSE');
			$('#nav-search').attr('aria-expanded', true);
			$('#close-search').attr('aria-expanded', true);
        }
        else {
            $('#nav-search-title').text('SEARCH');
			$('#nav-search').attr('aria-expanded', false);
			$('#close-search').attr('aria-expanded', false);
        }
	}
	$('#nav-search').click(function(){
        $('#nav-more-title').text('MORE');
        $('#nav-more').attr('aria-expanded', false);
        $('#more-dropdown').slideUp('fast');
        $('#nav-more-icon').attr('src', '/sites/all/themes/springboard/images/more-btn.png');
		searchOverlay();
	});
	$('#close-search').click(function(){
		searchOverlay();
	});
// More Open and Close
    function moreOverlay() {
        $('#more-dropdown').slideToggle('fast');
        var src = ($('#nav-more-icon').attr('src') === '/sites/all/themes/springboard/images/more-btn.png') ? '/sites/all/themes/springboard/images/search-close.png' : '/sites/all/themes/springboard/images/more-btn.png';
        $('#nav-more-icon').attr('src', src);
        if ($('#nav-more-title').text() === 'MORE') {
            $('#nav-more-title').text('CLOSE');
            $('#nav-more').attr('aria-expanded', true);
        }
        else {
            $('#nav-more-title').text('MORE');
            $('#nav-more').attr('aria-expanded', false);
        }
    }
    $('#nav-more').click(function(){
        $('#nav-search-title').text('SEARCH');
        $('#nav-search').attr('aria-expanded', false);
        $('#close-search').attr('aria-expanded', false);
        $('#nav-search-icon').attr('src', '/sites/all/themes/springboard/images/search-open.png');
        $('#search').slideUp('fast');
        moreOverlay();
    });
// Homepage Deck Preview
	$('.premade-deck-links').find('.btn').click(function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$('.premade-deck-links').find('.btn').each(function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');	
				}
			});
			$('#accordion').find('.deck-previews').find('.collapse').each(function() {
				if ($(this).hasClass('in')) {
					$(this).removeClass('in');
					$(this).attr('aria-expanded', false);	
				}
			});
			$(this).addClass('active');	
		}
	});
	$('.btn').keypress(function (e) {
	 	var key = e.which;
	 	if (key === 13) {  // the enter key code
			$(this).click();
		return false;  
	  	}
	}); 
// Landing Page Card Animation
	/* Every time the window is scrolled ... */
    $(window).scroll( function(){
        /* Check the location of each desired element */
        $('.subpage-link').each( function(i){ 
            // var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var midpoint_of_object = $(this).offset().top + (.5 * $(this).outerHeight());
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > midpoint_of_object ){
                $(this).animate({'opacity':'1'},200); 
				$(this).animate({'top':'0'},200);
            }
        }); 
    });
// Deck Page - Card View
	$('.card_select').find('.btn').click(function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$('.sidebar').find('.btn').each(function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');	
				}
			});
			$('#accordion').find('.collapse').each(function() {
				if ($(this).hasClass('in')) {
					$(this).removeClass('in');
					$(this).attr('aria-expanded', false);	
				}
			});
			$(this).addClass('active');	
		}
	});
	
// Search Block
	$("#search-block-form .input-group-btn").remove();
	$("#search-block-form .input-group input").after('<button type="submit" class="btn btn-search-submit">Submit</button>');

// Open first card in deck.
    $('.card_select a:first').click();

//Custom Deck Tabs
	$('#selectionTabs a').click(function (e) {
  		e.preventDefault();
  		$(this).tab('show');
	});

// Homepage Poll modification 
	setInterval(function() {
		$('.sb-poll-random').find('.poll-bar').each(function() {
			if ($(this).hasClass('voted')) {
				$('.field-type-text-with-summary').find('p').removeClass('element-invisible');
			}
		});
	}, 1000);
	
	//
    
    $(".view-springboard-sidebar-card-link .add-to-deck .add-card-link").on('click', function(event) {
        if ($(this).parent().hasClass('active')) {
            $(".view-springboard-sidebar-card-link .view-footer").hide();
        } else {
            $(".view-springboard-sidebar-card-link .view-footer").show();
        }
    });
	
	
// Zhao, Highlight menu items on certain springboard pages
// Billy, Add color bottom bar to certain action card pages
	if(window.location.href.indexOf("/springboard/symptoms/") > -1){
		$('#block-menu-menu-springboard ul.menu li:eq(1) a').addClass('active');
		$('.card-box .top-banner').addClass('symptoms');
	} else if (window.location.href.indexOf("/springboard/stress-mood/") > -1) {
		$('#block-menu-menu-springboard ul.menu li:eq(2) a').addClass('active');
		$('.card-box .top-banner').addClass('stressmood');
	} else if (window.location.href.indexOf("/springboard/wellness/") > -1) {
		$('#block-menu-menu-springboard ul.menu li:eq(3) a').addClass('active');
		$('.card-box .top-banner').addClass('wellness');
	} else if (window.location.pathname.substring(0, 24) == "/springboard/get-support") {
		$('#block-menu-menu-springboard ul.menu li:eq(4) a').addClass('active');
		$('.card-box .top-banner').addClass('getsupport');
	}
// Add color bottom bar to deck cards in premade and custom action decks
	$('#Anemia--Bleeding-card .card-box .top-banner').addClass('symptoms');
	$('#Appetite-Changes-card .card-box .top-banner').addClass('symptoms');
	$('#Diarrhea-card .card-box .top-banner').addClass('symptoms');
	$('#Bladder-Control-Problems-Incontinence-card .card-box .top-banner').addClass('symptoms');
	$('#Chemo-Brain--Memory-Problems-card .card-box .top-banner').addClass('symptoms');
	$('#Constipation-card .card-box .top-banner').addClass('symptoms');
	$('#Fatigue-card .card-box .top-banner').addClass('symptoms');
	$('#Hair-Loss-card .card-box .top-banner').addClass('symptoms');
	$('#Hot-Flashes--Night-Sweats-card .card-box .top-banner').addClass('symptoms');
	$('#Infections-card .card-box .top-banner').addClass('symptoms');
	$('#Infertility-for-Men-card .card-box .top-banner').addClass('symptoms');
	$('#Infertility-for-Women-card .card-box .top-banner').addClass('symptoms');
	$('#Lymphedema-card .card-box .top-banner').addClass('symptoms');
	$('#Mouth-Gum--Throat-Problems-card .card-box .top-banner').addClass('symptoms');
	$('#Nausea--Vomiting-card .card-box .top-banner').addClass('symptoms');
	$('#Pain-card .card-box .top-banner').addClass('symptoms');
	$('#Sexual-Problems-for-Men-card .card-box .top-banner').addClass('symptoms');
	$('#Sexual-Problems-for-Women-card .card-box .top-banner').addClass('symptoms');
	$('#Skin--Nail-Changes-card .card-box .top-banner').addClass('symptoms');
	$('#Sleep-Problems-card .card-box .top-banner').addClass('symptoms');
	$('#Swelling-Edema-card .card-box .top-banner').addClass('symptoms');
	$('#Tingling-Burning--Numbness-Neuropathy-card .card-box .top-banner').addClass('symptoms');
	$('#Urine-Bladder--Kidney-Problems-card .card-box .top-banner').addClass('symptoms');
	$('#Weight-Gain-card .card-box .top-banner').addClass('symptoms');
	$('#Anxiety-card .card-box .top-banner').addClass('stressmood');
	$('#Coping-with-Cancer-in-Everyday-Life-card .card-box .top-banner').addClass('stressmood');
	$('#Depression-card .card-box .top-banner').addClass('stressmood');
	$('#Distress-card .card-box .top-banner').addClass('stressmood');
	$('#Fear-of-Recurrence-card .card-box .top-banner').addClass('stressmood');
	$('#Practice-Mindfulness--Relaxation-card .card-box .top-banner').addClass('stressmood');
	$('#Be-Active-card .card-box .top-banner').addClass('wellness');
	$('#Healthy-Eating-card .card-box .top-banner').addClass('wellness');
	$('#Quit-Smoking-card .card-box .top-banner').addClass('wellness');
	$('#Family-Friends--Caregivers-card .card-box .top-banner').addClass('getsupport');
	$('#Health-Care-Team-card .card-box .top-banner').addClass('getsupport');
	$('#In-the-Workplace-card .card-box .top-banner').addClass('getsupport');
	$('#Peer-to-Peer-Support-card .card-box .top-banner').addClass('getsupport');
	$('#Sun-Safety-card .card-box .top-banner').addClass('wellness');

	//Zhao, Section 508 report: RF-1 RF-6 SEF-1
	$('.page-springboard #homepage-poll .form-type-radios > label.control-label').remove();
	
	//Billy, Radio buttons - custom
	$('.form-type-radio label.control-label input.form-radio').after('<div class="control__indicator"></div>');
    
	//Billy, Quiz Error Message
	$('form').attr('novalidate', 'novalidate');
	$('fieldset .form-radios .has-error:first-of-type').prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error</strong> This field is required. Please answer and resubmit.</div>');
	
	//Billy, Add screen reader message to check-icon
	setInterval(function() {
		$('.check-icon').each(function() {
			if ( $(this).find('.sr-only').length != 0 ) {
				// 	
			} else {
				$(this).append(' <span class="sr-only">This card has been added to your deck.</span> ');	
			}
		});
        
        //Zhao, Fix control__indicator regenerate
		if ( !$( ".control__indicator" ).length ) {
            $('.form-type-radio label.control-label input.form-radio').after('<div class="control__indicator"></div>');
        };
	}, 1000);
	
	//navigation and search shrink on scroll
  	shrinkNav();

  	$(document).scroll(function() {
    	shrinkNav();
  	});

	function shrinkNav() {
	  if ($(document).scrollTop() >= 70) {
		$('header').addClass('shrink-header');
		$('#search').addClass('shrink-search');
	  }
	  else {
		$('header').removeClass('shrink-header');
		$('#search').removeClass('shrink-search');
	  }
	}
}(jQuery));	

(function ($) {
	Drupal.behaviors.springboard = {
		attach: function (context, settings) {
	}};

})(jQuery);
jQuery(document).ready(function() {
    if (jQuery(".view-springboard-sidebar-card-link .add-to-deck").hasClass('active')) {
        jQuery(".view-springboard-sidebar-card-link .view-footer").show();
    }
  var panel1 = new tabpanel("tabpanel1", false); 
}); 

// 
// keyCodes() is an object to contain keycodes needed for the application 
// 
function keyCodes() { 
  // Define values for keycodes 
  this.tab        = 9; 
  this.enter      = 13; 
  this.esc        = 27; 

  this.space      = 32; 
  this.pageup     = 33; 
  this.pagedown   = 34; 
  this.end        = 35; 
  this.home       = 36; 

  this.left       = 37; 
  this.up         = 38; 
  this.right      = 39; 
  this.down       = 40; 

} // end keyCodes 

// 
// tabpanel() is a class constructor to create a ARIA-enabled tab panel widget. 
// 
// @param (id string) id is the id of the div containing the tab panel. 
// 
// @param (accordian boolean) accordian is true if the tab panel should operate 
//         as an accordian; false if a tab panel 
// 
// @return N/A 
// 
// Usage: Requires a div container and children as follows: 
// 
//         1. tabs/accordian headers have class 'tab' 
// 
//         2. panels are divs with class 'panel' 
// 
function tabpanel(id, accordian) { 

  // define the class properties 
   
  this.panel_id = id; // store the id of the containing div 
  this.accordian = accordian; // true if this is an accordian control 
  this.$panel = jQuery('#' + id);  // store the jQuery object for the panel 
  this.keys = new keyCodes(); // keycodes needed for event handlers 
  this.$tabs = this.$panel.find('.tab'); // Array of panel tabs. 
  this.$panels = this.$panel.children('.panel'); // Array of panels. 

  // Bind event handlers 
  this.bindHandlers(); 

  // Initialize the tab panel 
  this.init(); 

} // end tabpanel() constructor 

// 
// Function init() is a member function to initialize the tab/accordian panel. Hides all panels. If a tab 
// has the class 'selected', makes that panel visible; otherwise, makes first panel visible. 
// 
// @return N/A 
// 
tabpanel.prototype.init = function() { 
  var $tab; // the selected tab - if one is selected 

  // add aria attributes to the panels 
  this.$panels.attr('aria-hidden', 'true'); 

  // hide all the panels 
  this.$panels.hide(); 

  // get the selected tab 
  $tab = this.$tabs.filter('.selected'); 

  if ($tab == undefined) { 
    $tab = this.$tabs.first(); 
    $tab.addClass('selected'); 
  } 

  // show the panel that the selected tab controls and set aria-hidden to false 
  this.$panel.find('#' + $tab.attr('aria-controls')).show().attr('aria-hidden', 'false'); 

} // end init() 

// 
// Function switchTabs() is a member function to give focus to a new tab or accordian header. 
// If it's a tab panel, the currently displayed panel is hidden and the panel associated with the new tab 
// is displayed. 
// 
// @param ($curTab obj) $curTab is the jQuery object of the currently selected tab 
// 
// @param ($newTab obj) $newTab is the jQuery object of new tab to switch to 
// 
// @return N/A 
// 
tabpanel.prototype.switchTabs = function($curTab, $newTab) { 

  // Remove the highlighting from the current tab 
  $curTab.removeClass('selected focus'); 

  // remove tab from the tab order and update its aria-selected attribute 
  $curTab.attr('tabindex', '-1').attr('aria-selected', 'false'); 

  // update the aria attributes 
   
  // Highlight the new tab and update its aria-selected attribute 
  $newTab.addClass('selected').attr('aria-selected', 'true'); 

  // If this is a tab panel, swap displayed tabs 
  if (this.accordian == false) { 
    // hide the current tab panel and set aria-hidden to true 
    this.$panel.find('#' + $curTab.attr('aria-controls')).hide().attr('aria-hidden', 'true'); 

    // show the new tab panel and set aria-hidden to false 
    this.$panel.find('#' + $newTab.attr('aria-controls')).show().attr('aria-hidden', 'false'); 
  } 

  // Make new tab navigable 
  $newTab.attr('tabindex', '0'); 

  // give the new tab focus 
  $newTab.focus(); 

} // end switchTabs() 

// 
// Function togglePanel() is a member function to display or hide the panel associated with an accordian header 
// 
// @param ($tab obj) $tab is the jQuery object of the currently selected tab 
// 
// @return N/A 
// 
tabpanel.prototype.togglePanel = function($tab) { 

  $panel = this.$panel.find('#' + $tab.attr('aria-controls')); 

  if ($panel.attr('aria-hidden') == 'true') { 
    $panel.slideDown(100); 
    $panel.attr('aria-hidden', 'false'); 
  } 
  else { 
    $panel.slideUp(100); 
    $panel.attr('aria-hidden', 'true'); 
  } 
} // end togglePanel() 

// 
// Function bindHandlers() is a member function to bind event handlers for the tabs 
// 
// @return N/A 
// 
tabpanel.prototype.bindHandlers = function() { 

  var thisObj = this; // Store the this pointer for reference 

  ////////////////////////////// 
  // Bind handlers for the tabs / accordian headers 

  // bind a tab keydown handler 
  this.$tabs.keydown(function(e) { 
    return thisObj.handleTabKeyDown(jQuery(this), e); 
  }); 

  // bind a tab keypress handler 
  this.$tabs.keypress(function(e) { 
    return thisObj.handleTabKeyPress(jQuery(this), e); 
  }); 

  // bind a tab click handler 
  this.$tabs.click(function(e) { 
    return thisObj.handleTabClick(jQuery(this), e); 
  }); 

  // bind a tab focus handler 
  this.$tabs.focus(function(e) { 
    return thisObj.handleTabFocus(jQuery(this), e); 
  }); 

  // bind a tab blur handler 
  this.$tabs.blur(function(e) { 
    return thisObj.handleTabBlur(jQuery(this), e); 
  }); 

  ///////////////////////////// 
  // Bind handlers for the panels 
   
  // bind a keydown handlers for the panel focusable elements 
  this.$panels.keydown(function(e) { 
    return thisObj.handlePanelKeyDown(jQuery(this), e); 
  }); 

  // bind a keypress handler for the panel 
  this.$panels.keypress(function(e) { 
    return thisObj.handlePanelKeyPress(jQuery(this), e); 
  }); 

} // end bindHandlers() 

// 
// Function handleTabKeyDown() is a member function to process keydown events for a tab 
// 
// @param ($tab obj) $tab is the jquery object of the tab being processed 
// 
// @param (e obj) e is the associated event object 
// 
// @return (boolean) Returns true if propagating; false if consuming event 
// 
tabpanel.prototype.handleTabKeyDown = function($tab, e) { 

  if (e.altKey) { 
    // do nothing 
    return true; 
  } 

  switch (e.keyCode) { 
    case this.keys.enter: 
    case this.keys.space: { 

      // Only process if this is an accordian widget 
      if (this.accordian == true) { 
        // display or collapse the panel 
        this.togglePanel($tab); 

        e.stopPropagation(); 
        return false; 
      } 

      return true; 
    } 
    case this.keys.left: 
    case this.keys.up: { 

      var thisObj = this; 
      var $prevTab; // holds jQuery object of tab from previous pass 
      var $newTab; // the new tab to switch to 

      if (e.ctrlKey) { 
        // Ctrl+arrow moves focus from panel content to the open 
        // tab/accordian header. 
      } 
      else { 
        var curNdx = this.$tabs.index($tab); 

        if (curNdx == 0) { 
          // tab is the first one: 
          // set newTab to last tab 
          $newTab = this.$tabs.last(); 
        } 
        else { 
          // set newTab to previous 
          $newTab = this.$tabs.eq(curNdx - 1); 
        } 

        // switch to the new tab 
        this.switchTabs($tab, $newTab); 
      } 

      e.stopPropagation(); 
      return false; 
    } 
    case this.keys.right: 
    case this.keys.down: { 

      var thisObj = this; 
      var foundTab = false; // set to true when current tab found in array 
      var $newTab; // the new tab to switch to 

      var curNdx = this.$tabs.index($tab); 

      if (curNdx == this.$tabs.length-1) { 
        // tab is the last one: 
        // set newTab to first tab 
        $newTab = this.$tabs.first(); 
      } 
      else { 
        // set newTab to next tab 
        $newTab = this.$tabs.eq(curNdx + 1); 
      } 

      // switch to the new tab 
      this.switchTabs($tab, $newTab); 

      e.stopPropagation(); 
      return false; 
    } 
    case this.keys.home: { 

      // switch to the first tab 
      this.switchTabs($tab, this.$tabs.first()); 

      e.stopPropagation(); 
      return false; 
    } 
    case this.keys.end: { 

      // switch to the last tab 
      this.switchTabs($tab, this.$tabs.last()); 

      e.stopPropagation(); 
      return false; 
    } 
  } 
} // end handleTabKeyDown() 

// 
// Function handleTabKeyPress() is a member function to process keypress events for a tab. 
// 
// 
// @param ($tab obj) $tab is the jquery object of the tab being processed 
// 
// @param (e obj) e is the associated event object 
// 
// @return (boolean) Returns true if propagating; false if consuming event 
// 
tabpanel.prototype.handleTabKeyPress = function($tab, e) { 

  if (e.altKey) { 
    // do nothing 
    return true; 
  } 

  switch (e.keyCode) { 
    case this.keys.enter: 
    case this.keys.space: 
    case this.keys.left: 
    case this.keys.up: 
    case this.keys.right: 
    case this.keys.down: 
    case this.keys.home: 
    case this.keys.end: { 
      e.stopPropagation(); 
      return false; 
    } 
    case this.keys.pageup: 
    case this.keys.pagedown: { 

      // The tab keypress handler must consume pageup and pagedown 
      // keypresses to prevent Firefox from switching tabs 
      // on ctrl+pageup and ctrl+pagedown 

      if (!e.ctrlKey) { 
        return true; 
      } 

      e.stopPropagation(); 
      return false; 
    } 
  } 

  return true; 

} // end handleTabKeyPress() 

// 
// Function handleTabClick() is a member function to process click events for tabs 
// 
// @param ($tab object) $tab is the jQuery object of the tab being processed 
// 
// @param (e object) e is the associated event object 
// 
// @return (boolean) returns true 
// 
tabpanel.prototype.handleTabClick = function($tab, e) { 

  // Remove the highlighting from all tabs 
  this.$tabs.removeClass('selected'); 

  // remove all tabs from the tab order and reset their aria-selected attribute 
  this.$tabs.attr('tabindex', '-1').attr('aria-selected', 'false'); 

  // hide all tab panels 
  this.$panels.hide(); 
   
  // Highlight the clicked tab and update its aria-selected attribute 
  $tab.addClass('selected').attr('aria-selected', 'true'); 

  // show the clicked tab panel 
  this.$panel.find('#' + $tab.attr('aria-controls')).show(); 

  // make clicked tab navigable 
  $tab.attr('tabindex', '0'); 

  // give the tab focus 
  $tab.focus(); 

  return true; 

} // end handleTabClick() 

// 
// Function handleTabFocus() is a member function to process focus events for tabs 
// 
// @param ($tab object) $tab is the jQuery object of the tab being processed 
// 
// @param (e object) e is the associated event object 
// 
// @return (boolean) returns true 
// 
tabpanel.prototype.handleTabFocus = function($tab, e) { 

  // Add the focus class to the tab 
  $tab.addClass('focus'); 

  return true; 

} // end handleTabFocus() 

// 
// Function handleTabBlur() is a member function to process blur events for tabs 
// 
// @param ($tab object) $tab is the jQuery object of the tab being processed 
// 
// @param (e object) e is the associated event object 
// 
// @return (boolean) returns true 
// 
tabpanel.prototype.handleTabBlur = function($tab, e) { 

  // Remove the focus class to the tab 
  $tab.removeClass('focus'); 

  return true; 

} // end handleTabBlur() 


///////////////////////////////////////////////////////// 
// Panel Event handlers 
// 

// 
// Function handlePanelKeyDown() is a member function to process keydown events for a panel 
// 
// @param ($elem obj) $elem is the jquery object of the element being processed 
// 
// @param (e obj) e is the associated event object 
// 
// @return (boolean) Returns true if propagating; false if consuming event 
// 
tabpanel.prototype.handlePanelKeyDown = function($elem, e) { 

  if (e.altKey) { 
    // do nothing 
    return true; 
  } 

  switch (e.keyCode) { 
    case this.keys.esc: { 
      e.stopPropagation(); 
      return false; 
    } 
    case this.keys.left: 
    case this.keys.up: { 

      if (!e.ctrlKey) { 
        // do not process 
        return true; 
      } 
   
      // get the jQuery object of the tab 
      var $tab = jQuery('#' + $elem.attr('aria-labelledby')); 

      // Move focus to the tab 
      $tab.focus(); 

      e.stopPropagation(); 
      return false; 
    } 
    case this.keys.pageup: { 

      var $newTab; 

      if (!e.ctrlKey) { 
        // do not process 
        return true; 
      } 

      // get the jQuery object of the tab 
      var $tab = this.$tabs.filter('.selected'); 

      // get the index of the tab in the tab list 
      var curNdx = this.$tabs.index($tab); 

      if (curNdx == 0) { 
        // this is the first tab, set focus on the last one 
        $newTab = this.$tabs.last(); 
      } 
      else { 
        // set focus on the previous tab 
        $newTab = this.$tabs.eq(curNdx - 1); 
      } 

      // switch to the new tab 
      this.switchTabs($tab, $newTab); 

      e.stopPropagation(); 
      e.preventDefault(); 
      return false; 
    } 
    case this.keys.pagedown: { 

      var $newTab; 

      if (!e.ctrlKey) { 
        // do not process 
        return true; 
      } 

      // get the jQuery object of the tab 
      var $tab = jQuery('#' + $elem.attr('aria-labelledby')); 

      // get the index of the tab in the tab list 
      var curNdx = this.$tabs.index($tab); 

      if (curNdx == this.$tabs.length-1) { 
        // this is the last tab, set focus on the first one 
        $newTab = this.$tabs.first(); 
      } 
      else { 
        // set focus on the next tab 
        $newTab = this.$tabs.eq(curNdx + 1); 
      } 

      // switch to the new tab 
      this.switchTabs($tab, $newTab); 

      e.stopPropagation(); 
      e.preventDefault(); 
      return false; 
    } 
  } 

  return true; 

} // end handlePanelKeyDown() 

// 
// Function handlePanelKeyPress() is a member function to process keypress events for a panel 
// 
// @param ($elem obj) $elem is the jquery object of the element being processed 
// 
// @param (e obj) e is the associated event object 
// 
// @return (boolean) Returns true if propagating; false if consuming event 
// 
tabpanel.prototype.handlePanelKeyPress = function($elem, e) { 

  if (e.altKey) { 
    // do nothing 
    return true; 
  } 

  if (e.ctrlKey && (e.keyCode == this.keys.pageup || e.keyCode == this.keys.pagedown)) { 
      e.stopPropagation(); 
      e.preventDefault(); 
      return false; 
  } 

  switch (e.keyCode) { 
    case this.keys.esc: { 
      e.stopPropagation(); 
      e.preventDefault(); 
      return false; 
    } 
  } 

  return true; 

} // end handlePanelKeyPress() 

// focusable is a small jQuery extension to add a :focusable selector. It is used to 
// get a list of all focusable elements in a panel. Credit to ajpiano on the jQuery forums. 
// 
jQuery.extend(jQuery.expr[':'], { 
  focusable: function(element) { 
    var nodeName = element.nodeName.toLowerCase(); 
    var tabIndex = jQuery(element).attr('tabindex'); 

    // the element and all of its ancestors must be visible 
    if ((jQuery(element)[nodeName == 'area' ? 'parents' : 'closest'](':hidden').length) == true) { 
      return false; 
    } 

    // If tabindex is defined, its value must be greater than 0 
    if (!isNaN(tabIndex) && tabIndex < 0) { 
      return false; 
    } 

    // if the element is a standard form control, it must not be disabled 
    if (/input|select|textarea|button|object/.test(nodeName) == true) { 

             return !element.disabled; 
    } 

    // if the element is a link, href must be defined 
    if ((nodeName == 'a' ||  nodeName == 'area') == true) { 

      return (element.href.length > 0); 
    } 
             
    // this is some other page element that is not normally focusable. 
    return false; 
  } 
});