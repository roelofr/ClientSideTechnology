/*
 * App: client.roelof.io
 * Author: Roelof Roos
 * (c) Roelof Roos 2015. This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
 */


var app = (function () {

    var attachEvent = function (el, event, func) {
        if ("addEventListener" in el)
            el.addEventListener(event, func, false);
        else if ("attachEvent" in el) {
            el.attachEvent("on" + event, func);
        } else {
            return false;
        }
    };

})();