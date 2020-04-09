
// Add 'reversi' module
Game.Reversi = (function () {
  // unused
  const configMap = {}
  const gridElements = new Map()

  const buildIndex = (x, y) => `${x},${y}`

  const showFiche = (x, y, color) => {
    if (!['dark', 'light', 'auto', null].includes(color)) {
      console.error('Invalid color %s, should be dark, light, auto or NULL', color)
      return
    }

    const index = buildIndex(x, y)
    if (!gridElements.has(index)) {
      alert(`Element not found at (${x}, ${y})`)
      return
    }

    // get cell
    const elem = gridElements.get(index)

    if (color === 'auto') {
      const fiche = elem.children().eq(0)
      if (fiche.length === 0) {
        color = 'light'
      } else if (fiche.hasClass('board__chip--light')) {
        color = 'dark'
      } else {
        color = null
      }
    }
    // We always clear the contents, inspired by:
    // https://youtu.be/7UbiOKdZmYY

    // Remove contents
    elem.children().remove()

    // Color = null ==> remove
    if (color === null) {
      console.log('Not adding at (%o, %o)', x, y)
      return
    }

    // Add chip
    elem.append(
      $('<div class="board__chip" />').addClass(`board__chip--${color}`)
    )
  }

  // Private function init
  const init = function () {
    // Create board in template
    const boardContainer = $('div[data-content="game-board"]').eq(0)
    if (!boardContainer.length) {
      console.error('Cannot find game board')
      return
    }

    // Assign content
    boardContainer.html(Game.Template.parseTemplate('templates.game.board'))

    // Find grid
    let currentRow = 0
    const getClickCallback = (x, y) => () => showFiche(x, y, 'auto')
    $('.board__row', boardContainer).each((index, row) => {
      let currentCell = 0
      $('.board__cell', row).each((index, cell) => {
        const cellJq = $(cell)
        // Add to list
        gridElements.set(buildIndex(currentCell, currentRow), cellJq)

        // Add click handler
        cellJq.on('click', getClickCallback(currentCell, currentRow))

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
