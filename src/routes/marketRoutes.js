const { Markup } =
require('telegraf')

module.exports = (bot) => {

  const {

    openMarket,

    createListingPanel,

    viewMarket,

    buyMarketItem,

    rateSeller,

    reviewProduct,

    openCategory

  } = require(
    '../handlers/marketHandler'
  )

  const {

    openSellerProfile

  } = require(
    '../handlers/profileHandler'
  )

  const {

    openMarketAnalytics

  } = require(
    '../handlers/marketAnalyticsHandler'
  )
  
  const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

  /*
  |--------------------------------------------------------------------------
  | MARKET PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

  'market_panel',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `MARKET_PANEL ${ctx.from.id}`
      )

      await openMarket(ctx)

    }

    catch (error) {

      logError(
        'MARKET_PANEL',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | CREATE LISTING
  |--------------------------------------------------------------------------
  */

  bot.action(

    'create_listing',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()
		
		logInfo(
          `CREATE_LISTING ${ctx.from.id}`
        )

        await createListingPanel(ctx)

      } catch (error) {

        console.log(
          'CREATE_LISTING:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | VIEW MARKET
  |--------------------------------------------------------------------------
  */

  bot.action(

    'view_market',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()
		
		logInfo(
          `VIEW_MARKET ${ctx.from.id}`
        )

        await viewMarket(ctx)

      } catch (error) {

        console.log(
          'VIEW_MARKET:',
          error
        )

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | BUY ITEM
  |--------------------------------------------------------------------------
  */

  bot.action(

  /^buy_market_(.+)$/,

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `BUY_ITEM ${ctx.from.id}`
      )

      const id =
        ctx.match[1]

      await buyMarketItem(

        ctx,

        id

      )

    }

    catch (error) {

      logError(
        'BUY_ITEM',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | RATE SELLER
  |--------------------------------------------------------------------------
  */

  bot.action(

  /^rate_(.+)_(.+)$/,

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `RATE_SELLER ${ctx.from.id}`
      )

      const id =
        ctx.match[1]

      const rating =
        Number(
          ctx.match[2]
        )

      await rateSeller(

        ctx,

        id,

        rating

      )

    }

    catch (error) {

      logError(
        'RATE_SELLER',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | REVIEW PRODUCT
  |--------------------------------------------------------------------------
  */

  bot.action(

  /^review_(.+)_(.+)$/,

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `REVIEW_PRODUCT ${ctx.from.id}`
      )

      const listingId =
        ctx.match[1]

      const rating =
        Number(
          ctx.match[2]
        )

      await reviewProduct(

        ctx,

        listingId,

        rating

      )

    }

    catch (error) {

      logError(
        'REVIEW_PRODUCT',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | SELLER PROFILE
  |--------------------------------------------------------------------------
  */

  bot.action(

  /^seller_(.+)$/,

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `SELLER_PROFILE ${ctx.from.id}`
      )

      const sellerId =
        ctx.match[1]

      await openSellerProfile(

        ctx,

        sellerId

      )

    }

    catch (error) {

      logError(
        'SELLER_PROFILE',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | CATEGORIES PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

  'market_categories',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `MARKET_CATEGORIES ${ctx.from.id}`
      )

      await ctx.reply(

`
📂 Catégories
`,

        Markup.inlineKeyboard([

          [

            Markup.button.callback(
              '🎮 Gaming',
              'category_Gaming'
            )

          ],

          [

            Markup.button.callback(
              '📺 Streaming',
              'category_Streaming'
            )

          ],

          [

            Markup.button.callback(
              '💻 Software',
              'category_Software'
            )

          ],

          [

            Markup.button.callback(
              '📱 Accounts',
              'category_Accounts'
            )

          ],

          [

            Markup.button.callback(
              '🏠 Menu',
              'back_main_menu'
            )

          ]

        ])

      )

    }

    catch (error) {

      logError(
        'MARKET_CATEGORIES',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | OPEN CATEGORY
  |--------------------------------------------------------------------------
  */

  bot.action(

  /^category_(.+)$/,

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `OPEN_CATEGORY ${ctx.from.id}`
      )

      const category =
        ctx.match[1]

      await openCategory(

        ctx,

        category

      )

    }

    catch (error) {

      logError(
        'OPEN_CATEGORY',
        error
      )

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | MARKET ANALYTICS
  |--------------------------------------------------------------------------
  */

  bot.action(

  'market_analytics',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      logInfo(
        `MARKET_ANALYTICS ${ctx.from.id}`
      )

      await openMarketAnalytics(
        ctx
      )

    }

    catch (error) {

      logError(
        'MARKET_ANALYTICS',
        error
      )

    }

  }

)

}