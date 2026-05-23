const Escrow =
require(
  '../models/Escrow'
)

/*
|--------------------------------------------------------------------------
| CREATE ESCROW
|--------------------------------------------------------------------------
*/

const createEscrow =
async (

  buyerId,

  sellerId,

  amount

) => {

  return await Escrow.create({

    buyerId,

    sellerId,

    amount

  })

}

/*
|--------------------------------------------------------------------------
| GET ESCROW
|--------------------------------------------------------------------------
*/

const getEscrow =
async (id) => {

  return await Escrow.findById(id)

}

/*
|--------------------------------------------------------------------------
| CONFIRM BUYER
|--------------------------------------------------------------------------
*/

const confirmBuyer =
async (id) => {

  return await Escrow.findByIdAndUpdate(

    id,

    {

      buyerConfirmed: true

    }

  )

}

/*
|--------------------------------------------------------------------------
| CONFIRM SELLER
|--------------------------------------------------------------------------
*/

const confirmSeller =
async (id) => {

  return await Escrow.findByIdAndUpdate(

    id,

    {

      sellerConfirmed: true

    }

  )

}

/*
|--------------------------------------------------------------------------
| COMPLETE
|--------------------------------------------------------------------------
*/

const completeEscrow =
async (id) => {

  return await Escrow.findByIdAndUpdate(

    id,

    {

      status: 'completed'

    }

  )

}

/*
|--------------------------------------------------------------------------
| DISPUTE
|--------------------------------------------------------------------------
*/

const disputeEscrow =
async (id) => {

  return await Escrow.findByIdAndUpdate(

    id,

    {

      disputed: true,

      status: 'dispute'

    }

  )

}

module.exports = {

  createEscrow,

  getEscrow,

  confirmBuyer,

  confirmSeller,

  completeEscrow,

  disputeEscrow

}