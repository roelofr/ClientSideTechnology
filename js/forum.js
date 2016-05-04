/**
 * Part of Client Side Technology
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3
 */
(function(w, d) {

    // Enable strict mode
    'use strict';

    if (!w.$) {
        w.$ = function() {
            return d.querySelector.apply(d, arguments);
        };
    }

    var prompt = w.prompt;
    var $ = w.$;

    // Empty 1px gif
    var defaultImg =
        'data:image/gif;base64,' +
        'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    // Selectors for all containers
    var selectors = {
        sidebar: 'ul[data-content=forum-topics]',
        topic: 'span[data-content=forum-topic]',
        posts: 'div[data-content=forum-posts]',
        postPreview: 'div[data-content=forum-post-preview]',
        btn: {
            post: 'a.btn[data-target=new-post]',
            thread: 'a.btn[data-target=new-thread]'
        },
        form: {
            container: 'article[data-content=new-post-form-container]',
            form: 'form[data-content=new-post-form]',
            title: 'h2[data-content=new-post-title]',

            fname: 'input.forum-add-meta[id=forum-fname]',
            lname: 'input.forum-add-meta[id=forum-lname]',
            age: 'input.forum-add-meta[id=forum-age]',
            job: 'input.forum-add-meta[id=forum-job]',
            avatar: 'input.forum-add-meta[id=forum-avatar]',
            post: 'textarea.forum-add-post[id=forum-post]'
        }
    };

    var elements = {
        btn: {},
        form: {}
    };

    // Current thread
    var currentThread = 0;
    var currentThreadName = null;

    /**
     * Creates a DOM element containing the name and description of the thread.
     *
     * @param {Array} thread
     * @return {DOMElement}
     */
    var createThreadDom = function(thread) {
        var container = d.createElement('li');

        var link = d.createElement('a');

        var title = d.createElement('p');
        var desc = d.createElement('p');

        // Set class names
        link.setAttribute('class', 'forum-thread');

        title.setAttribute('class', 'forum-thread-name');
        desc.setAttribute('class', 'forum-thread-desc');

        // Set data tags for some attributes
        link.setAttribute('href', '#');
        link.setAttribute('data-thread-id', thread.id);
        link.setAttribute('data-thread-name', thread.name);

        // Set content
        title.innerHTML = thread.name;
        desc.innerHTML = thread.desc || '&nbsp;';

        // Assign contents
        container.appendChild(link);

        link.appendChild(title);
        link.appendChild(desc);

        var threadId = thread.id;
        var threadName = thread.name;

        // Add handlers
        var callBack = function(event) {
            openThread(threadId, threadName);

            event.preventDefault();
            return false;
        };
        link.addEventListener('click', callBack);

        return container;
    };

    /**
     * Creates a DOM element containing the stuff in the post. Returns
     * DOMElement.
     *
     * @param {Array} post
     * @return {DOMElement}
     */
    var createPostDom = function(post) {
        var container = d.createElement('div');

        var side = d.createElement('div');
        var main = d.createElement('div');

        var sideFig = d.createElement('figure');
        var sideImg = d.createElement('img');
        var sideText = d.createElement('p');

        var mainTitle = d.createElement('p');
        var mainContent = d.createElement('p');

        // Set class names
        container.setAttribute('class', 'forum-post');

        side.setAttribute('class', 'forum-post-side');
        main.setAttribute('class', 'forum-post-main');

        mainTitle.setAttribute('class', 'forum-post-main-title');
        mainContent.setAttribute('class', 'forum-post-main-content');

        // Set
        sideImg.setAttribute('src', post.avatar || defaultImg);
        sideText.innerHTML =
            post.firstName + ' ' +
            post.lastName + ' ' +
            '(' + post.age + ')<br />' +
            post.job;

        mainTitle.innerHTML =
            post.firstName + ' wrote on ' +
            post.date + ' at ' +
            post.time;

        mainContent.innerHTML =
            post.post;

        // Assign contents
        container.appendChild(side);
        container.appendChild(main);

        side.appendChild(sideFig);
        side.appendChild(sideText);

        sideFig.appendChild(sideImg);

        main.appendChild(mainTitle);
        main.appendChild(mainContent);

        return container;
    };

    /**
     * Updates the visible list of threads, removes old items
     *
     * @param {Array} threads
     */
    var updateThreadList = function(threads) {
        var wrapper = $(selectors.sidebar);
        wrapper.innerHTML = '';

        if (threads.length === 0) {
            wrapper.innerHTML =
                '<li><p class="forum-thread-message">' +
                'There are no categories available.' +
                '</p></li>';
        } else {
            threads.forEach(function(thread) {
                var element = createThreadDom(thread);
                wrapper.appendChild(element);
            });
        }

        elements.btn.thread.style.visibility = 'visible';
    };

    /**
     * Fills the list of posts for this subject with the provided list of
     * posts, or a 'no posts' message if it's empty.
     *
     * @param {Array} posts
     */
    var updatePostList = function(posts) {
        var wrapper = $(selectors.posts);
        wrapper.innerHTML = '';

        if (posts.length === 0) {
            wrapper.innerHTML =
                '<p class="forum-post-message">' +
                'No posts in this category' +
                '</p>';
        } else {
            posts.forEach(function(post) {
                var element = createPostDom(post);
                wrapper.appendChild(element);
            });
        }

        elements.btn.post.style.visibility = 'visible';
    };

    /**
     * Loads the available threads and prints them
     */
    var loadThreads = function() {
        if (!w.Forum.sql.connected() || !w.Forum.sql.supported()) {
            return false;
        }

        w.Forum.get.thread(updateThreadList);
    };

    /**
     * Opens a thread, sets name and loads stuff from the DB
     *
     * @param {Integer} threadId
     * @param {String} threadName
     */
    var openThread = function(threadId, threadName) { //jshint ignore:line
        $(selectors.posts).innerHTML =
            '<p class="forum-post-message">' +
            'Loading<br />' +
            '<small>Just a sec</small>' +
            '</p>';

        currentThread = threadId;

        if (threadName && threadName.trim().length > 0) {
            $(selectors.topic).innerHTML = threadName;
            currentThreadName = threadName;
        }

        w.Forum.get.post(threadId, updatePostList);
    };

    /**
     * Loads the thread list
     */
    var openForum = function() {
        if (!w.Forum.sql.supported()) {
            $(selectors.posts).innerHTML =
                '<p class="forum-post-message">' +
                'Your browser is not supported. ' +
                'Please upgrade to a decent browser, ' +
                'preferrably not IE / Edge.' +
                '</p>';

            return;
        }

        $(selectors.posts).innerHTML =
            '<p class="forum-post-message">' +
            '<small>Please select a category.</small>' +
            '</p>';

        $(selectors.sidebar).innerHTML =
            '<li><p class="forum-thread-message">' +
            'Loading<br />' +
            '<small>Just a sec</small>' +
            '</p></li>';

        if (!w.Forum.sql.connected()) {
            setTimeout(openForum, 100);
            return;
        }

        loadThreads();
    };

    /**
     * Asks for a thread name, adds it to the database, and then reloads the
     * list.
     *
     * @param {Event} event
     */
    var addThread = function(event) {
        // Always cancel the browse request
        event.preventDefault();

        var threadName = prompt('Geef de naam van de nieuwe categorie op');

        if (!threadName) { return; }

        threadName = threadName.trim();
        if (threadName.length <= 0) { return; }

        w.Forum.add.thread(
            threadName,
            'User-generated category',
            openForum
        );

    };

    /**
     * Adds a new post to the database, after it has passed the required checks.
     *
     * @param {Event} event
     */
    var addPost = function(event) {

        event.preventDefault();

        var threadId = currentThread;

        var callback = function() {
            openThread(threadId);
        };

        var ok = w.Forum.add.post(
            threadId,
            elements.form.fname.value || '',
            elements.form.lname.value || '',
            elements.form.age.value || '',
            elements.form.job.value || '',
            elements.form.post.value || '',
            elements.form.avatar.value || '',
            callback
        );

        if (!ok) {
            return;
        }

        elements.form.fname.value = '';
        elements.form.lname.value = '';
        elements.form.age.value = '';
        elements.form.job.value = '';
        elements.form.avatar.value = '';
        elements.form.post.value = '';

        elements.form.container.setAttribute('style', 'display: none');
        elements.postPreview.innerHTML = '';
    };

    var updateAddPreview = function() {

        var date = w.Forum.util.date();

        var data = {
            firstName: elements.form.fname.value || '',
            lastName: elements.form.lname.value || '',
            age: elements.form.age.value || '',
            job: elements.form.job.value || '',
            avatar: elements.form.avatar.value || '',
            post: elements.form.post.value || '',
            date: date.date,
            time: date.time,
        };

        var element = createPostDom(data);
        elements.postPreview.innerHTML =
            '<h4>Example</h4>' +
            '<small>Your post has <strong>not</strong> yet been saved.</small>';
        elements.postPreview.appendChild(element);
    };

    /**
     * Displays the add-post form
     */
    var showAddPost = function() {
        elements.form.container.setAttribute('style', '');

        elements.form.title.innerHTML = 'Add post to "' +
                                        currentThreadName + '".';
    };

    /**
     * Registers some click handlers for adding items.
     */
    var bindButtons = function() {
        elements.btn.thread.addEventListener('click', addThread);
        elements.btn.post.addEventListener('click', showAddPost);
        elements.form.form.addEventListener('submit', addPost);

        elements.form.fname.addEventListener('keyup', updateAddPreview);
        elements.form.lname.addEventListener('keyup', updateAddPreview);
        elements.form.age.addEventListener('keyup', updateAddPreview);
        elements.form.job.addEventListener('keyup', updateAddPreview);
        elements.form.avatar.addEventListener('keyup', updateAddPreview);
        elements.form.post.addEventListener('keyup', updateAddPreview);

        elements.form.fname.addEventListener('blur', updateAddPreview);
        elements.form.lname.addEventListener('blur', updateAddPreview);
        elements.form.age.addEventListener('blur', updateAddPreview);
        elements.form.job.addEventListener('blur', updateAddPreview);
        elements.form.avatar.addEventListener('blur', updateAddPreview);
        elements.form.post.addEventListener('blur', updateAddPreview);

        elements.btn.thread.style.visibility = 'hidden';
        elements.btn.post.style.visibility = 'hidden';

        // Hide the add-post menu
        elements.form.container.setAttribute('style', 'display: none');
    };

    /**
     * Finds elements by their selectors and sets them in the elements variable,
     * for easy access
     */
    var findElements = function() {
        elements.sidebar = $(selectors.sidebar);
        elements.topic = $(selectors.topic);
        elements.posts = $(selectors.posts);
        elements.postPreview = $(selectors.postPreview);

        elements.btn.thread = $(selectors.btn.thread);
        elements.btn.post = $(selectors.btn.post);

        elements.form.container = $(selectors.form.container);
        elements.form.form = $(selectors.form.form);
        elements.form.title = $(selectors.form.title);

        elements.form.fname = $(selectors.form.fname);
        elements.form.lname = $(selectors.form.lname);
        elements.form.age = $(selectors.form.age);
        elements.form.job = $(selectors.form.job);
        elements.form.avatar = $(selectors.form.avatar);
        elements.form.post = $(selectors.form.post);
    };

    var isInit = false;
    /**
     * Handles properly initialising stuff
     */
    var init = function() {
        if (isInit) {
            return;
        }
        isInit = true;

        findElements();
        bindButtons();
        openForum();
    };

    d.addEventListener('DOMContentLoaded', init);
    d.addEventListener('load', init);

}(window, document));
