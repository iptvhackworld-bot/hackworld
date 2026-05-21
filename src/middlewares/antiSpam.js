const User =
require(
  '../models/User'
)

const config =
require(
  '../config/antispam'
)

const usersMessages =
{}

/*
|--------------------------------------------------------------------------
| ANTISPAM
|--------------------------------------------------------------------------
*/

const antiSpamMiddleware =
async (

  ctx,

  next

) => {

  if (

    !config.enabled ||

    !ctx.from ||

    !ctx.message

  ) {

    return next()

  }

  const userId =
    ctx.from.id

  const now =
    Date.now()

  if (

    !usersMessages[userId]

  ) {

    usersMessages[userId] = []

  }

  usersMessages[userId]
  .push(now)

  usersMessages[userId] =

    usersMessages[userId]

    .filter(

      (time) =>

        now - time <
        config.interval

    )

  if (

    usersMessages[userId]
    .length >

    config.maxMessages

  ) {

    const user =
      await User.findOne({

        id: userId

      })

    if (!user) {

      return

    }

    /*
    |--------------------------------------------------------------------------
    | AUTO WARN
    |--------------------------------------------------------------------------
    */

    if (

      config.autoWarn

    ) {

      user.warns += 1

    }

    /*
    |--------------------------------------------------------------------------
    | AUTO MUTE
    |--------------------------------------------------------------------------
    */

    if (

      config.autoMute

    ) {

      user.muted = true

    }

    await user.save()

    return ctx.reply(
`
🛡 Anti-Spam déclenché.

👤 ${ctx.from.first_name}

⚠️ Warn ajouté
🔇 Utilisateur mute
`
    )

  }

  return next()

}

module.exports =

antiSpamMiddleware