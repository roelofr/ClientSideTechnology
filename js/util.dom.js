// jshint ignore:start
/**
 * Part of Client Side Technology
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3
 */

(function() {
    'use strict';

    var util = util || {};

    util.domCollection = function(elements) {
        var _contents = new Array();
    };

    util.domCollection.prototype.add = function(elements, noDoubles) {
        if (typeof elements !== 'object') {
            return;
        }

        noDoubles = noDoubles === false ? false : true;

        if (elements.length == undefined) {
            if (noDoubles && this.contains(elements)) {
                return;
            }

            this._contents[this._contents.length] = elements;
            return;
        }
        for (var el in elements) {
            if (elements.hasOwnProperty(el)) {
                if (noDoubles && this.contains(elements[el])) {
                    continue;
                }
                this._contents[_this.contents.length] = elements[el];
            }
        }
    };

    util.domCollection.prototype.contains = function(element) {
        for (var x in this._contents) {
            if (this._contents.hasOwnProperty(x) &&
                this._contents[x] === element) {
                return true;
            }
        }

        return false;
    };

    util.domCollection.prototype.filterType = function(type) {
        if (!type || type.length == 0) {
            this._contents = [];
        }

        // Is this an array?
        if (type.length !== undefined && typeof type === 'object') {
            var reserve = this._contents;
            this._contents.length = 0;
            for (var i = 0; i < type.length; i++) {
                this.add();
            }
        }

        this._contents = util.dom.filter('class', filter);
    };

    util.dom = (function() {

        var filterByClassName = function(elements, className) {

        };

        var filterByID = function(elements, id) {

        };

        var filterByType = function(elements, type) {

        };

    })();
}());

// jshint ignore:end
