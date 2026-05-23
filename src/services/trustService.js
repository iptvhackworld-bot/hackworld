const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| ADD TRUST SCORE
|--------------------------------------------------------------------------
*/

const addTrustScore =
async (

  userId,

  amount

) => {

  const user =
    await User.findOne({

      id: userId

    })

  if (!user) {

    return null

  }

  user.trustScore +=
    amount

  /*
  |--------------------------------------------------------------------------
  | VERIFIED
  |--------------------------------------------------------------------------
  */

  if (

    user.trustScore >= 100

  ) {

    user.verifiedSeller =
      true

  }

  await user.save()

  return user

}

/*
|--------------------------------------------------------------------------
| REMOVE TRUST
|--------------------------------------------------------------------------
*/

const removeTrustScore =
async (

  userId,

  amount

) => {

  const user =
    await User.findOne({

      id: userId

    })

  if (!user) {

    return null

  }

  user.trustScore -=
    amount

  if (

    user.trustScore < 0

  ) {

    user.trustScore = 0

  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE VERIFIED
  |--------------------------------------------------------------------------
  */

  if (

    user.trustScore < 100

  ) {

    user.verifiedSeller =
      false

  }

  await user.save()

  return user

}

module.exports = {

  addTrustScore,

  removeTrustScore

}