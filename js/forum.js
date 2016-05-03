var forum = (function () {

    // Enable strict mode
    'use strict';

    // Templates for each HTML element
    var templates = {
        postLeft: [
            "<img src=\"{avatar-url}\"alt=\"Avatar\">",
            "<strong>{name} ({age})</strong>",
            "<span>{job}</span>"
        ],
        postRight: [
            "<div class=\"post-title\">{name} schreef op {date}</div>",
            "<div class=\"post-content\">{text}</div>"
        ]
    };

    // Selectors for all containers
    var selectors = {
        sidebar: "div[data-content=forum-topics]",
        topic: "span[data-content=forum-topic]",
        posts: "div[data-content=forum-posts]"
    };

    var sql = {
        // Holds the pointer to the database
        db: null,
        // Set to true in case the user denied offline-storage access.
        // The app must not create a new db link in case this is true.
        dbLocked: false,
        // The name of the database
        dbName: "forum",
        // Checks if the browser supports an IndexedDB
        supported: function () {
            return (
                window.hasOwnProperty("indexedDB") &&
                window.indexedDB.hasOwnProperty("open")
            );
        },

        dbIsOpen: function () {
            return (sql.db !== null && !sql.dbLocked);
        },

        // Opens a new IndexedDB link
        open: function () {
            if (sql.dbIsOpen()) {
                return;
            }

            var request = indexedDB.open("MyTestDatabase");
            request.onerror = function (event) {
                sql.dbLocked = true;
                alert([
                    "Helaas is het forum alleen beschikbaar indien je",
                    "toestemming geeft voor het gebruik van offline opslag.",
                    "\r\n\r\n",
                    "Gelieve toestemming te verlenen aan deze website voor het",
                    "gebruik van offline opslag om door te gaan."
                ].join(" "));
            };
            request.onsuccess = _eventOpenDB
        },

        read: function (type, value) {
            if (!sql.dbIsOpen()) {
                sql.read();
            }
        },

        add: function (thread, author, post) {
            if (!sql.dbIsOpen()) {
                sql.read();
            }

        },

        _eventOpenDB = function (event) {
            sql.db = event.target.result;
        },

        _eventDBReady = function (event) {

        }
    };

    // Clean out all posts in a thread
    var clearThread = function () {
        $(selectors.posts)
            .childNodes.forEach(
                function (node) {
                    node.remove();
                }
            );
    };

    var appendPost = function (author, content) {

        var container = document.createElement("div"),
            left = document.createElement("aside"),
            right = document.createElement("div");

        container.appendChild(left);
        container.appendChild(right);

        var data = {};
        data.merge(author);
        data.merge(content);

        var clones = {
            left: templates.postLeft.join(" "),
            main: templates.postRight.join(" ")
        };

        left.innerHTML = clones.left.format(data);
        right.innerHTML = clones.right.format(data);

        $(selectors.posts)
            .appendChild(container);
    };

    var openThread = function (threadID) {
        clearThread();

        var data = sql.read('thread', threadID);

        data.forEach(function (data) {

        });
    };

    var threadClicked = function (obj) {
        if (!this.hasOwnProperty('dataThread'))
            return;
        openThread(this.dataThread);
    };

    var bindObjects = function () {
        $("a[data-target=thread]")
            .forEach(function (node) {
                node.addEventListener('click', threadClicked);
            });
    };

    return {
        bind: bindObjects
    };

}());
