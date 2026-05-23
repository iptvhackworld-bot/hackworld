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

const {

  openWallet,

  walletHistory,

  transferPanel,

  handleWalletInput

} = require(
  '../handlers/walletHandler'
)

const {

  openFinancePanel,

  showFinanceLogs,

  showWalletStats,

  freezeWalletPanel,

  unfreezeWalletPanel,

  handleFinanceInput

} = require(
  '../handlers/adminFinanceHandler'
)

const {

  openMarket,

  createListingPanel,

  handleMarketInput,

  viewMarket,

  buyMarketItem,

  rateSeller,

  marketDeliveryHandler,

  marketDisputeHandler

} = require(
  '../handlers/marketHandler'
)

const {

  openSellerDashboard,

  openSellerAnalytics

}


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
| WALLET
|--------------------------------------------------------------------------
*/

bot.action(

  'wallet_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openWallet(ctx)

  }

)

bot.action(

  'wallet_history',

  async (ctx) => {

    await ctx.answerCbQuery()

    await walletHistory(ctx)

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
  | WALLET TRANSFERT 
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'wallet_transfer',

  async (ctx) => {

    await ctx.answerCbQuery()

    await transferPanel(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| FINANCE
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_finance',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openFinancePanel(ctx)

  }

)

bot.action(

  'finance_logs',

  async (ctx) => {

    await ctx.answerCbQuery()

    await showFinanceLogs(ctx)

  }

)

bot.action(

  'finance_stats',

  async (ctx) => {

    await ctx.answerCbQuery()

    await showWalletStats(ctx)

  }

)

/*
  |--------------------------------------------------------------------------
  | Freeze walet 
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'freeze_wallet',

  async (ctx) => {

    await ctx.answerCbQuery()

    await freezeWalletPanel(ctx)

  }

)

bot.action(

  'unfreeze_wallet',

  async (ctx) => {

    await ctx.answerCbQuery()

    await unfreezeWalletPanel(ctx)

  }

)

/*
  |--------------------------------------------------------------------------
  | RATE 
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  /^rate_(.+)_(\d)$/,

  async (ctx) => {

    const id =
      ctx.match[1]

    const rating =
      Number(
        ctx.match[2]
      )

    await rateSeller(

      ctx,

      id,

      rating

    )

  }

)

/*
  |--------------------------------------------------------------------------
  | MARKET DELIVERED 
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  /^market_delivered_(.+)$/,

  async (ctx) => {

    const escrowId =
      ctx.match[1]

    await marketDeliveryHandler(

      ctx,

      escrowId

    )

  }

)

bot.action(

  /^market_dispute_(.+)$/,

  async (ctx) => {

    const escrowId =
      ctx.match[1]

    await marketDisputeHandler(

      ctx,

      escrowId

    )

  }

)

/*
|--------------------------------------------------------------------------
| MARKETPLACE
|--------------------------------------------------------------------------
*/

bot.action(

  'market_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openMarket(ctx)

  }

)

bot.action(

  'create_listing',

  async (ctx) => {

    await ctx.answerCbQuery()

    await createListingPanel(ctx)

  }

)

bot.action(

  'view_market',

  async (ctx) => {

    await ctx.answerCbQuery()

    await viewMarket(ctx)

  }

)

bot.action(

  /^buy_market_(.+)$/,

  async (ctx) => {

    const id =
      ctx.match[1]

    await buyMarketItem(

      ctx,

      id

    )

  }

)

/*
|--------------------------------------------------------------------------
| SELLER DASHBOARD
|--------------------------------------------------------------------------
*/

bot.action(

  'seller_dashboard',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openSellerDashboard(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| SELLER ANALYSTICS 
|--------------------------------------------------------------------------
*/

bot.action(

  'seller_analytics',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openSellerAnalytics(ctx)

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

    await handleWalletInput(ctx)

    await handleFinanceInput(ctx)

    await handleMarketInput(ctx)

    await handleAdminInput(ctx)

  }

)