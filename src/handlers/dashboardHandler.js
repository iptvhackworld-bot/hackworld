const User =
require(
  '../models/User'
)

const Log =
require(
  '../models/Log'
)

const MarketListing =
require(
  '../models/MarketListing'
)

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
*/

const openDashboard =
async (ctx) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | LOAD DATA
    |--------------------------------------------------------------------------
    */

    const totalUsers =
      await User.countDocuments()

    const totalLogs =
      await Log.countDocuments()

    const totalListings =
      await MarketListing.countDocuments()

    /*
    |--------------------------------------------------------------------------
    | ECONOMY
    |--------------------------------------------------------------------------
    */

    const users =
      await User.find()

    let totalMoney = 0

    let totalXP = 0

    users.forEach((user) => {

      totalMoney +=
        user.money || 0

      totalXP +=
        user.xp || 0

    })

    /*
    |--------------------------------------------------------------------------
    | TOP USER
    |--------------------------------------------------------------------------
    */

    const topUser =
      users.sort(

        (a, b) =>

          (b.xp || 0)

          -

          (a.xp || 0)

      )[0]

    /*
    |--------------------------------------------------------------------------
    | MESSAGE
    |--------------------------------------------------------------------------
    */

    await ctx.reply(
`
📊 HACKWORLD DASHBOARD

━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${totalUsers}

📦 Listings :
${totalListings}

📜 Logs :
${totalLogs}

━━━━━━━━━━━━━━━━━━

💰 Argent total :
${totalMoney}$

⭐ XP total :
${totalXP}

━━━━━━━━━━━━━━━━━━

🏆 Top utilisateur :

${
  topUser

  ? `@${topUser.username}`

  : 'Aucun'
}

━━━━━━━━━━━━━━━━━━

🚀 Système opérationnel
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openDashboard

}