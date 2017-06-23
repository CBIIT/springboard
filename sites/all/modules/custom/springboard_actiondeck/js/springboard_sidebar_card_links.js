(function ($) {
    Drupal.behaviors.sidebar_card_links = {
        attach: function () {
            $('.add-card-link').click(function(event) {
                event.stopPropagation();
                if ($(this).find('div').hasClass('plus-icon')) {
                    cardClass = $(this).attr('class').split(' ')[2];
                    cardValue = cardClass.replace('btn-', '');
                    Drupal.behaviors.springboard_actiondeck_cookies.add_card(cardValue);
                    $(this).removeClass('plus-icon').html('<div class="check-icon"></div>In Your Action Deck').closest('a').addClass('active');
                }
                else if ($(this).find('div').hasClass('check-icon')) {
                    cardClass = $(this).attr('class').split(' ')[2];
                    cardValue = cardClass.replace('btn-', '');
                    Drupal.behaviors.springboard_actiondeck_cookies.remove_card(cardValue);
                    $(this).removeClass('check-icon').html('<div class="plus-icon"></div>In Your Action Deck').closest('a').removeClass('active');
                }
            });
        }
    }
    Drupal.behaviors.sidebar_card_links.init = function() {
        deck = Drupal.behaviors.springboard_actiondeck_cookies.get_cards();
        for (i = 0; i < deck.length; i++) {
            $('.add-card-link.btn-' + deck[i]).html('<div class="check-icon"></div>In Your Action Deck').closest('a').addClass('active');
        }
    };

    $(document).ready(function(){
        Drupal.behaviors.sidebar_card_links.init();
    });
}(jQuery));