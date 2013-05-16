/*
 * Title Caps
 *
 * Created CommonJS module By Julia Jacobs - http://html5devgal.wordpress.com - 16 May
 * Ported to JavaScript By John Resig - http://ejohn.org/- 21 May 2008
 * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
 * License: http://www.opensource.org/licenses/mit-license.php
 */

(function () {
    "use strict";
    var small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
    var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

    function lower (word) {
        return word.toLowerCase ();
    }

    function upper (word) {
        return word.substr (0, 1).toUpperCase () + word.substr (1);
    }

    function caps (match) {
        return (/[A-Za-z]\.[A-Za-z]/).test (match) ? match : upper (match);
    }

    function replacePunct(all, punct, word) {
        return punct + upper (word);
    }

    exports.titlecaps = function (title) {
        var parts = [], split = /[:.;?!] |(?: |^)["Ō]/g, index = 0;

        while (true) {
            var m = split.exec (title);

            parts.push (title.substring (index, m ? m.index : title.length)
                            .replace (/\b([A-Za-z][a-z.'Ō]*)\b/g, caps)
                            .replace (new RegExp ("\\b" + small + "\\b", "ig"), lower)
                            .replace (new RegExp ("^" + punct + small + "\\b", "ig"), replacePunct)
                            .replace (new RegExp ("\\b" + small + punct + "$", "ig"), upper));

            index = split.lastIndex;

            if (m) {
                parts.push (m[0]);
            }
            else {
                break;
            }
        }

        return parts.join ("").replace (/ V(s?)\. /ig, " v$1. ")
            .replace (/(['Ō])S\b/ig, "$1s")
            .replace (/\b(AT&T|Q&A)\b/ig, function (all) {
            return all.toUpperCase ();
        });
    };

} ());
