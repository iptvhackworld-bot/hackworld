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

  const {

    openUsersPanel,

    openUserPanel,

    banUser,

    unbanUser,

    resetMoney,

    resetXP

  } = require(
    '../handlers/manageUsersHandler'
  )
  
  const {

  showStats

} = require(
  '../handlers/adminStatsHandler'
)

const {

  showLogs

} = require(
  '../handlers/adminLogsHandler'
)

const {

  openSecurityPanel

} = require(
  '../handlers/securityHandler'
)

const {

  openUsersPanel,

  openSearchUser,

  handleSearchUser,

  resetInventory

} = require(
  '../handlers/manageUsersHandler'
)

  /*
  |--------------------------------------------------------------------------
  | USER PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    /user_(\d+)/,

    openUserPanel

  )

  bot.action(

    'ban_user',

    banUser

  )

  bot.action(

    'unban_user',

    unbanUser

  )

  bot.action(

    'reset_money',

    resetMoney

  )

  bot.action(

    'reset_xp',

    resetXP

  )
  
  bot.action(

  'admin_users',

  openUsersPanel

)

bot.action(

  'search_user',

  openSearchUser

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
  | ADMIN ADD CONTENT
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_add_content',

    openAddContent

  )

  /*
  |--------------------------------------------------------------------------
  | ADMIN EDIT CONTENT
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_edit_content',

    showContentList

  )
  
  bot.action(

  'admin_stats',

  showStats

)

bot.action(

  'admin_logs',

  showLogs

)

bot.action(

  'admin_security',

  openSecurityPanel

)

  /*
  |--------------------------------------------------------------------------
  | ADMIN BROADCAST
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_broadcast',

    startBroadcast

  )

  /*
  |--------------------------------------------------------------------------
  | ADMIN USERS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_users',

    openUsersPanel

  )
  
  bot.action(

  /^ban_(.+)$/,

  async (ctx) => {

    const id =
      Number(
        ctx.match[1]
      )

    await banUser(id)

    await ctx.reply(
`
🚫 User banni.
`
    )

  }

)

bot.action(

  /^unban_(.+)$/,

  async (ctx) => {

    const id =
      Number(
        ctx.match[1]
      )

    await unbanUser(id)

    await ctx.reply(
`
✅ User débanni.
`
    )

  }

)

bot.action(

  /^resetmoney_(.+)$/,

  async (ctx) => {

    const id =
      Number(
        ctx.match[1]
      )

    await resetMoney(id)

    await ctx.reply(
`
💰 Money reset.
`
    )

  }

)

bot.action(

  /^resetxp_(.+)$/,

  async (ctx) => {

    const id =
      Number(
        ctx.match[1]
      )

    await resetXP(id)

    await ctx.reply(
`
⭐ XP reset.
`
    )

  }

)

bot.action(

  /^resetinv_(.+)$/,

  async (ctx) => {

    const id =
      Number(
        ctx.match[1]
      )

    await resetInventory(

      ctx,

      id

    )

  }

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

  bot.on(

    'text',

    handleBroadcastText

  )

  /*
  |--------------------------------------------------------------------------
  | HANDLE MEDIA
  |--------------------------------------------------------------------------
  */

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