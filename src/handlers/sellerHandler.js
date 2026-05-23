const { Markup } =
require('telegraf')

const MarketListing =
require(
  '../models/MarketListing'
)

const User =
require(
  '../models/User'
)

const Escrow =
require(
  '../models/Escrow'
)

const Transaction =
require(
  '../models/Transaction'
)

/*
|--------------------------------------------------------------------------
| SELLER DASHBOARD
|--------------------------------------------------------------------------
*/

const openSellerDashboard =
async (ctx) => {

  const user =
    await User.findOne({

      id: ctx.from.id

    })

  if (!user) {

    return ctx.reply(
`
❌ Utilisateur introuvable.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | LISTINGS
  |--------------------------------------------------------------------------
  */

  const listings =
    await MarketListing.find({

      sellerId:
      ctx.from.id

    })

  /*
  |--------------------------------------------------------------------------
  | ESCROWS
  |--------------------------------------------------------------------------
  */

  const escrows =
    await Escrow.find({

      sellerId:
      ctx.from.id

    })

  /*
  |--------------------------------------------------------------------------
  | CALCULS
  |--------------------------------------------------------------------------
  */

  let revenue =
    0

  escrows.forEach((e) => {

    if (

      e.status ===
      'completed'

    ) {

      revenue +=
        e.amount

    }

  })

  /*
  |--------------------------------------------------------------------------
  | ACTIVE LISTINGS
  |--------------------------------------------------------------------------
  */

  const activeListings =
    listings.filter(

      (x) => !x.sold

    ).length

  /*
  |--------------------------------------------------------------------------
  | ACTIVE ESCROWS
  |--------------------------------------------------------------------------
  */

  const activeEscrows =
    escrows.filter(

      (x) =>

        x.status ===
        'pending'

    ).length

  /*
  |--------------------------------------------------------------------------
  | BADGE
  |--------------------------------------------------------------------------
  */

  let badge =
    '👤 Seller'

  if (

    user.trustedSeller

  ) {

    badge =
      '👑 Trusted Seller'

  }

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  await ctx.reply(

`
👑 SELLER DASHBOARD

━━━━━━━━━━━━━━━━━━

${badge}

━━━━━━━━━━━━━━━━━━

⭐ Rating :
${user.sellerRating.toFixed(1)}/5

📦 Ventes :
${user.sellerSales}

💰 Revenus :
${revenue}$

🛒 Listings actifs :
${activeListings}

💳 Escrows actifs :
${activeEscrows}

━━━━━━━━━━━━━━━━━━
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '📈 Analytics',
      'seller_analytics'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| SELLER ANALYTICS
|--------------------------------------------------------------------------
*/

const openSellerAnalytics =
async (ctx) => {

  const user =
    await User.findOne({

      id: ctx.from.id

    })

  if (!user) {

    return ctx.reply(
`
❌ Utilisateur introuvable.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | ESCROWS
  |--------------------------------------------------------------------------
  */

  const escrows =
    await Escrow.find({

      sellerId:
      ctx.from.id

    })

  /*
  |--------------------------------------------------------------------------
  | TRANSACTIONS
  |--------------------------------------------------------------------------
  */

  const transactions =
    await Transaction.find({

      userId:
      ctx.from.id

    })

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  let totalRevenue =
    0

  let completedSales =
    0

  let disputes =
    0

  escrows.forEach((e) => {

    if (

      e.status ===
      'completed'

    ) {

      totalRevenue +=
        e.amount

      completedSales++

    }

    if (

      e.status ===
      'dispute'

    ) {

      disputes++

    }

  })

  /*
  |--------------------------------------------------------------------------
  | SUCCESS RATE
  |--------------------------------------------------------------------------
  */

  let successRate =
    0

  if (

    escrows.length > 0

  ) {

    successRate =

      (

        completedSales /

        escrows.length

      ) * 100

  }

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  await ctx.reply(

`
📈 SELLER ANALYTICS

━━━━━━━━━━━━━━━━━━

⭐ Rating :
${user.sellerRating.toFixed(1)}/5

📦 Total ventes :
${completedSales}

💰 Revenus :
${totalRevenue}$

⚠️ Disputes :
${disputes}

📊 Success Rate :
${successRate.toFixed(1)}%

💳 Transactions :
${transactions.length}

━━━━━━━━━━━━━━━━━━
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '👑 Dashboard',
      'seller_dashboard'
    )

  ]

])

  )

}

module.exports = {

  openSellerDashboard,

  openSellerAnalytics

}