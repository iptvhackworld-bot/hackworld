module.exports = (bot) => {

  require('./startRoutes')(bot)

  /*
  |--------------------------------------------------------------------------
  | CORE ROUTES
  |--------------------------------------------------------------------------
  */

  require('./profileRoutes')(bot)

  require('./walletRoutes')(bot)

  require('./marketRoutes')(bot)

  require('./favoriteRoutes')(bot)

  require('./notificationRoutes')(bot)

  require('./premiumRoutes')(bot)

  require('./paymentRoutes')(bot)

  /*
  |--------------------------------------------------------------------------
  | SYSTEM
  |--------------------------------------------------------------------------
  */

  require('./leaderboardRoutes')(bot)

  require('./casinoRoutes')(bot)

  /*
  |--------------------------------------------------------------------------
  | SUPPORT
  |--------------------------------------------------------------------------
  */

  require('./supportRoutes')(bot)

  /*
  |--------------------------------------------------------------------------
  | ADMIN
  |--------------------------------------------------------------------------
  */

  require('./adminRoutes')(bot)

}