const registerRoutes =
(bot) => {

  console.log(
    'LOAD commandRoutes'
  )

  // require(
  //   '../routes/commandRoutes'
  // )(bot)

  console.log(
    'LOAD callbackRoutes'
  )

  require(
    '../routes/callbackRoutes'
  )(bot)

  console.log(
    'LOAD staffCommandRoutes'
  )

  // require(
  //   '../routes/staffCommandRoutes'
  // )(bot)

  console.log(
    '✅ Routes chargées'
  )

}

module.exports =
registerRoutes