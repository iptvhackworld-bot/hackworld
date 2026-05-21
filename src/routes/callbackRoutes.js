module.exports = (bot) => {
	
	bot.action(

  'support_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openSupportPanel(ctx)

  }

)

bot.action(

  'admin_tickets',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openAdminTickets(ctx)

  }

)

bot.action(

  'close_ticket',

  async (ctx) => {

    await ctx.answerCbQuery()

    await closeTicketPanel(ctx)

  }

)

  /*
  |--------------------------------------------------------------------------
  | IMPORTS
  |--------------------------------------------------------------------------
  */

  const {

    startHandler,

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

    handleAdminInput,

    giveMoneyPanel,

    giveXPPanel,

    setAdmin,

    setMod,

    resetInventory,

    resetUser

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

  const {

    openCasinoPanel,

    rouletteHandler

  } = require(
    '../handlers/casinoHandler'
  )

  const {

    openShop,

    buyHandler

  } = require(
    '../handlers/shopHandler'
  )
  
  const {

  openModerationPanel,

  warnUserPanel,

  removeWarnPanel,

  muteUserPanel,

  unmuteUserPanel,

  blacklistUserPanel,

  unblacklistUserPanel,

  openUserLogs,

  openAntiSpamPanel,

  handleModerationInput

} = require(
  '../handlers/moderationHandler'
)

const {

  openSupportPanel,

  openAdminTickets,

  closeTicketPanel,

  handleTicketInput,

  handleAdminTicketInput

} = require(
  '../handlers/ticketHandler'
)




  /*
  |--------------------------------------------------------------------------
  | ACCEPT RULES
  |--------------------------------------------------------------------------
  */

  bot.action(

    'accept_rules',

    async (ctx) => {

      await ctx.answerCbQuery()

      try {

        await ctx.deleteMessage()

      }

      catch (error) {}

      await showMainMenu(ctx)

    }

  )
  
  
/*
|--------------------------------------------------------------------------
| MODERATION PANEL
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_moderation',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openModerationPanel(ctx)

  }

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
  | CONTENT
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
  | ANALYTICS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'top_users',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showTopUsersAnalytics(ctx)

    }

  )

  bot.action(

    'rich_users',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showRichestUsers(ctx)

    }

  )

  bot.action(

    'top_gamblers',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showTopGamblers(ctx)

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

  /^user_(\d+)$/,

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
  | GIVE MONEY
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^givemoney_(.+)$/,

    async (ctx) => {

      await ctx.answerCbQuery()

      await giveMoneyPanel(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | GIVE XP
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^givexp_(.+)$/,

    async (ctx) => {

      await ctx.answerCbQuery()

      await giveXPPanel(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SET ADMIN
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^setadmin_(.+)$/,

    async (ctx) => {

      const id =
        Number(
          ctx.match[1]
        )

      await setAdmin(

        ctx,

        id

      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SET MOD
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^setmod_(.+)$/,

    async (ctx) => {

      const id =
        Number(
          ctx.match[1]
        )

      await setMod(

        ctx,

        id

      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | RESET USER
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^resetuser_(.+)$/,

    async (ctx) => {

      const id =
        Number(
          ctx.match[1]
        )

      await resetUser(

        ctx,

        id

      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | BAN
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

      await ctx.reply(
`
🚫 Utilisateur banni.
`
      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | UNBAN
  |--------------------------------------------------------------------------
  */

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
✅ Utilisateur débanni.
`
      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | RESET MONEY
  |--------------------------------------------------------------------------
  */

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
💰 Argent reset.
`
      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | RESET XP
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | RESET INVENTORY
  |--------------------------------------------------------------------------
  */

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
| MODERATION ACTIONS
|--------------------------------------------------------------------------
*/

bot.action(

  'warn_user',

  async (ctx) => {

    await ctx.answerCbQuery()

    await warnUserPanel(ctx)

  }

)

bot.action(

  'removewarn_user',

  async (ctx) => {

    await ctx.answerCbQuery()

    await removeWarnPanel(ctx)

  }

)

bot.action(

  'mute_user',

  async (ctx) => {

    await ctx.answerCbQuery()

    await muteUserPanel(ctx)

  }

)

bot.action(

  'unmute_user',

  async (ctx) => {

    await ctx.answerCbQuery()

    await unmuteUserPanel(ctx)

  }

)

bot.action(

  'blacklist_user',

  async (ctx) => {

    await ctx.answerCbQuery()

    await blacklistUserPanel(ctx)

  }

)

bot.action(

  'unblacklist_user',

  async (ctx) => {

    await ctx.answerCbQuery()

    await unblacklistUserPanel(ctx)

  }

)

bot.action(

  'user_logs',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openUserLogs(ctx)

  }

)

bot.action(

  'antispam_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openAntiSpamPanel(ctx)

  }

)

  /*
  |--------------------------------------------------------------------------
  | SHOP
  |--------------------------------------------------------------------------
  */

  bot.action(

    'shop_menu',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openShop(ctx)

    }

  )

  bot.action(

    /^buy_(.+)$/,

    async (ctx) => {

      await ctx.answerCbQuery()

      await buyHandler(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | CASINO
  |--------------------------------------------------------------------------
  */

  bot.action(

    'casino_menu',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openCasinoPanel(ctx)

    }

  )

  bot.action(

    'casino_roulette',

    async (ctx) => {

      await ctx.answerCbQuery()

      await rouletteHandler(ctx)

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

  /*
  |--------------------------------------------------------------------------
  | TEXT ADMIN INPUT
  |--------------------------------------------------------------------------
  */

  bot.on(

    'text',

    async (ctx) => {
		
	  await handleModerationInput(ctx)

      await handleAdminInput(ctx)

    }

  )

}
)

  /*
  |--------------------------------------------------------------------------
  | PANEL SUPPORT 
  |--------------------------------------------------------------------------
  */
  

