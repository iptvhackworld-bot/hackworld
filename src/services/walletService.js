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

    )

await createLog(

  'economy',

  userId,

  'ADD_MONEY',

  `${amount}$`

)	{

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

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

logEconomy(
  `ADD ${amount}$ -> ${userId}`
)

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
	
	await createLog(

  'economy',

  userId,

  'REMOVE_MONEY',

  `${amount}$`

)

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