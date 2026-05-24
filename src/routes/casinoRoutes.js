module.exports = (bot) => {

  const {

    openCasino,

    playDiceGame,

    playSlots

  } = require(
    '../handlers/casinoHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | CASINO PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'casino_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openCasino(ctx)

      } catch (error) {

        console.log(
          'CASINO PANEL ERROR:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | DICE GAME
  |--------------------------------------------------------------------------
  */

  bot.action(

    'dice_game',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await playDiceGame(ctx)

      } catch (error) {

        console.log(
          'DICE GAME ERROR:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SLOTS GAME
  |--------------------------------------------------------------------------
  */

  bot.action(

    'slots_game',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await playSlots(ctx)

      } catch (error) {

        console.log(
          'SLOTS GAME ERROR:',
          error
        )

      }

    }

  )

}