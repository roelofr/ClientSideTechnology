/*
 * App: client.roelof.io
 * Author: Roelof Roos
 * (c) Roelof Roos 2015. This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
 */

var Everything = Everything || {};
Everything.Preview = (function () {

    var previewElements = [];

    var regexDiv = /^div$/i;
    var regexForm = /^(.*[\s])?preview\-form([\s]+.*)?$/;

    /**
     * Finds the containers that can hold a preview form
     * @returns {Array}
     */
    var getContainers = function () {
        var nodes = document.getElementsByClassName("preview-form");

        var out = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node instanceof HTMLElement && node.nodeName.match(regexDiv))
                out[out.length] = node;
        }

        return out.length > 0 ? out : null;
    };

    var updatePreview = function (event) {
        console.log(event);
    }

    var createInput = function (type, name, appendTo, listener) {
        var container = document.createElement("div");
        var field = document.createElement(type === "textarea" ? "textarea" : "input");

        container.setAttribute("class", "field-container");

        field.setAttribute("class", "field-input");
        field.setAttribute("name", name);
        if (type !== "textarea")
            field.setAttribute("type", type);

        if ("addEventListener" in field) {
            field.addEventListener("keyup", listener, false);
            field.addEventListener("change", listener, false);
        } else if ("attachEvent" in field) {
            field.attachEvent("onkeyup", listener);
            field.attachEvent("onchange", listener);
        }

        container.appendChild(field);

        appendTo.appendChild(field);

        return field;
    };

    var fillContainer = function (container) {

        var box = document.createElement("div");
        var left = document.createElement("div");
        var right = document.createElement("div");

        box.className = "preview-container";
        left.className = "preview-segment preview-segment-left";
        right.className = "preview-segment preview-segment-right";

        var data = {
            firstName: createInput("text", "firstName", left, updateFunc),
            lastName: document.createElement("div"),
            age: document.createElement("div"),
        }

        box.appendChild(left);
        box.appendChild(right);

        container.appendChild(box);
    }

})();