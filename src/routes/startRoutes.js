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
| BACK MAIN MENU
|--------------------------------------------------------------------------
*/

bot.action(

  'back_main_menu',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      const {

        showMainMenu

      } = require(
        '../handlers/startHandler'
      )

      await showMainMenu(ctx)

    }

    catch (error) {

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