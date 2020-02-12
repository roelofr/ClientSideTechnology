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
Game.Data = (function (jQuery) {
  // unused
  const configMap = {
    environment: 'development',
    apiKey: 'd1a08275609ff9ed0c2999ea73413516',
    mock: [
      {
        url: 'api/Spel/Beurt',
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
        if (mock.url === urlPath) {
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
    if (configMap.environment === 'development') {
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

  // Log start
  console.log('hallo, vanuit model module met config map %o', configMap)

  // Private function init
  const init = function () {
    console.log('Private information, including %s!', configMap.api)
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
  return { init, getWeather }
})()
