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
| CREATE LISTING
|--------------------------------------------------------------------------
*/

const createListing =
async (data) => {

  try {

    return await MarketListing.create(
      data
    )

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| GET LISTINGS
|--------------------------------------------------------------------------
*/

const getListings =
async () => {

  try {

    const listings =
      await MarketListing.find({

        sold: false

      })

      .sort({

        featured: -1,

        createdAt: -1

      })

    const formatted =

      await Promise.all(

        listings.map(

          async (item) => {

            const seller =
              await User.findOne({

                id:
                item.sellerId

              })

            return {

              ...item.toObject(),

              verifiedSeller:

              seller?.verifiedSeller

              || false

            }

          }

        )

      )

    return formatted

  } catch (error) {

    console.log(error)

    return []

  }

}

/*
|--------------------------------------------------------------------------
| SEARCH LISTINGS
|--------------------------------------------------------------------------
*/

const searchListings =
async (

  query

) => {

  try {

    return await MarketListing.find({

      sold: false,

      title: {

        $regex: query,

        $options: 'i'

      }

    })

    .sort({

      featured: -1,

      createdAt: -1

    })

  } catch (error) {

    console.log(error)

    return []

  }

}

/*
|--------------------------------------------------------------------------
| CATEGORY LISTINGS
|--------------------------------------------------------------------------
*/

const getCategoryListings =
async (

  category

) => {

  try {

    return await MarketListing.find({

      sold: false,

      category

    })

    .sort({

      featured: -1,

      createdAt: -1

    })

  } catch (error) {

    console.log(error)

    return []

  }

}

/*
|--------------------------------------------------------------------------
| ADVANCED FILTERS
|--------------------------------------------------------------------------
*/

const filterListings =
async (

  filters = {}

) => {

  try {

    const query = {

      sold: false

    }

    /*
    |--------------------------------------------------------------------------
    | PRICE
    |--------------------------------------------------------------------------
    */

    if (

      filters.minPrice ||

      filters.maxPrice

    ) {

      query.price = {}

      if (

        filters.minPrice

      ) {

        query.price.$gte =
          Number(
            filters.minPrice
          )

      }

      if (

        filters.maxPrice

      ) {

        query.price.$lte =
          Number(
            filters.maxPrice
          )

      }

    }

    /*
    |--------------------------------------------------------------------------
    | FEATURED
    |--------------------------------------------------------------------------
    */

    if (

      filters.featured

    ) {

      query.featured = true

    }

    /*
    |--------------------------------------------------------------------------
    | CATEGORY
    |--------------------------------------------------------------------------
    */

    if (

      filters.category

    ) {

      query.category =
        filters.category

    }

    let listings =
      await MarketListing.find(
        query
      )

    /*
    |--------------------------------------------------------------------------
    | VERIFIED SELLERS
    |--------------------------------------------------------------------------
    */

    if (

      filters.verifiedOnly

    ) {

      const verifiedUsers =
        await User.find({

          verifiedSeller: true

        })

        const ids =

          verifiedUsers.map(

            (u) => u.id

          )

      listings =
        listings.filter(

          (item) =>

            ids.includes(
              item.sellerId
            )

        )

    }

    /*
    |--------------------------------------------------------------------------
    | SORT
    |--------------------------------------------------------------------------
    */

    if (

      filters.sort ===
      'price_asc'

    ) {

      listings.sort(

        (a, b) =>

          a.price - b.price

      )

    }

    if (

      filters.sort ===
      'price_desc'

    ) {

      listings.sort(

        (a, b) =>

          b.price - a.price

      )

    }

    if (

      filters.sort ===
      'rating'

    ) {

      listings.sort(

        (a, b) =>

          (b.averageRating || 0)

          -

          (a.averageRating || 0)

      )

    }

    return listings

  } catch (error) {

    console.log(error)

    return []

  }

}

/*
|--------------------------------------------------------------------------
| GET LISTING
|--------------------------------------------------------------------------
*/

const getListing =
async (id) => {

  try {

    return await MarketListing.findById(
      id
    )

  } catch (error) {

    console.log(error)

    return null

  }

}

/*
|--------------------------------------------------------------------------
| MARK SOLD
|--------------------------------------------------------------------------
*/

const markSold =
async (id) => {

  try {

    return await MarketListing.findByIdAndUpdate(

      id,

      {

        sold: true

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

/*
|--------------------------------------------------------------------------
| ADD SELLER REVIEW
|--------------------------------------------------------------------------
*/

const addSellerReview =
async (

  sellerId,

  rating

) => {

  try {

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

    seller.sellerReviews += 1

    seller.sellerRating =

      (

        total + rating

      )

      /

      seller.sellerReviews

    seller.sellerSales += 1

    /*
    |--------------------------------------------------------------------------
    | TRUSTED
    |--------------------------------------------------------------------------
    */

    if (

      seller.sellerSales >= 10

      &&

      seller.sellerRating >= 4.5

    ) {

      seller.trustedSeller =
        true

    }

    await seller.save()

    return seller

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| FEATURE LISTING
|--------------------------------------------------------------------------
*/

const featureListing =
async (

  listingId,

  days

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

    return await MarketListing.findByIdAndUpdate(

      listingId,

      {

        featured: true,

        featuredExpiresAt:
        expiresAt

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

  createListing,

  getListings,

  searchListings,

  getCategoryListings,

  filterListings,

  getListing,

  markSold,

  addSellerReview,

  featureListing

}