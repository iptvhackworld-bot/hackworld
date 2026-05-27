module.exports = (bot) => {

  bot.action(

    'support_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
🎫 Support actif.
`
        )

      }

      catch (error) {

        console.log(error)

      }

    }

  )

}