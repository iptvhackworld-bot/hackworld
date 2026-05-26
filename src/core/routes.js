const registerRoutes =
(bot) => {

  bot.start(

    async (ctx) => {

      await ctx.reply(
        '✅ BOT OK'
      )

    }

  )

}

module.exports =
registerRoutes