const {

  addPremium,

  isPremium

} = require(
  '../services/premiumService'
)

const env =
require(
  '../config/env'
)

/*
|--------------------------------------------------------------------------
| BUY PREMIUM
|--------------------------------------------------------------------------
*/

const buyPremium =
async (ctx) => {

  try {

    await addPremium(

      ctx.from.id,

      30

    )

    await ctx.reply(
`
👑 Premium activé 30 jours.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| PREMIUM STATUS
|--------------------------------------------------------------------------
*/

const openPremium =
async (ctx) => {

  try {

    const premium =
      await isPremium(
        ctx.from.id
      )

    await ctx.reply(

premium

? `
👑 Vous êtes Premium.
`

: `
❌ Vous n'êtes pas Premium.
`

    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  buyPremium,

  openPremium

}