/**
 * Creates a namespace.
 *
 * @return
 *   The created namespace object.
 */
function namespace () {
  var a=arguments, o=null, i, j, d;

  for (i=0; i<a.length; i=i+1) {
    d=a[i].split(".");
    o=window;

    for (j=0; j<d.length; j=j+1) {
      o[d[j]]=o[d[j]] || {};
      o=o[d[j]];
    }
  }

  return o;
};
;

(function ($) {

Drupal.behaviors.tokenTree = {
  attach: function (context, settings) {
    $('table.token-tree', context).once('token-tree', function () {
      $(this).treeTable();
    });
  }
};

Drupal.behaviors.tokenDialog = {
  attach: function (context, settings) {
    $('a.token-dialog', context).once('token-dialog').click(function() {
      var url = $(this).attr('href');
      var dialog = $('<div style="display: none" class="loading">' + Drupal.t('Loading token browser...') + '</div>').appendTo('body');

      // Emulate the AJAX data sent normally so that we get the same theme.
      var data = {};
      data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
      data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;

      dialog.dialog({
        title: $(this).attr('title') || Drupal.t('Available tokens'),
        width: 700,
        close: function(event, ui) {
          dialog.remove();
        }
      });
      // Load the token tree using AJAX.
      dialog.load(
        url,
        data,
        function (responseText, textStatus, XMLHttpRequest) {
          dialog.removeClass('loading');
        }
      );
      // Prevent browser from following the link.
      return false;
    });
  }
}

Drupal.behaviors.tokenInsert = {
  attach: function (context, settings) {
    // Keep track of which textfield was last selected/focused.
    $('textarea, input[type="text"]', context).focus(function() {
      Drupal.settings.tokenFocusedField = this;
    });

    $('.token-click-insert .token-key', context).once('token-click-insert', function() {
      var newThis = $('<a href="javascript:void(0);" title="' + Drupal.t('Insert this token into your form') + '">' + $(this).html() + '</a>').click(function(){
        if (typeof Drupal.settings.tokenFocusedField == 'undefined') {
          alert(Drupal.t('First click a text field to insert your tokens into.'));
        }
        else {
          var myField = Drupal.settings.tokenFocusedField;
          var myValue = $(this).text();

          //IE support
          if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
          }

          //MOZILLA/NETSCAPE support
          else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                          + myValue
                          + myField.value.substring(endPos, myField.value.length);
          } else {
            myField.value += myValue;
          }

          $('html,body').animate({scrollTop: $(myField).offset().top}, 500);
        }
        return false;
      });
      $(this).html(newThis);
    });
  }
};

})(jQuery);
;
/* http://keith-wood.name/timeEntry.html
   Time entry for jQuery v1.5.2.
   Written by Keith Wood (kbwood{at}iinet.com.au) June 2007.
   Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.
   Please attribute the author if you use it. */
