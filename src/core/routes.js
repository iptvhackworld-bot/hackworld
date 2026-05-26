const registerRoutes =
(bot) => {

  require(
    '../routes/commandRoutes'
  )(bot)

}

module.exports =
registerRoutes