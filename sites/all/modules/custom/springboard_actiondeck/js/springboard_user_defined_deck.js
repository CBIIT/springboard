(function ($) {
    Drupal.behaviors.springboard_user_defined_deck = {};

    Drupal.behaviors.springboard_user_defined_deck.init = function() {
        deck = Drupal.settings.springboard_user_defined_deck.deck;
        if (deck.length > 0) {
            Drupal.behaviors.springboard_actiondeck_cookies.replace_deck(deck);
        }
        alert(ClipboardJS.isSupported());
    };

    $(document).ready(function(){
        Drupal.behaviors.springboard_user_defined_deck.init();
    });
})(jQuery);