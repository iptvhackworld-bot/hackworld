const DigitalProduct =
require(
  '../models/DigitalProduct'
)

/*
|--------------------------------------------------------------------------
| CREATE PRODUCT
|--------------------------------------------------------------------------
*/

const createDigitalProduct =
async (

  listingId,

  content

) => {

  return await DigitalProduct.create({

    listingId,

    content

  })

}

/*
|--------------------------------------------------------------------------
| GET PRODUCT
|--------------------------------------------------------------------------
*/

const getDigitalProduct =
async (listingId) => {

  return await DigitalProduct.findOne({

    listingId,

    delivered: false

  })

}

/*
|--------------------------------------------------------------------------
| MARK DELIVERED
|--------------------------------------------------------------------------
*/

const markDelivered =
async (id) => {

  return await DigitalProduct.findByIdAndUpdate(

    id,

    {

      delivered: true

    }

  )

}

module.exports = {

  createDigitalProduct,

  getDigitalProduct,

  markDelivered

}