const {

  getTopUsers,

  getRichestUsers,

  getTopGamblers

} = require(
  '../services/userAnalyticsService'
)

/*
|--------------------------------------------------------------------------
| TOP USERS
|--------------------------------------------------------------------------
*/

const showTopUsersAnalytics =
async (ctx) => {

  const users =
    await getTopUsers()

  let message =
`
📊 TOP USERS

━━━━━━━━━━━━━━━━━━

`

  users.forEach(

    (user, index) => {

      message +=
`
#${index + 1}

👤 @${user.username}

📨 ${user.messages} messages

`

    }

  )

  await ctx.reply(
    message
  )

}

/*
|--------------------------------------------------------------------------
| RICHEST USERS
|--------------------------------------------------------------------------
*/

const showRichestUsers =
async (ctx) => {

  const users =
    await getRichestUsers()

  let message =
`
💰 RICHEST USERS

━━━━━━━━━━━━━━━━━━

`

  users.forEach(

    (user, index) => {

      message +=
`
#${index + 1}

👤 @${user.username}

💰 ${user.money}

`

    }

  )

  await ctx.reply(
    message
  )

}

/*
|--------------------------------------------------------------------------
| TOP GAMBLERS
|--------------------------------------------------------------------------
*/

const showTopGamblers =
async (ctx) => {

  const users =
    await getTopGamblers()

  let message =
`
🎰 TOP GAMBLERS

━━━━━━━━━━━━━━━━━━

`

  users.forEach(

    (user, index) => {

      message +=
`
#${index + 1}

👤 @${user.username}

🎲 ${user.casinoPlayed}

`

    }

  )

  await ctx.reply(
    message
  )

}

module.exports = {

  showTopUsersAnalytics,

  showRichestUsers,

  showTopGamblers

}