module.exports = (bot) => {

  const {

    openCasinoPanel,

    rouletteHandler

  } = require(
    '../handlers/casinoHandler'
  )

  bot.action(

    'casino_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openCasinoPanel(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )

  bot.action(

    'casino_roulette',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await rouletteHandler(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )

}