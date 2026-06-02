module.exports = (bot) => {

  const {

    openProfile

  } = require(
    '../handlers/profileHandler'
  )

  const {

    logInfo,

    logError

  } = require(
    '../utils/logger'
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

        logInfo(
          `PROFILE_PANEL ${ctx.from.id}`
        )

        await openProfile(ctx)

      }

      catch (error) {

        logError(
          'PROFILE_PANEL',
          error
        )

      }

    }

  )

}