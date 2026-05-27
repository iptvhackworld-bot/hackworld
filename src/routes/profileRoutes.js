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

      console.log('PROFILE CLICK')

      await openProfile(ctx)

    } catch (error) {

      console.log(error)

    }

  }

)