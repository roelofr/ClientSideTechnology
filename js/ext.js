(function () {
    'use strict';

    Date.prototype.format = function (fmt) {
        function pad(n, minLength) {
            var str = String(n);
            if (str.length >= minLength) {
                return str;
            }

            str = "0".repeat(minLength - str.length) + str;
            return str;
        }
        fmt = fmt.replace('%ms', this.getMilliseconds());
        fmt = fmt.replace('%s', this.getSeconds());
        fmt = fmt.replace('%m', pad(this.getMinutes(), 2));
        fmt = fmt.replace('%h', pad(this.getHours(), 2));
        fmt = fmt.replace('%d', this.getDate());
        fmt = fmt.replace('%M', this.getMonth() + 1);
        fmt = fmt.replace('%Y', this.getFullYear());
        return fmt;
    };

    String.prototype.template = function (args) {
        var str = this,
            k;
        for (k in args) {
            if (args.hasOwnProperty(k)) {
                str = str.replace(
                    new RegExp('\\{\\{ ' + k + ' \\}\\}', 'g'),
                    args[k]
                );
            }
        }
        return str;
    };

    Array.prototype.remove = function (what) {
        var i;
        if (this.indexOf(what) === -1) {
            return this;
        }

        do {
            i = this.indexOf(what);
            this.splice(i, 1);
        } while (i !== null);

        return this;
    };

    Node.prototype.remove = Node.prototype.remove || function () {
        this.parentNode.removeChild(this);
    };

    Node.prototype.removeAll = function () {
        while (this.hasChildNodes()) {
            this.removeChild(this.lastChild);
        }
    };

    HTMLCollection.prototype.toArray = function () {
        return Array.prototype.slice.call(this);
    };

    Object.prototype.merge = function (obj1, obj2) {
        var k, out;
        if (obj2 === undefined) {
            for (k in obj1) {
                if (obj1.hasOwnProperty(k)) {
                    this[k] = obj1[k];
                }

            }
            return this;
        }
        out = {};
        out.merge(obj1);
        out.merge(obj2);
        return out;

    };

    if (!window.indexedDB && window.mozIndexedDB) {
        window.indexedDB = window.mozIndexedDB;
    } else if (!window.indexedDB && window.webkitIndexedDB) {
        window.indexedDB = window.webkitIndexedDB;
    } else if (!window.indexedDB && window.msIndexedDB) {
        window.indexedDB = window.msIndexedDB;
    }

    if (!window.IDBTransaction && window.webkitIDBTransaction) {
        window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
    } else if (!window.IDBTransaction && window.msIDBTransaction) {
        window.IDBTransaction = window.msIDBTransaction;
        window.IDBKeyRange = window.msIDBKeyRange;
    }

    if (!window.jQuery) {
        // Who /needs/ jQuery anyway?
        window.$ = function () {
            return window.document.querySelector.apply(window.document, arguments);
        };
    }

}());
