const Purchase =
require(
  '../models/Purchase'
)

/*
|--------------------------------------------------------------------------
| CREATE PURCHASE
|--------------------------------------------------------------------------
*/

const createPurchase =
async (data) => {

  try {

    return await Purchase.create(
      data
    )

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| GET USER PURCHASES
|--------------------------------------------------------------------------
*/

const getUserPurchases =
async (userId) => {

  try {

    return await Purchase.find({

      buyerId: Number(userId)

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
| GET SELLER SALES
|--------------------------------------------------------------------------
*/

const getSellerSales =
async (sellerId) => {

  try {

    return await Purchase.find({

      sellerId: Number(sellerId)

    })

    .sort({

      createdAt: -1

    })

  } catch (error) {

    console.log(error)

    return []

  }

}

module.exports = {

  createPurchase,

  getUserPurchases,

  getSellerSales

}