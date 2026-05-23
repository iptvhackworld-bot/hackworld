const MarketListing =
require(
  '../models/MarketListing'
)

/*
|--------------------------------------------------------------------------
| CREATE LISTING
|--------------------------------------------------------------------------
*/

const createListing =
async (data) => {

  return await MarketListing.create(
    data
  )

}

/*
|--------------------------------------------------------------------------
| GET LISTINGS
|--------------------------------------------------------------------------
*/

const getListings =
async () => {

  return await MarketListing.find({

    sold: false

  })

  .sort({

    createdAt: -1

  })

}

/*
|--------------------------------------------------------------------------
| GET LISTING
|--------------------------------------------------------------------------
*/

const getListing =
async (id) => {

  return await MarketListing.findById(id)

}

/*
|--------------------------------------------------------------------------
| MARK SOLD
|--------------------------------------------------------------------------
*/

const markSold =
async (id) => {

  return await MarketListing.findByIdAndUpdate(

    id,

    {

      sold: true

    }

  )

}

/*
|--------------------------------------------------------------------------
| ADD REVIEW
|--------------------------------------------------------------------------
*/

const addSellerReview =
async (

  sellerId,

  rating

) => {

  const User =
  require(
    '../models/User'
  )

  const seller =
    await User.findOne({

      id: sellerId

    })

  if (!seller) {

    return false

  }

  const total =
    seller.sellerRating *

    seller.sellerReviews

  seller.sellerReviews +=
    1

  seller.sellerRating =

    (

      total + rating

    )

    /

    seller.sellerReviews

  seller.sellerSales +=
    1

  /*
  |--------------------------------------------------------------------------
  | TRUSTED
  |--------------------------------------------------------------------------
  */

  if (

    seller.sellerSales >= 10 &&

    seller.sellerRating >= 4.5

  ) {

    seller.trustedSeller =
      true

  }

  await seller.save()

  return seller

}

module.exports = {

  createListing,

  getListings,

  getListing,

  markSold
  
  addSellerReview

}