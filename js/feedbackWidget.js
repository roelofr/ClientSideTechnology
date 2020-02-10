class FeedbackWidget {
  constructor (elementId) {
    this._elementId = elementId
    this._element = $(`#${elementId}`)
  }

  get elementId () {
    return this._elementId
  }

  get element () {
    return this._element
  }

  show (message, type) {
    // Normalize
    type = (type === 'success' ? 'success' : 'error')

    // Log
    this.log({ message, type })

    // Show
    this.element.text(message)
    this.element.css('display', 'block')
    this.element.toggleClass('alert-success', type === 'success')
    this.element.toggleClass('alert-danger', type !== 'success')
  }

  hide () {
    console.log('hideing %s', this.elementId)
    this.element.css('display', 'none')
  }

  log (message) {
    // Get log
    const collection = JSON.parse(localStorage.getItem('feedback_widget')) || []

    // Add item
    collection.push(message)

    // Remove more than 10 items
    while (collection.length > 10) {
      collection.shift()
    }

    // Write
    localStorage.setItem('feedback_widget', JSON.stringify(collection))
  }

  removeLog () {
    localStorage.removeItem('feedback_widget')
  }

  history () {
    // Get log
    const collection = JSON.parse(localStorage.getItem('feedback_widget')) || []

    // Prep message
    let logMessage = ''

    // Append lines
    collection.forEach(({ message, type }) => (logMessage += `${type} - ${message}\n`))

    this.show(logMessage, 'success')
  }
}

$(function () {
  const modal = new FeedbackWidget('feedback')
  $('[data-action="feedback"]').click(function () {
    const message = $(this).data('message')
    const type = $(this).data('type')
    modal.show(message, type)
  })
})
