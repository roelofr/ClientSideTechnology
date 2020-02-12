const apiUrl = 'url/super/duper/game'

const Game = (function (url) {
  const configMap = {
    api: url
  }

  // Log start
  console.log('hallo, vanuit een module met config map %o', configMap)

  // Private function init
  const init = function () {
    console.log('Private information, including %s!', configMap.api)
  }

  const getConfigMap = function () {
    return configMap
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init, getConfigMap }
})(apiUrl)
