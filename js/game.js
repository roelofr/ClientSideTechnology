const apiUrl = 'url/super/duper/game'

const Game = (function (url) {
  const configMap = {
    api: url
  }

  // Log start
  console.log('hallo, vanuit een module met config map %o', configMap)

  // Private function init
  const init = function (callback) {
    console.log('Private information, including %s!', configMap.api)

    // Do stuff

    callback()
  }

  const getConfigMap = function () {
    return configMap
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init, getConfigMap }
})(apiUrl)

// Add 'reversi' module
Game.Reversi = (function () {
  // unused
  const configMap = {}

  // Log start
  console.log('hallo, vanuit reversi module met config map %o', configMap)

  // Private function init
  const init = function () {
    console.log('Private information, including %s!', configMap.api)
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init }
})()


// Add 'data' module
Game.Data = (function () {
  // unused
  const configMap = {}

  // Log start
  console.log('hallo, vanuit data module met config map %o', configMap)

  // Private function init
  const init = function () {
    console.log('Private information, including %s!', configMap.api)
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init }
})()

// Add 'model' module
Game.Model = (function () {
  // unused
  const configMap = {}

  // Log start
  console.log('hallo, vanuit model module met config map %o', configMap)

  // Private function init
  const init = function () {
    console.log('Private information, including %s!', configMap.api)
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init }
})()
