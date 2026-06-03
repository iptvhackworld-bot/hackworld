module.exports = (bot) => {

  const {

  openCasinoPanel,

  rouletteHandler,

  slotsHandler,

  blackjackHandler

} = require(
  '../handlers/casinoHandler'
)
  
  const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

  bot.action(

  'casino_panel',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `CASINO_PANEL ${ctx.from.id}`
      )

      await openCasinoPanel(ctx)

    }

    catch (error) {

      logError(
        'CASINO_PANEL',
        error
      )

    }

  }

)

  bot.action(

  'casino_roulette',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `CASINO_ROULETTE ${ctx.from.id}`
      )

      await rouletteHandler(ctx)

    }

    catch (error) {

      logError(
        'CASINO_ROULETTE',
        error
      )

    }

  }

)

/*
|--------------------------------------------------------------------------
| SLOTS
|--------------------------------------------------------------------------
*/

bot.action(

  'casino_slots',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `CASINO_SLOTS ${ctx.from.id}`
      )

      await slotsHandler(ctx)

    }

    catch (error) {

      logError(
        'CASINO_SLOTS',
        error
      )

    }

  }

)

/*
|--------------------------------------------------------------------------
| BLACKJACK
|--------------------------------------------------------------------------
*/

bot.action(

  'casino_blackjack',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `CASINO_BLACKJACK ${ctx.from.id}`
      )

      await blackjackHandler(ctx)

    }

        catch (error) {

      logError(
        'CASINO_BLACKJACK',
        error
      )

    }

  }

)

}