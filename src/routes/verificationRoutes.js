module.exports = (bot) => {

  const {

    requestVerification,

    verifySeller

  } = require(
    '../handlers/verificationHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | REQUEST
  |--------------------------------------------------------------------------
  */

  bot.command(

    'verifyme',

    async (ctx) => {

      try {

        await requestVerification(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | VERIFY
  |--------------------------------------------------------------------------
  */

  bot.command(

    'verifyseller',

    async (ctx) => {

      try {

        const args =
          ctx.message.text
          .split(' ')

        const userId =
          args[1]

        if (!userId) {

          return ctx.reply(
`
❌ Utilisation :

/verifyseller userId
`
          )

        }

        await verifySeller(

          ctx,

          userId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}