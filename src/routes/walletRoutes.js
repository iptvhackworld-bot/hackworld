module.exports = (bot) => {

  const {

    openWalletPanel

  } = require(
    '../handlers/walletHandler'
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

        await openWalletPanel(ctx)

      } catch (error) {

        console.log(error)

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

        await ctx.reply(
`
💳 Dépôt bientôt disponible.
`
        )

      } catch (error) {

        console.log(error)

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

        await ctx.reply(
`
🏦 Retrait bientôt disponible.
`
        )

      } catch (error) {

        console.log(error)

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

        await ctx.reply(
`
📜 Historique bientôt disponible.
`
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}