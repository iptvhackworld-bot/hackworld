module.exports = (bot) => {

  const {

    openDispute,

    openAdminDisputes,

    resolveDispute

  } = require(
    '../handlers/disputeHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | DISPUTES
  |--------------------------------------------------------------------------
  */

  bot.command(

    'disputes',

    async (ctx) => {

      try {

        await openAdminDisputes(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | OPEN DISPUTE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'dispute',

    async (ctx) => {

      try {

        const args =
          ctx.message.text
          .split(' ')

        const purchaseId =
          args[1]

        if (!purchaseId) {

          return ctx.reply(
`
❌ Utilisation :

/dispute purchaseId
`
          )

        }

        await openDispute(

          ctx,

          purchaseId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | CLOSE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'closedispute',

    async (ctx) => {

      try {

        const args =
          ctx.message.text
          .split(' ')

        const disputeId =
          args[1]

        if (!disputeId) {

          return ctx.reply(
`
❌ Utilisation :

/closedispute disputeId
`
          )

        }

        await resolveDispute(

          ctx,

          disputeId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}