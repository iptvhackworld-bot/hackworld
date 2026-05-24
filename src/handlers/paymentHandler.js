const crypto =
require(
  '../config/crypto'
)

const env =
require(
  '../config/env'
)

const {

  createPayment,

  getPendingPayments,

  validatePayment

} = require(
  '../services/paymentService'
)

const {

  addPremium

} = require(
  '../services/premiumService'
)

/*
|--------------------------------------------------------------------------
| SESSIONS
|--------------------------------------------------------------------------
*/

if (!global.paymentSessions) {

  global.paymentSessions = {}

}

/*
|--------------------------------------------------------------------------
| OPEN PAYMENT
|--------------------------------------------------------------------------
*/

const openCryptoPayment =
async (ctx) => {

  try {

    global.paymentSessions[
      ctx.from.id
    ] = {

      action:
      'crypto_payment'

    }

    await ctx.reply(

`
💎 PREMIUM PAYMENT

━━━━━━━━━━━━━━━━━━

USDT :
${crypto.usdt}

ETH :
${crypto.eth}

BTC :
${crypto.btc}

SOL :
${solana.btc}

USDC :
${usdc.btc}

━━━━━━━━━━━━━━━━━━

📸 Envoyez ensuite
la preuve paiement.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| HANDLE PAYMENT PROOF
|--------------------------------------------------------------------------
*/

const handlePaymentProof =
async (ctx) => {

  try {

    const session =

      global.paymentSessions[
        ctx.from.id
      ]

    if (!session) {

      return false

    }

    if (

      !ctx.message.photo

    ) {

      return ctx.reply(
`
❌ Envoyez une capture.
`
      )

    }

    const photo =

      ctx.message.photo[
        ctx.message.photo.length - 1
      ]

    await createPayment({

      userId:
      ctx.from.id,

      username:
      ctx.from.username ||

      'unknown',

      amount: 10,

      currency: 'USDT',

      proofFileId:
      photo.file_id

    })

    delete global.paymentSessions[
      ctx.from.id
    ]

    await ctx.reply(
`
✅ Paiement envoyé.

⏳ Validation admin en attente.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| ADMIN PAYMENTS
|--------------------------------------------------------------------------
*/

const openPendingPayments =
async (ctx) => {

  try {

    if (

      ctx.from.id.toString()

      !==

      env.ownerId

    ) {

      return
    }

    const payments =
      await getPendingPayments()

    if (!payments.length) {

      return ctx.reply(
`
✅ Aucun paiement.
`
      )

    }

    for (const payment of payments) {

      await ctx.replyWithPhoto(

        payment.proofFileId,

        {

          caption:
`
💎 PAYMENT

👤 @${payment.username}

💰 ${payment.amount}$

🪙 ${payment.currency}

🆔 ${payment._id}
`

        }

      )

    }

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| VALIDATE
|--------------------------------------------------------------------------
*/

const validateCryptoPayment =
async (

  ctx,

  paymentId

) => {

  try {

    if (

      ctx.from.id.toString()

      !==

      env.ownerId

    ) {

      return
    }

    const payment =
      await validatePayment(
        paymentId
      )

    if (!payment) {

      return ctx.reply(
`
❌ Paiement introuvable.
`
      )

    }

    await addPremium(

      payment.userId,

      30

    )

    await ctx.telegram.sendMessage(

      payment.userId,

`
👑 Premium activé.
`
    )

    await ctx.reply(
`
✅ Paiement validé.
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openCryptoPayment,

  handlePaymentProof,

  openPendingPayments,

  validateCryptoPayment

}