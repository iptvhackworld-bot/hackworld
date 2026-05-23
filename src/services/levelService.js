const User =
require(
  '../models/User'
)

const {

  addMoney

} = require(
  './walletService'
)

/*
|--------------------------------------------------------------------------
| REQUIRED XP
|--------------------------------------------------------------------------
*/

const requiredXp =
(level) => {

  return level * 100

}

/*
|--------------------------------------------------------------------------
| ADD XP
|--------------------------------------------------------------------------
*/

const addXp =
async (

  userId,

  amount

) => {

  const user =
    await User.findOne({

      id: userId

    })

  if (!user) {

    return null

  }

  user.xp +=
    amount

  /*
  |--------------------------------------------------------------------------
  | LEVEL UP
  |--------------------------------------------------------------------------
  */

  while (

    user.xp >=

    requiredXp(
      user.level
    )

  ) {

    user.xp -=

      requiredXp(
        user.level
      )

    user.level +=
      1

    /*
    |--------------------------------------------------------------------------
    | LEVEL REWARD
    |--------------------------------------------------------------------------
    */

    const reward =

      user.level * 500

    await addMoney(

      user.id,

      reward,

      'Level reward'

    )

  }

  await user.save()

  return user

}

module.exports = {

  addXp,

  requiredXp

}