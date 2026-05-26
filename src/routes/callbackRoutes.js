module.exports = (bot) => {

  console.log('LOAD startRoutes')

  require('./startRoutes')(bot)

  /*
  |--------------------------------------------------------------------------
  | CORE ROUTES
  |--------------------------------------------------------------------------
  */

  //require('./profileRoutes')(bot)

  //require('./walletRoutes')(bot)

  //require('./marketRoutes')(bot)

  //require('./favoriteRoutes')(bot)

  //require('./purchaseRoutes')(bot)

  //require('./searchRoutes')(bot)

  //require('./filterRoutes')(bot)

  //require('./notificationRoutes')(bot)

  //require('./premiumRoutes')(bot)

  //require('./paymentRoutes')(bot)

  /*
  |--------------------------------------------------------------------------
  | SYSTEM
  |--------------------------------------------------------------------------
  */

  //require('./leaderboardRoutes')(bot)

  //require('./casinoRoutes')(bot)

  //require('./verificationRoutes')(bot)

  //require('./escrowRoutes')(bot)

  //require('./disputeRoutes')(bot)

  //require('./logRoutes')(bot)

  /*
  |--------------------------------------------------------------------------
  | ADMIN
  |--------------------------------------------------------------------------
  */

  //require('./adminRoutes')(bot)

}