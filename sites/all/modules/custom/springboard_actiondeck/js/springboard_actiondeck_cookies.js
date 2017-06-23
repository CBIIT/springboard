(function ($) {
    Drupal.behaviors.springboard_actiondeck_cookies = {};
    Drupal.behaviors.springboard_actiondeck_cookies.add_card = function(card_id) {
        current_deck = $.cookie('myactiondeck');
        if (current_deck) {
            current_deck = JSON.parse(current_deck);
        }
        else {
            current_deck = [];
        }
        var i = current_deck.indexOf(card_id);
        if(i == -1) {
            current_deck.push(card_id);
        }
        $.removeCookie('myactiondeck', { path: '/' });
        $.cookie('myactiondeck', JSON.stringify(current_deck), { path: '/' });
        $('.card-number').html(current_deck.length);
    };
    Drupal.behaviors.springboard_actiondeck_cookies.remove_card = function(card_id) {
        current_deck = $.cookie('myactiondeck');
        if (current_deck) {
            current_deck = JSON.parse(current_deck);
        }
        else {
            current_deck = [];
        }
        var i = current_deck.indexOf(card_id);
        if(i != -1) {
            current_deck.splice(i, 1);
        }
        $.removeCookie('myactiondeck', { path: '/' });
        $.cookie('myactiondeck', JSON.stringify(current_deck), { path: '/' });
        $('.card-number').html(current_deck.length);
    };
    Drupal.behaviors.springboard_actiondeck_cookies.replace_deck = function(new_deck) {
        $.removeCookie('myactiondeck', { path: '/' });
        $.cookie('myactiondeck', JSON.stringify(new_deck), { path: '/' });
        $('.card-number').html(new_deck.length);
    }
    Drupal.behaviors.springboard_actiondeck_cookies.get_cards = function() {
        current_deck = $.cookie('myactiondeck');
        if (current_deck) {
            return JSON.parse(current_deck);
        }
        else {
            return [];
        }
    };
    Drupal.behaviors.springboard_actiondeck_cookies.init = function() {
        $('.card-number').html(Drupal.behaviors.springboard_actiondeck_cookies.get_cards().length);
    };

    $(document).ready(function(){
        Drupal.behaviors.springboard_actiondeck_cookies.init();
    });
})(jQuery);
