module.exports = (bot) => {

  const {

    openProfile,

    openProfileStats,

    openProfileBadges,

    openProfileHistory

  } = require(
    '../handlers/profileHandler'
  )

  const {

    logError

  } = require(
    '../utils/logger'
  )

  /*
  |--------------------------------------------------------------------------
  | PROFILE
  |--------------------------------------------------------------------------
  */

  bot.action(

    'profile',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openProfile(
          ctx
        )

      }

      catch (error) {

        logError(
          'PROFILE',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  bot.action(

    'profile_stats',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openProfileStats(
          ctx
        )

      }

      catch (error) {

        logError(
          'PROFILE_STATS',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | BADGES
  |--------------------------------------------------------------------------
  */

  bot.action(

    'profile_badges',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openProfileBadges(
          ctx
        )

      }

      catch (error) {

        logError(
          'PROFILE_BADGES',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | HISTORY
  |--------------------------------------------------------------------------
  */

  bot.action(

    'profile_history',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openProfileHistory(
          ctx
        )

      }

      catch (error) {

        logError(
          'PROFILE_HISTORY',
          error
        )

      }

    }

  )

}

  /*
  |--------------------------------------------------------------------------
  | PROFILE INVETAIRE 
  |--------------------------------------------------------------------------
  */
  
  bot.action(

  'profile_inventory',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openInventory(
      ctx
    )

  }

)

bot.action(

  'profile_achievements',

  async (ctx) => {

    await ctx.answerCbQuery()

    await openAchievements(
      ctx
    )

  }

)