/* jshint ignore:start */
(function($){function TimeEntry(){this._disabledInputs=[];this.regional=[];this.regional['']={show24Hours:false,separator:':',ampmPrefix:'',ampmNames:['AM','PM'],spinnerTexts:['Now','Previous field','Next field','Increment','Decrement']};this._defaults={appendText:'',showSeconds:false,timeSteps:[1,1,1],initialField:0,noSeparatorEntry:false,useMouseWheel:true,defaultTime:null,minTime:null,maxTime:null,spinnerImage:'spinnerDefault.png',spinnerSize:[20,20,8],spinnerBigImage:'',spinnerBigSize:[40,40,16],spinnerIncDecOnly:false,spinnerRepeat:[500,250],beforeShow:null,beforeSetTime:null};$.extend(this._defaults,this.regional[''])}$.extend(TimeEntry.prototype,{markerClassName:'hasTimeEntry',propertyName:'timeEntry',_appendClass:'timeEntry_append',_controlClass:'timeEntry_control',_expandClass:'timeEntry_expand',setDefaults:function(a){$.extend(this._defaults,a||{});return this},_attachPlugin:function(b,c){var d=$(b);if(d.hasClass(this.markerClassName)){return}var e={options:$.extend({},this._defaults,c),input:d,_field:0,_selectedHour:0,_selectedMinute:0,_selectedSecond:0};d.data(this.propertyName,e).addClass(this.markerClassName).bind('focus.'+this.propertyName,this._doFocus).bind('blur.'+this.propertyName,this._doBlur).bind('click.'+this.propertyName,this._doClick).bind('keydown.'+this.propertyName,this._doKeyDown).bind('keypress.'+this.propertyName,this._doKeyPress).bind('paste.'+this.propertyName,function(a){setTimeout(function(){n._parseTime(e)},1)});this._optionPlugin(b,c)},_optionPlugin:function(a,b,c){a=$(a);var d=a.data(this.propertyName);if(!b||(typeof b=='string'&&c==null)){var e=b;b=(d||{}).options;return(b&&e?b[e]:b)}if(!a.hasClass(this.markerClassName)){return}b=b||{};if(typeof b=='string'){var e=b;b={};b[e]=c}var f=this._extractTime(d);$.extend(d.options,b);d._field=0;if(f){this._setTime(d,new Date(0,0,0,f[0],f[1],f[2]))}a.next('span.'+this._appendClass).remove();a.parent().find('span.'+this._controlClass).remove();if($.fn.mousewheel){a.unmousewheel()}var g=(!d.options.spinnerImage?null:$('<span class="'+this._controlClass+'" style="display: inline-block; '+'background: url(\''+d.options.spinnerImage+'\') 0 0 no-repeat; width: '+d.options.spinnerSize[0]+'px; height: '+d.options.spinnerSize[1]+'px;"></span>'));a.after(d.options.appendText?'<span class="'+this._appendClass+'">'+d.options.appendText+'</span>':'').after(g||'');if(d.options.useMouseWheel&&$.fn.mousewheel){a.mousewheel(this._doMouseWheel)}if(g){g.mousedown(this._handleSpinner).mouseup(this._endSpinner).mouseover(this._expandSpinner).mouseout(this._endSpinner).mousemove(this._describeSpinner)}},_enablePlugin:function(a){this._enableDisable(a,false)},_disablePlugin:function(a){this._enableDisable(a,true)},_enableDisable:function(b,c){var d=$.data(b,this.propertyName);if(!d){return}b.disabled=c;if(b.nextSibling&&b.nextSibling.nodeName.toLowerCase()=='span'){n._changeSpinner(d,b.nextSibling,(c?5:-1))}n._disabledInputs=$.map(n._disabledInputs,function(a){return(a==b?null:a)});if(c){n._disabledInputs.push(b)}},_isDisabledPlugin:function(a){return $.inArray(a,this._disabledInputs)>-1},_destroyPlugin:function(b){b=$(b);if(!b.hasClass(this.markerClassName)){return}b.removeClass(this.markerClassName).removeData(this.propertyName).unbind('.'+this.propertyName);if($.fn.mousewheel){b.unmousewheel()}this._disabledInputs=$.map(this._disabledInputs,function(a){return(a==b[0]?null:a)});b.siblings('.'+this._appendClass+',.'+this._controlClass).remove()},_setTimePlugin:function(a,b){var c=$.data(a,this.propertyName);if(c){if(b===null||b===''){c.input.val('')}else{this._setTime(c,b?(typeof b=='object'?new Date(b.getTime()):b):null)}}},_getTimePlugin:function(a){var b=$.data(a,this.propertyName);var c=(b?this._extractTime(b):null);return(!c?null:new Date(0,0,0,c[0],c[1],c[2]))},_getOffsetPlugin:function(a){var b=$.data(a,this.propertyName);var c=(b?this._extractTime(b):null);return(!c?0:(c[0]*3600+c[1]*60+c[2])*1000)},_doFocus:function(a){var b=(a.nodeName&&a.nodeName.toLowerCase()=='input'?a:this);if(n._lastInput==b||n._isDisabledPlugin(b)){n._focussed=false;return}var c=$.data(b,n.propertyName);n._focussed=true;n._lastInput=b;n._blurredInput=null;$.extend(c.options,($.isFunction(c.options.beforeShow)?c.options.beforeShow.apply(b,[b]):{}));n._parseTime(c);setTimeout(function(){n._showField(c)},10)},_doBlur:function(a){n._blurredInput=n._lastInput;n._lastInput=null},_doClick:function(b){var c=b.target;var d=$.data(c,n.propertyName);var e=d._field;if(!n._focussed){var f=d.options.separator.length+2;d._field=0;if(c.selectionStart!=null){for(var g=0;g<=Math.max(1,d._secondField,d._ampmField);g++){var h=(g!=d._ampmField?(g*f)+2:(d._ampmField*f)+d.options.ampmPrefix.length+d.options.ampmNames[0].length);d._field=g;if(c.selectionStart<h){break}}}else if(c.createTextRange){var i=$(b.srcElement);var j=c.createTextRange();var k=function(a){return{thin:2,medium:4,thick:6}[a]||a};var l=b.clientX+document.documentElement.scrollLeft-(i.offset().left+parseInt(k(i.css('border-left-width')),10))-j.offsetLeft;for(var g=0;g<=Math.max(1,d._secondField,d._ampmField);g++){var h=(g!=d._ampmField?(g*f)+2:(d._ampmField*f)+d.options.ampmPrefix.length+d.options.ampmNames[0].length);j.collapse();j.moveEnd('character',h);d._field=g;if(l<j.boundingWidth){break}}}}if(e!=d._field){d._lastChr=''}n._showField(d);n._focussed=false},_doKeyDown:function(a){if(a.keyCode>=48){return true}var b=$.data(a.target,n.propertyName);switch(a.keyCode){case 9:return(a.shiftKey?n._changeField(b,-1,true):n._changeField(b,+1,true));case 35:if(a.ctrlKey){n._setValue(b,'')}else{b._field=Math.max(1,b._secondField,b._ampmField);n._adjustField(b,0)}break;case 36:if(a.ctrlKey){n._setTime(b)}else{b._field=0;n._adjustField(b,0)}break;case 37:n._changeField(b,-1,false);break;case 38:n._adjustField(b,+1);break;case 39:n._changeField(b,+1,false);break;case 40:n._adjustField(b,-1);break;case 46:n._setValue(b,'');break;default:return true}return false},_doKeyPress:function(a){var b=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);if(b<' '){return true}var c=$.data(a.target,n.propertyName);n._handleKeyPress(c,b);return false},_doMouseWheel:function(a,b){if(n._isDisabledPlugin(a.target)){return}var c=$.data(a.target,n.propertyName);c.input.focus();if(!c.input.val()){n._parseTime(c)}n._adjustField(c,b);a.preventDefault()},_expandSpinner:function(b){var c=n._getSpinnerTarget(b);var d=$.data(n._getInput(c),n.propertyName);if(n._isDisabledPlugin(d.input[0])){return}if(d.options.spinnerBigImage){d._expanded=true;var e=$(c).offset();var f=null;$(c).parents().each(function(){var a=$(this);if(a.css('position')=='relative'||a.css('position')=='absolute'){f=a.offset()}return!f});$('<div class="'+n._expandClass+'" style="position: absolute; left: '+(e.left-(d.options.spinnerBigSize[0]-d.options.spinnerSize[0])/2-(f?f.left:0))+'px; top: '+(e.top-(d.options.spinnerBigSize[1]-d.options.spinnerSize[1])/2-(f?f.top:0))+'px; width: '+d.options.spinnerBigSize[0]+'px; height: '+d.options.spinnerBigSize[1]+'px; background: transparent url('+d.options.spinnerBigImage+') no-repeat 0px 0px; z-index: 10;"></div>').mousedown(n._handleSpinner).mouseup(n._endSpinner).mouseout(n._endExpand).mousemove(n._describeSpinner).insertAfter(c)}},_getInput:function(a){return $(a).siblings('.'+n.markerClassName)[0]},_describeSpinner:function(a){var b=n._getSpinnerTarget(a);var c=$.data(n._getInput(b),n.propertyName);b.title=c.options.spinnerTexts[n._getSpinnerRegion(c,a)]},_handleSpinner:function(a){var b=n._getSpinnerTarget(a);var c=n._getInput(b);if(n._isDisabledPlugin(c)){return}if(c==n._blurredInput){n._lastInput=c;n._blurredInput=null}var d=$.data(c,n.propertyName);n._doFocus(c);var e=n._getSpinnerRegion(d,a);n._changeSpinner(d,b,e);n._actionSpinner(d,e);n._timer=null;n._handlingSpinner=true;if(e>=3&&d.options.spinnerRepeat[0]){n._timer=setTimeout(function(){n._repeatSpinner(d,e)},d.options.spinnerRepeat[0]);$(b).one('mouseout',n._releaseSpinner).one('mouseup',n._releaseSpinner)}},_actionSpinner:function(a,b){if(!a.input.val()){n._parseTime(a)}switch(b){case 0:this._setTime(a);break;case 1:this._changeField(a,-1,false);break;case 2:this._changeField(a,+1,false);break;case 3:this._adjustField(a,+1);break;case 4:this._adjustField(a,-1);break}},_repeatSpinner:function(a,b){if(!n._timer){return}n._lastInput=n._blurredInput;this._actionSpinner(a,b);this._timer=setTimeout(function(){n._repeatSpinner(a,b)},a.options.spinnerRepeat[1])},_releaseSpinner:function(a){clearTimeout(n._timer);n._timer=null},_endExpand:function(a){n._timer=null;var b=n._getSpinnerTarget(a);var c=n._getInput(b);var d=$.data(c,n.propertyName);$(b).remove();d._expanded=false},_endSpinner:function(a){n._timer=null;var b=n._getSpinnerTarget(a);var c=n._getInput(b);var d=$.data(c,n.propertyName);if(!n._isDisabledPlugin(c)){n._changeSpinner(d,b,-1)}if(n._handlingSpinner){n._lastInput=n._blurredInput}if(n._lastInput&&n._handlingSpinner){n._showField(d)}n._handlingSpinner=false},_getSpinnerTarget:function(a){return a.target||a.srcElement},_getSpinnerRegion:function(a,b){var c=this._getSpinnerTarget(b);var d=$(c).offset();var e=[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop];var f=(a.options.spinnerIncDecOnly?99:b.clientX+e[0]-d.left);var g=b.clientY+e[1]-d.top;var h=a.options[a._expanded?'spinnerBigSize':'spinnerSize'];var i=(a.options.spinnerIncDecOnly?99:h[0]-1-f);var j=h[1]-1-g;if(h[2]>0&&Math.abs(f-i)<=h[2]&&Math.abs(g-j)<=h[2]){return 0}var k=Math.min(f,g,i,j);return(k==f?1:(k==i?2:(k==g?3:4)))},_changeSpinner:function(a,b,c){$(b).css('background-position','-'+((c+1)*a.options[a._expanded?'spinnerBigSize':'spinnerSize'][0])+'px 0px')},_parseTime:function(a){var b=this._extractTime(a);if(b){a._selectedHour=b[0];a._selectedMinute=b[1];a._selectedSecond=b[2]}else{var c=this._constrainTime(a);a._selectedHour=c[0];a._selectedMinute=c[1];a._selectedSecond=(a.options.showSeconds?c[2]:0)}a._secondField=(a.options.showSeconds?2:-1);a._ampmField=(a.options.show24Hours?-1:(a.options.showSeconds?3:2));a._lastChr='';a._field=Math.max(0,Math.min(Math.max(1,a._secondField,a._ampmField),a.options.initialField));if(a.input.val()!=''){this._showTime(a)}},_extractTime:function(a,b){b=b||a.input.val();var c=b.split(a.options.separator);if(a.options.separator==''&&b!=''){c[0]=b.substring(0,2);c[1]=b.substring(2,4);c[2]=b.substring(4,6)}if(c.length>=2){var d=!a.options.show24Hours&&(b.indexOf(a.options.ampmNames[0])>-1);var e=!a.options.show24Hours&&(b.indexOf(a.options.ampmNames[1])>-1);var f=parseInt(c[0],10);f=(isNaN(f)?0:f);f=((d||e)&&f==12?0:f)+(e?12:0);var g=parseInt(c[1],10);g=(isNaN(g)?0:g);var h=(c.length>=3?parseInt(c[2],10):0);h=(isNaN(h)||!a.options.showSeconds?0:h);return this._constrainTime(a,[f,g,h])}return null},_constrainTime:function(a,b){var c=(b!=null);if(!c){var d=this._determineTime(a.options.defaultTime,a)||new Date();b=[d.getHours(),d.getMinutes(),d.getSeconds()]}var e=false;for(var i=0;i<a.options.timeSteps.length;i++){if(e){b[i]=0}else if(a.options.timeSteps[i]>1){b[i]=Math.round(b[i]/a.options.timeSteps[i])*a.options.timeSteps[i];e=true}}return b},_showTime:function(a){var b=(this._formatNumber(a.options.show24Hours?a._selectedHour:((a._selectedHour+11)%12)+1)+a.options.separator+this._formatNumber(a._selectedMinute)+(a.options.showSeconds?a.options.separator+this._formatNumber(a._selectedSecond):'')+(a.options.show24Hours?'':a.options.ampmPrefix+a.options.ampmNames[(a._selectedHour<12?0:1)]));this._setValue(a,b);this._showField(a)},_showField:function(a){var b=a.input[0];if(a.input.is(':hidden')||n._lastInput!=b){return}var c=a.options.separator.length+2;var d=(a._field!=a._ampmField?(a._field*c):(a._ampmField*c)-a.options.separator.length+a.options.ampmPrefix.length);var e=d+(a._field!=a._ampmField?2:a.options.ampmNames[0].length);if(b.setSelectionRange){b.setSelectionRange(d,e)}else if(b.createTextRange){var f=b.createTextRange();f.moveStart('character',d);f.moveEnd('character',e-a.input.val().length);f.select()}if(!b.disabled){b.focus()}},_formatNumber:function(a){return(a<10?'0':'')+a},_setValue:function(a,b){if(b!=a.input.val()){a.input.val(b).trigger('change')}},_changeField:function(a,b,c){var d=(a.input.val()==''||a._field==(b==-1?0:Math.max(1,a._secondField,a._ampmField)));if(!d){a._field+=b}this._showField(a);a._lastChr='';return(d&&c)},_adjustField:function(a,b){if(a.input.val()==''){b=0}this._setTime(a,new Date(0,0,0,a._selectedHour+(a._field==0?b*a.options.timeSteps[0]:0)+(a._field==a._ampmField?b*12:0),a._selectedMinute+(a._field==1?b*a.options.timeSteps[1]:0),a._selectedSecond+(a._field==a._secondField?b*a.options.timeSteps[2]:0)))},_setTime:function(a,b){b=this._determineTime(b,a);var c=this._constrainTime(a,b?[b.getHours(),b.getMinutes(),b.getSeconds()]:null);b=new Date(0,0,0,c[0],c[1],c[2]);var b=this._normaliseTime(b);var d=this._normaliseTime(this._determineTime(a.options.minTime,a));var e=this._normaliseTime(this._determineTime(a.options.maxTime,a));if(d&&e&&d>e){if(b<d&&b>e){b=(Math.abs(b-d)<Math.abs(b-e)?d:e)}}else{b=(d&&b<d?d:(e&&b>e?e:b))}if($.isFunction(a.options.beforeSetTime)){b=a.options.beforeSetTime.apply(a.input[0],[this._getTimePlugin(a.input[0]),b,d,e])}a._selectedHour=b.getHours();a._selectedMinute=b.getMinutes();a._selectedSecond=b.getSeconds();this._showTime(a)},_determineTime:function(i,j){var k=function(a){var b=new Date();b.setTime(b.getTime()+a*1000);return b};var l=function(a){var b=n._extractTime(j,a);var c=new Date();var d=(b?b[0]:c.getHours());var e=(b?b[1]:c.getMinutes());var f=(b?b[2]:c.getSeconds());if(!b){var g=/([+-]?[0-9]+)\s*(s|S|m|M|h|H)?/g;var h=g.exec(a);while(h){switch(h[2]||'s'){case's':case'S':f+=parseInt(h[1],10);break;case'm':case'M':e+=parseInt(h[1],10);break;case'h':case'H':d+=parseInt(h[1],10);break}h=g.exec(a)}}c=new Date(0,0,10,d,e,f,0);if(/^!/.test(a)){if(c.getDate()>10){c=new Date(0,0,10,23,59,59)}else if(c.getDate()<10){c=new Date(0,0,10,0,0,0)}}return c};return(i?(typeof i=='string'?l(i):(typeof i=='number'?k(i):i)):null)},_normaliseTime:function(a){if(!a){return null}a.setFullYear(1900);a.setMonth(0);a.setDate(0);return a},_handleKeyPress:function(a,b){if(b==a.options.separator){this._changeField(a,+1,false)}else if(b>='0'&&b<='9'){var c=parseInt(b,10);var d=parseInt(a._lastChr+b,10);var e=(a._field!=0?a._selectedHour:(a.options.show24Hours?(d<24?d:c):(d>=1&&d<=12?d:(c>0?c:a._selectedHour))%12+(a._selectedHour>=12?12:0)));var f=(a._field!=1?a._selectedMinute:(d<60?d:c));var g=(a._field!=a._secondField?a._selectedSecond:(d<60?d:c));var h=this._constrainTime(a,[e,f,g]);this._setTime(a,new Date(0,0,0,h[0],h[1],h[2]));if(a.options.noSeparatorEntry&&a._lastChr){this._changeField(a,+1,false)}else{a._lastChr=b}}else if(!a.options.show24Hours){b=b.toLowerCase();if((b==a.options.ampmNames[0].substring(0,1).toLowerCase()&&a._selectedHour>=12)||(b==a.options.ampmNames[1].substring(0,1).toLowerCase()&&a._selectedHour<12)){var i=a._field;a._field=a._ampmField;this._adjustField(a,+1);a._field=i;this._showField(a)}}}});var m=['getOffset','getTime','isDisabled'];function isNotChained(a,b){if(a=='option'&&(b.length==0||(b.length==1&&typeof b[0]=='string'))){return true}return $.inArray(a,m)>-1}$.fn.timeEntry=function(b){var c=Array.prototype.slice.call(arguments,1);if(isNotChained(b,c)){return n['_'+b+'Plugin'].apply(n,[this[0]].concat(c))}return this.each(function(){if(typeof b=='string'){if(!n['_'+b+'Plugin']){throw'Unknown command: '+b;}n['_'+b+'Plugin'].apply(n,[this].concat(c))}else{var a=($.fn.metadata?$(this).metadata():{});n._attachPlugin(this,$.extend({},a,b||{}))}})};var n=$.timeEntry=new TimeEntry()})(jQuery);
/* jshint ignore:end */;
/*
    http://www.JSON.org/json2.js
    2009-09-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
;
/*
 * debug - v0.3 - 6/8/2009
 * http://benalman.com/projects/javascript-debug-console-log/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Licensed under the MIT license
 * http://benalman.com/about/license/
 *
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
window.debug=(function(){var c=this,e=Array.prototype.slice,b=c.console,i={},f,g,j=9,d=["error","warn","info","debug","log"],m="assert clear count dir dirxml group groupEnd profile profileEnd time timeEnd trace".split(" "),k=m.length,a=[];while(--k>=0){(function(n){i[n]=function(){j!==0&&b&&b[n]&&b[n].apply(b,arguments)}})(m[k])}k=d.length;while(--k>=0){(function(n,o){i[o]=function(){var q=e.call(arguments),p=[o].concat(q);a.push(p);h(p);if(!b||!l(n)){return}b.firebug?b[o].apply(c,q):b[o]?b[o](q):b.log(q)}})(k,d[k])}function h(n){if(f&&(g||!b||!b.log)){f.apply(c,n)}}i.setLevel=function(n){j=typeof n==="number"?n:9};function l(n){return j>0?j>n:d.length+j<=n}i.setCallback=function(){var o=e.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){h(a[p++])}};return i})();;

(function ($) {

/**
 * This script transforms a set of fieldsets into a stack of vertical
 * tabs. Another tab pane can be selected by clicking on the respective
 * tab.
 *
 * Each tab may have a summary which can be updated by another
 * script. For that to work, each fieldset has an associated
 * 'verticalTabCallback' (with jQuery.data() attached to the fieldset),
 * which is called every time the user performs an update to a form
 * element inside the tab pane.
 */
