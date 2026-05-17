const {

  userService

} = require('../data/userData')

/*
|--------------------------------------------------------------------------
| CHECK BAN
|--------------------------------------------------------------------------
*/

const checkBan = async (
  ctx,
  next
) => {

  if (!ctx.from) {

    return next()

  }

  const users = userService()

  const user = users.find(
    u => u.id === ctx.from.id
  )

  /*
  |--------------------------------------------------------------------------
  | USER BANNED
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

/*
|--------------------------------------------------------------------------
| ANTI SPAM
|--------------------------------------------------------------------------
*/

const spamMap = new Map()

const antiSpam = async (
  ctx,
  next
) => {

  if (!ctx.from) {

    return next()

  }

  const userId =
    ctx.from.id

  const now = Date.now()

  const lastMessage =
    spamMap.get(userId) || 0

  /*
  |--------------------------------------------------------------------------
  | SPAM LIMIT
  |--------------------------------------------------------------------------
  */

  if (
    now - lastMessage < 800
  ) {

    return

  }

  spamMap.set(
    userId,
    now
  )

  return next()
}

module.exports = {

  checkBan,

  antiSpam

}