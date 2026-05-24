const {

  filterListings

} = require(
  '../services/marketService'
)

/*
|--------------------------------------------------------------------------
| OPEN FILTERS
|--------------------------------------------------------------------------
*/

const openFilters =
async (ctx) => {

  try {

    const listings =
      await filterListings({

        featured: true,

        verifiedOnly: true,

        sort: 'rating'

      })

    if (!listings.length) {

      return ctx.reply(
`
❌ Aucun résultat.
`
      )

    }

    let message =
`
🔥 FEATURED VERIFIED

━━━━━━━━━━━━━━━━━━
`

    listings.forEach(

      (item) => {

        message +=
`
📦 ${item.title}

💰 ${item.price}$

⭐ ${item.averageRating || 0}/5

👤 @${item.sellerUsername}

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

  openFilters

}