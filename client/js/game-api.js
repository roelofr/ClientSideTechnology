
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
