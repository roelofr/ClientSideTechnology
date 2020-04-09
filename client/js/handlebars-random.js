// Make a block randomly appear, 50/50 chance
Handlebars.registerHelper('randomif', function (block) {
  if (Math.random() > 0.5000000) {
    return block.fn()
  }
  return ''
})
