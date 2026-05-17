module.exports = (bot) => {
	
bot.action(

  'rate_1',

  (ctx) => rateBot(
    ctx,
    1
  )

)

bot.action(

  'rate_5',

  (ctx) => rateBot(
    ctx,
    5
  )

)
  /*
  |--------------------------------------------------------------------------
  | IMPORTS
  |--------------------------------------------------------------------------
  */

  const {

    showMainMenu

  } = require(
    '../handlers/startHandler'
  )

  const {

    categoryHandler

  } = require(
    '../handlers/categoryHandler'
  )

  const navigationHandler =
  require(
    '../handlers/navigationHandler'
  )

  const {

    openStaffMenu,

    showAdmins,

    showModerators,

    showTopUsers

  } = require(
    '../handlers/staffHandler'
  )
  
  const {

  rateBot

} = require(
  '../handlers/ratingHandler'
)

  /*
  |--------------------------------------------------------------------------
  | RULES
  |--------------------------------------------------------------------------
  */

  bot.action(
    'accept_rules',
    async (ctx) => {

      await ctx.deleteMessage()

      await showMainMenu(ctx)

    }
  )

  bot.action(
    'decline_rules',
    async (ctx) => {

      await ctx.reply(
        '❌ Vous devez accepter le règlement.'
      )

    }
  )

  /*
  |--------------------------------------------------------------------------
  | STAFF
  |--------------------------------------------------------------------------
  */

  bot.action(
    'cat_staff',
    openStaffMenu
  )

  bot.action(
    'show_admins',
    showAdmins
  )

  bot.action(
    'show_mods',
    showModerators
  )

  bot.action(
    'show_top_users',
    showTopUsers
  )

  /*
  |--------------------------------------------------------------------------
  | CATEGORIES
  |--------------------------------------------------------------------------
  */

  bot.action(
    /cat_(.+)/,
    categoryHandler
  )

  /*
  |--------------------------------------------------------------------------
  | NAVIGATION
  |--------------------------------------------------------------------------
  */

  bot.action(
    /next_(.+)_(\d+)/,
    async (ctx) => {

      await navigationHandler(
        ctx,
        'next'
      )

    }
  )

  bot.action(
    /prev_(.+)_(\d+)/,
    async (ctx) => {

      await navigationHandler(
        ctx,
        'prev'
      )

    }
  )

  /*
  |--------------------------------------------------------------------------
  | BACK MENU
  |--------------------------------------------------------------------------
  */

  bot.action(
    'back_menu',
    showMainMenu
  )

}