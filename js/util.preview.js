/**
 * Part of Client Side Technology
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3
 */

var Everything = Everything || {};

Everything.Preview = (function(w, d) {
    'use strict';

    var previewElements = []; //jshint ignore:line

    var regexDiv = /^div$/i;
    var regexForm = /^(.*[\s])?preview\-form([\s]+.*)?$/; //jshint ignore:line

    /**
     * Finds the containers that can hold a preview form
     *
     * @returns {Array}
     */
    var getContainers = function() {
        var nodes = document.getElementsByClassName('preview-form');

        var out = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node instanceof HTMLElement && node.nodeName.match(regexDiv)) {
                out[out.length] = node;
            }
        }

        return out.length > 0 ? out : null;
    };

    var updatePreview = function(event) {
        console.log(event);
    };

    var createInput = function(type, name, appendTo, listener) {
        var container = document.createElement('div');
        var field;

        if (type === 'textarea') {
            field = d.createElement('textarea');
        } else {
            field = d.createElement('input');
            field.setAttribute('type', type);
        }

        container.setAttribute('class', 'field-container');

        field.setAttribute('class', 'field-input');
        field.setAttribute('name', name);

        field.addEventListener('keyup', listener, false);
        field.addEventListener('change', listener, false);

        container.appendChild(field);

        appendTo.appendChild(field);

        return field;
    };

    var fillContainer = function(container) {

        var box = document.createElement('div');
        var left = document.createElement('div');
        var right = document.createElement('div');

        box.className = 'preview-container';
        left.className = 'preview-segment preview-segment-left';
        right.className = 'preview-segment preview-segment-right';

        var data = {
            firstName: createInput('text', 'firstName', left, updatePreview),
            lastName: document.createElement('div'),
            age: document.createElement('div'),
        };

        box.appendChild(left);
        box.appendChild(right);

        container.appendChild(box);

        container.setAttribute('data-info', JSON.stringify(data));
    };

    return {
        createInput: createInput,
        updatePreview: updatePreview,
        fillContainer: fillContainer,
        getContainers: getContainers
    };

}());
