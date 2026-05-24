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

        await openMarket(ctx)

      } catch (error) {

        console.log(
          'MARKET PANEL ERROR:',
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

        await createListingPanel(ctx)

      } catch (error) {

        console.log(
          'CREATE LISTING ERROR:',
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

        await viewMarket(ctx)

      } catch (error) {

        console.log(
          'VIEW MARKET ERROR:',
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

        const id =
          ctx.match[1]

        await buyMarketItem(

          ctx,

          id

        )

      } catch (error) {

        console.log(
          'BUY ITEM ERROR:',
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

      } catch (error) {

        console.log(
          'RATE SELLER ERROR:',
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

      } catch (error) {

        console.log(
          'REVIEW PRODUCT ERROR:',
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

        const sellerId =
          ctx.match[1]

        await openSellerProfile(

          ctx,

          sellerId

        )

      } catch (error) {

        console.log(
          'SELLER PROFILE ERROR:',
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

            ]

          ])

        )

      } catch (error) {

        console.log(
          'CATEGORIES ERROR:',
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

        const category =
          ctx.match[1]

        await openCategory(

          ctx,

          category

        )

      } catch (error) {

        console.log(
          'OPEN CATEGORY ERROR:',
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

        await openMarketAnalytics(ctx)

      } catch (error) {

        console.log(
          'MARKET ANALYTICS ERROR:',
          error
        )

      }

    }

  )

}