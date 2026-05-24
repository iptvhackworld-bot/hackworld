const { Markup } =
require('telegraf')

const {

  searchMarket

} = require(
  '../services/searchService'
)

/*
|--------------------------------------------------------------------------
| SEARCH MARKET
|--------------------------------------------------------------------------
*/

const searchMarketplace =
async (

  ctx,

  query

) => {

  try {

    const results =
      await searchMarket(
        query
      )

    if (!results.length) {

      return ctx.reply(
`
❌ Aucun résultat.
`
      )

    }

    for (const item of results) {

      await ctx.reply(

`
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

          ]

        ])

      )

    }

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  searchMarketplace

}