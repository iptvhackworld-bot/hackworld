const User =
require(
  '../models/User'
)

const {

  logInfo

} = require(
  './logger'
)

/*
|--------------------------------------------------------------------------
| ADD XP
|--------------------------------------------------------------------------
*/

const addXP =
async (

  userId,

  amount

) => {

  const user =
    await User.findOne({

      id: userId

    })

  if (!user) {

    return

  }

  user.xp += amount

  /*
  |--------------------------------------------------------------------------
  | LEVEL UP
  |--------------------------------------------------------------------------
  */

  const neededXP =

    user.level * 100

  if (

    user.xp >= neededXP

  ) {

    user.level += 1

    user.xp = 0

    logInfo(
      `LEVEL_UP ${user.id} -> ${user.level}`
    )

  }

  await user.save()

}

module.exports = {

  addXP

}