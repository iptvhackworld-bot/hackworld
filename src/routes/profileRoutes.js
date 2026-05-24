module.exports = (bot) => {

  const {

    openProfile

  } = require(
    '../handlers/profileHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | PROFILE PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'profile_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openProfile(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )

}