class FeedbackWidget {
  constructor (elementId) {
    this._elementId = elementId
  }

  get elementId () {
    return this._elementId
  }

  show () {
    console.log('showing %s', this.elementId)
    document.getElementById(this.elementId).style.display = 'block'
  }

  hide () {
    console.log('hideing %s', this.elementId)
    document.getElementById(this.elementId).style.display = 'none'
  }
}
