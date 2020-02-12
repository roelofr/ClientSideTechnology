const Game = (function () {
  // Log start
  console.log('hallo, vanuit een module')

  // Private function init
  const init = function () {
    console.log('Private information!')
  }

  // Waarde/object geretourneerd aan de outer scope
  return { init }
})()
