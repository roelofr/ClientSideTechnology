
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
