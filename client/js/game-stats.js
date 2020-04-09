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
   * @var {Chart} chart
   */
  let chart = null

  const renderStats = function () {
    // Disable button
    displayButton.attr('disabled', 'disabled').text('Laden...')

    // Make API call
    Game.Data.get('https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-03-01&base=EUR')
      .then(convertAndApply)
      .then(() => {
        displayButton.removeAttr('disabled').text('Toon statistieken')
      })
  }

  const fillTemplate = function () {
    // Assign template and find canvas
    chartContainer.html(Game.template.parseTemplate('templates.game.stats'))
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
            label: 'Euro value',
            backgroundColor: 'rgba(144, 205, 244, 0.25)',
            borderColor: 'rgb(49, 130, 206)',
            data: []
          },
          {
            label: 'USD value',
            backgroundColor: 'rgba(254, 178, 178, 0.25)',
            borderColor: 'rgb(229, 62, 62)',
            data: []
          }
        ]
      },

      // Configuration options go here
      options: {}
    })
  }

  const convertAndApply = function (data) {
    // make sure a chart exists
    if (!chart) {
      fillTemplate()
    }

    // Stop if no chart is present
    if (!chart) {
      console.warn('Not updating chart as no chart could be created')
      return
    }

    // Format data
    const labels = []
    const eurData = []
    const usdData = []
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        const dateSet = data[date]
        labels.push(new Date(date))
        eurData.push(dateSet.EUR)
        usdData.push(dateSet.USD)
      }
    }

    // Assign new data
    chart.data.labels = labels
    chart.data.dataset[0].data = eurData
    chart.data.dataset[1].data = usdData

    // Update chart
    chart.update({
      duration: 500
    })
  }

  const init = function () {
    displayButton = $('button[data-target="chart"]')
    if (displayButton.length === 0) {
      return
    }

    chartContainer = $('[data-content="game-stats"]')
    if (chartContainer.length === 0) {
      displayButton.disable()
      return
    }

    const canvas = document.querySelector('canvas[data-content="chart"]')
    if (!canvas) {
      console.error('Cannot find canvas to paint chart in')
      return
    }

    // Add click listener to button
    displayButton.on('click', renderStats)

    const ctx = canvas.getContext('2d')
    this.chart = new ChartJs(ctx, {
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
})(jQuery, Chart)
