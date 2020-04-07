/* global Chart */
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
    const getClickCallback = (x, y) => () => showFiche(x, y, 'light')
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
      },
      {
        url: '/jokes/ten',
        data: [
          { id: 134, type: 'general', setup: 'How does a dyslexic poet write?', punchline: 'Inverse.' },
          { id: 117, type: 'general', setup: 'How come the stadium got hot after the game?', punchline: 'Because all of the fans left.' },
          { id: 154, type: 'general', setup: 'Want to hear a joke about construction?', punchline: "Nah, I'm still working on it." },
          { id: 60, type: 'programming', setup: 'A user interface is like a joke.', punchline: 'If you have to explain it then it is not that good.' },
          { id: 316, type: 'general', setup: 'Why are mummys scared of vacation?', punchline: "They're afraid to unwind." },
          { id: 346, type: 'general', setup: 'Why did the octopus beat the shark in a fight?', punchline: 'Because it was well armed.' },
          { id: 193, type: 'general', setup: 'What did the Red light say to the Green light?', punchline: "Don't look at me I'm changing!" },
          { id: 264, type: 'general', setup: 'What kind of award did the dentist receive?', punchline: 'A little plaque.' },
          { id: 319, type: 'general', setup: 'Why are skeletons so calm?', punchline: 'Because nothing gets under their skin.' },
          { id: 50, type: 'general', setup: 'What do you call a factory that sells passable products?', punchline: 'A satisfactory' }]
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
      console.error('Failed to find cached request for %o', url)
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

// Stats
Game.Stats = (function (ChartJs) {
  const configMap = {

  }

  const init = function () {
    const ctx = document.querySelector('canvas[data-content="chart"]').getContext('2d')
    if (!ctx) {
      console.error('Cannot find canvas to paint chart in')
      return
    }

    const chart = new ChartJs(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }]
      },

      // Configuration options go here
      options: {}
    })

    // TODO something with the chart
  }

  return { init }
})(Chart)

Game.Template = (function () {
  /**
   * @param {String} templateName template, period-separated
   * @returns {Handlebars} template
   */
  const getTemplate = function (templateName) {
    let template = window.spa_templates
    templateName.split(/\./g).forEach(name => {
      template = template ? (template[name] || null) : null
    })
    return template
  }

  /**
   * @param {String} templateName Template name
   * @param {Object} data Data to parse with
   * @returns {String}
   */
  const parseTemplate = function (templateName, data) {
    const template = getTemplate(templateName)
    return (template && typeof template === 'function') ? template(data) : null
  }

  return { getTemplate, parseTemplate }
})()

Game.API = (function (jQuery) {
  const JOKES_URL = 'http://official-joke-api.appspot.com/jokes/ten'

  const fetchedJokes = []
  let jokeTarget = null

  const init = () => {
    jQuery('button[data-action="joke"]').on('click', showJoke)
    jokeTarget = jQuery('div[data-content="joke"]').eq(0)

    Game.Data.get(JOKES_URL).then(data => {
      // Data should be an array
      if (!Array.isArray(data)) {
        console.error('Data is not an array!', data)
        return
      }

      // Iterate data
      data.forEach((joke, index) => {
        if (joke.setup && joke.punchline) {
          fetchedJokes[fetchedJokes.length] = {
            setup: joke.setup,
            punchline: joke.punchline
          }
          return
        }

        // Report failure
        console.warn('Invalid joke %o at index %o', joke, index)
      })
    })
  }

  const showJoke = function () {
    const joke = getJoke()
    renderJoke(joke)
  }

  /**
   * Returns a joke
   */
  const getJoke = function () {
    let joke = null
    if (fetchedJokes) {
      const jokeIndex = Math.round(Math.random() * (fetchedJokes.length - 1))
      joke = fetchedJokes[jokeIndex]
    }

    return joke || {
      setup: 'A user interface is like a joke.',
      punchline: 'If you have to explain it then it is not that good.'
    }
  }

  const renderJoke = function (data) {
    jokeTarget.html(Game.Template.parseTemplate('templates.game.joke', data))
  }

  return { init, getJoke }
})(jQuery)

// Automagically init
$().ready(() => {
  Game.Reversi.init()
  Game.API.init()
  Game.Stats.init()
})
