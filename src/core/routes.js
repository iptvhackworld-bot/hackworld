const registerRoutes =
(bot) => {

  require(
    '../routes/commandRoutes'
  )(bot)

  require(
    '../routes/callbackRoutes'
  )(bot)

}

module.exports =
registerRoutes