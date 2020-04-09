// Add a for loop to Handlebars
// Source: https://stackoverflow.com/a/11924998
Handlebars.registerHelper('times', function (n, block) {
  let accum = ''
  for (let i = 0; i < n; ++i) { accum += block.fn({ index: i }) }
  return accum
})
