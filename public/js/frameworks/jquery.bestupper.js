
/* Copyright (c) 2016 Mustafa OZCAN (http://www.mustafaozcan.net)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
* Version: 2.0
* Requires: jQuery 2.x
*/
(function ($) {
    $.fn.bestupper = function (settings) {
        var defaults = {
            ln: 'en', // language : tr for Turkish or en for English
            clear: true,//if it is true clear whitespace on blur event
            nospace: false //if it is true prevent enter space char
        }, settings = $.extend({}, defaults, settings);
        this.each(function () {
            var $this = $(this);
            if ($this.is('textarea') || $this.is('input:text')) { // check element type
                $this.keypress(function (e) {
                    var pressedKey = e.charCode == undefined ? e.keyCode : e.charCode;
                    var str = String.fromCharCode(pressedKey);
                    var maxLength = $this.attr('maxlength');
                    var actualLength = $this.val().length;
                    var startpos = this.selectionStart;
                    var endpos = this.selectionEnd;

                    if (settings.nospace && pressedKey == 32) { return false; }

                    if (maxLength > -1 && actualLength == maxLength) //Check maxlength
                    {
                        if (endpos - startpos > 0) {
                            if (!isInactive(pressedKey, e)) {
                                this.value = this.value.substr(0, startpos) + this.value.substr(endpos);
                                this.setSelectionRange(startpos, startpos);
                            }
                        }
                        else {
                            if (isInactive(pressedKey, e)) return;
                            else return false;
                        }
                    }


                    if (pressedKey < 97 || pressedKey > 122) {
                        if (settings.ln == 'en' || !isTRChar(pressedKey))
                            return;
                    }
                    if (settings.ln == 'tr' && pressedKey == 105)
                        str = '\u0130'; // for Turkish lowercase - uppercase 'i' because lowercase 'i' is not equal to uppercase 'I'
                    if (isIE()) { //IE > 9
                        this.value = this.value.substr(0, startpos) + str.toUpperCase() + this.value.substr(endpos);
                        this.setSelectionRange(startpos + 1, startpos + 1);
                        return false;
                    }
                    else { //FF or Google Chrome
                        this.value = this.value.substr(0, startpos) + str.toUpperCase() + this.value.substr(endpos);
                        this.setSelectionRange(startpos + 1, startpos + 1);
                        return false;
                    }

                });
                if (settings.clear) {
                    $this.blur(function (e) {
                        var actualLength = $this.val().length;
                        var maxLength = $this.attr('maxlength');
                        if (maxLength > -1 && actualLength >= maxLength) this.value = this.value.substr(0, maxLength);

                        if (settings.ln == 'tr')
                            this.value = this.value.replace(/i/g, "\u0130"); //Turkish 'i'
                        this.value = this.value.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ").toUpperCase(); // clean whitespaces
                    });
                }
            }
        });
    };

    function isTRChar(key) {
        var trchar = [231, 246, 252, 287, 305, 351];
        for (var i = 0; i < trchar.length; i++) {
            if (trchar[i] == key)
                return true;
        }
        return false;
    }

    function isInactive(key, e) {
        if (key == 0) key = e.keyCode;
        var ArrowAndDelChar = [8, 9, 37, 38, 39, 40, 45, 46];
        for (var i = 0; i < ArrowAndDelChar.length; i++) {
            if (ArrowAndDelChar[i] == key)
                return true;
        }
        return false;
    }

    function isIE() {
        return navigator.userAgent.match(/MSIE ([0-9]+)\./);
    }

})(jQuery);
