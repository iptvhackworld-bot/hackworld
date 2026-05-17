const {

  loadUsers,

  saveUsers

} = require(
  '../data/userData'
)

/*
|--------------------------------------------------------------------------
| GET USER
|--------------------------------------------------------------------------
*/

const getUser = (
  userId
) => {

  const users =
    loadUsers()

  return users.find(
    u => u.id === userId
  )

}

/*
|--------------------------------------------------------------------------
| CREATE USER
|--------------------------------------------------------------------------
*/

const createUser = (
  telegramUser
) => {

  const users =
    loadUsers()

  let user =
    users.find(
      u => u.id === telegramUser.id
    )

  /*
  |--------------------------------------------------------------------------
  | EXISTS
  |--------------------------------------------------------------------------
  */

  if (user) {

    return user

  }

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  user = {

    id: telegramUser.id,

    username:
      telegramUser.username || '',

    firstName:
      telegramUser.first_name || '',

    money: 0,

    xp: 0,

    level: 1,

    banned: false,

    createdAt:
      new Date().toISOString()

  }

  users.push(user)

  saveUsers(users)

  return user

}

/*
|--------------------------------------------------------------------------
| UPDATE USER
|--------------------------------------------------------------------------
*/

const updateUser = (
  userId,
  updates
) => {

  const users =
    loadUsers()

  const user =
    users.find(
      u => u.id === userId
    )

  if (!user) {

    return false

  }

  Object.assign(
    user,
    updates
  )

  saveUsers(users)

  return user

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

  const user =
    getUser(userId)

  if (!user) {

    return false

  }

  return updateUser(

    userId,

    {
      money:
        user.money + amount
    }

  )

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

  const user =
    getUser(userId)

  if (!user) {

    return false

  }

  if (
    user.money < amount
  ) {

    return false

  }

  return updateUser(

    userId,

    {
      money:
        user.money - amount
    }

  )

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

  const user =
    getUser(userId)

  if (!user) {

    return false

  }

  let xp =
    user.xp + amount

  let level =
    user.level

  /*
  |--------------------------------------------------------------------------
  | LEVEL UP
  |--------------------------------------------------------------------------
  */

  if (
    xp >= level * 100
  ) {

    level += 1

  }

  return updateUser(

    userId,

    {
      xp,
      level
    }

  )

}

/*
|--------------------------------------------------------------------------
| BAN USER
|--------------------------------------------------------------------------
*/

const banUser = (
  userId
) => {

  return updateUser(

    userId,

    {
      banned: true
    }

  )

}

/*
|--------------------------------------------------------------------------
| UNBAN USER
|--------------------------------------------------------------------------
*/

const unbanUser = (
  userId
) => {

  return updateUser(

    userId,

    {
      banned: false
    }

  )

}

module.exports = {

  getUser,

  createUser,

  updateUser,

  addMoney,

  removeMoney,

  addXP,

  banUser,

  unbanUser

}