const User =
require(
  '../models/User'
)

const env =
require(
  '../config/env'
)

/*
|--------------------------------------------------------------------------
| REQUEST VERIFICATION
|--------------------------------------------------------------------------
*/

const requestVerification =
async (ctx) => {

  try {

    await ctx.telegram.sendMessage(

      env.ownerId,

`
📩 Nouvelle demande vérification

👤 @${ctx.from.username}

🆔 ${ctx.from.id}
`
    )

    await ctx.reply(
`
✅ Demande envoyée.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| VERIFY SELLER
|--------------------------------------------------------------------------
*/

const verifySeller =
async (

  ctx,

  userId

) => {

  try {

    if (

      ctx.from.id.toString()

      !==

      env.ownerId

    ) {

      return
    }

    await User.findOneAndUpdate(

      {

        id: Number(userId)

      },

      {

        verifiedSeller: true,

        trustedSeller: true

      }

    )

    await ctx.reply(
`
✅ Vendeur vérifié.
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  requestVerification,

  verifySeller

}