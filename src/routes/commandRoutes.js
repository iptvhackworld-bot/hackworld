module.exports = (bot) => {

  bot.start(

    async (ctx) => {

      try {

        await ctx.reply(
          '✅ START OK'
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}