class FeedbackWidget {
  constructor (elementId) {
    this._elementId = elementId
    this._element = $(`#${elementId}`)
    this._textElement = this._element.find('[data-content="message"]').eq(0)
    this._closeCallbacks = []

    this._element.find('[data-action="result"]').on('click', (el) => this.hide($(el).data('result')))
  }

  get elementId () {
    return this._elementId
  }

  get element() {
    return this._element
  }

  get textElement() {
    return this._textElement
  }

  addCloseCallback(method) {
    this._closeCallbacks.push(method)
  }

  show (message, type) {
    // Check for existing callbacks
    if (this._closeCallbacks.length !== 0) {
      this.hide(false)
    }

    // Normalize
    message = message || '(no message)'
    type = (type === 'success' ? 'success' : 'error')

    // Log, without newlines
    this.log({ message: message.replace(/\n+/g, ''), type })

    // Empty node
    this.textElement.html('')

    // Add paragraphs for each line
    message.split('\n').forEach(line => {
      const para = $('<p>')
        .text(line)
        .addClass('feedback-dialog__body-line')

      this.textElement.append(para)
    })

    // Show
    this.element.removeClass('hidden')
    this.element.toggleClass('alert-success', type === 'success')
    this.element.toggleClass('alert-danger', type !== 'success')

    // Shake
    const shakeNode = this.element.find('[data-action="result"][data-result="continue"]').eq(0)

    // Start a timeout to shake
    let timeoutShake = setInterval(() => {
      shakeNode.addClass('feedback-dialog__button--shake')

      // Start a timeout to clear the shake. No need to worry about
      // this when removing, as we're
      setTimeout(
        () => shakeNode.removeClass('feedback-dialog__button--shake'),
        1000
      )
    }, 2 * 1000)

    // Close callback
    this.addCloseCallback(() => {
      shakeNode.removeClass('feedback-dialog__button--shake')
      clearInterval(timeoutShake)
    })
  }

  hide (result) {
    result = result === 'continue'
    console.log('hideing %s', this.elementId)
    this.element.addClass('hidden')

    // Invoke callbacks
    this._closeCallbacks.forEach(method => method(result, this))
    this._closeCallbacks = []
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
  $('[data-action="feedback"]').on('click', function () {
    const message = $(this).data('message')
    const type = $(this).data('type')
    modal.show(message, type)
  })

  $('[data-action="feedback-history"]').on('click', function () {
    modal.history()
  })
})
