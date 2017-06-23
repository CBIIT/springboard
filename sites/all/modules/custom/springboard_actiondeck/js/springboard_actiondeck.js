(function ($) {
    Drupal.behaviors.actiondeck = {
        attach: function (context) {
            function updateDeck() {
                updatedDeck = Drupal.behaviors.springboard_actiondeck_cookies.get_cards();
                $("#edit-cards").val(updatedDeck);
                $('.cards-added a').addClass('hidden');
                $('#symptoms .btn, #stressmood .btn, #wellness .btn, #getsupport .btn').find('div').addClass('plus-icon').removeClass('check-icon');
                for (i = 0; i < updatedDeck.length; i++) {
                    $('.cards-added a.btn-' + updatedDeck[i]).removeClass('hidden');
                    $('#symptoms .btn-' + updatedDeck[i] + ', #stressmood .btn-' + updatedDeck[i] + ', #wellness .btn-' + updatedDeck[i] + ', #getsupport .btn-' + updatedDeck[i]).find('div').removeClass('plus-icon').addClass('check-icon');
                }
            }
            function init() {
                $('#symptoms .btn, #stressmood .btn, #wellness .btn, #getsupport .btn').click(function() {
                    cardClass = $(this).attr('class').split(' ')[1];
                    cardValue = cardClass.replace('btn-', '');
                    if ($(this).find('div').hasClass('plus-icon')) {
                        Drupal.behaviors.springboard_actiondeck_cookies.add_card(cardValue);
                    } else {
                        Drupal.behaviors.springboard_actiondeck_cookies.remove_card(cardValue);
                    }
                    updateDeck();
                });

                $('.cards-added a').click(function() {
                    cardClass = $(this).attr('class').split(' ')[1];
                    cardValue = cardClass.replace('btn-', '');
                    Drupal.behaviors.springboard_actiondeck_cookies.remove_card(cardValue);
                    updateDeck();
                });
                updateDeck();
            }
            init();
        }
    }
}(jQuery));
