const {

  createDispute,

  getDisputes,

  closeDispute

} = require(
  '../services/disputeService'
)

const Purchase =
require(
  '../models/Purchase'
)

const env =
require(
  '../config/env'
)

/*
|--------------------------------------------------------------------------
| OPEN DISPUTE
|--------------------------------------------------------------------------
*/

const openDispute =
async (

  ctx,

  purchaseId

) => {

  try {

    const purchase =
      await Purchase.findById(
        purchaseId
      )

    if (!purchase) {

      return ctx.reply(
`
❌ Achat introuvable.
`
      )

    }

    await createDispute({

      purchaseId,

      buyerId:
      purchase.buyerId,

      sellerId:
      purchase.sellerId,

      reason:
      'Produit non conforme'

    })

    await ctx.reply(
`
⚠️ Litige ouvert.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| ADMIN DISPUTES
|--------------------------------------------------------------------------
*/

const openAdminDisputes =
async (ctx) => {

  try {

    if (

      ctx.from.id.toString()

      !==

      env.ownerId

    ) {

      return
    }

    const disputes =
      await getDisputes()

    if (!disputes.length) {

      return ctx.reply(
`
✅ Aucun litige.
`
      )

    }

    let message =
`
⚠️ LITIGES OUVERTS

━━━━━━━━━━━━━━━━━━
`

    disputes.forEach(

      (item) => {

        message +=
`
🆔 ${item._id}

👤 Buyer :
${item.buyerId}

👤 Seller :
${item.sellerId}

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
| CLOSE DISPUTE
|--------------------------------------------------------------------------
*/

const resolveDispute =
async (

  ctx,

  disputeId

) => {

  try {

    if (

      ctx.from.id.toString()

      !==

      env.ownerId

    ) {

      return
    }

    await closeDispute(
      disputeId
    )

    await ctx.reply(
`
✅ Litige fermé.
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openDispute,

  openAdminDisputes,

  resolveDispute

}