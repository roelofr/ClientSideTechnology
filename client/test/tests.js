/* global Game:readonly, myApp:readonly, FeedbackWidget:readonly */
// Ensure
beforeAll(function (done) {
  $(function () {
    done()
  })
})

// Suite true
describe('A suite', function () {
  it('contains spec with an expectation', function () {
    expect(true).toBe(true)
  })
})

// App init
describe('Application initialisation', function () {
  it('Method init returns true', function () {
    const result = myApp.init()
    expect(result).toBe(true)
  })
})

// Test modal
describe('Test feedback widget', function () {
  const widgetSelector = 'feedback-widget'
  const widgetElement = $(`#${widgetSelector}`)
  const widgetNode = widgetElement.get(0)
  const widgetTextNode = $('.feedback-dialog__body', widgetNode).get(0)
  const widget = new FeedbackWidget(widgetSelector)

  // Expect a widget to exist
  it('Expects a feedback model to exist', function () {
    // Expect to have found a jQuery object
    expect(widgetElement).toBeDefined()
    expect(widgetNode).toBeDefined()

    // Expect widget to have initialised
    expect(widget).toBeDefined()
  })

  // Expect a widget to show
  it('Expects to be hidden on hide()', function () {
    widget.hide()
    expect(widgetNode.classList).toContain('hidden')
  })

  it('Expects to be visible on show()', function () {
    widget.show()
    expect(widgetNode.classList).not.toContain('hidden')
  })

  it('Contains the message provided', function () {
    widget.show('the message provided', 'success')
    expect(widgetTextNode.textContent).toBe('the message provided')
  })

  it('Turns green when shown succesful', function () {
    widget.show('test', 'success')
    expect(widgetNode.classList).toContain('alert-success')
  })

  it('Turns red when shown unsuccesful', function () {
    widget.show('test', 'fail')
    expect(widgetNode.classList).toContain('alert-danger')
  })

  it('logs messages when shown', function () {
    for (let index = 15; index > 0; index--) {
      widget.show(`Loop message ${index}`, index % 2 ? 'success' : 'fail')
    }
    widget.history()
    expect(widgetTextNode.textContent).toContain('success - Loop message 1')
    expect(widgetTextNode.textContent).toContain('error - Loop message 4')
    expect(widgetTextNode.textContent).toContain('error - Loop message 10')
    expect(widgetTextNode.textContent).not.toContain('error - Loop message 12')
  })
})

// Test game
describe('Test Game', function () {
  it('tests if a \'Game\' variable is available', function () {
    expect(Game).toBeDefined()
  })
  it('tests if \'Game\' has an init function', function () {
    expect(Game.init).toBeDefined()
    expect(typeof Game.init).toBe('function')
  })
  it('tests if Game.init\'s callback is called', function () {
    const callback = jasmine.createSpy('init callback', () => console.log('Cake was dispensed'))
    expect(Game.init(callback)).not.toBeDefined()
    expect(callback.calls.any()).toBe(true)
  })
  it('tests if \'Game\' has a method to get the configMap', function () {
    expect(Game.getConfigMap).toBeDefined()
    expect(typeof Game.getConfigMap).toBe('function')
    expect(typeof Game.getConfigMap()).toBe('object')
    expect(Game.getConfigMap().api).toBeDefined()
  })
})
describe('Test Reversi model on Game', function () {
  it('tests if \'Game.Reversi\' exists and can be initialised', function () {
    expect(Game.Reversi).toBeDefined()
    expect(Game.Reversi.init).toBeDefined()
    expect(typeof Game.Reversi.init).toBe('function')
  })
})
describe('Test Data model on Game', function () {
  it('tests if \'Game.Data\' exists and can be initialised', function () {
    expect(Game.Data).toBeDefined()
    expect(Game.Data.init).toBeDefined()
    expect(typeof Game.Data.init).toBe('function')
  })
})
describe('Test Model model on Game', function () {
  it('tests if \'Game.Model\' exists and can be initialised', function () {
    expect(Game.Model).toBeDefined()
    expect(Game.Model.init).toBeDefined()
    expect(typeof Game.Model.init).toBe('function')
  })
  it('tests if \'Game.Model\' can retrieve weather', async function () {
    expect(Game.Model).toBeDefined()
    expect(Game.Model.getWeather).toBeDefined()
    expect(typeof Game.Model.getWeather).toBe('function')
    await expectAsync(Game.Model.getWeather('Zwolle, NL')).toBeResolved()
    await expectAsync(Game.Model.getWeather('Verweggistan, GB')).toBeRejected()
  })
})

// Board test
describe('Test Reversi fiche system', function () {
  it('has a \'showFiche\' method', function () {
    expect(Game.Reversi).toBeDefined()
    expect(Game.Reversi.showFiche).toBeDefined()
    expect(typeof Game.Reversi.showFiche).toBe('function')
  })
  it('handles click events', function () {
    // get item
    const node = $('#board-click-target')
    expect(node.children().length).toBe(0)

    // Click it
    node.click()

    // Check if a tile was added
    expect(node.children().length).toBe(1)
  })
  it('handles direct events', function () {
    // get item
    const node = $('#board-target')
    expect(node.children().length).toBe(0)

    // Click it
    Game.Reversi.showFiche(node.data('x'), node.data('y'), 'dark')

    // Check if a tile was added
    expect(node.children().length).toBe(1)
  })
})
