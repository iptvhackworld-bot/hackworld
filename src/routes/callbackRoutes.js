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
| BACK TO MENU
|--------------------------------------------------------------------------
*/

bot.action(

  'back_main_menu',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      const {

        showMainMenu

      } = require(
        '../handlers/startHandler'
      )

      await showMainMenu(ctx)

    }

    catch (error) {

      console.log(error)

    }

  }

)



  /*
  |--------------------------------------------------------------------------
  | ADMIN
  |--------------------------------------------------------------------------
  */

  require('./adminRoutes')(bot)

}

