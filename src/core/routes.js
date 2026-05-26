const registerRoutes =
(bot) => {

  console.log(
    'LOAD callbackRoutes'
  )

  require(
    '../routes/callbackRoutes'
  )(bot)

  console.log(
    '✅ Routes chargées'
  )

}

module.exports =
registerRoutes