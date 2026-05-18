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

    openAddContent

  } = require(
    '../handlers/adminContentHandler'
  )

  const {

    showContentList

  } = require(
    '../handlers/adminEditHandler'
  )

  const {

    startBroadcast

  } = require(
    '../handlers/broadcastHandler'
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

    openUserProfile,

    openSearchUser,

    handleSearchUser,

    resetInventory

  } = require(
    '../handlers/manageUsersHandler'
  )

  const {

    banUser,

    unbanUser,

    resetMoney,

    resetXP

  } = require(
    '../services/userService'
  )

  const {

    openContentMenu

  } = require(
    '../handlers/adminContentMenuHandler'
  )

  const {

    openDashboard

  } = require(
    '../handlers/dashboardHandler'
  )
  
  const {

  showTopUsersAnalytics,

  showRichestUsers,

  showTopGamblers

} = require(
  '../handlers/userAnalyticsHandler'
)

  /*
  |--------------------------------------------------------------------------
  | ADMIN PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_panel',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openAdminPanel(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | CONTENT PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_content',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openContentMenu(ctx)

    }

  )

  bot.action(

    'admin_add_content',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openAddContent(ctx)

    }

  )

  bot.action(

    'admin_edit_content',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showContentList(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | DASHBOARD
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_dashboard',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openDashboard(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | USERS PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_users',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openUsersPanel(ctx)

    }

  )

  bot.action(

    /^user_(.+)$/,

    async (ctx) => {

      await ctx.answerCbQuery()

      await openUserProfile(ctx)

    }

  )

  bot.action(

    'search_user',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openSearchUser(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | USER ACTIONS
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^ban_(.+)$/,

    async (ctx) => {

      const id =
        Number(
          ctx.match[1]
        )

      await banUser(id)

      await ctx.answerCbQuery(
        '🚫 User banni'
      )

      await ctx.reply(
`
🚫 Utilisateur banni.
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

      await ctx.answerCbQuery(
        '✅ User débanni'
      )

      await ctx.reply(
`
✅ Utilisateur débanni.
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

      await ctx.answerCbQuery(
        '💰 Money reset'
      )

      await ctx.reply(
`
💰 Argent reset.
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

      await ctx.answerCbQuery(
        '⭐ XP reset'
      )

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

      await ctx.answerCbQuery(
        '🎒 Inventory reset'
      )

    }

  )
  
  bot.action(

  'admin_analytics',

  async (ctx) => {

    await ctx.reply(
`
📊 ANALYTICS PANEL

━━━━━━━━━━━━━━━━━━
`
    )

  }

)

bot.action(

  'top_users',

  showTopUsersAnalytics

)

bot.action(

  'rich_users',

  showRichestUsers

)

bot.action(

  'top_gamblers',

  showTopGamblers

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

      await showStats(ctx)

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

      await showLogs(ctx)

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

      await openSecurityPanel(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | BROADCAST
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_broadcast',

    async (ctx) => {

      await ctx.answerCbQuery()

      await startBroadcast(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | PLACEHOLDERS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'admin_shop',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
        '🛒 Shop panel bientôt disponible.'
      )

    }

  )

  bot.action(

    'admin_casino',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
        '🎰 Casino panel bientôt disponible.'
      )

    }

  )

  bot.action(

    'admin_lootbox',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
        '🎁 Lootbox panel bientôt disponible.'
      )

    }

  )

  bot.action(

    'admin_staff',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
        '👮 Staff panel bientôt disponible.'
      )

    }

  )

  bot.action(

    'admin_settings',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
        '⚙️ Settings bientôt disponible.'
      )

    }

  )

  bot.action(

    'admin_economy',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
        '💰 Economy panel bientôt disponible.'
      )

    }

  )

  bot.action(

    'admin_tickets',

    async (ctx) => {

      await ctx.answerCbQuery()

      await ctx.reply(
        '🎫 Tickets panel bientôt disponible.'
      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | RATING
  |--------------------------------------------------------------------------
  */

  bot.action(

    'rate_1',

    async (ctx) => {

      await ctx.answerCbQuery()

      await rateBot(
        ctx,
        1
      )

    }

  )

  bot.action(

    'rate_5',

    async (ctx) => {

      await ctx.answerCbQuery()

      await rateBot(
        ctx,
        5
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

      await ctx.answerCbQuery()

      await ctx.deleteMessage()

      await showMainMenu(ctx)

    }

  )

  bot.action(

    'decline_rules',

    async (ctx) => {

      await ctx.answerCbQuery()

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

    async (ctx) => {

      await ctx.answerCbQuery()

      await openStaffMenu(ctx)

    }

  )

  bot.action(

    'show_admins',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showAdmins(ctx)

    }

  )

  bot.action(

    'show_mods',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showModerators(ctx)

    }

  )

  bot.action(

    'show_top_users',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showTopUsers(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | CATEGORIES
  |--------------------------------------------------------------------------
  */

  bot.action(

    /cat_(.+)/,

    async (ctx) => {

      await ctx.answerCbQuery()

      await categoryHandler(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | NAVIGATION
  |--------------------------------------------------------------------------
  */

  bot.action(

    /next_(.+)_(\d+)/,

    async (ctx) => {

      await ctx.answerCbQuery()

      await navigationHandler(
        ctx,
        'next'
      )

    }

  )

  bot.action(

    /prev_(.+)_(\d+)/,

    async (ctx) => {

      await ctx.answerCbQuery()

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

    async (ctx) => {

      await ctx.answerCbQuery()

      await showMainMenu(ctx)

    }

  )

}