/*globals jQuery*/

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {
    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "buildQuitPlan",

        defaults = {
            propertyName : "value"
        },

        calendarConfig = {
            autoclose    : true,
            format       : 'mm-dd-yyyy'
        },

        ERROR_QUIT_DAY   = 'errorQuitDay',
        ERROR_TRIGGERS   = 'errorTriggers',
        ERROR_REMINDERS  = 'errerReminders',

        SHOW             = 'show',
        HIDE             = 'hide',

        dates            = {},

        milestones       = {
            "_24HoursDate" : [],
            "_48HoursDate" : [],
            "oneWeekDate"  : [],
            "twoWeeksDate" : [],
            "oneMonthDate" : []
        },

        _trackEvent = function (params) {
            var eventDefaults = {
                    category : 'QuitPlan',
                    action   : undefined,
                    label    : undefined
                },
                eventParams = {};

            $.extend(eventParams, eventDefaults, params);

            if (window.ga) {
                window.ga('send', 'event', eventParams.category, eventParams.action, eventParams.label);
            }
        },

        _scrollTo = function ($target) {
            var extra_scroll = 10;
            if (document.body.scrollTop > $target.offset().top) {
                extra_scroll = -10;
            }
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top + extra_scroll
            }, 250, 'swing');
        },

        _addEvent = function (service, data) {
            var url = 'https://addevent.com/dir/?'
                + 'client=alytbm1p6z01u48glmv7810'
                + "&service="       + encodeURIComponent(service)
                + "&start="         + encodeURIComponent(data.date.replace(new RegExp("-", "g"), '/'))
                + "&end="           + encodeURIComponent(data.date.replace(new RegExp("-", "g"), '/'))
                + "&title="         + encodeURIComponent(data.title)
                + "&date_format="   + encodeURIComponent("MM/DD/YYYY")
                + "&timezone="      + encodeURIComponent("America/Chicago")
                + "&all_day_event=true";

            window.open(url);
        },

        _initScrollAnchors = function (element) {
            element.on('click', '.trigger-scroll', function (e) {
                e.preventDefault();

                var $target = $(this.hash);
                _scrollTo($target);
            });
        },

        _setErrorVisibility = function (type, action) {
            var selector;

            switch (type) {
            case ERROR_QUIT_DAY:
                selector = '#error-quit-day';
                break;
            case ERROR_TRIGGERS:
                selector = '#error-triggers';
                break;
            case ERROR_REMINDERS:
                selector = '#error-reminders';
                break;
            }

            $(selector).collapse(action);
        },

        _validDate = function (date) {
            var datePattern = /[0-9]{2}-[0-9]{2}-[0-9]{4}/;

            return datePattern.test(date);
        },

        _getRewardString = function (modal) {
            var rewardInputs        = modal.find('.milestone-input'),
                concatenatedString  = [];

            rewardInputs.each(function () {
                var value = $(this).val();

                if (value.length > 0) {
                    concatenatedString.push(value);
                }
            });

            return concatenatedString.join(',');
        },

        _validSection = {
            'valid-checklist' : function (section) {
                var checkedLength   = section.find('input[type="checkbox"]:checked').length,
                    sectionId       = section.eq(0).attr('id');

                if (checkedLength === 0) {
                    $(document.getElementById('get.' + sectionId)).removeClass('in');
                } else {
                    $(document.getElementById('get.' + sectionId)).addClass('in');
                }

                return (checkedLength > 0);
            },
            'valid-milestone' : function (section) {
                var milestonesLength    = 0,
                    activitiesLength,
                    rewardsLength,
                    dateLength          = section.find('#quit-day').eq(0).val().length,
                    sectionId           = section.eq(0).attr('id');

                $.each(milestones, function (key, value) {
                    var length = value.length;

                    milestonesLength += length;

                    if (length) {
                        $('#get\\.milestones\\.' + key).addClass('in');
                    } else {
                        $('#get\\.milestones\\.' + key).removeClass('in');
                    }
                });

                activitiesLength = milestones._48HoursDate.length + milestones.twoWeeksDate.length;
                rewardsLength = milestones._24HoursDate.length + milestones.oneWeekDate.length + milestones.oneMonthDate.length;

                if (milestonesLength === 0) {
                    $(document.getElementById('get.' + sectionId)).removeClass('in');
                } else {
                    $(document.getElementById('get.' + sectionId)).addClass('in');
                }

                if (activitiesLength === 0) {
                    $(document.getElementById('get.milestones.activites')).removeClass('in');
                } else {
                    $(document.getElementById('get.milestones.activites')).addClass('in');
                }

                if (rewardsLength === 0) {
                    $(document.getElementById('get.milestones.rewards')).removeClass('in');
                } else {
                    $(document.getElementById('get.milestones.rewards')).addClass('in');
                }

                return (dateLength > 0);
            }
        },

        _validReward = function (modal) {
            var isValid     = false,
                rewardDate  = modal.find('.milestone-date-picker').val(),
                rewards     = _getRewardString(modal);

            if (_validDate(rewardDate) && rewards.length > 0) {
                isValid = true;
            }

            return isValid;
        },

        _validActivity = function (modal) {
            var isValid     = false,
                rewardDate  = modal.find('.milestone-date-picker').val(),
                activity    = modal.find('.milestone-input').eq(0).val();

            if (_validDate(rewardDate) && activity.length > 0) {
                isValid = true;
            }

            return isValid;
        },

        _addMilestone = function (milestone, data) {
            var milestoneTemplate = '<li><span class="plan-input date">{{date}}</span> <span class="plan-input title">{{title}}</span></li>',
                milestoneList = $(document.getElementById('get.milestones.' + milestone)).find('.milestone-selections');

            milestoneList.append(milestoneTemplate.replace('{{date}}', data.date).replace('{{title}}', data.title));
        },

        _initMarkCalendar = function (element) {
            var $quitDay        = element.find('#quit-day'),
                $milestones     = element.find('#milestones');


            $quitDay.datepicker(calendarConfig)
                .on("changeDate", function () {
                    if (_validDate($quitDay.val())) {
                        element.trigger('dateSet.quitPlan');
                        _setErrorVisibility(ERROR_QUIT_DAY, HIDE);

                        _trackEvent({
                            action: 'QuitDate',
                            label: $quitDay.val()
                        });
                    } else {
                        _setErrorVisibility(ERROR_QUIT_DAY, SHOW);
                    }
                });

            $quitDay.on('blur', function () {
                if (_validDate($quitDay.val())) {
                    element.trigger('dateSet.quitPlan');
                    _setErrorVisibility(ERROR_QUIT_DAY, HIDE);
                } else {
                    _setErrorVisibility(ERROR_QUIT_DAY, SHOW);
                }
            });

            element.one('dateSet.quitPlan', function () {
                $milestones.addClass('in');
            });

            $('#dropdown-add-calendar-quit-day button').on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var quitDay = element.find('#quit-day').val(),
                    service = $(this).attr('data-service'),
                    data;

                if (_validDate(quitDay)) {
                    data = {
                        date    : quitDay,
                        title   : 'My quit day'
                    };

                    _addEvent(service, data);
                }
            });

            element.on('dateSet.quitPlan', function () {
                var date;

                $('#get-quit-day').text($quitDay.val());

                dates.quitDate = $quitDay.datepicker('getDate');
                date = dates.quitDate.getDate();

                dates._24HoursDate = new Date(dates.quitDate);
                dates._24HoursDate.setDate(date + 1);

                dates._48HoursDate = new Date(dates.quitDate);
                dates._48HoursDate.setDate(date + 2);

                dates.oneWeekDate = new Date(dates.quitDate);
                dates.oneWeekDate.setDate(date + 7);

                dates.twoWeeksDate = new Date(dates.quitDate);
                dates.twoWeeksDate.setDate(date + 14);

                dates.oneMonthDate = new Date(dates.quitDate);
                dates.oneMonthDate.setMonth(dates.quitDate.getMonth() + 1);

                $(document.getElementById('milestones.24Hours.date')).datepicker('setDate', dates._24HoursDate);
                $(document.getElementById('milestones.48Hours.date')).datepicker('setDate', dates._48HoursDate);
                $(document.getElementById('milestones.oneWeek.date')).datepicker('setDate', dates.oneWeekDate);
                $(document.getElementById('milestones.twoWeeks.date')).datepicker('setDate', dates.twoWeeksDate);
                $(document.getElementById('milestones.oneMonth.date')).datepicker('setDate', dates.oneMonthDate);
            });
        },

        _initModalCalendars = function (element) {
            element.find('.milestone-date-picker').datepicker(calendarConfig);
        },

        _initRewardModals = function (element) {
            element.on('click', '.modal-reward .dropdown-menu button', function (event) {
                event.preventDefault();

                var modal       = $(this).parents('.modal'),
                    milestone   = modal.attr('data-milestone'),
                    service     = $(this).attr('data-service'),
                    reward;

                if (_validReward(modal)) {
                    modal.find('.validation-error').removeClass('in');
                    modal.find('.validation-success').addClass('in');

                    reward = {
                        date    : modal.find('.milestone-date-picker').val(),
                        title   : _getRewardString(modal)
                    };

                    milestones[milestone].push(reward);

                    _addMilestone(milestone, reward);

                    _addEvent(service, reward);

                    modal.find('.milestone-input').val('');
                    modal.find('.milestone-date-picker').datepicker('setDate', dates[milestone]);
                } else {
                    modal.find('.validation-error').addClass('in');
                    modal.find('.validation-success').removeClass('in');
                }
            });
        },

        _initActivityModals = function (element) {
            element.on('click', '.modal-activity .dropdown-menu button', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var modal       = $(this).parents('.modal'),
                    milestone   = modal.attr('data-milestone'),
                    service     = $(this).attr('data-service'),
                    activity;

                if (_validActivity(modal)) {
                    modal.find('.validation-error').removeClass('in');
                    modal.find('.validation-success').addClass('in');

                    activity = {
                        date    : modal.find('.milestone-date-picker').val(),
                        title   : modal.find('.milestone-input').eq(0).val()
                    };

                    milestones[milestone].push(activity);

                    _addMilestone(milestone, activity);

                    _addEvent(service, activity);

                    modal.find('.milestone-input').val('');
                    modal.find('.milestone-date-picker').datepicker('setDate', dates[milestone]);
                } else {
                    modal.find('.validation-error').addClass('in');
                    modal.find('.validation-success').removeClass('in');
                }
            });
        },

        _validQuitPlan = function (element) {
            var quitPlanIsValid = true;

            element.find('#build-your-quit-plan').children('section').each(function () {
                var validSection    = true,
                    $section        = $(this),
                    validationRule  = $section.attr('data-validation'),
                    isRequired      = $section.attr('data-required') !== undefined;

                if (validationRule === undefined) {
                    return;
                }

                validSection = _validSection[validationRule]($section);

                if (!validSection && isRequired) {
                    quitPlanIsValid = false;
                }

                if (isRequired && !validSection) {
                    $section.find('.validation-error').addClass('in');
                } else if (isRequired && validSection) {
                    $section.find('.validation-error').removeClass('in');
                }
            });

            return quitPlanIsValid;
        },

        _serializeMilestone = function (milestoneData) {
            var milestoneStrings = [];

            $.each(milestoneData, function (key, value) {
                milestoneStrings.push(value.date + ' ' + value.title);
            });

            return milestoneStrings.join('<br />');
        },

        _initBuildQuitPlan = function (element) {
            var quitPlanIsValid,
                $buildQuitPlan      = element.find('#build-your-quit-plan'),
                $getQuitPlan        = element.find('#get-quit-plan'),
                $getQuitPlanHeader  = $getQuitPlan.find("#get-quit-plan-header");

            element.find('#get-my-quit-plan').on('click', function () {
                quitPlanIsValid = _validQuitPlan(element);

                if (quitPlanIsValid) {
                    $buildQuitPlan.attr("aria-hidden", true).removeClass("in");
                    $("#progress_bar").hide();
                    $getQuitPlan.attr("aria-hidden", false).addClass('in');
                    $getQuitPlanHeader.focus();
                    _scrollTo($("#get-quit-plan"));
                } else {
                    _scrollTo($('.section-error.in').eq(0));
                }

                _trackEvent({
                    'action' : 'GetQuitPlan',
                    'label'  : quitPlanIsValid ? "valid" : "invalid"
                });
            });

            element.find('#edit-my-quit-plan, #edit-my-quit-plan-bottom').on('click', function () {
                $buildQuitPlan.attr("aria-hidden", false).addClass('in');
                $getQuitPlan.attr("aria-hidden", true).removeClass("in");
            });

            element.find('#generate-pdf, #generate-pdf-bottom').on('click', function () {
                element.find("#milestones\\.24hours").val(_serializeMilestone(milestones._24HoursDate));
                element.find("#milestones\\.48hours").val(_serializeMilestone(milestones._48HoursDate));
                element.find("#milestones\\.oneWeek").val(_serializeMilestone(milestones.oneWeekDate));
                element.find("#milestones\\.twoWeeks").val(_serializeMilestone(milestones.twoWeeksDate));
                element.find("#milestones\\.oneMonth").val(_serializeMilestone(milestones.oneMonthDate));

                element.find('#build-your-quit-plan').submit();

                _trackEvent({
                    'action' : 'GetPrintablePDF'
                });
            });
        },

        _initInviteFriend = function (element) {

            var TWITTER_URL  = 'https://twitter.com/share',
                FB_URL       = 'https://www.facebook.com/dialog/share',
                FB_ID        = (window.location.host === 'smokefree-stage.icfwebservices.com') ? '386167128241977' : '117297181948684',
                width        = 575,
                height       = 400,
                left         = ($(window).width()  - width)  / 2,
                top          = ($(window).height() - height) / 2,
                share_url    = (window.location.host === 'smokefree-stage.icfwebservices.com') ? 'https://smokefree-stage.icfwebservices.com/veterans/how-to-quit/build-your-quit-plan' : 'https://www.smokefree.gov/veterans/how-to-quit/build-your-quit-plan',
                redirect_uri = (window.location.host === 'smokefree-stage.icfwebservices.com') ? 'https://smokefree-stage.icfwebservices.com/sites/all/themes/sfg/quit-plan/facebook-thanks.html' : 'https://www.smokefree.gov/sites/all/themes/sfg/quit-plan/facebook-thanks.html',
                text         = 'I’m quitting smoking. Want to become #smokefree with me?',
                windowConfig = 'status=1'
                         + ',width='  + width
                         + ',height=' + height
                         + ',top='    + top
                         + ',left='   + left;
                if (window.location.href.toString().split(window.location.host)[1] == "/build-your-quit-plan") {
                    share_url    = (window.location.host === 'smokefree-stage.icfwebservices.com') ? 'https://smokefree-stage.icfwebservices.com/build-your-quit-plan' : 'https://www.smokefree.gov/build-your-quit-plan';
                }
            element.find('#send-message').on('click', function () {
                _trackEvent({
                    'action' : 'SendMessage'
                });
            });

            element.find('.dropdown-invite-friend .btn-link, .dropdown-tell-friends-family .btn-link').on('click', function (event) {
                var url,
                    service = $(this).attr('data-service');
                if ($(this).attr('data-sharetext')) {
                    text = $(this).attr('data-sharetext');
                }
                switch (service) {
                case 'Twitter':
                    url = TWITTER_URL
                          + '?url='         + encodeURIComponent(share_url)
                          + '&text='        + encodeURIComponent(text);

                    window.open(url, 'share', windowConfig);

                    break;
                case 'Facebook':
                    url = FB_URL
                          + '?app_id='          + FB_ID
                          + '&display='         + 'popup'
                          + '&href='            + encodeURIComponent(share_url)
                          + '&redirect_uri='    + encodeURIComponent(redirect_uri);

                    window.open(url, 'share', windowConfig);

                    break;
                case 'skip':
                    var styles = {
                        backgroundColor : "#3C84A4",
                        color: "#FFF"
                    };
                    if ($(this).hasClass('tell-friends-family-skip')) {
                        $(".dropdown-toggle.btn.tell-friends-family").closest('button').css(styles);
                    }
                    else if ($(this).hasClass('invite-friend-skip')) {
                        $(".dropdown-toggle.btn.btn-invite").closest('.dropdown-toggle').css(styles);
                    }

                break;
                }

                _trackEvent({
                    'action' : 'InviteQuitBuddy',
                    'label'  : service
                });
            });

        },

        _bindChanges = function (element) {
            var $getElement;

            element.on('change', '.bind-change', function () {
                var action  = this.getAttribute('data-ga-action'),
                    label   = this.getAttribute('data-ga-label');

                $getElement = $(document.getElementById('get.' + this.id));

                if (this.checked) {
                    _trackEvent({
                        action: action,
                        label: label
                    });

                    $getElement.addClass('in').attr('aria-hidden', false);
                } else {
                    $getElement.removeClass('in').attr('aria-hidden', true);
                }

            });
        };

    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            var $buildQuitPlan = $(this.element);

            _initScrollAnchors($buildQuitPlan);
            _initMarkCalendar($buildQuitPlan);
            _initModalCalendars($buildQuitPlan);
            _initRewardModals($buildQuitPlan);
            _initActivityModals($buildQuitPlan);
            _initBuildQuitPlan($buildQuitPlan);
            _initInviteFriend($buildQuitPlan);
            _bindChanges($buildQuitPlan);
            $('input.fancy[type="checkbox"]:not(old)').click(function(e){e.stopPropagation();});
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery, window, document));

(function ($) {
    var $quitPlan = $('#quit-plan');

    $quitPlan.buildQuitPlan();
}(jQuery));
;
