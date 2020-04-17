
Game.API = (function (jQuery) {
  const JOKES_URL = 'http://official-joke-api.appspot.com/jokes/ten'
  let jokeTarget = null

  /**
   * @returns {Promise}
   */
  const getJokes = () => {
    return Game.Data.get(JOKES_URL).then(data => {
      // Data should be an array
      if (!Array.isArray(data)) {
        console.error('Data is not an array!', data)
        throw new Error('Data is not an array!')
      }

      // Iterate data
      const fetchedJokes = []
      data.forEach((joke, index) => {
        if (joke.setup && joke.punchline) {
          fetchedJokes.push({
            setup: joke.setup,
            punchline: joke.punchline
          })
          return
        }

        // Report failure
        console.warn('Invalid joke %o at index %o', joke, index)
      })

      // Return jokes from promise
      return fetchedJokes
    })
  }

  const getSingleJoke = () => {
    return getJokes()
      .then(result => {
        // Return if empty
        if (typeof result !== 'object' || result.length === 0) {
          return null
        }

        // Pick a random Array node
        return result[Math.round(Math.random() * (result.length - 1))]
      })
  }

  const init = () => {
    jQuery('button[data-action="joke"]').on('click', showJoke)
    jokeTarget = jQuery('div[data-content="joke"]').eq(0)
  }

  const showJoke = function (event) {
    // Get clicked button
    const eventTarget = $(event.target)

    // block the button
    eventTarget.attr('disabled', 'disabled')

    // Get a single joke
    getSingleJoke()
      // Render joke
      .then(joke => renderJoke(joke))
      // Re-enable button
      .finally(() => eventTarget.removeAttr('disabled'))
  }

  /**
   * Renders a single joke using the template engine
   * @param {Object} data
   */
  const renderJoke = function (data) {
    jokeTarget.html(Game.Template.parseTemplate('templates.game.joke', data))
  }

  return { init, getJokes }
})(jQuery)
