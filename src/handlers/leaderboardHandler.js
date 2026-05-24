const {

  getTopMoney,

  getTopMessages

} = require(
  '../services/leaderboardService'
)

/*
|--------------------------------------------------------------------------
| MONEY LEADERBOARD
|--------------------------------------------------------------------------
*/

const openMoneyLeaderboard =
async (ctx) => {

  try {

    const users =
      await getTopMoney()

    let message =
`
💰 TOP MONEY

━━━━━━━━━━━━━━━━━━
`

    users.forEach(

      (user, index) => {

        message +=
`
#${index + 1}

@${user.username || 'unknown'}

💵 ${user.money || 0}$

━━━━━━━━━━━━━━━━━━
`

      }

    )

    await ctx.reply(
      message
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| MESSAGE LEADERBOARD
|--------------------------------------------------------------------------
*/

const openMessageLeaderboard =
async (ctx) => {

  try {

    const users =
      await getTopMessages()

    let message =
`
💬 TOP MESSAGES

━━━━━━━━━━━━━━━━━━
`

    users.forEach(

      (user, index) => {

        message +=
`
#${index + 1}

@${user.username || 'unknown'}

💬 ${user.messages || 0}

━━━━━━━━━━━━━━━━━━
`

      }

    )

    await ctx.reply(
      message
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openMoneyLeaderboard,

  openMessageLeaderboard

}