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

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

const { Markup } =
require('telegraf')


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
	  
	const totalAdmins =
      await User.countDocuments({

       role: 'admin'

      })

    const totalBanned =
       await User.countDocuments({

        banned: true

       })

    const trustedSellers =
       await User.countDocuments({

        trustedSeller: true

       })

    /*
    |--------------------------------------------------------------------------
    | ECONOMY
    |--------------------------------------------------------------------------
    */

    const users =
      await User.find()

    let totalMoney = 0

    

    users.forEach((user) => {

      totalMoney +=
        user.money || 0


    })

    /*
    |--------------------------------------------------------------------------
    | TOP USER
    |--------------------------------------------------------------------------
    */

    const topUser =
  [...users].sort(

    (a, b) =>

      (b.money || 0)

      -

      (a.money || 0)

  )[0]

    /*
    |--------------------------------------------------------------------------
    | MESSAGE
    |--------------------------------------------------------------------------
    */
	
	logInfo(
  `ADMIN_DASHBOARD ${ctx.from.id}`
)

    await ctx.reply(

`
📊 HACKWORLD DASHBOARD

━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${totalUsers}

👑 Admins :
${totalAdmins}

🚫 Bannis :
${totalBanned}

⭐ Trusted Sellers :
${trustedSellers}

━━━━━━━━━━━━━━━━━━

📦 Listings :
${totalListings}

📜 Logs :
${totalLogs}

━━━━━━━━━━━━━━━━━━

💰 Argent total :
${totalMoney}$

🎰 Parties Casino :
${users.reduce(

  (total, user) =>

    total +

    (user.casinoPlayed || 0),

  0

)}

━━━━━━━━━━━━━━━━━━

🏆 Top utilisateur :

${
  topUser
  ? `@${topUser.username}`
  : 'Aucun'
}

━━━━━━━━━━━━━━━━━━

🚀 Système opérationnel
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '🔄 Actualiser',
      'admin_dashboard'
    )

  ],

  [

    Markup.button.callback(
      '⬅️ Admin',
      'admin_panel'
    ),

    Markup.button.callback(
      '🏠 Menu',
      'back_main_menu'
    )

  ]

])

)

  } catch (error) {

  logError(
    'ADMIN_DASHBOARD',
    error
  )

}

}

module.exports = {

  openDashboard

}