const {

  addFavorite,

  getFavorites

} = require(
  '../services/favoriteService'
)

const {

  getListing

} = require(
  '../services/marketService'
)

/*
|--------------------------------------------------------------------------
| ADD FAVORITE
|--------------------------------------------------------------------------
*/

const favoriteItem =
async (

  ctx,

  listingId

) => {

  try {

    const item =
      await getListing(
        listingId
      )

    if (!item) {

      return ctx.reply(
`
❌ Produit introuvable.
`
      )

    }

    const added =
      await addFavorite(

        ctx.from.id,

        listingId

      )

    if (!added) {

      return ctx.reply(
`
❌ Déjà en favoris.
`
      )

    }

    await ctx.reply(
`
❤️ Ajouté aux favoris.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| OPEN FAVORITES
|--------------------------------------------------------------------------
*/

const openFavorites =
async (ctx) => {

  try {

    const favorites =
      await getFavorites(

        ctx.from.id
      )

    if (!favorites.length) {

      return ctx.reply(
`
❌ Aucun favori.
`
      )

    }

    let message =
`
❤️ FAVORIS

━━━━━━━━━━━━━━━━━━
`

    favorites.forEach(

      (item) => {

        message +=
`
📦 ${item.title}

💰 ${item.price}$

━━━━━━━━━━━━━━━━━━
`

      }

    )

    await ctx.reply(
      message
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  favoriteItem,

  openFavorites

}