module.exports = (bot) => {

  /*
  |--------------------------------------------------------------------------
  | IMPORTS
  |--------------------------------------------------------------------------
  */

  const {

    openAdminPanel

  } = require(
    '../handlers/adminHandler'
  )

  const {

    openModerationPanel,

    warnUserPanel,

    muteUserPanel,

    banUserPanel,

    unbanUserPanel,

    handleModerationInput

  } = require(
    '../handlers/moderationHandler'
  )

  const {

    openTicketPanel,

    handleTicketInput,

    handleAdminTicketInput,

    closeTicket

  } = require(
    '../handlers/ticketHandler'
  )

  const {

    openMarket,

    createListingPanel,

    featureListingPanel,

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

  } = require(
    '../handlers/sellerHandler'
  )

  const {

    openCryptoPanel,

    openDepositPanel,

    askDepositAmount,

    openWithdrawPanel,

    askWithdrawAmount,

    handleCryptoInput,

    openCryptoHistory

  } = require(
    '../handlers/cryptoHandler'
  )

  const {

    openPremiumPanel,

    buyPremiumPlan

  } = require(
    '../handlers/premiumHandler'
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

    addDigitalProductPanel,

    handleShopAdminInput

  } = require(
    '../handlers/adminShopHandler'
  )

  const {

    handleEscrowInput

  } = require(
    '../handlers/escrowHandler'
  )

  const {

    handleWalletInput

  } = require(
    '../handlers/walletHandler'
  )

  const {

    handleAdminInput

  } = require(
    '../handlers/adminInputHandler'
  )
  
  const {

  openFraudLogs

} = require(
  '../handlers/fraudHandler'
)

const {

  verifySeller

} = require(
  '../handlers/verifyHandler'
)

const {

  openMarketAnalytics

} = require(
  '../handlers/marketAnalyticsHandler'
)

const {

  openMoneyLeaderboard,

  openSellerLeaderboard,

  openXpLeaderboard,

  openCryptoLeaderboard

} = require(
  '../handlers/leaderboardHandler'
)

const {

  openLeaderboardPanel

} = require(
  '../handlers/leaderboardMenuHandler'
)

const {

  openRoulette,

  askRouletteBet,

  handleRouletteInput

} = require(
  '../handlers/rouletteHandler'
)

const {

  openBlackjack,

  handleBlackjackInput,

  blackjackHit,

  blackjackStand

} = require(
  '../handlers/blackjackHandler'
)

const {

  openMines,

  handleMinesInput,

  pickMineTile,

  minesCashout

} = require(
  '../handlers/minesHandler'
)

const {

  openCrash,

  handleCrashInput,

  crashCashout

} = require(
  '../handlers/crashHandler'
)

const {

  openJackpot,

  joinJackpot,

  drawJackpot

} = require(
  '../handlers/jackpotHandler'
)

const {

  claimDaily

} = require(
  '../handlers/dailyHandler'
)

const {

  spinWheel

} = require(
  '../handlers/spinHandler'
)

const {

  openLootboxes,

  openLootboxReward

} = require(
  '../handlers/lootboxHandler'
)

const {

  openQuests,

  claimQuestReward

} = require(
  '../handlers/questHandler'
)

const {

  openProfile

} = require(
  '../handlers/profileHandler'
)

const {

  prestigeAccount

} = require(
  '../handlers/prestigeHandler'
)

const {

  openDice,

  handleDiceInput

} = require(
  '../handlers/diceHandler'
)

const {

  openPets,

  openPetBox,

  activatePetHandler

} = require(
  '../handlers/petHandler'
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

    'mute_user',

    async (ctx) => {

      await ctx.answerCbQuery()

      await muteUserPanel(ctx)

    }

  )

  bot.action(

    'ban_user',

    async (ctx) => {

      await ctx.answerCbQuery()

      await banUserPanel(ctx)

    }

  )

  bot.action(

    'unban_user',

    async (ctx) => {

      await ctx.answerCbQuery()

      await unbanUserPanel(ctx)

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

      await openTicketPanel(ctx)

    }

  )

  bot.action(

    'close_ticket',

    async (ctx) => {

      await ctx.answerCbQuery()

      await closeTicket(ctx)

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

    'feature_listing',

    async (ctx) => {

      await ctx.answerCbQuery()

      await featureListingPanel(ctx)

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

  bot.action(

    /^rate_(.+)_(.+)$/,

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
  | SELLER
  |--------------------------------------------------------------------------
  */

  bot.action(

    'seller_dashboard',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openSellerDashboard(ctx)

    }

  )

  bot.action(

    'seller_analytics',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openSellerAnalytics(ctx)

    }

  )

  /*
  |--------------------------------------------------------------------------
  | CRYPTO
  |--------------------------------------------------------------------------
  */

  bot.action(

    'crypto_panel',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openCryptoPanel(ctx)

    }

  )

  bot.action(

    'crypto_history',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openCryptoHistory(ctx)

    }

  )

  bot.action(

    'crypto_deposit',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openDepositPanel(ctx)

    }

  )

  bot.action(

    'crypto_withdraw',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openWithdrawPanel(ctx)

    }

  )

  bot.action(

    /^deposit_(.+)$/,

    async (ctx) => {

      const coin =
        ctx.match[1]

      await askDepositAmount(

        ctx,

        coin

      )

    }

  )

  bot.action(

    /^withdraw_(.+)$/,

    async (ctx) => {

      const coin =
        ctx.match[1]

      await askWithdrawAmount(

        ctx,

        coin

      )

    }

  )

  /*
  |--------------------------------------------------------------------------
  | PREMIUM
  |--------------------------------------------------------------------------
  */

  bot.action(

    'premium_panel',

    async (ctx) => {

      await ctx.answerCbQuery()

      await openPremiumPanel(ctx)

    }

  )

  bot.action(

    'buy_vip',

    async (ctx) => {

      await buyPremiumPlan(

        ctx,

        'VIP',

        10,

        30

      )

    }

  )

  bot.action(

    'buy_premium',

    async (ctx) => {

      await buyPremiumPlan(

        ctx,

        'PREMIUM',

        25,

        30

      )

    }

  )

  bot.action(

    'buy_seller_plus',

    async (ctx) => {

      await buyPremiumPlan(

        ctx,

        'SELLER+',

        50,

        30

      )

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

    'wallet_logs',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showFinanceLogs(ctx)

    }

  )

  bot.action(

    'wallet_stats',

    async (ctx) => {

      await ctx.answerCbQuery()

      await showWalletStats(ctx)

    }

  )

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
  | DIGITAL PRODUCTS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'add_digital_product',

    async (ctx) => {

      await ctx.answerCbQuery()

      await addDigitalProductPanel(ctx)

    }

  )
  
   /*
  |--------------------------------------------------------------------------
  | ANTI FRAUD LOGS 
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'fraud_logs',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openFraudLogs(ctx)

  }

)

/*
  |--------------------------------------------------------------------------
  | VERIFY SELLER 
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  /^verify_seller_(.+)$/,

  async (ctx) => {

    const userId =
      Number(
        ctx.match[1]
      )

    await verifySeller(

      ctx,

      userId

    )

  }

)

/*
  |--------------------------------------------------------------------------
  | MARKET ANALYSTICS
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'market_analytics',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openMarketAnalytics(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| LEADERBOARDS
|--------------------------------------------------------------------------
*/

