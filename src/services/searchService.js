const MarketListing =
require(
  '../models/MarketListing'
)

/*
|--------------------------------------------------------------------------
| SEARCH MARKET
|--------------------------------------------------------------------------
*/

const searchMarket =
async (query) => {

  try {

    return await MarketListing.find({

      sold: false,

      $or: [

        {

          title: {

            $regex: query,

            $options: 'i'

          }

        },

        {

          category: {

            $regex: query,

            $options: 'i'

          }

        },

        {

          sellerUsername: {

            $regex: query,

            $options: 'i'

          }

        }

      ]

    })

  } catch (error) {

    console.log(error)

    return []

  }

}

module.exports = {

  searchMarket

}