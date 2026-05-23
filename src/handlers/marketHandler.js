const { Markup } =
require('telegraf')

const {

  createListing,

  getListings,

  getListing,

  markSold,
  
  addSellerReview

} = require(
  '../services/marketService'
)

const {

  removeMoney

} = require(
  '../services/walletService'
)

if (!global.marketSessions) {

  global.marketSessions = {}

}

/*
|--------------------------------------------------------------------------
| PANEL
|--------------------------------------------------------------------------
*/

const openMarket =
async (ctx) => {

  await ctx.reply(

`
🛒 MARKETPLACE

━━━━━━━━━━━━━━━━━━

📦 Vente sécurisée

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '➕ Créer annonce',
          'create_listing'
        )

      ],

      [

        Markup.button.callback(
          '📜 Voir annonces',
          'view_market'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| CREATE PANEL
|--------------------------------------------------------------------------
*/

const createListingPanel =
async (ctx) => {

  global.marketSessions[
    ctx.from.id
  ] = {

    action:
    'create_listing'

  }

  await ctx.reply(
`
📦 Envoyez :

titre | prix

Exemple :

Netflix Premium | 50
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleMarketInput =
async (ctx) => {

  const session =

    global.marketSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  if (

    session.action ===
    'create_listing'

  ) {

    const args =
      ctx.message.text.split('|')

    if (

      args.length < 2

    ) {

      return ctx.reply(
`
❌ Format invalide.
`
      )

    }

    const title =
      args[0].trim()

    const price =
      Number(
        args[1]
      )

    const listing =
      await createListing({

        sellerId:
        ctx.from.id,

        sellerUsername:
        ctx.from.username,

        title,

        price

      })

    delete global.marketSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
✅ Annonce créée.

📦 ${title}

💰 ${price}$
`
    )

  }

}

/*
|--------------------------------------------------------------------------
| VIEW MARKET
|--------------------------------------------------------------------------
*/

const viewMarket =
async (ctx) => {

  const listings =
    await getListings()

  if (

    !listings.length

  ) {

    return ctx.reply(
`
❌ Aucune annonce.
`
    )

  }

  for (const item of listings) {

    await ctx.reply(

`
📦 ${item.title}

👤 @${item.sellerUsername}

💰 ${item.price}$

━━━━━━━━━━━━━━━━━━
`,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '💳 Acheter',
            `buy_market_${item._id}`
          )

        ]

      ])

    )

  }

}

/*
|--------------------------------------------------------------------------
| BUY
|--------------------------------------------------------------------------
*/

const buyMarketItem =
async (

  ctx,

  id

) => {

  const item =
    await getListing(id)

  if (

    !item ||

    item.sold

  ) {

    return ctx.reply(
`
❌ Item indisponible.
`
    )

  }

  const paid =
    await removeMoney(

      ctx.from.id,

      item.price,

      `Achat marketplace`

    )

  if (!paid) {

    return ctx.reply(
`
❌ Solde insuffisant.
`
    )

  }

  await markSold(id)

  await ctx.reply(
`
✅ Achat effectué.

📦 ${item.title}

👤 vendeur :
@${item.sellerUsername}
`
  )

}

/*
|--------------------------------------------------------------------------
| RATE SELLER
|--------------------------------------------------------------------------
*/

const rateSeller =
async (

  ctx,

  id,

  rating

) => {

  const item =
    await getListing(id)

  if (!item) {

    return ctx.reply(
`
❌ Vente introuvable.
`
    )

  }

  await addSellerReview(

    item.sellerId,

    rating

  )

  await ctx.reply(
`
⭐ Note envoyée :

${rating}/5
`
  )

}

module.exports = {

  openMarket,

  createListingPanel,

  handleMarketInput,

  viewMarket,

  buyMarketItem

}