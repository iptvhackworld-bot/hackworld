module.exports = (bot) => {

  const {

    featureListing

  } = require(
    '../services/marketService'
  )

  const env =
  require(
    '../config/env'
  )

  /*
  |--------------------------------------------------------------------------
  | FEATURE LISTING
  |--------------------------------------------------------------------------
  */

  bot.command(

    'feature',

    async (ctx) => {

      try {

        if (

          ctx.from.id.toString()

          !==

          env.ownerId

        ) {

          return
        }

        const args =
          ctx.message.text
          .split(' ')

        const listingId =
          args[1]

        if (!listingId) {

          return ctx.reply(
`
❌ Utilisation :

/feature listingId
`
          )

        }

        await featureListing(

          listingId,

          7

        )

        await ctx.reply(
`
⭐ Listing mis en avant.
`
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}