Drupal.behaviors.verticalTabs = {
  attach: function (context) {
    $('.vertical-tabs-panes', context).once('vertical-tabs', function () {
      var focusID = $(':hidden.vertical-tabs-active-tab', this).val();
      var tab_focus;

      // Check if there are some fieldsets that can be converted to vertical-tabs
      var $fieldsets = $('> fieldset', this);
      if ($fieldsets.length == 0) {
        return;
      }

      // Create the tab column.
      var tab_list = $('<ul class="vertical-tabs-list"></ul>');
      $(this).wrap('<div class="vertical-tabs clearfix"></div>').before(tab_list);

      // Transform each fieldset into a tab.
      $fieldsets.each(function () {
        var vertical_tab = new Drupal.verticalTab({
          title: $('> legend', this).text(),
          fieldset: $(this)
        });
        tab_list.append(vertical_tab.item);
        $(this)
          .removeClass('collapsible collapsed')
          .addClass('vertical-tabs-pane')
          .data('verticalTab', vertical_tab);
        if (this.id == focusID) {
          tab_focus = $(this);
        }
      });

      $('> li:first', tab_list).addClass('first');
      $('> li:last', tab_list).addClass('last');

      if (!tab_focus) {
        // If the current URL has a fragment and one of the tabs contains an
        // element that matches the URL fragment, activate that tab.
        if (window.location.hash && $(this).find(window.location.hash).length) {
          tab_focus = $(this).find(window.location.hash).closest('.vertical-tabs-pane');
        }
        else {
          tab_focus = $('> .vertical-tabs-pane:first', this);
        }
      }
      if (tab_focus.length) {
        tab_focus.data('verticalTab').focus();
      }
    });
  }
};

