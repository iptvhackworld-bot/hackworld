module.exports = (bot) => {

  /*
  |--------------------------------------------------------------------------
  | CORE ROUTES
  |--------------------------------------------------------------------------
  */

  require('./supportRoutes')(bot)

  require('./profileRoutes')(bot)

  require('./walletRoutes')(bot)

  require('./marketRoutes')(bot)

  require('./adminRoutes')(bot)

  require('./casinoRoutes')(bot)

  require('./escrowRoutes')(bot)

  require('./leaderboardRoutes')(bot)

  require('./searchRoutes')(bot)
  
  require('./verificationRoutes')(bot)
  
  require('./purchaseRoutes')(bot)
  
  require('./disputeRoutes')(bot)
  
  require('./logRoutes')(bot)
  
  require('./searchRoutes')(bot)
  
  require('./filterRoutes')(bot)
  
  require('./notificationRoutes')(bot)
  
  require('./premiumRoutes')(bot)

}