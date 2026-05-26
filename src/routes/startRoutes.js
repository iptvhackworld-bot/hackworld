module.exports = (bot) => {

  const {

    showMainMenu

  } = require(
    '../handlers/startHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | ACCEPT RULES
  |--------------------------------------------------------------------------
  */

  bot.action(

    'accept_rules',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await showMainMenu(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | DECLINE RULES
  |--------------------------------------------------------------------------
  */

  bot.action(

    'decline_rules',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
❌ Accès refusé.
`
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}