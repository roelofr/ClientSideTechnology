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
    console.log('showing %o', this.element)
    this.element.text(message)
    this.element.css('display', 'block')
    this.element.toggleClass('alert-success', type === 'success')
    this.element.toggleClass('alert-danger', type !== 'success')
  }

  hide () {
    console.log('hideing %s', this.elementId)
    this.element.css('display', 'none')
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
