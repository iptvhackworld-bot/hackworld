module.exports = (bot) => {

  const {

    buyPremium,

    openPremium

  } = require(
    '../handlers/premiumHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | PREMIUM
  |--------------------------------------------------------------------------
  */

  bot.command(

    'premium',

    async (ctx) => {

      try {

        await openPremium(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | BUY PREMIUM
  |--------------------------------------------------------------------------
  */

  bot.command(

    'buy_premium',

    async (ctx) => {

      try {

        await buyPremium(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}