/**
 * The vertical tab object represents a single tab within a tab group.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 *   - fieldset: The jQuery object of the fieldset that is the tab pane.
 */
Drupal.verticalTab = function (settings) {
  var self = this;
  $.extend(this, settings, Drupal.theme('verticalTab', settings));

  this.link.click(function () {
    self.focus();
    return false;
  });

  // Keyboard events added:
  // Pressing the Enter key will open the tab pane.
  this.link.keydown(function(event) {
    if (event.keyCode == 13) {
      self.focus();
      // Set focus on the first input field of the visible fieldset/tab pane.
      $("fieldset.vertical-tabs-pane :input:visible:enabled:first").focus();
      return false;
    }
  });

  this.fieldset
    .bind('summaryUpdated', function () {
      self.updateSummary();
    })
    .trigger('summaryUpdated');
};

Drupal.verticalTab.prototype = {
  /**
   * Displays the tab's content pane.
   */
  focus: function () {
    this.fieldset
      .siblings('fieldset.vertical-tabs-pane')
        .each(function () {
          var tab = $(this).data('verticalTab');
          tab.fieldset.hide();
          tab.item.removeClass('selected');
        })
        .end()
      .show()
      .siblings(':hidden.vertical-tabs-active-tab')
        .val(this.fieldset.attr('id'));
    this.item.addClass('selected');
    // Mark the active tab for screen readers.
    $('#active-vertical-tab').remove();
    this.link.append('<span id="active-vertical-tab" class="element-invisible">' + Drupal.t('(active tab)') + '</span>');
  },

  /**
   * Updates the tab's summary.
   */
  updateSummary: function () {
    this.summary.html(this.fieldset.drupalGetSummary());
  },

  /**
   * Shows a vertical tab pane.
   */
  tabShow: function () {
    // Display the tab.
    this.item.show();
    // Show the vertical tabs.
    this.item.closest('.vertical-tabs').show();
    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.vertical-tab-button').removeClass('first')
      .filter(':visible:first').addClass('first');
    // Display the fieldset.
    this.fieldset.removeClass('vertical-tab-hidden').show();
    // Focus this tab.
    this.focus();
    return this;
  },

  /**
   * Hides a vertical tab pane.
   */
  tabHide: function () {
    // Hide this tab.
    this.item.hide();
    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.vertical-tab-button').removeClass('first')
      .filter(':visible:first').addClass('first');
    // Hide the fieldset.
    this.fieldset.addClass('vertical-tab-hidden').hide();
    // Focus the first visible tab (if there is one).
    var $firstTab = this.fieldset.siblings('.vertical-tabs-pane:not(.vertical-tab-hidden):first');
    if ($firstTab.length) {
      $firstTab.data('verticalTab').focus();
    }
    // Hide the vertical tabs (if no tabs remain).
    else {
      this.item.closest('.vertical-tabs').hide();
    }
    return this;
  }
};

