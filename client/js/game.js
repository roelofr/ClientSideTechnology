/* global Game:writeable */
const apiUrl = 'url/super/duper/game'

window.Game = (function (url) {
  const configMap = {
    api: url
  }
  const stateMap = {
    token: null,
    gameState: null
  }

  // Private function init
  const init = function (callback, token) {
    // Set token
    stateMap.token = token

    // Start auto-update
    setInterval(_getCurrentGameState, 2000)

    // Complete
    callback()
  }

  const getConfigMap = function () {
    return configMap
  }

  const _getCurrentGameState = function () {
    Game.Model.getGameState()
      .then(value => (stateMap.gameState = value))
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init, getConfigMap }
})(apiUrl)
