const { Markup } =
require('telegraf')

const {

  removeMoney

} = require(
  '../services/walletService'
)

const {

  createReview

} = require(
  '../services/reviewService'
)

const {

  createPurchase

} = require(
  '../services/purchaseService'
)

const {

  createLog

} = require(
  '../services/logService'
)

const {

  checkCooldown

} = require(
  '../middlewares/securityMiddleware'
)

const {

  containsBlacklistedWord

} = require(
  '../middlewares/blacklistMiddleware'
)

const {

  createListing,

  getListings,

  getListing,

  markSold,

  addSellerReview,

  searchListings,

  getCategoryListings

} = require(
  '../services/marketService'
)

const {

  getNotificationUsers

} = require(
  '../services/notificationService'
)

const {

  isPremium

} = require(
  '../services/premiumService'
)

const {

  logInfo,

  logError,

  logEconomy

} = require(
  '../utils/logger'
)

/*
|--------------------------------------------------------------------------
| SESSIONS
|--------------------------------------------------------------------------
*/

if (!global.marketSessions) {

  global.marketSessions = {}

}

/*
|--------------------------------------------------------------------------
| MARKET PANEL
|--------------------------------------------------------------------------
*/

const openMarket =
async (ctx) => {

  try {

    logInfo(
      `OPEN_MARKET ${ctx.from.id}`
    )

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

        ],

        [

          Markup.button.callback(
            '📊 Analytics',
            'market_analytics'
          )

        ],

        [

          Markup.button.callback(
            '📂 Catégories',
            'market_categories'
          )

        ]

      ])

    )

  } catch (error) {

  logError(
    'OPEN_MARKET',
    error
  )

}

}

/*
|--------------------------------------------------------------------------
| CREATE PANEL
|--------------------------------------------------------------------------
*/

