/**
 * Part of Client Side Technology
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3
 */

var Forum = window.Forum || {};

Forum = (function(w, d) {

    // Enable strict mode
    'use strict';

    // Some window stuff
    var alert = w.alert;
    var indexedDB = w.indexedDB;
    var console = w.console;

    // Holds the pointer to the database
    var db = null;

    // Set to true in case the user denied offline-storage access.
    // The app must not create a new db link in case this is true.
    var dbLocked = false;

    // The name of the database
    var dbName = 'forum';

    // The version of the database, as unsigned long int
    var dbVer = 2;

    // Checks if the browser supports an IndexedDB
    var sqlSupported = function() {
        return (
            window.hasOwnProperty('indexedDB') &&
            window.indexedDB.open
        );
    };

    /**
     * Returns true if there is an active SQL connection
     *
     * @return {Boolean}
     */
    var sqlConnected = function() {
        return (db !== null);
    };

    /**
     * Returns true if there is an active SQL connection
     *
     * @return {Boolean}
     */
    var sqlLocked = function() {
        return dbLocked === true;
    };

    /**
     * Opens a connection to the SQL database
     */
    var sqlOpen = function() {
        if (sqlConnected() || sqlLocked()) {
            return;
        }

        var request = indexedDB.open(dbName, dbVer);

        // Handle errors
        request.onerror = function(event) {
            console.warn('Somethign went wrong with the query!', event);
            event.preventDefault();
        };

        // Handle DB use in a different tab
        request.onblocked = function() {
            dbLocked = true;
            db = null;
        };

        // Register DB handle
        request.onsuccess = function() {
            db = this.result;
        };

        // Handle DB upgrade
        request.onupgradeneeded = function(event) {
            var db = event.currentTarget.result;

            // Create topic store
            var threadStore = db.createObjectStore('threads', {
                keyPath: 'id',
                autoIncrement: true
            });

            threadStore.createIndex('name', 'name', {
                unique: true
            });

            // Create thread store
            var postStore = db.createObjectStore('posts', {
                keyPath: 'id',
                autoIncrement: true
            });

            postStore.createIndex('thread', 'thread', {
                unique: false
            });

            // Add stuff to the topic store
            threadStore.transaction.oncomplete = function() {
                // Store values in the newly created objectStore.
                var store = db.transaction('threads', 'readwrite')
                                .objectStore('threads');

                store.add({
                    id: 1,
                    name: 'General',
                    desc: 'General discussion'
                });

                store.add({
                    id: 2,
                    name: 'Programming',
                    desc: 'Discuss programing-related stuff'
                });

                store.add({
                    id: 3,
                    name: 'Report a bug',
                    desc: 'Report bugs on the site'
                });
            };
        };
    };

    // Simple read-writes
    /**
     * Returns a handle for the database, either in read-only or read-write mode
     *
     * @param {String} storeName Name of the storage
     * @param {String} mode Mode, either 'readonly' or 'readwrite'
     */
    var sqlGetStore = function(storeName, mode) {
        if (sqlLocked()) {
            return null;
        }

        if (!sqlConnected()) {
            sqlOpen();
            return null;
        }

        var tx = db.transaction(storeName, mode);
        return tx.objectStore(storeName);
    };

    /**
     * Retireves a list of threads from the IndexedDB. calls callback when
     * complete.
     *
     * @param {Function} callback
     */
    var getThreads = function(callback) {
        var store = sqlGetStore('threads', 'readonly');

        // Check if we even can connect
        if (store === null) {
            return false;
        }

        // Prepare somewhere to store
        var resultSet = [];

        console.log('I got a thead store:', store);

        // And loop through all entries
        store.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            console.log('Cursor! ', cursor, event);
            if (cursor) {
                resultSet.push(cursor.value);
                cursor.continue();
            } else {
                callback(resultSet);
                resultSet = null;
            }
        };

        // All ok, return true
        return true;
    };

    /**
     * Retireves a list of posts from the IndexedDB. calls callback when
     * complete. Filtered by thread ID.
     *
     * @param {Integer} thread Thread ID
     * @param {Function} callback Callback
     */
    var getPosts = function(thread, callback) {
        var store = sqlGetStore('posts', 'readonly');

        // Check if we even can connect
        if (store === null) {
            return false;
        }

        // Prepare somewhere to store
        var resultSet = [];

        // And loop through all entries
        store.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                // Filter only thread posts
                if (cursor.value.thread === thread) {
                    resultSet.push(cursor.value);
                }
                cursor.continue();
            } else {
                callback(resultSet);
                resultSet = null;
            }
        };

        // All ok, return true
        return true;
    };

    /**
     * Returns the current date
     *
     * @return {Object}
     */
    var getDateTime = function() {
        var now = new Date();
        var date = '';
        var time = '';

        if (now.getDate() < 10) {
            date += '0' + now.getDate() + '-';
        } else {
            date += now.getDate() + '-';
        }

        if (now.getMonth() < 10) {
            date += '0' + now.getMonth() + '-';
        } else {
            date += now.getMonth() + '-';
        }

        date += now.getFullYear();

        if (now.getHours() < 10) {
            time += '0' + now.getHours() + ':';
        } else {
            time += now.getHours() + ':';
        }

        if (now.getMinutes() < 10) {
            time += '0' + now.getMinutes();
        } else {
            time += now.getMinutes();
        }

        return {
            object: now,
            date: date,
            time: time
        };
    };

    /**
     * Inserts a new thread with the given name and description
     *
     * @param {String} name
     * @param {String} desc
     */
    var addThread = function(name, desc, callback) {
        name = String(name);
        desc = String(desc);

        if (name.length === 0) {
            alert('Je bent vergeten een onderwerpnaam in te vullen.');
            return false;
        }

        if (desc.length === 0) {
            desc = null;
        }

        var data = {
            name: name,
            desc: desc
        };

        var store = sqlGetStore('threads', 'readwrite');

        // Check if we even can connect
        if (store === null) {
            return false;
        }

        var req = store.add(data);

        if (callback) {
            req.onsuccess = callback;
        }

        return true;
    };

    /**
     * Adds a new post
     *
     * @param {Integer} thread ID of the thread to add the post to
     * @param {String} fname First name
     * @param {String} lname Last name
     * @param {Integer} age Age
     * @param {String} job Job description
     * @param {String} post Content of the post
     * @param {String} picture URL of the avatar (optional)
     */
    var addPost = function(
        thread, fname, lname,
        age, job, post, picture,
        callback) {
        thread = parseInt(thread);

        fname = String(fname);
        lname = String(lname);

        age = parseInt(age);
        job = String(job);

        post = String(post);
        picture = String(picture);

        if (thread <= 0) {
            alert('This is an invalid thread!');
        }

        if (fname.length === 0) {
            alert('Je bent vergeten je voornaam op te geven.');
            return false;
        }

        if (lname.length === 0) {
            alert('Je bent vergeten je achternaam op te geven.');
            return false;
        }

        if (!age || age < 10 || age > 130) {
            alert('Je hebt een ongeldige leeftijd opgegeven.');
            return false;
        }

        if (job.length === 0) {
            alert('Je bent vergeten je beroep in te vullen.');
            return false;
        }

        if (post.length === 0) {
            alert('Je bent vergeten de tekst van je post in te vullen.');
            return false;
        }

        var date = getDateTime();

        var data = {
            thread: thread,

            // Name
            firstName: fname,
            lastName: lname,

            // Meta
            age: age,
            job: job,

            // Post & avatar
            post: post,
            avatar: picture.length > 0 ? picture : null,

            // Date
            date: date.date,
            time: date.time,
        };

        console.log('Adding post: ', data);

        var store = sqlGetStore('posts', 'readwrite');

        // Check if we even can connect
        if (store === null) {
            return false;
        }

        var res = store.add(data);

        if (callback) {
            res.onsuccess = callback;
        }

        return true;
    };

    // Add initialiser
    d.addEventListener('DOMContentLoaded', sqlOpen);

    return {
        sql: {
            connected: sqlConnected,
            supported: sqlSupported,
            open: sqlOpen
        },
        add: {
            thread: addThread,
            post: addPost
        },
        get: {
            thread: getThreads,
            post: getPosts
        },
        util: {
            date: getDateTime
        }
    };

}(window, document));
