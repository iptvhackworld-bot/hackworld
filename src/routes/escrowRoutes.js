module.exports = (bot) => {

  const {

    confirmBuyerEscrow,

    confirmSellerEscrow,

    disputeEscrow

  } = require(
    '../handlers/escrowHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | BUYER CONFIRM
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^confirm_buyer_(.+)$/,

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        const id =
          ctx.match[1]

        await confirmBuyerEscrow(

          ctx,

          id

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SELLER CONFIRM
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^confirm_seller_(.+)$/,

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        const id =
          ctx.match[1]

        await confirmSellerEscrow(

          ctx,

          id

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | DISPUTE
  |--------------------------------------------------------------------------
  */

  bot.action(

    /^open_dispute_(.+)$/,

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        const id =
          ctx.match[1]

        await disputeEscrow(

          ctx,

          id

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}