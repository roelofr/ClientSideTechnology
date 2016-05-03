/*
 * App: client.roelof.io
 * Author: Roelof Roos
 * (c) Roelof Roos 2015. This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
 */

// Utilites for ajax requests and DOM targetting

var util = util || {};

/**
 * Ajax requests librarie
 * @type Function
 */
util.ajax = (function () {

    var createAjax = function () {
        if ("XMLHttpRequest" in window)
            return new XMLHttpRequest();
        else if ("InternetExplorer" in window)
            return new InternetExplorer();
        else
            return false;
    };

    var basicRequest = function (url, method, postdata, callback) {
        var req = createAjax();
        if (!req)
            return false;

        req.open(url, method);
        req.setRequestHeader("X-RequestType", "AJAX");

        req.onreadystatechange = function (event) {
            if (req.state === 4)
                callback(decypher(event.data));
        };

        if (method === "POST")
            req.send(postdata);

        return true;
    };

    var decypher = function (data) {
        if (!data || data === "" || data === null)
            return null;

        var newData = String(data);

        try {
            var dataOut = JSON.parse(newData);
            return dataOut;
        } catch (e) {
            // It's not JSON
        }

        return newData;

    }

    var getRequest = function (url, callback) {
        if (basicRequest(url, "GET", null, callback))
            return true;
        return false;
    }

    var postRequest = function (url, data, callback) {
        if (basicRequest(url, "POST", data, callback))
            return true;
        return false;
    }

    return {
        get: getRequest,
        post: postRequest
    }
})();

// Dom targetting has been moved to util.dom.js