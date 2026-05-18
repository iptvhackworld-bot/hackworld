const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| GET USER
|--------------------------------------------------------------------------
*/

const getUser =
async (id) => {

  return await User.findOne({

    id

  })

}

/*
|--------------------------------------------------------------------------
| CREATE USER
|--------------------------------------------------------------------------
*/

const createUser =
async (ctx) => {

  const exists =
    await getUser(
      ctx.from.id
    )

  if (exists) {

    return exists

  }

  return await User.create({

    id:
      ctx.from.id,

    username:
      ctx.from.username || '',

    firstName:
      ctx.from.first_name || ''

  })

}

/*
|--------------------------------------------------------------------------
| GET USERS
|--------------------------------------------------------------------------
*/

const getUsers =
async () => {

  return await User.find()

}

/*
|--------------------------------------------------------------------------
| BAN USER
|--------------------------------------------------------------------------
*/

const banUser =
async (id) => {

  return await User.updateOne(

    { id },

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

const unbanUser =
async (id) => {

  return await User.updateOne(

    { id },

    {

      banned: false

    }

  )

}

module.exports = {

  getUser,

  createUser,

  getUsers,

  banUser,

  unbanUser

}