/*
 * Startup hooks
 */

// Automagically init
$().ready(() => {
  Game.Reversi.init()
  Game.API.init()
  Game.Stats.init()
})