bot.action(

  'top_money',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openMoneyLeaderboard(ctx)

  }

)

bot.action(

  'top_sellers',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openSellerLeaderboard(ctx)

  }

)

bot.action(

  'top_xp',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openXpLeaderboard(ctx)

  }

)

bot.action(

  'top_crypto',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openCryptoLeaderboard(ctx)

  }

)

/*
  |--------------------------------------------------------------------------
  | LEADERBOARDS
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'leaderboards',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openLeaderboardPanel(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| BLACKJACK
|--------------------------------------------------------------------------
*/

bot.action(

  'blackjack_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openBlackjack(ctx)

  }

)

bot.action(

  'blackjack_hit',

  async (ctx) => {

    await blackjackHit(ctx)

  }

)

bot.action(

  'blackjack_stand',

  async (ctx) => {

    await blackjackStand(ctx)

  }

)
  
  /*
|--------------------------------------------------------------------------
| ROULETTE
|--------------------------------------------------------------------------
*/

bot.action(

  'roulette_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openRoulette(ctx)

  }

)

bot.action(

  'roulette_red',

  async (ctx) => {

    await askRouletteBet(

      ctx,

      'red'

    )

  }

)

bot.action(

  'roulette_black',

  async (ctx) => {

    await askRouletteBet(

      ctx,

      'black'

    )

  }

)

