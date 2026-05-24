const { Markup } =
require('telegraf')

const {

  createEscrow,

  getEscrow,

  confirmBuyer,

  confirmSeller,

  openDispute

} = require(
  '../services/escrowService'
)

const {

  removeMoney

} = require(
  '../services/walletService'
)

/*
|--------------------------------------------------------------------------
| CREATE ESCROW
|--------------------------------------------------------------------------
*/

const createEscrowDeal =
async (

  ctx,

  sellerId,

  amount,

  itemTitle

) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | REMOVE MONEY
    |--------------------------------------------------------------------------
    */

    const paid =
      await removeMoney(

        ctx.from.id,

        amount

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
    | CREATE
    |--------------------------------------------------------------------------
    */

    const escrow =
      await createEscrow({

        buyerId:
        ctx.from.id,

        sellerId,

        amount,

        itemTitle

      })

    /*
    |--------------------------------------------------------------------------
    | MESSAGE
    |--------------------------------------------------------------------------
    */

    await ctx.reply(

`
🔒 ESCROW CRÉÉ

━━━━━━━━━━━━━━━━━━

📦 ${itemTitle}

💰 ${amount}$

🆔 ${escrow._id}

━━━━━━━━━━━━━━━━━━

Argent sécurisé.
`
,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '✅ Confirmer Achat',
            `confirm_buyer_${escrow._id}`
          )

        ],

        [

          Markup.button.callback(
            '📦 Confirmer Livraison',
            `confirm_seller_${escrow._id}`
          )

        ],

        [

          Markup.button.callback(
            '⚠️ Ouvrir Dispute',
            `open_dispute_${escrow._id}`
          )

        ]

      ])

    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| CONFIRM BUYER
|--------------------------------------------------------------------------
*/

const confirmBuyerEscrow =
async (

  ctx,

  escrowId

) => {

  try {

    await confirmBuyer(
      escrowId
    )

    await ctx.reply(
`
✅ Acheteur confirmé.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| CONFIRM SELLER
|--------------------------------------------------------------------------
*/

const confirmSellerEscrow =
async (

  ctx,

  escrowId

) => {

  try {

    await confirmSeller(
      escrowId
    )

    await ctx.reply(
`
✅ Vendeur confirmé.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| DISPUTE
|--------------------------------------------------------------------------
*/

const disputeEscrow =
async (

  ctx,

  escrowId

) => {

  try {

    await openDispute(
      escrowId
    )

    await ctx.reply(
`
⚠️ Dispute ouverte.

Le staff va examiner le dossier.
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  createEscrowDeal,

  confirmBuyerEscrow,

  confirmSellerEscrow,

  disputeEscrow

}