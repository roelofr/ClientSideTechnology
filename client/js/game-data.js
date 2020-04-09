
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
