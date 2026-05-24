const Escrow =
require(
  '../models/Escrow'
)

const {

  addMoney,

  removeMoney

} = require(
  './walletService'
)

/*
|--------------------------------------------------------------------------
| CREATE ESCROW
|--------------------------------------------------------------------------
*/

const createEscrow =
async (data) => {

  try {

    return await Escrow.create(
      data
    )

  } catch (error) {

    console.log(error)

    return null

  }

}

/*
|--------------------------------------------------------------------------
| GET ESCROW
|--------------------------------------------------------------------------
*/

const getEscrow =
async (id) => {

  try {

    return await Escrow.findById(
      id
    )

  } catch (error) {

    console.log(error)

    return null

  }

}

/*
|--------------------------------------------------------------------------
| CONFIRM BUYER
|--------------------------------------------------------------------------
*/

const confirmBuyer =
async (id) => {

  try {

    const escrow =
      await Escrow.findById(id)

    if (!escrow) {

      return false

    }

    escrow.buyerConfirmed =
      true

    /*
    |--------------------------------------------------------------------------
    | RELEASE MONEY
    |--------------------------------------------------------------------------
    */

    if (

      escrow.buyerConfirmed &&

      escrow.sellerConfirmed

    ) {

      escrow.status =
        'completed'

      await addMoney(

        escrow.sellerId,

        escrow.amount

      )

    }

    await escrow.save()

    return escrow

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| CONFIRM SELLER
|--------------------------------------------------------------------------
*/

const confirmSeller =
async (id) => {

  try {

    const escrow =
      await Escrow.findById(id)

    if (!escrow) {

      return false

    }

    escrow.sellerConfirmed =
      true

    /*
    |--------------------------------------------------------------------------
    | RELEASE MONEY
    |--------------------------------------------------------------------------
    */

    if (

      escrow.buyerConfirmed &&

      escrow.sellerConfirmed

    ) {

      escrow.status =
        'completed'

      await addMoney(

        escrow.sellerId,

        escrow.amount

      )

    }

    await escrow.save()

    return escrow

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| OPEN DISPUTE
|--------------------------------------------------------------------------
*/

const openDispute =
async (id) => {

  try {

    const escrow =
      await Escrow.findById(id)

    if (!escrow) {

      return false

    }

    escrow.disputed = true

    escrow.status = 'dispute'

    await escrow.save()

    return escrow

  } catch (error) {

    console.log(error)

    return false

  }

}

module.exports = {

  createEscrow,

  getEscrow,

  confirmBuyer,

  confirmSeller,

  openDispute

}