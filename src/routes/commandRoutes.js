module.exports = (bot) => {

  const {

    startHandler

  } = require(
    '../handlers/startHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | START
  |--------------------------------------------------------------------------
  */

  bot.start(
    startHandler
  )

}