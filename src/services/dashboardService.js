const User =
require(
  '../models/User'
)

const Ticket =
require(
  '../models/Ticket'
)

const CasinoHistory =
require(
  '../models/CasinoHistory'
)

const Listing =
require(
  '../models/Listing'
)

const getDashboardStats =
async () => {

  const users =
    await User.countDocuments()

  const admins =
    await User.countDocuments({

      role: 'admin'

    })

  const banned =
    await User.countDocuments({

      banned: true

    })

  const trustedSellers =
    await User.countDocuments({

      trustedSeller: true

    })

  const ticketsOpen =
    await Ticket.countDocuments({

      status: 'open'

    })

  const ticketsClosed =
    await Ticket.countDocuments({

      status: 'closed'

    })

  const listings =
    await Listing.countDocuments()

  const casinoGames =
    await CasinoHistory.countDocuments()

  const economy =
    await User.aggregate([

      {

        $group: {

          _id: null,

          total: {

            $sum: '$money'

          }

        }

      }

    ])

  return {

    users,

    admins,

    banned,

    trustedSellers,

    ticketsOpen,

    ticketsClosed,

    listings,

    casinoGames,

    totalMoney:

      economy[0]?.total ||

      0

  }

}

module.exports = {

  getDashboardStats

}