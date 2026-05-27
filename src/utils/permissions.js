const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| GET USER ROLE
|--------------------------------------------------------------------------
*/

const getUserRole =
async (userId) => {

  try {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return 'user'

    }

    return user.role || 'user'

  } catch (error) {

    console.log(error)

    return 'user'

  }

}

/*
|--------------------------------------------------------------------------
| OWNER
|--------------------------------------------------------------------------
*/

const isOwner =
async (userId) => {

  const role =
    await getUserRole(
      userId
    )

  console.log(
    'OWNER CHECK:',
    userId,
    role
  )

  return role === 'owner'

}

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

const isAdmin =
async (userId) => {

  const role =
    await getUserRole(
      userId
    )

  return [

    'owner',

    'admin'

  ].includes(role)

}

/*
|--------------------------------------------------------------------------
| MOD
|--------------------------------------------------------------------------
*/

const isModerator =
async (userId) => {

  const role =
    await getUserRole(
      userId
    )

  return [

    'owner',

    'admin',

    'mod'

  ].includes(role)

}

/*
|--------------------------------------------------------------------------
| TRUSTED SELLER
|--------------------------------------------------------------------------
*/

const isTrustedSeller =
async (userId) => {

  try {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return false

    }

    return user.trustedSeller === true

  } catch (error) {

    console.log(error)

    return false

  }

}

module.exports = {

  getUserRole,

  isOwner,

  isAdmin,

  isModerator,

  isTrustedSeller

}