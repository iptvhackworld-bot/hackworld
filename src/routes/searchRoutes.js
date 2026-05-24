module.exports = (bot) => {

  const {

    searchMarket

  } = require(
    '../handlers/marketHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  bot.command(

    'search',

    async (ctx) => {

      try {

        const args =
          ctx.message.text
          .split(' ')

        args.shift()

        const query =
          args.join(' ')

        if (!query) {

          return ctx.reply(
`
❌ Utilisation :

/search mot-clé
`
          )

        }

        await searchMarket(

          ctx,

          query

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}