/**
 * Theme function for a vertical tab.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 * @return
 *   This function has to return an object with at least these keys:
 *   - item: The root tab jQuery element
 *   - link: The anchor tag that acts as the clickable area of the tab
 *       (jQuery version)
 *   - summary: The jQuery element that contains the tab summary
 */
Drupal.theme.prototype.verticalTab = function (settings) {
  var tab = {};
  tab.item = $('<li class="vertical-tab-button" tabindex="-1"></li>')
    .append(tab.link = $('<a href="#"></a>')
      .append(tab.title = $('<strong></strong>').text(settings.title))
      .append(tab.summary = $('<span class="summary"></span>')
    )
  );
  return tab;
};

})(jQuery);
;
(function ($) {

/**
 * The base States namespace.
 *
 * Having the local states variable allows us to use the States namespace
 * without having to always declare "Drupal.states".
 */
var states = Drupal.states = {
  // An array of functions that should be postponed.
  postponed: []
};

/**
 * Attaches the states.
 */
Drupal.behaviors.states = {
  attach: function (context, settings) {
    var $context = $(context);
    for (var selector in settings.states) {
      for (var state in settings.states[selector]) {
        new states.Dependent({
          element: $context.find(selector),
          state: states.State.sanitize(state),
          constraints: settings.states[selector][state]
        });
      }
    }

    // Execute all postponed functions now.
    while (states.postponed.length) {
      (states.postponed.shift())();
    }
  }
};

/**
 * Object representing an element that depends on other elements.
 *
 * @param args
 *   Object with the following keys (all of which are required):
 *   - element: A jQuery object of the dependent element
 *   - state: A State object describing the state that is dependent
 *   - constraints: An object with dependency specifications. Lists all elements
 *     that this element depends on. It can be nested and can contain arbitrary
 *     AND and OR clauses.
 */
states.Dependent = function (args) {
  $.extend(this, { values: {}, oldValue: null }, args);

  this.dependees = this.getDependees();
  for (var selector in this.dependees) {
    this.initializeDependee(selector, this.dependees[selector]);
  }
};

/**
 * Comparison functions for comparing the value of an element with the
 * specification from the dependency settings. If the object type can't be
 * found in this list, the === operator is used by default.
 */
states.Dependent.comparisons = {
  'RegExp': function (reference, value) {
    return reference.test(value);
  },
  'Function': function (reference, value) {
    // The "reference" variable is a comparison function.
    return reference(value);
  },
  'Number': function (reference, value) {
    // If "reference" is a number and "value" is a string, then cast reference
    // as a string before applying the strict comparison in compare(). Otherwise
    // numeric keys in the form's #states array fail to match string values
    // returned from jQuery's val().
    return (typeof value === 'string') ? compare(reference.toString(), value) : compare(reference, value);
  }
};

states.Dependent.prototype = {
  /**
   * Initializes one of the elements this dependent depends on.
   *
   * @param selector
   *   The CSS selector describing the dependee.
   * @param dependeeStates
   *   The list of states that have to be monitored for tracking the
   *   dependee's compliance status.
   */
  initializeDependee: function (selector, dependeeStates) {
    var state;

    // Cache for the states of this dependee.
    this.values[selector] = {};

    for (var i in dependeeStates) {
      if (dependeeStates.hasOwnProperty(i)) {
        state = dependeeStates[i];
        // Make sure we're not initializing this selector/state combination twice.
        if ($.inArray(state, dependeeStates) === -1) {
          continue;
        }

        state = states.State.sanitize(state);

        // Initialize the value of this state.
        this.values[selector][state.name] = null;

        // Monitor state changes of the specified state for this dependee.
        $(selector).bind('state:' + state, $.proxy(function (e) {
          this.update(selector, state, e.value);
        }, this));

        // Make sure the event we just bound ourselves to is actually fired.
        new states.Trigger({ selector: selector, state: state });
      }
    }
  },

  /**
   * Compares a value with a reference value.
   *
   * @param reference
   *   The value used for reference.
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   *
   * @return
   *   true or false.
   */
  compare: function (reference, selector, state) {
    var value = this.values[selector][state.name];
    if (reference.constructor.name in states.Dependent.comparisons) {
      // Use a custom compare function for certain reference value types.
      return states.Dependent.comparisons[reference.constructor.name](reference, value);
    }
    else {
      // Do a plain comparison otherwise.
      return compare(reference, value);
    }
  },

  /**
   * Update the value of a dependee's state.
   *
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   * @param value
   *   The new value for the dependee's updated state.
   */
  update: function (selector, state, value) {
    // Only act when the 'new' value is actually new.
    if (value !== this.values[selector][state.name]) {
      this.values[selector][state.name] = value;
      this.reevaluate();
    }
  },

  /**
   * Triggers change events in case a state changed.
   */
  reevaluate: function () {
    // Check whether any constraint for this dependent state is satisifed.
    var value = this.verifyConstraints(this.constraints);

    // Only invoke a state change event when the value actually changed.
    if (value !== this.oldValue) {
      // Store the new value so that we can compare later whether the value
      // actually changed.
      this.oldValue = value;

      // Normalize the value to match the normalized state name.
      value = invert(value, this.state.invert);

      // By adding "trigger: true", we ensure that state changes don't go into
      // infinite loops.
      this.element.trigger({ type: 'state:' + this.state, value: value, trigger: true });
    }
  },

  /**
   * Evaluates child constraints to determine if a constraint is satisfied.
   *
   * @param constraints
   *   A constraint object or an array of constraints.
   * @param selector
   *   The selector for these constraints. If undefined, there isn't yet a
   *   selector that these constraints apply to. In that case, the keys of the
   *   object are interpreted as the selector if encountered.
   *
   * @return
   *   true or false, depending on whether these constraints are satisfied.
   */
  verifyConstraints: function(constraints, selector) {
    var result;
    if ($.isArray(constraints)) {
      // This constraint is an array (OR or XOR).
      var hasXor = $.inArray('xor', constraints) === -1;
      for (var i = 0, len = constraints.length; i < len; i++) {
        if (constraints[i] != 'xor') {
          var constraint = this.checkConstraints(constraints[i], selector, i);
          // Return if this is OR and we have a satisfied constraint or if this
          // is XOR and we have a second satisfied constraint.
          if (constraint && (hasXor || result)) {
            return hasXor;
          }
          result = result || constraint;
        }
      }
    }
    // Make sure we don't try to iterate over things other than objects. This
    // shouldn't normally occur, but in case the condition definition is bogus,
    // we don't want to end up with an infinite loop.
    else if ($.isPlainObject(constraints)) {
      // This constraint is an object (AND).
      for (var n in constraints) {
        if (constraints.hasOwnProperty(n)) {
          result = ternary(result, this.checkConstraints(constraints[n], selector, n));
          // False and anything else will evaluate to false, so return when any
          // false condition is found.
          if (result === false) { return false; }
        }
      }
    }
    return result;
  },

  /**
   * Checks whether the value matches the requirements for this constraint.
   *
   * @param value
   *   Either the value of a state or an array/object of constraints. In the
   *   latter case, resolving the constraint continues.
   * @param selector
   *   The selector for this constraint. If undefined, there isn't yet a
   *   selector that this constraint applies to. In that case, the state key is
   *   propagates to a selector and resolving continues.
   * @param state
   *   The state to check for this constraint. If undefined, resolving
   *   continues.
   *   If both selector and state aren't undefined and valid non-numeric
   *   strings, a lookup for the actual value of that selector's state is
   *   performed. This parameter is not a State object but a pristine state
   *   string.
   *
   * @return
   *   true or false, depending on whether this constraint is satisfied.
   */
  checkConstraints: function(value, selector, state) {
    // Normalize the last parameter. If it's non-numeric, we treat it either as
    // a selector (in case there isn't one yet) or as a trigger/state.
    if (typeof state !== 'string' || (/[0-9]/).test(state[0])) {
      state = null;
    }
    else if (typeof selector === 'undefined') {
      // Propagate the state to the selector when there isn't one yet.
      selector = state;
      state = null;
    }

    if (state !== null) {
      // constraints is the actual constraints of an element to check for.
      state = states.State.sanitize(state);
      return invert(this.compare(value, selector, state), state.invert);
    }
    else {
      // Resolve this constraint as an AND/OR operator.
      return this.verifyConstraints(value, selector);
    }
  },

  /**
   * Gathers information about all required triggers.
   */
  getDependees: function() {
    var cache = {};
    // Swivel the lookup function so that we can record all available selector-
    // state combinations for initialization.
    var _compare = this.compare;
    this.compare = function(reference, selector, state) {
      (cache[selector] || (cache[selector] = [])).push(state.name);
      // Return nothing (=== undefined) so that the constraint loops are not
      // broken.
    };

    // This call doesn't actually verify anything but uses the resolving
    // mechanism to go through the constraints array, trying to look up each
    // value. Since we swivelled the compare function, this comparison returns
    // undefined and lookup continues until the very end. Instead of lookup up
    // the value, we record that combination of selector and state so that we
    // can initialize all triggers.
    this.verifyConstraints(this.constraints);
    // Restore the original function.
    this.compare = _compare;

    return cache;
  }
};

states.Trigger = function (args) {
  $.extend(this, args);

  if (this.state in states.Trigger.states) {
    this.element = $(this.selector);

    // Only call the trigger initializer when it wasn't yet attached to this
    // element. Otherwise we'd end up with duplicate events.
    if (!this.element.data('trigger:' + this.state)) {
      this.initialize();
    }
  }
};

states.Trigger.prototype = {
  initialize: function () {
    var trigger = states.Trigger.states[this.state];

    if (typeof trigger == 'function') {
      // We have a custom trigger initialization function.
      trigger.call(window, this.element);
    }
    else {
      for (var event in trigger) {
        if (trigger.hasOwnProperty(event)) {
          this.defaultTrigger(event, trigger[event]);
        }
      }
    }

    // Mark this trigger as initialized for this element.
    this.element.data('trigger:' + this.state, true);
  },

  defaultTrigger: function (event, valueFn) {
    var oldValue = valueFn.call(this.element);

    // Attach the event callback.
    this.element.bind(event, $.proxy(function (e) {
      var value = valueFn.call(this.element, e);
      // Only trigger the event if the value has actually changed.
      if (oldValue !== value) {
        this.element.trigger({ type: 'state:' + this.state, value: value, oldValue: oldValue });
        oldValue = value;
      }
    }, this));

    states.postponed.push($.proxy(function () {
      // Trigger the event once for initialization purposes.
      this.element.trigger({ type: 'state:' + this.state, value: oldValue, oldValue: null });
    }, this));
  }
};

/**
 * This list of states contains functions that are used to monitor the state
 * of an element. Whenever an element depends on the state of another element,
 * one of these trigger functions is added to the dependee so that the
 * dependent element can be updated.
 */
states.Trigger.states = {
  // 'empty' describes the state to be monitored
  empty: {
    // 'keyup' is the (native DOM) event that we watch for.
    'keyup': function () {
      // The function associated to that trigger returns the new value for the
      // state.
      return this.val() == '';
    }
  },

  checked: {
    'change': function () {
      return this.is(':checked');
    }
  },

  // For radio buttons, only return the value if the radio button is selected.
  value: {
    'keyup': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    },
    'change': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    }
  },

  collapsed: {
    'collapsed': function(e) {
      return (typeof e !== 'undefined' && 'value' in e) ? e.value : this.is('.collapsed');
    }
  }
};


