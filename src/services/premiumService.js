const Premium =
require(
  '../models/Premium'
)

/*
|--------------------------------------------------------------------------
| ADD PREMIUM
|--------------------------------------------------------------------------
*/

const addPremium =
async (

  userId,

  days = 30

) => {

  try {

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

    return await Premium.findOneAndUpdate(

      {

        userId

      },

      {

        userId,

        expiresAt

      },

      {

        upsert: true,

        new: true

      }

    )

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| CHECK PREMIUM
|--------------------------------------------------------------------------
*/

const isPremium =
async (userId) => {

  try {

    const premium =
      await Premium.findOne({

        userId

      })

    if (!premium) {

      return false

    }

    return (

      premium.expiresAt >

      new Date()

    )

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| CLEAN EXPIRED
|--------------------------------------------------------------------------
*/

const cleanExpiredPremiums =
async () => {

  try {

    await Premium.deleteMany({

      expiresAt: {

        $lt: new Date()

      }

    })

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  addPremium,

  isPremium,
  
  cleanExpiredPremiums

}