const {

  getShopItems,

  buyItem

} = require(
  '../services/shopService'
)

const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| SHOP PANEL
|--------------------------------------------------------------------------
*/

const openShop =
async (ctx) => {

  const items =
    await getShopItems()

  if (
    items.length === 0
  ) {

    return ctx.reply(
`
❌ Aucun item shop.
`
    )

  }

  const buttons =
    items.map((item) => {

      return [

        Markup.button.callback(

          `${item.emoji} ${item.name} • ${item.price}$`,

          `buy_${item.id}`

        )

      ]

    })

  await ctx.reply(

`
🛒 PREMIUM SHOP

━━━━━━━━━━━━━━━━━━

Choisissez un item

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard(
      buttons
    )

  )

}

/*
|--------------------------------------------------------------------------
| BUY
|--------------------------------------------------------------------------
*/

const buyHandler =
async (ctx) => {

  const itemId =
    ctx.match[1]

  const result =
    await buyItem(

      ctx.from.id,

      itemId

    )

  if (result.error) {

    return ctx.reply(
`
❌ ${result.error}
`
    )

  }

  await ctx.reply(

`
🛒 ACHAT EFFECTUÉ

━━━━━━━━━━━━━━━━━━

${result.item.emoji} ${result.item.name}

💰 Argent restant :
${result.money}$

━━━━━━━━━━━━━━━━━━
`

  )

}

module.exports = {

  openShop,

  buyHandler

}