const FraudLog =
require(
  '../models/FraudLog'
)

const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| CREATE FRAUD LOG
|--------------------------------------------------------------------------
*/

const createFraudLog =
async (

  userId,

  type,

  reason,

  risk

) => {

  return await FraudLog.create({

    userId,

    type,

    reason,

    risk

  })

}

/*
|--------------------------------------------------------------------------
| GET USER RISK
|--------------------------------------------------------------------------
*/

const getUserRisk =
async (userId) => {

  const logs =
    await FraudLog.find({

      userId

    })

  let total =
    0

  logs.forEach((x) => {

    total +=
      x.risk

  })

  return total

}

/*
|--------------------------------------------------------------------------
| AUTO FLAG
|--------------------------------------------------------------------------
*/

const autoFlagUser =
async (

  userId,

  reason,

  risk

) => {

  await createFraudLog(

    userId,

    'auto',

    reason,

    risk

  )

  /*
  |--------------------------------------------------------------------------
  | HIGH RISK
  |--------------------------------------------------------------------------
  */

  const total =
    await getUserRisk(
      userId
    )

  if (

    total >= 100

  ) {

    await User.findOneAndUpdate(

      {

        id: userId

      },

      {

        blacklisted: true

      }

    )

  }

}

module.exports = {

  createFraudLog,

  getUserRisk,

  autoFlagUser

}