/**
 * A state object is used for describing the state and performing aliasing.
 */
states.State = function(state) {
  // We may need the original unresolved name later.
  this.pristine = this.name = state;

  // Normalize the state name.
  while (true) {
    // Iteratively remove exclamation marks and invert the value.
    while (this.name.charAt(0) == '!') {
      this.name = this.name.substring(1);
      this.invert = !this.invert;
    }

    // Replace the state with its normalized name.
    if (this.name in states.State.aliases) {
      this.name = states.State.aliases[this.name];
    }
    else {
      break;
    }
  }
};

/**
 * Creates a new State object by sanitizing the passed value.
 */
states.State.sanitize = function (state) {
  if (state instanceof states.State) {
    return state;
  }
  else {
    return new states.State(state);
  }
};

/**
 * This list of aliases is used to normalize states and associates negated names
 * with their respective inverse state.
 */
states.State.aliases = {
  'enabled': '!disabled',
  'invisible': '!visible',
  'invalid': '!valid',
  'untouched': '!touched',
  'optional': '!required',
  'filled': '!empty',
  'unchecked': '!checked',
  'irrelevant': '!relevant',
  'expanded': '!collapsed',
  'readwrite': '!readonly'
};

states.State.prototype = {
  invert: false,

  /**
   * Ensures that just using the state object returns the name.
   */
  toString: function() {
    return this.name;
  }
};

