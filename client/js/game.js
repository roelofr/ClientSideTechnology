const apiUrl = 'url/super/duper/game'

const Game = (function (url) {
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
      .then(value => stateMap.gameState = value)
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init, getConfigMap }
})(apiUrl)

// Add 'reversi' module
Game.Reversi = (function () {
  // unused
  const configMap = {}
  const gridElements = new Map()

  const buildIndex = (x, y) => `${x},${y}`

  const showFiche = (x, y, color) => {
    if (!['dark', 'light'].includes(color)) {
      console.error('Invalid color %s, should be dark or light', color)
      return
    }

    const index = buildIndex(x, y)
    if (!gridElements.has(index)) {
      alert(`Element not found at (${x}, ${y})`)
      return
    }

    // get cell
    const elem = gridElements.get(index)

    // We always clear the contents, inspired by:
    // https://youtu.be/7UbiOKdZmYY

    // Remove contents
    elem.children().remove()

    // Add chip
    elem.append(
      $('<div class="board__chip" />').addClass(`board__chip--${color}`)
    )
  }

  // Private function init
  const init = function () {
    // Find grid
    let currentRow = 0
    const getClickCallback = (x, y) => (() => showFiche(x, y, 'light'))
    $('.board > .board__row').each((index, row) => {
      let currentCell = 0
      $('.board__cell', row).each((index, cell) => {
        const cellJq = $(cell)
        // Add to list
        gridElements.set(buildIndex(currentRow, currentCell), cellJq)

        // Add click handler
        cellJq.on('click', getClickCallback(currentRow, currentCell))

        // Increment cell
        currentCell++
      })

      // Increment row counter
      currentRow++
    })
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init, showFiche }
})()

// Add 'data' module
Game.Data = (function (jQuery) {
  // unused
  const configMap = {
    environment: 'development',
    apiKey: '11feb6b2ea8ede539ec046b49ee6f365',
    mock: [
      {
        url: '/api/Spel/Beurt',
        data: 0
      },
      {
        url: '/data/2.5/weather',
        data: {
          main: {
            temp: 279.35,
            feels_like: 272.76,
            temp_min: 278.15,
            temp_max: 280.37,
            pressure: 1012,
            humidity: 56
          },
          id: 2743476,
          name: 'Gemeente Zwolle'
        }
      }
    ]
  }

  // Private function init
  const init = function (environment) {
    if (!['production', 'development'].contains(environment)) {
      throw Error(`Environment ${environment} is invalid`)
    }
    configMap.environment = environment
  }

  const getMockData = function (url) {
    const urlPath = (new URL(url)).pathname

    return new Promise((resolve, reject) => {
      // Check all mocks
      for (const mock of configMap.mock) {
        // Match the path
        if (urlPath.startsWith(mock.url)) {
          resolve(mock.data)

          // Stop loop
          return
        }
      }

      // Reject if no match was found
      reject(Error('Service not available'))
    })
  }

  const get = function (url) {
    // Add API key to request
    const uri = new URL(url)
    uri.searchParams.set('apiKey', configMap.apiKey)

    // Mock it if local
    if (configMap.environment === 'development' && !('jasmine' in window)) {
      return getMockData(`${uri}`)
    }

    return jQuery.get(uri)
      .then(value => value)
      .catch(error => console.error('Command failed with %s (%o)', error.message, error))
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init, get }
})(jQuery)

// Add 'model' module
Game.Model = (function () {
  // unused
  const configMap = {}

  // Private function init
  const init = function () {
    // Do stuff
  }

  const getGameState = function (token) {
    if (!token) {
      throw Error('Token is missing')
    }

    return Game.Data.get(`/api/Spel/Beurt/${token}`)
      .then(value => {
        if ([0, 1, 2].contains(value)) {
          return value
        }
        throw Error(`Recieved value ${value} is invalid`)
      })
  }


  const getWeather = function (city) {
    // Build URL safely
    const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    url.searchParams.set('q', city)

    // Send request
    return Game.Data.get(url)
      .then((value) => {
        // Expect a temperature to exist
        if (!value.main || !value.main.temp) {
          throw Error('Temperature is missing')
        }

        return value
      })
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init, getWeather, getGameState }
})()

Game.Stats = (function () {
  const configMap = {

  };

  const init = () => { }

  return { init }
})

// Automagically init
$().ready(() => {
  Game.Reversi.init();
})
