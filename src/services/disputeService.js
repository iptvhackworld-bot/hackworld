const Dispute =
require(
  '../models/Dispute'
)

/*
|--------------------------------------------------------------------------
| CREATE DISPUTE
|--------------------------------------------------------------------------
*/

const createDispute =
async (data) => {

  try {

    return await Dispute.create(
      data
    )

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| GET DISPUTES
|--------------------------------------------------------------------------
*/

const getDisputes =
async () => {

  try {

    return await Dispute.find({

      status: 'open'

    })

    .sort({

      createdAt: -1

    })

  } catch (error) {

    console.log(error)

    return []

  }

}

/*
|--------------------------------------------------------------------------
| CLOSE DISPUTE
|--------------------------------------------------------------------------
*/

const closeDispute =
async (id) => {

  try {

    return await Dispute.findByIdAndUpdate(

      id,

      {

        status: 'closed'

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

  createDispute,

  getDisputes,

  closeDispute

}