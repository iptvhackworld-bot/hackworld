module.exports = (bot) => {

  const {

    openCryptoPayment,

    openPendingPayments,

    validateCryptoPayment

  } = require(
    '../handlers/paymentHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | BUY PREMIUM
  |--------------------------------------------------------------------------
  */

  bot.command(

    'buypremium',

    async (ctx) => {

      try {

        await openCryptoPayment(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | PAYMENTS
  |--------------------------------------------------------------------------
  */

  bot.command(

    'payments',

    async (ctx) => {

      try {

        await openPendingPayments(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | VALIDATE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'validatepayment',

    async (ctx) => {

      try {

        const args =
          ctx.message.text
          .split(' ')

        const paymentId =
          args[1]

        if (!paymentId) {

          return ctx.reply(
`
❌ /validatepayment id
`
          )

        }

        await validateCryptoPayment(

          ctx,

          paymentId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}