const {

  getUserPurchases,

  getSellerSales

} = require(
  '../services/purchaseService'
)

/*
|--------------------------------------------------------------------------
| PURCHASE HISTORY
|--------------------------------------------------------------------------
*/

const openPurchaseHistory =
async (ctx) => {

  try {

    const purchases =
      await getUserPurchases(

        ctx.from.id
      )

    if (!purchases.length) {

      return ctx.reply(
`
❌ Aucun achat.
`
      )

    }

    let message =
`
🛒 HISTORIQUE ACHATS

━━━━━━━━━━━━━━━━━━
`

    purchases.forEach(

      (item) => {

        message +=
`
📦 ${item.title}

💰 ${item.price}$

📂 ${item.category}

📅 ${item.createdAt
.toLocaleDateString()}

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

/*
|--------------------------------------------------------------------------
| SALES HISTORY
|--------------------------------------------------------------------------
*/

const openSalesHistory =
async (ctx) => {

  try {

    const sales =
      await getSellerSales(

        ctx.from.id
      )

    if (!sales.length) {

      return ctx.reply(
`
❌ Aucune vente.
`
      )

    }

    let message =
`
💰 HISTORIQUE VENTES

━━━━━━━━━━━━━━━━━━
`

    sales.forEach(

      (item) => {

        message +=
`
📦 ${item.title}

💰 ${item.price}$

👤 @${item.buyerUsername}

📅 ${item.createdAt
.toLocaleDateString()}

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

  openPurchaseHistory,

  openSalesHistory

}