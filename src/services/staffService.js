const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| SET ROLE
|--------------------------------------------------------------------------
*/

const setRole =
async (

  userId,

  role

) => {

  try {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return false

    }

    user.role = role

    await user.save()

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| BAN USER
|--------------------------------------------------------------------------
*/

const banUser =
async (userId) => {

  try {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return false

    }

    user.banned = true

    await user.save()

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| UNBAN USER
|--------------------------------------------------------------------------
*/

const unbanUser =
async (userId) => {

  try {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return false

    }

    user.banned = false

    await user.save()

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| MUTE USER
|--------------------------------------------------------------------------
*/

const muteUser =
async (userId) => {

  try {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return false

    }

    user.muted = true

    await user.save()

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| UNMUTE USER
|--------------------------------------------------------------------------
*/

const unmuteUser =
async (userId) => {

  try {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return false

    }

    user.muted = false

    await user.save()

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

module.exports = {

  setRole,

  banUser,

  unbanUser,

  muteUser,

  unmuteUser

}