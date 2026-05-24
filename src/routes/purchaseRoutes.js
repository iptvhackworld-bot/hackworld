module.exports = (bot) => {

  const {

    openPurchaseHistory,

    openSalesHistory

  } = require(
    '../handlers/purchaseHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | PURCHASES
  |--------------------------------------------------------------------------
  */

  bot.command(

    'purchases',

    async (ctx) => {

      try {

        await openPurchaseHistory(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SALES
  |--------------------------------------------------------------------------
  */

  bot.command(

    'sales',

    async (ctx) => {

      try {

        await openSalesHistory(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}