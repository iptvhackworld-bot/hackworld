const {

  enableNotifications,

  disableNotifications

} = require(
  '../services/notificationService'
)

/*
|--------------------------------------------------------------------------
| ENABLE
|--------------------------------------------------------------------------
*/

const enableUserNotifications =
async (ctx) => {

  try {

    enableNotifications(
      ctx.from.id
    )

    await ctx.reply(
`
🔔 Notifications activées.
`
    )

  } catch (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| DISABLE
|--------------------------------------------------------------------------
*/

const disableUserNotifications =
async (ctx) => {

  try {

    disableNotifications(
      ctx.from.id
    )

    await ctx.reply(
`
🔕 Notifications désactivées.
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  enableUserNotifications,

  disableUserNotifications

}