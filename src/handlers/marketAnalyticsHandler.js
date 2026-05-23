const MarketListing =
require(
  '../models/MarketListing'
)

const Escrow =
require(
  '../models/Escrow'
)

const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| MARKET ANALYTICS
|--------------------------------------------------------------------------
*/

const openMarketAnalytics =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | LOAD
  |--------------------------------------------------------------------------
  */

  const listings =
    await MarketListing.find()

  const escrows =
    await Escrow.find()

  const users =
    await User.find()

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  const totalListings =
    listings.length

  const totalSales =
    listings.filter(

      (x) => x.sold

    ).length

  let totalRevenue =
    0

  escrows.forEach((e) => {

    if (

      e.status ===
      'completed'

    ) {

      totalRevenue +=
        e.amount

    }

  })

  /*
  |--------------------------------------------------------------------------
  | TOP SELLER
  |--------------------------------------------------------------------------
  */

  const topSeller =
    users.sort(

      (a, b) =>

        b.sellerSales -

        a.sellerSales

    )[0]

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
📈 MARKET ANALYTICS

━━━━━━━━━━━━━━━━━━

📦 Listings :
${totalListings}

💰 Sales :
${totalSales}

💵 Revenue :
${totalRevenue}$

━━━━━━━━━━━━━━━━━━

👑 Top Seller :

${topSeller
? `@${topSeller.username}`
: 'Aucun'}

━━━━━━━━━━━━━━━━━━
`
  )

}

module.exports = {

  openMarketAnalytics

}