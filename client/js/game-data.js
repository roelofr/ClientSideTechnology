
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

  const pushMock = function (url, data) {
    const path = (new URL(url)).pathname

    console.log('Adding mock for %s', path)

    configMap.mock.push({
      url: path,
      data
    })
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init, get, pushMock }
})(jQuery)
