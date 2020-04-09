/* global Chart:readonly */
// Stats
Game.Stats = (function (jQuery, Chart) {
  const configMap = {
  }

  /**
   * @var {jQuery}
   */
  let displayButton = null

  /**
 * @var {jQuery}
 */
  let chartContainer = null

  /**
   * @var {Map}
   */
  let chartStats = new Map()

  /**
   * @var {Chart} chart
   */
  let chart = null

  const renderStats = function () {
    // Disable button
    displayButton.attr('disabled', 'disabled').text('Laden...')

    // Create canvas, if none yet
    if (!chart) {
      fillTemplate()
    }

    // Update graph
    updateChart()

    // Remove button
    displayButton.remove()
  }

  const fillTemplate = function () {
    // Assign template and find canvas
    chartContainer.html(Game.Template.parseTemplate('templates.game.stats'))
    const canvas = $('canvas', chartContainer).get(0)
    if (!canvas) {
      console.error('Cannot find canvas element in template')
      return
    }

    // Add chart to canvas
    chart = new Chart(canvas.getContext('2d'), {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: [],
        datasets: [
          {
            label: 'Witte fiches',
            fill: false,
            borderColor: '#edf2f7',
            data: []
          },
          {
            label: 'Zwarte fiches',
            fill: false,
            borderColor: '#2d3748',
            data: []
          },
        ]
      },

      // Configuration options go here
      options: {}
    })
  }

  const updateChart = function () {
    // Stop if no chart is present
    if (!chart) {
      return
    }

    // Format data
    const labels = []
    const lightData = []
    const darkData = []
    chartStats.forEach(([light, dark], date) => {
      labels.push(date.toLocaleTimeString())
      lightData.push(light)
      darkData.push(dark)
    })

    // Assign new labels
    chart.data.labels = labels
    chart.data.datasets[0].data = lightData
    chart.data.datasets[1].data = darkData

    // Update chart
    chart.update({
      duration: 400
    })
  }

  const init = function () {
    displayButton = $('button[data-target="chart"]')
    if (displayButton.length === 0) {
      console.warn('No display button!');
      return
    }

    chartContainer = $('[data-content="game-stats"]')
    if (chartContainer.length === 0) {
      console.warn('No chart container!');
      displayButton.disable()
      return
    }

    console.log('Got container %o which will show with %o', chartContainer, displayButton);

    // Add click listener to button
    displayButton.on('click', renderStats)
  }

  const addMeasure = function (light, dark) {
    chartStats.set(new Date(), [light, dark])
    updateChart()
  }

  return { init, addMeasure }
})(jQuery, Chart)
