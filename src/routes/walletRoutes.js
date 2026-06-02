module.exports = (bot) => {

  const {

    openWalletPanel

  } = require(
    '../handlers/walletHandler'
  )

  const {

    logInfo,

    logError

  } = require(
    '../utils/logger'
  )

  /*
  |--------------------------------------------------------------------------
  | WALLET PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'wallet_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        logInfo(
          `WALLET_PANEL ${ctx.from.id}`
        )

        await openWalletPanel(ctx)

      }

      catch (error) {

        logError(
          'WALLET_PANEL',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | WALLET DEPOSIT
  |--------------------------------------------------------------------------
  */

  bot.action(

    'wallet_deposit',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        logInfo(
          `WALLET_DEPOSIT ${ctx.from.id}`
        )

        await ctx.reply(
`
💳 Dépôt bientôt disponible.
`
        )

      }

      catch (error) {

        logError(
          'WALLET_DEPOSIT',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | WALLET WITHDRAW
  |--------------------------------------------------------------------------
  */

  bot.action(

    'wallet_withdraw',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        logInfo(
          `WALLET_WITHDRAW ${ctx.from.id}`
        )

        await ctx.reply(
`
🏦 Retrait bientôt disponible.
`
        )

      }

      catch (error) {

        logError(
          'WALLET_WITHDRAW',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | WALLET LOGS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'wallet_logs',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        logInfo(
          `WALLET_LOGS ${ctx.from.id}`
        )

        await ctx.reply(
`
📜 Historique bientôt disponible.
`
        )

      }

      catch (error) {

        logError(
          'WALLET_LOGS',
          error
        )

      }

    }

  )

}