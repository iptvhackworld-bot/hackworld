const { Markup } =
require('telegraf')

const {

  createEscrow,

  getEscrow,

  confirmBuyer,

  confirmSeller,

  completeEscrow,

  disputeEscrow

} = require(
  '../services/escrowService'
)

if (!global.escrowSessions) {

  global.escrowSessions = {}

}

/*
|--------------------------------------------------------------------------
| PANEL
|--------------------------------------------------------------------------
*/

const openEscrowPanel =
async (ctx) => {

  await ctx.reply(

`
💰 ESCROW SYSTEM

━━━━━━━━━━━━━━━━━━

Sécurisation transactions

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '➕ Créer Escrow',
          'create_escrow'
        )

      ],

      [

        Markup.button.callback(
          '📜 Mes Escrows',
          'my_escrows'
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

const createEscrowPanel =
async (ctx) => {

  global.escrowSessions[
    ctx.from.id
  ] = {

    action:
    'create_escrow'

  }

  await ctx.reply(
`
💰 Envoyez :

@vendeur | montant

Exemple :

@hackworld | 150
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleEscrowInput =
async (ctx) => {

  const session =

    global.escrowSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'create_escrow'

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

    const seller =
      args[0]
      .trim()

    const amount =
      Number(
        args[1]
      )

    if (

      isNaN(amount)

    ) {

      return ctx.reply(
`
❌ Montant invalide.
`
      )

    }

    const escrow =
      await createEscrow(

        ctx.from.id,

        seller,

        amount

      )

    delete global.escrowSessions[
      ctx.from.id
    ]

    return ctx.reply(

`
✅ Escrow créé.

🆔 ${escrow._id}

👤 vendeur :
${seller}

💰 montant :
${amount}€
`,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '✅ Confirmer Achat',
            `buyer_confirm_${escrow._id}`
          )

        ],

        [

          Markup.button.callback(
            '📦 Livraison',
            `seller_confirm_${escrow._id}`
          )

        ],

        [

          Markup.button.callback(
            '⚠️ Dispute',
            `escrow_dispute_${escrow._id}`
          )

        ]

      ])

    )

  }

  return false

}

/*
|--------------------------------------------------------------------------
| BUYER CONFIRM
|--------------------------------------------------------------------------
*/

const buyerConfirmHandler =
async (

  ctx,

  id

) => {

  await confirmBuyer(id)

  await ctx.reply(
`
✅ Acheteur confirmé.
`
  )

}

/*
|--------------------------------------------------------------------------
| SELLER CONFIRM
|--------------------------------------------------------------------------
*/

const sellerConfirmHandler =
async (

  ctx,

  id

) => {

  await confirmSeller(id)

  const escrow =
    await getEscrow(id)

  if (

    escrow.buyerConfirmed

  ) {

    await completeEscrow(id)

    return ctx.reply(
`
💰 Transaction terminée.
`
    )

  }

  await ctx.reply(
`
📦 Livraison confirmée.
`
  )

}

/*
|--------------------------------------------------------------------------
| DISPUTE
|--------------------------------------------------------------------------
*/

const disputeHandler =
async (

  ctx,

  id

) => {

  await disputeEscrow(id)

  await ctx.reply(
`
⚠️ Dispute ouverte.
`
  )

}

module.exports = {

  openEscrowPanel,

  createEscrowPanel,

  handleEscrowInput,

  buyerConfirmHandler,

  sellerConfirmHandler,

  disputeHandler

}