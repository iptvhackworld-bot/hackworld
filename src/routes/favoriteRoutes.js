module.exports = (bot) => {

  const {

    favoriteItem,

    openFavorites

  } = require(
    '../handlers/favoriteHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | FAVORITE ITEM
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^favorite_(.+)$/,

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        const listingId =
          ctx.match[1]

        await favoriteItem(

          ctx,

          listingId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | FAVORITES
  |--------------------------------------------------------------------------
  */

  bot.command(

    'favorites',

    async (ctx) => {

      try {

        await openFavorites(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}