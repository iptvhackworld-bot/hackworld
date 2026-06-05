const User =
require(
  '../models/User'
)

const {

  logError

} = require(
  '../utils/logger'
)

/*
|--------------------------------------------------------------------------
| STATS
|--------------------------------------------------------------------------
*/

const openAnalytics =
async (ctx) => {

  try {

    const users =
      await User.find()

    const totalUsers =
      users.length

    let totalMoney = 0

    let totalMessages = 0

    let totalCasino = 0

    users.forEach((user) => {

      totalMoney +=
        user.money || 0

      totalMessages +=
        user.messages || 0

      totalCasino +=
        user.casinoPlayed || 0

    })

    const topUser =
      users.sort(

        (a, b) =>

          (b.money || 0)

          -

          (a.money || 0)

      )[0]

    await ctx.reply(
`
📊 HACKWORLD STATS

━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${totalUsers}

💰 Argent total :
${totalMoney}$

💬 Messages :
${totalMessages}

🎰 Parties Casino :
${totalCasino}

━━━━━━━━━━━━━━━━━━

🏆 Plus riche :

${
  topUser
  ?
  `@${topUser.username || 'unknown'}`
  :
  'Aucun'
}

━━━━━━━━━━━━━━━━━━
`
    )

  }

  catch (error) {

    logError(
      'SHOW_STATS',
      error
    )

  }

}

module.exports = {

  openAnalytics

}