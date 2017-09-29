/* Set path for Smokefree Teens site */
var teenSmokefreeGov = 'http://sft.mmgct.int';

/* Universal Analytics (Test Account) */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-15354704-2', {
   'cookieDomain': 'none'
});
ga('send', 'pageview');;
( function($) {
	$(document).ready(function() {

		// TODO: For the MySmokeFree Dashboard - refactor / move out of init
		$('#edit-interest-man').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'Men'); }
		});
		$('#edit-interest-woman').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'Women'); }
		});
		$('#edit-interest-pregnant').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'Pregnant'); }
		});
		$('#edit-interest-teen').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'Teen'); }
		});
		$('#edit-interest-vet').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'Veteran'); }
		});
		$('#edit-interest-espanol').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'enEspanol'); }
		});
		$('#edit-quit-journey-not-ready').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'NotReady'); }
		});
		$('#edit-quit-journey-preparing-to-quit').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'Preparing'); }
		});
		$('#edit-quit-journey-first-24-hrs').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', '24Hours'); }
		});
		$('#edit-quit-journey-first-two-weeks').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', '2Weeks'); }
		});
		$('#edit-quit-journey-maintaining-your-quit').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'Maintaining'); }
		});
		$('#edit-tried-but-slipped').click( function() {
			if (window.ga) { window.ga('send', 'event', 'Dashboard', 'Slipped'); }
		});

		/* Mobile drop-down menu */
		$('.mobile-btn').click(function() {
			var collapseElem = $(this).next('.collapse');
			if (collapseElem.hasClass('in')) {
				collapseElem.css('height','0');
				collapseElem.collapse('hide');
				collapseElem.removeClass('in');
			}
			else {
				collapseElem.css('height','auto');
				collapseElem.collapse('show');
				collapseElem.addClass('in');
			}
			return false;
		});

		/* Navigation accessibility text */
		var hiddenTextElems = $(".nav").find("SPAN.caret");
		hiddenTextElems.attr("aria-live","assertive");
		hiddenTextElems.text("(Collapsed.)");
		$('.dropdown-toggle').click(function() {
			var toggleElem = $(this);
			var dropDownElem = toggleElem.next("UL.dropdown-menu");
			var caretElem = toggleElem.find("SPAN.caret");
			hiddenTextElems.text("(Collapsed.)");
			if (dropDownElem.is(":visible")) {
				caretElem.text("(Expanded.)");
			}
		});
		$('.dropdown-toggle').hover(
			function() {
				var toggleElem = $(this);
				var dropDownElem = toggleElem.next("UL.dropdown-menu");
				var caretElem = toggleElem.find("SPAN.caret");
				hiddenTextElems.text("(Collapsed.)");
				if (dropDownElem.is(":visible")) {
					caretElem.text("(Expanded.)");
				}
			},
			function() {
				var toggleElem = $(this);
				var dropDownElem = toggleElem.next("UL.dropdown-menu");
				var caretElem = toggleElem.find("SPAN.caret");
				hiddenTextElems.text("(Collapsed.)");
				if (dropDownElem.is(":visible")) {
					caretElem.text("(Expanded.)");
				}
			}
		);

		/* Accordion effect */
		$("IMG.arrow[alt='expand/collapse']").attr("alt","To Open");
		$("IMG.arrow[alt='open/close']").attr("alt","To Open");
		$('.accordion-toggle').click(function() {
			var toggleElem = $(this);
			var collapseElem = $(this).parents('.accordion-group').find('.collapse');
			var arrowElem = toggleElem.find("IMG.arrow");
			if (collapseElem.hasClass('in')) {
				collapseElem.css('height','0');
				collapseElem.collapse('hide')
					.attr('aria-hidden', 'true')
					.attr('hidden', 'hidden');
				toggleElem.removeClass('opened');
				collapseElem.removeClass('in');
				arrowElem.attr("alt","To Open");
			}
			else {
				collapseElem.css('height','auto');
				collapseElem.collapse('show')
					.attr('aria-hidden', 'false')
					.removeAttr('hidden');
				collapseElem.addClass('in');
				toggleElem.addClass('opened');
				arrowElem.attr("alt","To Close");
			}
			return false;
		});

		/* add styles to the 'try this' bold p tags */
		jQuery("p:has(strong:contains(Next Step))").css("margin-top", "30px");
		jQuery("p:has(strong:contains(Try This))").css("margin-top", "30px");

		/**jQuery for MYSmokefree Dashboard radio buttons**/
		$('input:checked').parent().addClass("selected");
        $('input').click(function () {
        $('input:not(:checked)').parent().removeClass("selected");
        $('input:checked').parent().addClass("selected");
      });

	});
}) (jQuery);
;
