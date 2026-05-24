module.exports = (bot) => {

  const {

    openMoneyLeaderboard,

    openMessageLeaderboard

  } = require(
    '../handlers/leaderboardHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | MONEY
  |--------------------------------------------------------------------------
  */

  bot.action(

    'leaderboard_money',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openMoneyLeaderboard(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | MESSAGES
  |--------------------------------------------------------------------------
  */

  bot.action(

    'leaderboard_messages',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openMessageLeaderboard(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )

}