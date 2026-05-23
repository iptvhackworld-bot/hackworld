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
    openAdminPanel
  } = require(
    '../handlers/adminHandler'
  )

  const {
    openContentMenu
  } = require(
    '../handlers/adminContentMenuHandler'
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

  const {
    openShopAdmin,
    addItemPanel,
    handleShopAdminInput,
    viewShopItems
  } = require(
    '../handlers/adminShopHandler'
  )
  
  const {

  openEscrowPanel,

  createEscrowPanel,

  handleEscrowInput,

  buyerConfirmHandler,

  sellerConfirmHandler,

  disputeHandler

} = require(
  '../handlers/escrowHandler'
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

      } catch (error) {}

      await showMainMenu(ctx)

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
  | ADMIN SHOP
  |--------------------------------------------------------------------------
  */

  bot.action(
    'admin_shop',
    async (ctx) => {

      await ctx.answerCbQuery()

      await openShopAdmin(ctx)

    }
  )

  bot.action(
    'add_shop_item',
    async (ctx) => {

      await ctx.answerCbQuery()

      await addItemPanel(ctx)

    }
  )

  bot.action(
    'view_shop_items',
    async (ctx) => {

      await ctx.answerCbQuery()

      await viewShopItems(ctx)

    }
  )

  /*
  |--------------------------------------------------------------------------
  | MODERATION
  |--------------------------------------------------------------------------
  */

  bot.action(
    'admin_moderation',
    async (ctx) => {

      await ctx.answerCbQuery()

      await openModerationPanel(ctx)

    }
  )

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
  | SUPPORT
  |--------------------------------------------------------------------------
  */

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
| ESCROW
|--------------------------------------------------------------------------
*/

bot.action(

  'escrow_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openEscrowPanel(ctx)

  }

)

bot.action(

  'create_escrow',

  async (ctx) => {

    await ctx.answerCbQuery()

    await createEscrowPanel(ctx)

  }

)

bot.action(

  /^buyer_confirm_(.+)$/,

  async (ctx) => {

    const id =
      ctx.match[1]

    await buyerConfirmHandler(
      ctx,
      id
    )

  }

)

bot.action(

  /^seller_confirm_(.+)$/,

  async (ctx) => {

    const id =
      ctx.match[1]

    await sellerConfirmHandler(
      ctx,
      id
    )

  }

)

bot.action(

  /^escrow_dispute_(.+)$/,

  async (ctx) => {

    const id =
      ctx.match[1]

    await disputeHandler(
      ctx,
      id
    )

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
  | BACK
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
  | TEXT INPUTS
  |--------------------------------------------------------------------------
  */

  bot.on(

  'text',

  async (ctx) => {

    await handleModerationInput(ctx)

    await handleTicketInput(ctx)

    await handleAdminTicketInput(ctx)

    await handleShopAdminInput(ctx)

    await handleEscrowInput(ctx)

    await handleAdminInput(ctx)

  }

)

}