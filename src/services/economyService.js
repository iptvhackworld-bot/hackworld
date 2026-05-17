const {

  userService,

  userService

} = require('../data/userData')

/*
|--------------------------------------------------------------------------
| GET USER
|--------------------------------------------------------------------------
*/

const getUser = (
  userId
) => {

  const users =
    userService()

  return users.find(
    u => u.id === userId
  )
}

/*
|--------------------------------------------------------------------------
| ADD MONEY
|--------------------------------------------------------------------------
*/

const addMoney = (
  userId,
  amount
) => {

  const users =
    userService()

  const user =
    users.find(
      u => u.id === userId
    )

  if (!user) {

    return false

  }

  user.money += amount

  userService(users)

  return true
}

/*
|--------------------------------------------------------------------------
| REMOVE MONEY
|--------------------------------------------------------------------------
*/

const removeMoney = (
  userId,
  amount
) => {

  const users =
    userService()

  const user =
    users.find(
      u => u.id === userId
    )

  if (!user) {

    return false

  }

  if (
    user.money < amount
  ) {

    return false

  }

  user.money -= amount

  userService(users)

  return true
}

/*
|--------------------------------------------------------------------------
| ADD XP
|--------------------------------------------------------------------------
*/

const addXP = (
  userId,
  amount
) => {

  const users =
    userService()

  const user =
    users.find(
      u => u.id === userId
    )

  if (!user) {

    return false

  }

  user.xp += amount

  /*
  |--------------------------------------------------------------------------
  | LEVEL UP
  |--------------------------------------------------------------------------
  */

  if (
    user.xp >=
    user.level * 100
  ) {

    user.level += 1

  }

  userService(users)

  return true
}

module.exports = {

  getUser,

  addMoney,

  removeMoney,

  addXP

}