const createListingPanel =
async (ctx) => {

  try {

    global.marketSessions[
      ctx.from.id
    ] = {

      action:
      'create_listing',

      step: 1

    }
	
	logInfo(
  `CREATE_LISTING_PANEL ${ctx.from.id}`
)

    await ctx.reply(
`
📦 Envoyez :

titre | prix | catégorie

Exemple :

Netflix Premium | 50 | Accounts
`
    )

  } catch (error) {

  logError(
    'CREATE_LISTING_PANEL',
    error
  )

}

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleMarketInput =
async (ctx) => {

  try {

    const session =

      global.marketSessions[
        ctx.from.id
      ]

    if (!session) {

      return false

    }

    /*
    |--------------------------------------------------------------------------
    | STEP 1
    |--------------------------------------------------------------------------
    */

    if (

      session.action ===
      'create_listing'

      &&

      session.step === 1

    ) {

      const args =
        ctx.message.text.split('|')

      if (

        args.length < 3

      ) {

        return ctx.reply(
`
❌ Format invalide.

Format :

titre | prix | catégorie
`
        )

      }

      const title =
        args[0].trim()

      /*
      |--------------------------------------------------------------------------
      | BLACKLIST
      |--------------------------------------------------------------------------
      */

      if (

        containsBlacklistedWord(
          title
        )

      ) {

        return ctx.reply(
`
❌ Contenu interdit détecté.
`
        )

      }

      const price =
        Number(
          args[1]
        )

      const category =
        args[2]?.trim()

        || 'Other'

      if (

        isNaN(price)

      ) {

        return ctx.reply(
`
❌ Prix invalide.
`
        )

      }

      session.title =
        title

      session.price =
        price

      session.category =
        category

      session.step = 2

      return ctx.reply(
`
📸 Envoyez maintenant l'image du produit.
`
      )

    }

    /*
    |--------------------------------------------------------------------------
    | IMAGE STEP
    |--------------------------------------------------------------------------
    */

    if (

      session.action ===
      'create_listing'

      &&

      session.step === 2

    ) {

      if (

        !ctx.message.photo

      ) {

        return ctx.reply(
`
❌ Envoyez une image.
`
        )

      }

      /*
      |--------------------------------------------------------------------------
      | COOLDOWN
      |--------------------------------------------------------------------------
      */

      if (

        !checkCooldown(

          ctx.from.id,

          'create_listing',

          60

        )

      ) {

        return ctx.reply(
`
⏳ Attendez avant de recréer une annonce.
`
        )

      }

      const photo =

        ctx.message.photo[
          ctx.message.photo.length - 1
        ]

      const fileId =
        photo.file_id

      /*
      |--------------------------------------------------------------------------
      | CREATE LISTING
      |--------------------------------------------------------------------------
      */

      await createListing({

        sellerId:
        ctx.from.id,

        sellerUsername:
        ctx.from.username ||

        'unknown',

        title:
        session.title,

        price:
        session.price,

        category:
        session.category,

        imageUrl:
        fileId

      })

      logInfo(
        `LISTING_CREATED ${ctx.from.id} ${session.title}`
      )

      /*
      |--------------------------------------------------------------------------
      | NOTIFICATIONS
      |--------------------------------------------------------------------------
      */

      const users =
        getNotificationUsers()

      for (const userId of users) {

  try {

    if (

      Number(userId)

      ===

      ctx.from.id

    ) {

      continue

    }

    await ctx.telegram.sendMessage(

      userId,

`
🆕 Nouvelle annonce

📦 ${session.title}

💰 ${session.price}$
`
    )

  }

  catch (error) {

    logError(
      'MARKET_NOTIFICATION',
      error
    )

  }

}

      /*
      |--------------------------------------------------------------------------
      | CLEAN SESSION
      |--------------------------------------------------------------------------
      */

      delete global.marketSessions[
        ctx.from.id
      ]

      /*
      |--------------------------------------------------------------------------
      | LOG
      |--------------------------------------------------------------------------
      */

      await createLog(

        ctx.from.id,

        ctx.from.username ||

        'unknown',

        'CREATE_LISTING',

        `Création annonce ${session.title}`

      )

      return ctx.reply(
`
✅ Annonce créée avec image.
`
      )

    }

    return false

  } catch (error) {

  logError(
    'HANDLE_MARKET_INPUT',
    error
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

  try {

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

      if (item.imageUrl) {

        await ctx.replyWithPhoto(

          item.imageUrl,

          {

            caption:
`
${item.featured
? '⭐ FEATURED LISTING ⭐\n'
: ''}

📦 ${item.title}

📂 ${item.category}

👤 @${item.sellerUsername}

${await isPremium(item.sellerId)
? '👑 Premium Seller'
: ''}

${item.verifiedSeller
? '✅ Vendeur vérifié'
: '❌ Non vérifié'}

💰 ${item.price}$

⭐ ${item.averageRating || 0}/5

📝 ${item.reviewCount || 0} avis
`,

            reply_markup:

            Markup.inlineKeyboard([

              [

                Markup.button.callback(
                  '💳 Acheter',
                  `buy_market_${item._id}`
                )

              ],

              [

                Markup.button.callback(
                  '❤️ Favori',
                  `favorite_${item._id}`
                )

              ],

              [

                Markup.button.callback(
                  '👤 Profil vendeur',
                  `seller_${item.sellerId}`
                )

              ],

              [

                Markup.button.callback(
                  '⭐ 5',
                  `review_${item._id}_5`
                ),

                Markup.button.callback(
                  '⭐ 4',
                  `review_${item._id}_4`
                ),

                Markup.button.callback(
                  '⭐ 3',
                  `review_${item._id}_3`
                )

              ]

            ]).reply_markup

          }

        )

        continue

      }

      await ctx.reply(

`
${item.featured
? '⭐ FEATURED LISTING ⭐\n'
: ''}

📦 ${item.title}

📂 ${item.category}

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

          ],

          [

            Markup.button.callback(
              '❤️ Favori',
              `favorite_${item._id}`
            )

          ],

          [

            Markup.button.callback(
              '👤 Profil vendeur',
              `seller_${item.sellerId}`
            )

          ]

        ])

      )

    }

  } catch (error) {

    logError(
    'VIEW_MARKET',
    error
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

  try {

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

        'Marketplace achat'

      )

    if (!paid) {

      return ctx.reply(
`
❌ Solde insuffisant.
`
      )

    }

    await markSold(id)
	
	logEconomy(
  `MARKET_PURCHASE ${ctx.from.id} ${item.price}$`
)

    await createPurchase({

      buyerId:
      ctx.from.id,

      buyerUsername:
      ctx.from.username ||

      'unknown',

      sellerId:
      item.sellerId,

      sellerUsername:
      item.sellerUsername,

      listingId:
      item._id,

      title:
      item.title,

      category:
      item.category,

      price:
      item.price

    })

    await createLog(

      ctx.from.id,

      ctx.from.username ||

      'unknown',

      'BUY_ITEM',

      `Achat de ${item.title}`

    )

    await ctx.reply(
`
✅ Achat effectué.

📦 ${item.title}

👤 vendeur :
@${item.sellerUsername}
`
    )

  } catch (error) {

    logError(
    'BUY_MARKET_ITEM',
    error
  )

  }

}

/*
|--------------------------------------------------------------------------
| REVIEW PRODUCT
|--------------------------------------------------------------------------
*/

const reviewProduct =
async (

  ctx,

  listingId,

  rating

) => {

  try {

    const listing =
      await getListing(
        listingId
      )

    if (!listing) {

      return ctx.reply(
`
❌ Produit introuvable.
`
      )

    }

    if (

      !checkCooldown(

        ctx.from.id,

        'review',

        30

      )

    ) {

      return ctx.reply(
`
⏳ Attendez avant de renoter.
`
      )

    }

    const created =
      await createReview(

        ctx.from.id,

        listing.sellerId,

        listingId,

        rating,

        ''

      )
	  
	  logInfo(
  `REVIEW_PRODUCT ${ctx.from.id} ${rating}/5`
)

    if (!created) {

      return ctx.reply(
`
❌ Vous avez déjà noté ce produit.
`
      )

    }

    await createLog(

      ctx.from.id,

      ctx.from.username ||

      'unknown',

      'REVIEW_PRODUCT',

      `Review ${rating}/5 pour ${listing.title}`

    )

    await ctx.reply(
`
⭐ Avis ajouté :

${rating}/5
`
    )

  } catch (error) {

    logError(
  'REVIEW_PRODUCT',
  error
)

  }

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

  try {

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
	
	logInfo(
  `RATE_SELLER ${ctx.from.id} ${rating}/5`
)

    await ctx.reply(
`
⭐ Note vendeur envoyée :

${rating}/5
`
    )

  } catch (error) {

    logError(
  'RATE_SELLER',
  error
)

  }

}

/*
|--------------------------------------------------------------------------
| SEARCH MARKET
|--------------------------------------------------------------------------
*/

const searchMarket =
async (

  ctx,

  query

) => {

  try {

    const listings =
      await searchListings(
        query
      )

    if (!listings.length) {

      return ctx.reply(
`
❌ Aucun résultat.
`
      )

    }

    for (const item of listings) {

      await ctx.reply(

`
${item.featured
? '⭐ FEATURED LISTING ⭐\n'
: ''}

📦 ${item.title}

📂 ${item.category}

💰 ${item.price}$

👤 @${item.sellerUsername}
`
      )

    }

  } catch (error) {

    logError(
  'SEARCH_MARKET',
  error
)

  }

}

/*
|--------------------------------------------------------------------------
| OPEN CATEGORY
|--------------------------------------------------------------------------
*/

const openCategory =
async (

  ctx,

  category

) => {

  try {

    logInfo(
      `OPEN_CATEGORY ${ctx.from.id} ${category}`
    )

    const listings =
      await getCategoryListings(
        category
      )

    if (!listings.length) {

      return ctx.reply(
`
❌ Aucun produit dans cette catégorie.
`
      )

    }

    for (const item of listings) {

      await ctx.reply(

`
${item.featured
? '⭐ FEATURED LISTING ⭐\n'
: ''}

📦 ${item.title}

📂 ${item.category}

💰 ${item.price}$

👤 @${item.sellerUsername}
`
      )

    }

  } catch (error) {

    logError(
  'OPEN_CATEGORY',
  error
)

  }

}

module.exports = {

  openMarket,

  createListingPanel,

  handleMarketInput,

  viewMarket,

  buyMarketItem,

  reviewProduct,

  rateSeller,

  searchMarket,

  openCategory

}