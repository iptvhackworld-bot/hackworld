const User =
require(
  '../models/User'
)

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

  const user =
    await User.findOne({

      id: userId

    })

  if (!user) {

    return ctx.reply(
`
❌ Utilisateur introuvable.
`
    )

  }

  user.verifiedSeller =
    true

  user.trustScore =
    100

  await user.save()

  await ctx.reply(
`
👑 Seller vérifié.
`
  )

}

module.exports = {

  verifySeller

}