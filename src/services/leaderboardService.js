const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| TOP MONEY
|--------------------------------------------------------------------------
*/

const getTopMoney =
async () => {

  try {

    return await User.find()

    .sort({

      money: -1

    })

    .limit(10)

  } catch (error) {

    console.log(error)

    return []

  }

}

/*
|--------------------------------------------------------------------------
| TOP MESSAGES
|--------------------------------------------------------------------------
*/

const getTopMessages =
async () => {

  try {

    return await User.find()

    .sort({

      messages: -1

    })

    .limit(10)

  } catch (error) {

    console.log(error)

    return []

  }

}

module.exports = {

  getTopMoney,

  getTopMessages

}