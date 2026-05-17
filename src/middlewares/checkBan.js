const {

  getUser

} = require(
  '../services/userService'
)

const checkBan = async (
  ctx,
  next
) => {

  if (!ctx.from) {

    return next()

  }

  const user =
    getUser(
      ctx.from.id
    )

  /*
  |--------------------------------------------------------------------------
  | BANNED
  |--------------------------------------------------------------------------
  */

  if (
    user &&
    user.banned
  ) {

    return ctx.reply(
`
🚫 Vous êtes banni.
`
    )

  }

  return next()

}

module.exports =
checkBan