/**
 * Global state change handlers. These are bound to "document" to cover all
 * elements whose state changes. Events sent to elements within the page
 * bubble up to these handlers. We use this system so that themes and modules
 * can override these state change handlers for particular parts of a page.
 */
$(document).bind('state:disabled', function(e) {
  // Only act when this change was triggered by a dependency and not by the
  // element monitoring itself.
  if (e.trigger) {
    $(e.target)
      .attr('disabled', e.value)
        .closest('.form-item, .form-submit, .form-wrapper').toggleClass('form-disabled', e.value)
        .find('select, input, textarea').attr('disabled', e.value);

    // Note: WebKit nightlies don't reflect that change correctly.
    // See https://bugs.webkit.org/show_bug.cgi?id=23789
  }
});

$(document).bind('state:required', function(e) {
  if (e.trigger) {
    if (e.value) {
      var $label = $(e.target).closest('.form-item, .form-wrapper').find('label');
      // Avoids duplicate required markers on initialization.
      if (!$label.find('.form-required').length) {
        $label.append('<span class="form-required">*</span>');
      }
    }
    else {
      $(e.target).closest('.form-item, .form-wrapper').find('label .form-required').remove();
    }
  }
});

$(document).bind('state:visible', function(e) {
  if (e.trigger) {
      $(e.target).closest('.form-item, .form-submit, .form-wrapper').toggle(e.value);
  }
});

$(document).bind('state:checked', function(e) {
  if (e.trigger) {
    $(e.target).attr('checked', e.value);
  }
});

$(document).bind('state:collapsed', function(e) {
  if (e.trigger) {
    if ($(e.target).is('.collapsed') !== e.value) {
      $('> legend a', e.target).click();
    }
  }
});

/**
 * These are helper functions implementing addition "operators" and don't
 * implement any logic that is particular to states.
 */

// Bitwise AND with a third undefined state.
function ternary (a, b) {
  return typeof a === 'undefined' ? b : (typeof b === 'undefined' ? a : a && b);
}

// Inverts a (if it's not undefined) when invert is true.
function invert (a, invert) {
  return (invert && typeof a !== 'undefined') ? !a : a;
}

// Compares two values while ignoring undefined values.
function compare (a, b) {
  return (a === b) ? (typeof a === 'undefined' ? a : true) : (typeof a === 'undefined' || typeof b === 'undefined');
}

})(jQuery);
;
