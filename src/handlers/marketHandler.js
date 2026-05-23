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

const {

  createMarketEscrow

} = require(
  '../services/escrowService'
)

const {

  addMoney

} = require(
  '../services/walletService'
)

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

  /*
  |--------------------------------------------------------------------------
  | CREATE ESCROW
  |--------------------------------------------------------------------------
  */

  const escrow =
    await createMarketEscrow(

      ctx.from.id,

      item.sellerId,

      item.price,

      item._id.toString()

    )

  await markSold(id)

  await ctx.reply(

`
💰 Escrow créé.

🆔 ${escrow._id}

📦 ${item.title}

👤 vendeur :
@${item.sellerUsername}

💰 ${item.price}$

━━━━━━━━━━━━━━━━━━

📦 Le vendeur doit
maintenant livrer.
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '📦 Livraison reçue',
      `market_delivered_${escrow._id}`
    )

  ],

  [

    Markup.button.callback(
      '⚠️ Ouvrir dispute',
      `market_dispute_${escrow._id}`
    )

  ],

  [

    Markup.button.callback(
      '⭐ 1',
      `rate_${item._id}_1`
    ),

    Markup.button.callback(
      '⭐ 2',
      `rate_${item._id}_2`
    ),

    Markup.button.callback(
      '⭐ 3',
      `rate_${item._id}_3`
    )

  ],

  [

    Markup.button.callback(
      '⭐ 4',
      `rate_${item._id}_4`
    ),

    Markup.button.callback(
      '⭐ 5',
      `rate_${item._id}_5`
    )

  ]

])

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

/*
|--------------------------------------------------------------------------
| DELIVERY CONFIRM
|--------------------------------------------------------------------------
*/

const marketDeliveryHandler =
async (

  ctx,

  escrowId

) => {

  const Escrow =
  require(
    '../models/Escrow'
  )

  const escrow =
    await Escrow.findById(
      escrowId
    )

  if (!escrow) {

    return ctx.reply(
`
❌ Escrow introuvable.
`
    )

  }

  escrow.status =
    'completed'

  escrow.buyerConfirmed =
    true

  await escrow.save()

  /*
  |--------------------------------------------------------------------------
  | PAY SELLER
  |--------------------------------------------------------------------------
  */

  await addMoney(

    escrow.sellerId,

    escrow.amount,

    'Marketplace escrow'

  )

  await ctx.reply(
`
✅ Livraison confirmée.

💰 Fonds envoyés
au vendeur.
`
  )

}

/*
|--------------------------------------------------------------------------
| MARKET DISPUTE
|--------------------------------------------------------------------------
*/

const marketDisputeHandler =
async (

  ctx,

  escrowId

) => {

  const Escrow =
  require(
    '../models/Escrow'
  )

  const escrow =
    await Escrow.findById(
      escrowId
    )

  if (!escrow) {

    return ctx.reply(
`
❌ Escrow introuvable.
`
    )

  }

  escrow.disputed =
    true

  escrow.status =
    'dispute'

  await escrow.save()

  await ctx.reply(
`
⚠️ Dispute ouverte.

Un admin interviendra.
`
  )

}

module.exports = {

  openMarket,

  createListingPanel,

  handleMarketInput,

  viewMarket,

  buyMarketItem,

  rateSeller,

  marketDeliveryHandler,

  marketDisputeHandler

}