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

  await ctx.reply(message)

}

/*
|--------------------------------------------------------------------------
| RICHEST
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

}