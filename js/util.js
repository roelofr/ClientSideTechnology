/**
 * Part of Client Side Technology
 *
 * @author Roelof Roos <github@roelof.io>
 * @license AGPL-3
 */

// Utilites for ajax requests and DOM targetting

(function (w) {
  'use strict'

  w.util = w.util || {}
  var util = w.util

  /**
   * Ajax requests libraries
   *
   * @type Function
   */
  util.ajax = (function () {
    var decypher = function (data) {
      if (!data || data === '' || data === null) {
        return null
      }

      var newData = String(data)

      try {
        var dataOut = JSON.parse(newData)
        return dataOut
      } catch (e) {
        // It's not JSON
      }

      return newData
    }

    var basicRequest = function (url, method, postdata, callback) {
      var req = new XMLHttpRequest()
      if (!req) {
        return false
      }

      req.open(url, method)
      req.setRequestHeader('X-RequestType', 'AJAX')

      req.onreadystatechange = function (event) {
        if (req.state === 4) {
          callback(decypher(event.data))
        }
      }

      if (method === 'POST') {
        req.send(postdata)
      }

      return true
    }

    var getRequest = function (url, callback) {
      if (basicRequest(url, 'GET', null, callback)) {
        return true
      }
      return false
    }

    var postRequest = function (url, data, callback) {
      if (basicRequest(url, 'POST', data, callback)) {
        return true
      }
      return false
    }

    return {
      get: getRequest,
      post: postRequest
    }
  })()

// Dom targetting has been moved to util.dom.js
}(window))
