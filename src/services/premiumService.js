const PremiumSubscription =
require(
  '../models/PremiumSubscription'
)

/*
|--------------------------------------------------------------------------
| CREATE SUB
|--------------------------------------------------------------------------
*/

const createSubscription =
async (

  userId,

  plan,

  days

) => {

  const expiresAt =
    new Date(

      Date.now()

      +

      days *

      24 *

      60 *

      60 *

      1000

    )

  return await PremiumSubscription.create({

    userId,

    plan,

    expiresAt

  })

}

/*
|--------------------------------------------------------------------------
| GET SUB
|--------------------------------------------------------------------------
*/

const getSubscription =
async (userId) => {

  return await PremiumSubscription.findOne({

    userId,

    active: true

  })

}

/*
|--------------------------------------------------------------------------
| CHECK PREMIUM
|--------------------------------------------------------------------------
*/

const checkPremium =
async (userId) => {

  const sub =
    await getSubscription(
      userId
    )

  if (!sub) {

    return false

  }

  /*
  |--------------------------------------------------------------------------
  | EXPIRED
  |--------------------------------------------------------------------------
  */

  if (

    new Date() >

    sub.expiresAt

  ) {

    sub.active =
      false

    await sub.save()

    return false

  }

  return sub

}

module.exports = {

  createSubscription,

  getSubscription,

  checkPremium

}