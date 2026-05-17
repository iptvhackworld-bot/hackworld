module.exports = (bot) => {

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

  const {

    openAdminPanel

  } = require(
    '../handlers/adminHandler'
  )

  const {

    openAddContent,

    handleAddContent

  } = require(
    '../handlers/adminContentHandler'
  )
  
  const {

  showContentList

} = require(
  '../handlers/adminEditHandler'
)

const {

  startBroadcast,

  handleBroadcastText,

  handleBroadcastMedia

} = require(
  '../handlers/broadcastHandler'
)

  /*
  |--------------------------------------------------------------------------
  | RATING
  |--------------------------------------------------------------------------
  */

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
  | ADMIN PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_panel',

    openAdminPanel

  )

  /*
  |--------------------------------------------------------------------------
  | ADD CONTENT
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_add_content',

    openAddContent

  )

  /*
  |--------------------------------------------------------------------------
  | HANDLE TEXT
  |--------------------------------------------------------------------------
  */

  bot.on(

    'text',

    handleAddContent

  )

  /*
  |--------------------------------------------------------------------------
  | EDIT CONTENT
  |--------------------------------------------------------------------------
  */

bot.action(

  'admin_edit_content',

  showContentList

)

  /*
  |--------------------------------------------------------------------------
  | BROADCAST
  |--------------------------------------------------------------------------
  */

bot.action(

  'admin_broadcast',

  startBroadcast

)

bot.on(

  'text',

  handleBroadcastText

)

bot.on(

  'photo',

  handleBroadcastMedia

)

bot.on(

  'video',

  handleBroadcastMedia

)

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_stats',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
`
📊 STATISTIQUES

✅ Système opérationnel.
`
      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | LOGS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_logs',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
`
📜 LOGS

Logs système disponibles.
`
      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SECURITY
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_security',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
`
🔒 SÉCURITÉ

Protection active.
`
      )

    }

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