bot.action(

  'roulette_green',

  async (ctx) => {

    await askRouletteBet(

      ctx,

      'green'

    )

  }

)

/*
|--------------------------------------------------------------------------
| MINES
|--------------------------------------------------------------------------
*/

bot.action(

  'mines_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openMines(ctx)

  }

)

bot.action(

  /^mine_(.+)$/,

  async (ctx) => {

    const index =
      Number(
        ctx.match[1]
      )

    await pickMineTile(

      ctx,

      index

    )

  }

)

bot.action(

  'mines_cashout',

  async (ctx) => {

    await minesCashout(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| CRASH
|--------------------------------------------------------------------------
*/

bot.action(

  'crash_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openCrash(ctx)

  }

)

bot.action(

  'crash_cashout',

  async (ctx) => {

    await crashCashout(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| JACKPOT
|--------------------------------------------------------------------------
*/

bot.action(

  'jackpot_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openJackpot(ctx)

  }

)

bot.action(

  'join_jackpot',

  async (ctx) => {

    await joinJackpot(ctx)

  }

)

bot.action(

  'draw_jackpot',

  async (ctx) => {

    await drawJackpot(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| DAILY
|--------------------------------------------------------------------------
*/

bot.action(

  'daily_reward',

  async (ctx) => {

    await ctx.answerCbQuery()

    await claimDaily(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| SPIN WHEEL
|--------------------------------------------------------------------------
*/

bot.action(

  'spin_wheel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await spinWheel(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| LOOTBOXES
|--------------------------------------------------------------------------
*/

bot.action(

  'lootboxes_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openLootboxes(ctx)

  }

)

bot.action(

  'lootbox_common',

  async (ctx) => {

    await openLootboxReward(

      ctx,

      'common'

    )

  }

)

bot.action(

  'lootbox_rare',

  async (ctx) => {

    await openLootboxReward(

      ctx,

      'rare'

    )

  }

)

bot.action(

  'lootbox_legendary',

  async (ctx) => {

    await openLootboxReward(

      ctx,

      'legendary'

    )

  }

)

/*
|--------------------------------------------------------------------------
| PETS
|--------------------------------------------------------------------------
*/

bot.action(

  'pets_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openPets(ctx)

  }

)

bot.action(

  'open_pet_box',

  async (ctx) => {

    await openPetBox(ctx)

  }

)

bot.action(

  /^activate_pet_(.+)$/,

  async (ctx) => {

    const petId =
      ctx.match[1]

    await activatePetHandler(

      ctx,

      petId

    )

  }

)

/*
|--------------------------------------------------------------------------
| QUESTS
|--------------------------------------------------------------------------
*/

bot.action(

  'quests_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openQuests(ctx)

  }

)

bot.action(

  /^claim_quest_(.+)$/,

  async (ctx) => {

    const questId =
      ctx.match[1]

    await claimQuestReward(

      ctx,

      questId

    )

  }

)

/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

bot.action(

  'profile_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openProfile(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| PRESTIGE
|--------------------------------------------------------------------------
*/

bot.action(

  'prestige_account',

  async (ctx) => {

    await ctx.answerCbQuery()

    await prestigeAccount(ctx)

  }

)

/*
|--------------------------------------------------------------------------
| DICE
|--------------------------------------------------------------------------
*/

bot.action(

  'dice_panel',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openDice(ctx)

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

    const {

      startHandler

    } = require(
      '../handlers/startHandler'
    )

    await startHandler(ctx)

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

      await handleCryptoInput(ctx)
	  
	  await handleDiceInput(ctx)
	  
	  await handleCrashInput(ctx)
	  
	  await handleMinesInput(ctx)
	  
	  await handleBlackjackInput(ctx)
	  
	  await handleRouletteInput(ctx)

      await handleAdminInput(ctx)

    }

  )

}