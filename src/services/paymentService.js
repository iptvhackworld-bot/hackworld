const CryptoPayment =
require(
  '../models/CryptoPayment'
)

/*
|--------------------------------------------------------------------------
| CREATE PAYMENT
|--------------------------------------------------------------------------
*/

const createPayment =
async (data) => {

  try {

    return await CryptoPayment.create(
      data
    )

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| GET PENDING
|--------------------------------------------------------------------------
*/

const getPendingPayments =
async () => {

  try {

    return await CryptoPayment.find({

      status: 'pending'

    })

  } catch (error) {

    console.log(error)

    return []

  }

}

/*
|--------------------------------------------------------------------------
| VALIDATE PAYMENT
|--------------------------------------------------------------------------
*/

const validatePayment =
async (id) => {

  try {

    return await CryptoPayment.findByIdAndUpdate(

      id,

      {

        status: 'validated'

      },

      {

        new: true

      }

    )

  } catch (error) {

    console.log(error)

    return false

  }

}

module.exports = {

  createPayment,

  getPendingPayments,

  validatePayment

}