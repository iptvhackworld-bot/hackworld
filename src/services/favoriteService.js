const Favorite =
require(
  '../models/Favorite'
)

const MarketListing =
require(
  '../models/MarketListing'
)

/*
|--------------------------------------------------------------------------
| ADD FAVORITE
|--------------------------------------------------------------------------
*/

const addFavorite =
async (

  userId,

  listingId

) => {

  try {

    const existing =
      await Favorite.findOne({

        userId,

        listingId

      })

    if (existing) {

      return false

    }

    return await Favorite.create({

      userId,

      listingId

    })

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| GET FAVORITES
|--------------------------------------------------------------------------
*/

const getFavorites =
async (userId) => {

  try {

    const favorites =
      await Favorite.find({

        userId

      })

    const ids =

      favorites.map(

        (f) => f.listingId

      )

    return await MarketListing.find({

      _id: {

        $in: ids

      }

    })

  } catch (error) {

    console.log(error)

    return []

  }

}

module.exports = {

  addFavorite,

  getFavorites

}