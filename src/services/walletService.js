const User =
require(
  '../models/User'
)

const {

  logEconomy

} = require(
  '../utils/logger'
)

const {

  createLog

} = require(
  './logService'
)

/*
|--------------------------------------------------------------------------
| GET BALANCE
|--------------------------------------------------------------------------
*/

const getBalance =
async (userId) => {

  try {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return 0

    }

    return user.money || 0

  } catch (error) {

    console.log(error)

    return 0

  }

}

/*
|--------------------------------------------------------------------------
| ADD MONEY
|--------------------------------------------------------------------------
*/

const addMoney =
async (

  userId,

  amount

) => {

  try {

    if (

      amount <= 0

    ) {

      return false

    }

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return false

    }

    user.money += amount

    await user.save()

    /*
    |--------------------------------------------------------------------------
    | LOGS
    |--------------------------------------------------------------------------
    */

    logEconomy(
      `ADD ${amount}$ -> ${userId}`
    )

    await createLog(

      'economy',

      userId,

      'ADD_MONEY',

      `${amount}$`

    )

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| REMOVE MONEY
|--------------------------------------------------------------------------
*/

const removeMoney =
async (

  userId,

  amount

) => {

  try {

    if (

      amount <= 0

    ) {

      return false

    }

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return false

    }

    if (

      user.money < amount

    ) {

      return false

    }

    user.money -= amount

    await user.save()

    /*
    |--------------------------------------------------------------------------
    | LOGS
    |--------------------------------------------------------------------------
    */

    logEconomy(
      `REMOVE ${amount}$ -> ${userId}`
    )

    await createLog(

      'economy',

      userId,

      'REMOVE_MONEY',

      `${amount}$`

    )

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

module.exports = {

  getBalance,

  addMoney,

  removeMoney

}