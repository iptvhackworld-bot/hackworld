const Review =
require(
  '../models/Review'
)

const MarketListing =
require(
  '../models/MarketListing'
)

const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| CREATE REVIEW
|--------------------------------------------------------------------------
*/

const createReview =
async (

  reviewerId,

  sellerId,

  listingId,

  rating,

  comment

) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | ANTI DOUBLE REVIEW
    |--------------------------------------------------------------------------
    */

    const existing =
      await Review.findOne({

        reviewerId,

        listingId

      })

    if (existing) {

      return false

    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    await Review.create({

      reviewerId,

      sellerId,

      listingId,

      rating,

      comment

    })

    /*
    |--------------------------------------------------------------------------
    | UPDATE LISTING
    |--------------------------------------------------------------------------
    */

    const reviews =
      await Review.find({

        listingId

      })

    const average =

      reviews.reduce(

        (acc, review) =>

          acc + review.rating,

        0

      )

      /

      reviews.length

    await MarketListing.findByIdAndUpdate(

      listingId,

      {

        averageRating:
        average,

        reviewCount:
        reviews.length

      }

    )

    /*
    |--------------------------------------------------------------------------
    | UPDATE SELLER
    |--------------------------------------------------------------------------
    */

    const sellerReviews =
      await Review.find({

        sellerId

      })

    const sellerAverage =

      sellerReviews.reduce(

        (acc, review) =>

          acc + review.rating,

        0

      )

      /

      sellerReviews.length

    await User.findOneAndUpdate(

      {

        id: sellerId

      },

      {

        sellerRating:
        sellerAverage,

        sellerReviews:
        sellerReviews.length

      }

    )

    return true

  } catch (error) {

    console.log(error)

    return false

  }

}

module.exports = {

  createReview

}