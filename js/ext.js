/**
 * Part of Client Side Technology
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3
 */
(function (w, d) {
  'use strict'

  Date.prototype.format = function (fmt) { // eslint-disable-line no-extend-native
    function pad (n, minLength) {
      var str = String(n)
      if (str.length >= minLength) {
        return str
      }

      str = '0'.repeat(minLength - str.length) + str
      return str
    }
    fmt = fmt.replace('%ms', this.getMilliseconds())
    fmt = fmt.replace('%s', this.getSeconds())
    fmt = fmt.replace('%m', pad(this.getMinutes(), 2))
    fmt = fmt.replace('%h', pad(this.getHours(), 2))
    fmt = fmt.replace('%d', this.getDate())
    fmt = fmt.replace('%M', this.getMonth() + 1)
    fmt = fmt.replace('%Y', this.getFullYear())
    return fmt
  }

  String.prototype.template = function (args) { // eslint-disable-line no-extend-native
    var str = this
    args.forEach(function (val, key) {
      str = str.replace(
        new RegExp('\\{\\{\s*' + key + '\s*\\}\\}', 'g'), // eslint-disable-line no-useless-escape
        val
      )
    })
    return str
  }

  Array.prototype.remove = function (what) { // eslint-disable-line no-extend-native
    var i
    if (this.indexOf(what) === -1) {
      return this
    }

    do {
      i = this.indexOf(what)
      this.splice(i, 1)
    } while (i !== null)

    return this
  }

  if (!window.Node || window.Node.prototype.remove) {
    window.Node.prototype.remove = function () {
      this.parentNode.removeChild(this)
    }
  }

  window.Node.prototype.removeAll = function () {
    while (this.hasChildNodes()) {
      this.removeChild(this.lastChild)
    }
  }

  window.HTMLCollection.prototype.toArray = function () {
    return Array.prototype.slice.call(this)
  }

  Object.prototype.merge = function (obj1, obj2) { // eslint-disable-line no-extend-native
    if (obj2 === undefined) {
      obj1.forEach(function (val, key) {
        this[key] = val
      })
      return this
    }

    var out = {}
    out.merge(obj1)
    out.merge(obj2)
    return out
  }

  if (!w.indexedDB && w.mozIndexedDB) {
    w.indexedDB = w.mozIndexedDB
  } else if (!w.indexedDB && w.webkitIndexedDB) {
    w.indexedDB = w.webkitIndexedDB
  } else if (!w.indexedDB && w.msIndexedDB) {
    w.indexedDB = w.msIndexedDB
  }

  if (!w.IDBTransaction && w.webkitIDBTransaction) {
    w.IDBTransaction = w.webkitIDBTransaction
    w.IDBKeyRange = w.webkitIDBKeyRange
  } else if (!w.IDBTransaction && w.msIDBTransaction) {
    w.IDBTransaction = w.msIDBTransaction
    w.IDBKeyRange = w.msIDBKeyRange
  }

  if (!w.jQuery) {
    // Who /needs/ jQuery anyway?
    w.$ = function () {
      return d.querySelector.apply(d, arguments)
    }
  }
}(window, document))
