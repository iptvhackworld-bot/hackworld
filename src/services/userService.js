const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| CREATE USER
|--------------------------------------------------------------------------
*/

const createUser =
async (data) => {

  return await User.create({

    id: data.id,

    username:

      data.username ||

      data.first_name ||

      'Unknown',

    money: 0,

    xp: 0,

    banned: false

  })

}

/*
|--------------------------------------------------------------------------
| GET USER
|--------------------------------------------------------------------------
*/

const getUser =
async (userId) => {

  return await User.findOne({

    id: userId

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
  .sort({

    createdAt: -1

  })

}

/*
|--------------------------------------------------------------------------
| BAN USER
|--------------------------------------------------------------------------
*/

const banUser =
async (userId) => {

  return await User.findOneAndUpdate(

    {

      id: userId

    },

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
async (userId) => {

  return await User.findOneAndUpdate(

    {

      id: userId

    },

    {

      banned: false

    }

  )

}

/*
|--------------------------------------------------------------------------
| RESET MONEY
|--------------------------------------------------------------------------
*/

const resetMoney =
async (userId) => {

  return await User.findOneAndUpdate(

    {

      id: userId

    },

    {

      money: 0

    }

  )

}

/*
|--------------------------------------------------------------------------
| RESET XP
|--------------------------------------------------------------------------
*/

const resetXP =
async (userId) => {

  return await User.findOneAndUpdate(

    {

      id: userId

    },

    {

      xp: 0

    }

  )

}

/*
|--------------------------------------------------------------------------
| SEARCH USER
|--------------------------------------------------------------------------
*/

const searchUser =
async (query) => {

  return await User.find({

    $or: [

      {

        username: {

          $regex: query,

          $options: 'i'

        }

      },

      {

        id:

          Number(query) || 0

      }

    ]

  })

}

module.exports = {

  createUser,

  getUser,

  getUsers,

  banUser,

  unbanUser,

  resetMoney,

  resetXP,

  searchUser

}